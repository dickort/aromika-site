# AROMIKA.INFO SEO layer

## Files

- `aromika-seo-v1.js` — centralized metadata, canonical, hreflang, Open Graph/Twitter, JSON-LD and H1 handling.
- `aromika-redirect-worker-v1.js` — true HTTP 301 redirects at the edge.
- `../FULL_HEAD_INFO_V9_5_4_SEO.txt` — global Tilda HEAD include with SEO + ROMI.

## 1. Tilda global HEAD

Replace the current global aromika.info HEAD block with the contents of:

`FULL_HEAD_INFO_V9_5_4_SEO.txt`

Then publish all pages.

The SEO module is loaded from jsDelivr:

`https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/seo/aromika-seo-v1.js?v=1.0.0`

When changing the SEO module, bump the query version in the Tilda HEAD include so CDN/browser caches refresh.

## 2. Real 301 redirects via Cloudflare Worker

A JavaScript redirect inside Tilda cannot return an HTTP 301 because Tilda has already returned the HTML response. Use the edge Worker for real SEO redirects.

Create a Cloudflare Worker and paste the contents of:

`seo/aromika-redirect-worker-v1.js`

Attach routes:

- `aromika.info/*`
- `www.aromika.info/*`

The Worker does three things:

1. legacy URL -> target URL with `301`;
2. `www` -> non-www with `301`;
3. non-HTTPS -> `https://aromika.info` with `301`.

All other canonical requests are passed through to the existing origin with `fetch(request)`.

## 3. Redirects active immediately

- `/partneram` -> `/okompanii#cooperation`
- `/proizvodstvo` -> `/okompanii#production-quality`
- `/production` -> `/okompanii#production-quality`
- `/brends` -> `/brands`
- legacy `/brands/...` aliases -> current brand URLs
- `/sales` -> `https://aromika.shop/`

## 4. Redirects intentionally disabled until targets exist

These are present in the Worker but commented out:

- `/vacancies` -> `/careers`
- `/currentpromotions` -> `/akcii`
- `/page72065703.html` -> `/kz/`
- `/team` -> `/okompanii`

Enable only after the target page is confirmed live.

Do not enable `/hozyastvennoe` or `/kidsseries` until an exact relevant destination has been chosen.

## 5. Verification

After deployment verify with an HTTP header checker or curl:

```bash
curl -I https://aromika.info/partneram
curl -I https://www.aromika.info/washexpert
curl -I http://aromika.info/brands
```

Expected:

- status `301` for legacy/www/http requests;
- one-hop `Location` to canonical destination;
- canonical current URLs return the normal Tilda response.

Then re-check:

- `/robots.txt`
- `/sitemap.xml`
- canonical tags
- hreflang tags
- JSON-LD
- Google Search Console indexing/404 reports.
