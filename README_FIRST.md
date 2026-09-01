# AROMIKA TESTPUB → PRODUCTION RECOVERY V5

This package fixes the previous V4 mistake: it does NOT introduce a new site design.

## Important

The visual master is:
`https://testpub.tilda.ws/`

The previous production files below must NOT be referenced from Tilda:
- site-shell-final-v1.css
- site-shell-final-v1.js
- pages-final-v1.css
- pages-final-v1.js

They may remain in GitHub; they simply must not be loaded.

## Step 1 — GitHub

Upload directly to the ROOT of `dickort/aromika-site`:
- `github/site-route-fix-production-v1.js`
- `github/assistant-v5-production.js`
- `github/assistant-v5-production.css`

Upload/overwrite the four files from `romi/` into the existing GitHub `/romi/` folder.

Do not delete `site-v23`, `brands-v16`, `contacts-v1`, `careers-v2`,
or the existing brand-specific CSS/JS files. They are the approved design assets.

## Step 2 — Remove the WRONG global HEAD

Tilda → Site Settings → More → HTML code for HEAD.

Delete the V4 / pinned HEAD that references:
- site-shell-final-v1.css/js
- pages-final-v1.css/js
- assistant-v5-final.css/js

Paste instead:
`tilda/GLOBAL_HEAD_TESTPUB_SAFE.txt`

The new HEAD contains NO global site styling. It only:
1. fixes routes;
2. blocks obsolete assistants;
3. mounts the approved Romi V5 production build.

## Step 3 — Restore the exact TESTPUB pages

For each production page, remove the generic V4 T123 and copy the exact approved
page/T123 from the `testpub.tilda.ws` project.

Do NOT redesign or rebuild the markup.

Production URLs:
- /
- /brands
- /akcii
- /okompanii
- /careers
- /kontakty
- /perfect
- /washexpert
- /maxipower
- /prachka
- /antibak

The route-fixer automatically converts old testpub links:
- #brands → /brands
- /partneram → /okompanii#cooperation
- /vacancies → /careers
- /proizvodstvo → /okompanii#production-quality
- /brends → /brands

It also handles mobile menus and dynamically created links without touching layout.

## Step 4 — Redirects

Add redirects from `TILDA_REDIRECTS.txt` in Tilda SEO settings.

## Step 5 — Publish all pages

After all 11 pages are restored and the new global HEAD is saved:
Publish all pages.

Then check production in an incognito window.

## Smoke test

- exact visual comparison with testpub;
- one Romi launcher only;
- desktop and mobile menus;
- RU / ҚАЗ;
- dark/light theme;
- /brands;
- /careers;
- company production anchor;
- company cooperation anchor and its 3 scenarios;
- products and external shop links;
- no links to deleted /partneram, /proizvodstvo or /vacancies pages.
