#!/usr/bin/env python3
"""Build a browser-friendly vacancy feed from the public HeadHunter RSS feed.

The HH JSON API can reject browser/datacenter requests with 403. The public RSS
feed is intended for syndication, so this collector normalizes it to JSON that
aromika.info can load from the repository CDN. On a transient HH failure the
last successful snapshot is retained.
"""
from __future__ import annotations

import html
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "vacancies.json"
EMPLOYER_ID = "1009681"
RSS_URL = os.getenv(
    "HH_RSS_URL",
    f"https://hh.kz/search/vacancy/rss?employer_id={EMPLOYER_ID}",
)
UA = "AromikaCareers/1.0 (+https://aromika.info/vacancies)"

def fetch(url: str) -> bytes:
    request = Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
            "Accept-Language": "ru-RU,ru;q=0.9,kk;q=0.8",
        },
    )
    with urlopen(request, timeout=40) as response:
        return response.read()


def clean_markup(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value or "")
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def field(description: str, label: str) -> str:
    match = re.search(
        rf"<p>\s*{re.escape(label)}\s*:\s*(.*?)\s*</p>",
        description or "",
        flags=re.IGNORECASE | re.DOTALL,
    )
    return clean_markup(match.group(1)) if match else ""


def number(value: str) -> int | None:
    digits = re.sub(r"\D", "", value or "")
    return int(digits) if digits else None


def salary(value: str) -> dict | None:
    normalized = re.sub(r"\s+", " ", html.unescape(value or "")).strip().lower()
    if not normalized or "не указан" in normalized:
        return None
    amounts = [number(part) for part in re.findall(r"\d[\d\s\u00a0\u202f]*", normalized)]
    amounts = [amount for amount in amounts if amount is not None]
    if not amounts:
        return None
    currency = "KZT" if "₸" in normalized or "тенге" in normalized else ""
    result: dict[str, object] = {"currency": currency, "gross": None}
    if len(amounts) >= 2:
        result["from"] = amounts[0]
        result["to"] = amounts[1]
    elif normalized.startswith("до "):
        result["to"] = amounts[0]
    else:
        result["from"] = amounts[0]
    return result


def vacancy_id(url: str) -> str:
    match = re.search(r"/vacancy/(\d+)", url or "")
    return match.group(1) if match else ""


def parse(xml: bytes) -> list[dict]:
    root = ElementTree.fromstring(xml)
    vacancies: list[dict] = []
    for item in root.findall("./channel/item"):
        title = (item.findtext("title") or "").strip()
        link = (item.findtext("link") or "").strip()
        description = item.findtext("description") or ""
        area = field(description, "Регион") or "Казахстан"
        employer = field(description, "Вакансия компании") or "ТК АРОМИКА"
        published_at = (item.findtext("pubDate") or "").strip()
        item_id = vacancy_id(link)
        if not item_id or not title:
            continue
        vacancies.append(
            {
                "id": item_id,
                "name": title,
                "area": {"name": area},
                "salary": salary(field(description, "Предполагаемый уровень месячного дохода")),
                "experience": None,
                "schedule": None,
                "employment": None,
                "employer": {"id": EMPLOYER_ID, "name": employer},
                "snippet": {
                    "responsibility": (
                        f"Открытая вакансия компании {employer} в городе {area}. "
                        "Подробные обязанности и условия доступны на hh.kz."
                    )
                },
                "alternate_url": link,
                "published_at": published_at,
                "archived": False,
            }
        )
    vacancies.sort(key=lambda vacancy: vacancy.get("published_at") or "", reverse=True)
    return vacancies


def main() -> int:
    try:
        vacancies = parse(fetch(RSS_URL))
    except Exception as error:  # Keep the last good snapshot on transient HH errors.
        if OUT.exists():
            print(f"HH feed unavailable; retained {OUT}: {error}")
            return 0
        raise

    payload = {
        "schema": 1,
        "source": "hh.kz/rss",
        "employer_id": EMPLOYER_ID,
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "found": len(vacancies),
        "items": vacancies,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {len(vacancies)} vacancies to {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
