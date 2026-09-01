#!/usr/bin/env python3
"""Collect active promotions from Aromika.shop and Kaspi merchant 1359004.

No CAPTCHA or anti-bot bypass is attempted. If a source fails, the last
successful snapshot for that source is retained in data/promos.json.
"""
from __future__ import annotations

import asyncio
import json
import os
import re
import sys
import time
from datetime import datetime, timezone, date
from pathlib import Path
from urllib.parse import urljoin
from zoneinfo import ZoneInfo

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "promos.json"
AROMIKA_HOME = os.getenv("AROMIKA_HOME_URL", "https://aromika.shop/")
AROMIKA_PROMO = os.getenv("AROMIKA_PROMO_URL", "")
KASPI_URL = os.getenv(
    "KASPI_SEARCH_URL",
    "https://kaspi.kz/shop/search/?q=%3AallMerchants%3A1359004",
)
MERCHANT = "1359004"
TZ = ZoneInfo("Asia/Qostanay")
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 Chrome/140 Safari/537.36"
)
S = requests.Session()
S.headers.update({"User-Agent": UA, "Accept-Language": "ru-RU,ru;q=0.9"})
DATE_RANGE_RX = re.compile(
    r"(\d{1,2})[./](\d{1,2})[./](\d{4})\s*(?:по|[-–—])\s*"
    r"(\d{1,2})[./](\d{1,2})[./](\d{4})",
    re.I,
)


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def local_today() -> date:
    return datetime.now(TZ).date()


def num(value) -> int:
    matches = re.findall(r"[\d\s\xa0]+", str(value or ""))
    if not matches:
        return 0
    try:
        return int(re.sub(r"\D", "", matches[0]))
    except ValueError:
        return 0


def discount(old: int, price: int) -> int:
    return round((old - price) * 100 / old) if old and price and old > price else 0


def soup_get(url: str, timeout: int = 25) -> BeautifulSoup:
    response = S.get(url, timeout=timeout)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def active_period(text: str) -> bool:
    """Publish automatically discovered promos only during their stated period."""
    match = DATE_RANGE_RX.search(text or "")
    if not match:
        return False
    d1, m1, y1, d2, m2, y2 = map(int, match.groups())
    try:
        start = date(y1, m1, d1)
        end = date(y2, m2, d2)
    except ValueError:
        return False
    return start <= local_today() <= end


def discover_promo_urls() -> list[str]:
    if AROMIKA_PROMO:
        # Manually supplied URLs are trusted and do not require a period in the page card.
        return [x.strip() for x in AROMIKA_PROMO.split(",") if x.strip()]

    soup = soup_get(AROMIKA_HOME)
    urls: list[str] = []
    for anchor in soup.select("a[href]"):
        href = urljoin(AROMIKA_HOME, anchor.get("href", ""))
        if not href.startswith("https://aromika.shop/") or "/vse-tovary/" in href:
            continue
        parent = anchor
        context = ""
        for _ in range(5):
            if not parent:
                break
            context = parent.get_text(" ", strip=True)
            if DATE_RANGE_RX.search(context):
                break
            parent = parent.parent
        if active_period(context) and href not in urls:
            urls.append(href)
    return urls[:12]


def product_links_from_promo(promo_url: str, soup: BeautifulSoup) -> list[str]:
    links: list[str] = []
    for anchor in soup.select("a[href]"):
        href = urljoin(promo_url, anchor.get("href", ""))
        if "aromika.shop/" in href and "/vse-tovary/" in href and href not in links:
            links.append(href)
    return links


def parse_aromika_product(url: str):
    soup = soup_get(url)
    heading = soup.select_one("h1")
    name = heading.get_text(" ", strip=True) if heading else ""
    if not name:
        return None

    image = ""
    og = soup.select_one('meta[property="og:image"]')
    if og:
        image = og.get("content", "")
    if not image:
        img = soup.select_one(".ty-product-block__img img, .cm-image-previewer")
        image = (img.get("src") or img.get("data-src") or "") if img else ""

    current = old = 0
    current_el = soup.select_one(".ty-price-num, .ty-price .ty-price-num, [itemprop='price']")
    if current_el:
        current = num(current_el.get("content") or current_el.get_text(" ", strip=True))
    old_el = soup.select_one(".ty-list-price, .ty-strike, .ty-list-price .ty-price-num")
    if old_el:
        old = num(old_el.get_text(" ", strip=True))

    text = soup.get_text(" ", strip=True)
    values = [num(x) for x in re.findall(r"(\d[\d\s\xa0]{1,10})\s*₸", text)]
    values = [v for v in values if 10 < v < 1_000_000]
    if not current and values:
        current = min(values)
    if not old and current:
        higher = [v for v in values if v > current]
        if higher:
            old = min(higher)

    pct = discount(old, current)
    if pct <= 0:
        return None
    return {
        "source": "aromika",
        "name": name,
        "brand": "",
        "old_price": old,
        "price": current,
        "discount": pct,
        "image": image,
        "url": url,
    }


def collect_aromika() -> list[dict]:
    links: list[str] = []
    for promo_url in discover_promo_urls():
        try:
            promo_soup = soup_get(promo_url)
            for url in product_links_from_promo(promo_url, promo_soup):
                if url not in links:
                    links.append(url)
        except Exception as exc:
            print("Aromika promo failed", promo_url, exc, file=sys.stderr)

    items: list[dict] = []
    for url in links[:180]:
        try:
            item = parse_aromika_product(url)
            if item:
                items.append(item)
            time.sleep(0.08)
        except Exception as exc:
            print("Aromika product failed", url, exc, file=sys.stderr)
    return list({item["url"]: item for item in items}.values())


async def collect_kaspi() -> list[dict]:
    from playwright.async_api import async_playwright

    products: list[dict] = []
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        page = await browser.new_page(
            user_agent=UA,
            viewport={"width": 1440, "height": 1200},
            locale="ru-RU",
        )
        await page.goto(KASPI_URL, wait_until="domcontentloaded", timeout=60_000)
        await page.wait_for_timeout(4_500)
        body = (await page.locator("body").inner_text()).lower()
        if any(
            marker in body
            for marker in ("captcha", "access denied", "подтвердите, что вы не робот", "робот")
        ):
            raise RuntimeError("Kaspi anti-bot page returned; no bypass attempted")

        for _ in range(12):
            await page.mouse.wheel(0, 2400)
            await page.wait_for_timeout(850)

        links = page.locator('a[href*="/shop/p/"]')
        count = min(await links.count(), 600)
        seen: set[str] = set()

        for index in range(count):
            anchor = links.nth(index)
            href = await anchor.get_attribute("href")
            if not href:
                continue
            href = urljoin("https://kaspi.kz", href.split("?")[0])
            if href in seen:
                continue
            seen.add(href)

            try:
                info = await anchor.evaluate(
                    """(el) => {
                      let node = el, best = null;
                      for (let i=0; i<9 && node; i++, node=node.parentElement) {
                        const text = (node.innerText || '').trim();
                        const prices = text.match(/[0-9][0-9\\s\\u00a0]{1,12}\\s*₸/g) || [];
                        if (prices.length >= 2 || /[-−]\\s*\\d{1,2}\\s*%/.test(text)) {
                          best = node; break;
                        }
                      }
                      const box = best || el;
                      const img = box.querySelector('img');
                      return {
                        text: (box.innerText || '').trim(),
                        name: (el.innerText || '').trim(),
                        image: img ? (img.currentSrc || img.src || img.dataset.src || '') : ''
                      };
                    }"""
                )
                card_text = info.get("text", "")
                raw_name = info.get("name", "")
                values = [num(x) for x in re.findall(r"(\d[\d\s\xa0]{1,10})\s*₸", card_text)]
                values = [x for x in values if 10 < x < 1_000_000]
                unique: list[int] = []
                for value in values:
                    if value not in unique:
                        unique.append(value)
                if len(unique) < 2:
                    continue
                price, old = min(unique), max(unique)
                marker = re.search(r"[-−]\s*(\d{1,2})\s*%", card_text)
                pct = int(marker.group(1)) if marker else discount(old, price)
                if pct <= 0 or pct > 90:
                    continue
                lines = [x.strip() for x in raw_name.splitlines() if x.strip()]
                name = next(
                    (x for x in lines if "₸" not in x and "%" not in x),
                    lines[0] if lines else "",
                )
                if not name:
                    continue
                products.append(
                    {
                        "source": "kaspi",
                        "name": name,
                        "brand": "",
                        "old_price": old,
                        "price": price,
                        "discount": pct,
                        "image": info.get("image", ""),
                        "url": href,
                    }
                )
            except Exception as exc:
                print("Kaspi card skipped", href, str(exc)[:120], file=sys.stderr)

        await browser.close()
    return products


def load_old() -> dict:
    try:
        return json.loads(OUT.read_text("utf-8"))
    except Exception:
        return {"sources": {}, "products": []}


def source_old(old: dict, source: str) -> list[dict]:
    return [p for p in old.get("products", []) if p.get("source") == source]


def main() -> None:
    old = load_old()
    sources: dict = {}
    all_products: list[dict] = []

    jobs = [
        ("aromika", collect_aromika),
        ("kaspi", lambda: asyncio.run(collect_kaspi())),
    ]
    for source, function in jobs:
        try:
            items = function()
            all_products.extend(items)
            sources[source] = {
                "status": "ok" if items else "empty",
                "count": len(items),
                "last_success": now(),
            }
            if source == "kaspi":
                sources[source]["merchant_id"] = MERCHANT
        except Exception as exc:
            keep = source_old(old, source)
            all_products.extend(keep)
            sources[source] = {
                "status": "error",
                "count": len(keep),
                "last_success": old.get("sources", {}).get(source, {}).get("last_success"),
                "message": str(exc)[:300],
            }
            if source == "kaspi":
                sources[source]["merchant_id"] = MERCHANT

    all_products = [
        p for p in all_products if p.get("discount", 0) > 0 and p.get("price", 0) > 0
    ]
    all_products.sort(key=lambda p: (-p.get("discount", 0), p.get("price", 0)))
    payload = {
        "schema": 2,
        "updated_at": now(),
        "demo": False,
        "sources": sources,
        "products": all_products,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), "utf-8")
    print("wrote", OUT, "products", len(all_products), sources)


if __name__ == "__main__":
    main()
