# AROMIKA — TESTPUB SOURCE MAP

`https://testpub.tilda.ws/` is the visual master.
Do NOT use `site-shell-final-v1.*` or `pages-final-v1.*` in Tilda.

## Pages / source generation used for the reference design

| Production URL | Restore from the approved testpub page / existing runtime |
|---|---|
| `/` | Home V23 — `site-v23.css` + `site-v23.js` |
| `/brands` | Brands V16 — `brands-v16.css` + `brands-v16.js` |
| `/akcii` | Promotions — existing `promos-v3.*` / current testpub promo T123 |
| `/okompanii` | Company + Cooperation — existing `company-*` + `company-coop-*` testpub page |
| `/careers` | Careers V2 — `careers-v2.css` + `careers-v2.js` |
| `/kontakty` | Contacts V1 — `site-v23.css` + `contacts-v1.css/js` |
| `/perfect` | Approved Perfect build already used by testpub (do not replace its design) |
| `/washexpert` | Wash Expert approved testpub build; runtime family `washexpert-v3.*` |
| `/maxipower` | Maxi Power approved testpub build; runtime family `maxipower-v4.*` |
| `/prachka` | Prachka approved testpub build; runtime family `prachka-v5.*` |
| `/antibak` | Antibak approved testpub build; runtime family `antibak-v2.*` |

The safest production method is to copy the exact T123 block/page from the testpub project.
Do not reconstruct these pages using generic markup.

## Final URLs

- `/`
- `/brands`
- `/akcii`
- `/okompanii`
- `/careers`
- `/kontakty`
- `/perfect`
- `/washexpert`
- `/maxipower`
- `/prachka`
- `/antibak`

Company internal anchors:
- `/okompanii#production-quality`
- `/okompanii#cooperation`
- `/okompanii?type=retail#cooperation`
- `/okompanii?type=horeca#cooperation`
- `/okompanii?type=distributor#cooperation`

The global `site-route-fix-production-v1.js` changes old links at runtime,
so the testpub T123s do not need visual or structural editing merely to update URLs.
