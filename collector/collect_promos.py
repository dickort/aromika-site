#!/usr/bin/env python3
"""Collect current discounted products from Aromika.shop and Kaspi merchant 1359004.

Principle: a product is a promotion only when the live product/card markup actually
contains a lower current price than an old price (or Kaspi exposes a discount marker).
We intentionally do NOT trust campaign date metadata because storefront prices can
remain discounted after a campaign banner's stated period.

No CAPTCHA/anti-bot bypass is attempted. If a source fails, the last successful
snapshot for that source is retained.
"""
from __future__ import annotations

import asyncio
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse, parse_qs, urlencode, urlunparse

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "promos-v3.json"
AROMIKA_HOME = os.getenv("AROMIKA_HOME_URL", "https://aromika.shop/")
AROMIKA_ALL = os.getenv("AROMIKA_ALL_URL", "https://aromika.shop/vse-tovary/")
KASPI_URL = os.getenv(
    "KASPI_SEARCH_URL",
    "https://kaspi.kz/shop/search/?q=%3AallMerchants%3A1359004",
)
MERCHANT = "1359004"
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36"
)
S = requests.Session()
S.headers.update({
    "User-Agent": UA,
    "Accept-Language": "ru-RU,ru;q=0.9,kk;q=0.8",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
})
PRICE_RX = re.compile(r"(\d[\d\s\u00a0\u202f]{1,12})\s*₸")
DISCOUNT_RX = re.compile(r"[-−–—]?\s*(\d{1,2})\s*%")


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def num(value) -> int:
    s = re.sub(r"\D", "", str(value or ""))
    try:
        return int(s) if s else 0
    except ValueError:
        return 0


def price_values(text: str) -> list[int]:
    # Remove explicit savings amounts: they are money values but not sale/list prices.
    clean = re.sub(
        r"(?:вы\s+экономите|экономия|үнем)[^₸]{0,50}\d[\d\s\u00a0\u202f]{1,12}\s*₸",
        " ",
        text or "",
        flags=re.I,
    )
    out: list[int] = []
    for raw in PRICE_RX.findall(clean):
        value = num(raw)
        if 10 < value < 1_000_000 and value not in out:
            out.append(value)
    return out


def discount(old: int, price: int) -> int:
    return round((old - price) * 100 / old) if old and price and old > price else 0


def soup_get(url: str, timeout: int = 35) -> BeautifulSoup:
    response = S.get(url, timeout=timeout, allow_redirects=True)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def with_query(url: str, **params) -> str:
    p = urlparse(url)
    q = parse_qs(p.query)
    for key, value in params.items():
        q[key] = [str(value)]
    return urlunparse(p._replace(query=urlencode(q, doseq=True)))


def normalize_product_url(base: str, href: str) -> str:
    url = urljoin(base, href or "").split("#")[0]
    # Keep canonical product path but drop tracking/query noise.
    p = urlparse(url)
    return urlunparse((p.scheme, p.netloc, p.path, "", "", ""))


def is_aromika_product_url(url: str) -> bool:
    """Return True only for real Aromika product detail URLs.

    Reject catalog root and pagination URLs such as /vse-tovary/ and
    /vse-tovary/page-5/, which can otherwise inherit prices from a nearby card.
    """
    p = urlparse(url)
    if p.netloc.lower() != "aromika.shop":
        return False
    prefix = "/vse-tovary/"
    path = p.path or ""
    if not path.startswith(prefix):
        return False
    tail = path[len(prefix):].strip("/")
    if not tail:
        return False
    if re.fullmatch(r"page-\d+", tail, flags=re.I):
        return False
    # Product pages are a single slug directly under /vse-tovary/.
    if "/" in tail:
        return False
    return True


def find_discount_box(anchor) -> tuple[object | None, list[int]]:
    """Find the smallest ancestor that contains an actual two-price offer."""
    node = anchor
    best = None
    best_prices: list[int] = []
    for _ in range(9):
        if node is None:
            break
        text = node.get_text(" ", strip=True)
        vals = price_values(text)
        if len(vals) >= 2:
            # Avoid accidentally climbing to a container holding many product cards.
            product_links = node.select('a[href*="/vse-tovary/"]')
            unique_links = {
                (a.get("href") or "").split("?")[0]
                for a in product_links
                if a.get("href")
            }
            if len(unique_links) <= 3:
                best, best_prices = node, vals
                break
        node = getattr(node, "parent", None)
    return best, best_prices


def card_name(box, product_url: str, anchor) -> str:
    candidates: list[str] = []
    for a in box.select('a[href*="/vse-tovary/"]') if box else [anchor]:
        href = normalize_product_url(AROMIKA_HOME, a.get("href", ""))
        if href != product_url:
            continue
        txt = a.get_text(" ", strip=True)
        if txt and "₸" not in txt and len(txt) > 3:
            candidates.append(txt)
    if candidates:
        return max(candidates, key=len)
    for selector in ("h2", "h3", "h4", "[class*='name']", "[class*='title']"):
        el = box.select_one(selector) if box else None
        if el:
            txt = el.get_text(" ", strip=True)
            if txt and "₸" not in txt:
                return txt
    return ""


def card_image(box) -> str:
    if not box:
        return ""
    img = box.select_one("img")
    if not img:
        return ""
    for attr in ("data-src", "data-original", "src"):
        value = img.get(attr)
        if value and not value.startswith("data:"):
            return urljoin(AROMIKA_HOME, value)
    srcset = img.get("srcset", "")
    if srcset:
        return urljoin(AROMIKA_HOME, srcset.split(",")[0].strip().split(" ")[0])
    return ""


def parse_aromika_listing(soup: BeautifulSoup, base_url: str) -> list[dict]:
    items: dict[str, dict] = {}
    seen_urls: set[str] = set()
    for anchor in soup.select('a[href*="/vse-tovary/"]'):
        url = normalize_product_url(base_url, anchor.get("href", ""))
        if not is_aromika_product_url(url) or url in seen_urls:
            continue
        seen_urls.add(url)
        box, vals = find_discount_box(anchor)
        if not box or len(vals) < 2:
            continue
        current, old = min(vals), max(vals)
        pct = discount(old, current)
        if pct <= 0 or pct > 90:
            continue
        name = card_name(box, url, anchor)
        if not name or name.strip().lower() in {"все товары", "барлық тауарлар"}:
            continue
        items[url] = {
            "source": "aromika",
            "name": name,
            "brand": "",
            "old_price": old,
            "price": current,
            "discount": pct,
            "image": card_image(box),
            "url": url,
        }
    return list(items.values())


def parse_aromika_product(url: str) -> dict | None:
    soup = soup_get(url)
    h1 = soup.select_one("h1")
    name = h1.get_text(" ", strip=True) if h1 else ""
    if not name:
        return None

    # Find the smallest element around "Вы экономите" that contains both prices.
    box = None
    for el in soup.find_all(string=re.compile(r"Вы\s+экономите", re.I)):
        node = el.parent
        for _ in range(8):
            if not node:
                break
            vals = price_values(node.get_text(" ", strip=True))
            if len(vals) >= 2:
                box = node
                break
            node = node.parent
        if box:
            break

    vals = price_values(box.get_text(" ", strip=True)) if box else []
    if len(vals) < 2:
        # Fallback to known CS-Cart price nodes.
        texts: list[str] = []
        for selector in (
            ".ty-price-num", ".ty-list-price", ".ty-strike",
            "[itemprop='price']", "[class*='list-price']", "[class*='old-price']"
        ):
            for el in soup.select(selector):
                texts.append(el.get("content") or el.get_text(" ", strip=True))
        vals = []
        for text in texts:
            v = num(text)
            if 10 < v < 1_000_000 and v not in vals:
                vals.append(v)
    if len(vals) < 2:
        return None

    current, old = min(vals), max(vals)
    pct = discount(old, current)
    if pct <= 0 or pct > 90:
        return None

    image = ""
    og = soup.select_one('meta[property="og:image"]')
    if og:
        image = og.get("content", "")
    if not image:
        img = soup.select_one(".ty-product-block__img img, .cm-image-previewer, img[itemprop='image']")
        if img:
            image = img.get("data-src") or img.get("src") or ""
    return {
        "source": "aromika",
        "name": name,
        "brand": "",
        "old_price": old,
        "price": current,
        "discount": pct,
        "image": urljoin(url, image),
        "url": url,
    }


def collect_aromika() -> list[dict]:
    """Scan live catalog cards first; verify/fill details from product pages when needed."""
    found: dict[str, dict] = {}
    candidate_urls: set[str] = set()

    scan_urls = [AROMIKA_HOME]
    # Scan up to 8 catalog pages with 100 items/page. CS-Cart accepts page/items_per_page.
    for page_no in range(1, 9):
        scan_urls.append(with_query(AROMIKA_ALL, items_per_page=100, page=page_no))

    # Also scan any page linked from the home page whose label looks promotional.
    try:
        home = soup_get(AROMIKA_HOME)
        for a in home.select("a[href]"):
            label = a.get_text(" ", strip=True).lower()
            href = urljoin(AROMIKA_HOME, a.get("href", ""))
            if any(k in label for k in ("акци", "скид", "бестсел")) and href.startswith("https://aromika.shop/"):
                scan_urls.append(href)
    except Exception as exc:
        print("Aromika home discovery failed", exc, file=sys.stderr)

    seen_scan: set[str] = set()
    no_new_pages = 0
    for scan_url in scan_urls:
        if scan_url in seen_scan:
            continue
        seen_scan.add(scan_url)
        try:
            soup = soup_get(scan_url)
            page_items = parse_aromika_listing(soup, scan_url)
            before = len(found)
            for item in page_items:
                found[item["url"]] = item
            for a in soup.select('a[href*="/vse-tovary/"]'):
                u = normalize_product_url(scan_url, a.get("href", ""))
                if is_aromika_product_url(u):
                    candidate_urls.add(u)
            if "/vse-tovary/" in scan_url:
                no_new_pages = no_new_pages + 1 if len(found) == before else 0
                if no_new_pages >= 2 and len(candidate_urls) > 0:
                    break
        except Exception as exc:
            print("Aromika scan failed", scan_url, exc, file=sys.stderr)

    # Product-page verification catches discounts whose card markup is unusual.
    # Limit requests, prioritizing links seen on pages we already scanned.
    for url in list(candidate_urls)[:650]:
        if url in found and found[url].get("image"):
            continue
        try:
            item = parse_aromika_product(url)
            if item:
                # Keep richer listing name/image when available, fill missing fields otherwise.
                if url in found:
                    old = found[url]
                    if old.get("name"):
                        item["name"] = old["name"]
                    if old.get("image"):
                        item["image"] = old["image"]
                found[url] = item
            time.sleep(0.04)
        except Exception as exc:
            print("Aromika product skipped", url, str(exc)[:160], file=sys.stderr)

    return list(found.values())


async def collect_kaspi() -> list[dict]:
    from playwright.async_api import async_playwright

    products: dict[str, dict] = {}
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent=UA,
            viewport={"width": 1440, "height": 1400},
            locale="ru-RU",
        )
        page = await context.new_page()
        await page.goto(KASPI_URL, wait_until="domcontentloaded", timeout=75_000)
        await page.wait_for_timeout(6_000)
        body = (await page.locator("body").inner_text()).lower()
        if any(marker in body for marker in (
            "captcha", "access denied", "подтвердите, что вы не робот", "робот"
        )):
            raise RuntimeError("Kaspi anti-bot page returned; no bypass attempted")

        # Trigger lazy loading. Stop when page height stabilizes.
        last_height = 0
        stable = 0
        for _ in range(28):
            height = await page.evaluate("document.body.scrollHeight")
            await page.mouse.wheel(0, 2600)
            await page.wait_for_timeout(650)
            new_height = await page.evaluate("document.body.scrollHeight")
            if new_height <= max(height, last_height):
                stable += 1
            else:
                stable = 0
            last_height = new_height
            if stable >= 4:
                break

        cards = await page.evaluate(
            """() => {
              const out = [];
              const seen = new Set();
              const links = [...document.querySelectorAll('a[href*="/shop/p/"]')];
              for (const el of links) {
                const raw = el.href || el.getAttribute('href') || '';
                if (!raw) continue;
                const href = raw.split('?')[0];
                if (seen.has(href)) continue;

                let box = el.closest('[class*="item-card"], [class*="product-card"], article, li');
                if (!box) {
                  let node = el;
                  for (let i=0; i<10 && node; i++, node=node.parentElement) {
                    const text = (node.textContent || '').trim();
                    const prices = text.match(/[0-9][0-9\\s\\u00a0\\u202f]{1,12}\\s*₸/g) || [];
                    const productLinks = node.querySelectorAll ? node.querySelectorAll('a[href*="/shop/p/"]').length : 0;
                    if ((prices.length >= 2 || /[-−–—]?\\s*\\d{1,2}\\s*%/.test(text)) && productLinks <= 4) {
                      box = node; break;
                    }
                  }
                }
                if (!box) continue;
                const text = (box.textContent || '').replace(/\\s+/g,' ').trim();
                const priceTexts = [...box.querySelectorAll('[class*="price"], [data-testid*="price"]')]
                  .map(n => (n.textContent || '').trim()).filter(Boolean);
                const nameCandidates = [...box.querySelectorAll('a[href*="/shop/p/"]')]
                  .map(a => (a.textContent || '').replace(/\\s+/g,' ').trim())
                  .filter(t => t.length > 3 && !t.includes('₸') && !/%/.test(t));
                let name = nameCandidates.sort((a,b)=>b.length-a.length)[0] || '';
                if (!name) {
                  const n = box.querySelector('[class*="name"], [class*="title"], h2, h3, h4');
                  name = n ? (n.textContent || '').replace(/\\s+/g,' ').trim() : '';
                }
                const img = box.querySelector('img');
                out.push({
                  href,
                  text,
                  priceText: priceTexts.join(' | '),
                  name,
                  image: img ? (img.currentSrc || img.src || img.dataset.src || '') : ''
                });
                seen.add(href);
              }
              return out;
            }"""
        )

        for info in cards:
            href = info.get("href", "")
            text = (info.get("text", "") + " " + info.get("priceText", "")).strip()
            vals = price_values(text)
            marker = DISCOUNT_RX.search(text)
            marker_pct = int(marker.group(1)) if marker else 0

            if len(vals) >= 2:
                current, old = min(vals), max(vals)
                pct = marker_pct or discount(old, current)
            elif len(vals) == 1 and marker_pct > 0:
                # Fallback only when Kaspi renders the old price visually but does not expose it
                # in accessible text. Mark it as estimated so it can be audited later.
                current = vals[0]
                old = round(current / max(0.01, 1 - marker_pct / 100))
                pct = marker_pct
            else:
                continue

            if pct <= 0 or pct > 90 or old <= current:
                continue
            name = (info.get("name") or "").strip()
            if not name:
                # Conservative fallback from card text: choose the longest non-price chunk.
                chunks = [x.strip() for x in re.split(r"[|•]", text) if x.strip()]
                chunks = [x for x in chunks if "₸" not in x and "%" not in x and len(x) > 5]
                name = max(chunks, key=len) if chunks else ""
            if not name:
                continue
            products[href] = {
                "source": "kaspi",
                "name": name,
                "brand": "",
                "old_price": old,
                "price": current,
                "discount": pct,
                "image": info.get("image", ""),
                "url": href,
                **({"old_price_estimated": True} if len(vals) == 1 else {}),
            }

        await context.close()
        await browser.close()
    return list(products.values())


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
            if items:
                all_products.extend(items)
                sources[source] = {
                    "status": "ok",
                    "count": len(items),
                    "last_success": now(),
                    "message": "Live discounted products detected.",
                }
            else:
                # Empty is considered a successful scan, but do not discard a prior non-empty
                # snapshot immediately: storefront markup may have changed temporarily.
                keep = source_old(old, source)
                if keep:
                    all_products.extend(keep)
                    sources[source] = {
                        "status": "warning",
                        "count": len(keep),
                        "last_success": old.get("sources", {}).get(source, {}).get("last_success"),
                        "message": "Live scan returned 0; retaining previous snapshot.",
                    }
                else:
                    sources[source] = {
                        "status": "empty",
                        "count": 0,
                        "last_success": now(),
                        "message": "Live scan completed; no discounted cards detected.",
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

    # Deduplicate by source + URL and keep only true discounts.
    dedup: dict[tuple[str, str], dict] = {}
    for p in all_products:
        if not (p.get("discount", 0) > 0 and p.get("price", 0) > 0 and p.get("old_price", 0) > p.get("price", 0)):
            continue
        if p.get("source") == "aromika":
            if not is_aromika_product_url(p.get("url", "")):
                continue
            if str(p.get("name", "")).strip().lower() in {"все товары", "барлық тауарлар"}:
                continue
        dedup[(p.get("source", ""), p.get("url", ""))] = p
    all_products = list(dedup.values())
    all_products.sort(key=lambda p: (-p.get("discount", 0), p.get("price", 0)))

    payload = {
        "schema": 3,
        "updated_at": now(),
        "demo": False,
        "sources": sources,
        "products": all_products,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), "utf-8")
    print("wrote", OUT, "products", len(all_products), json.dumps(sources, ensure_ascii=False))


if __name__ == "__main__":
    main()
