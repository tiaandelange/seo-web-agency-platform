# Production crawl and indexing audit

**Date:** 23 July 2026  
**Scope:** Live production host `https://www.koppiesystems.co.za` (not local build only)  
**Repo:** `seo-web-agency-platform`  
**Branch / commit at audit:** `main` @ `8ea91034ee625855e50796a411b74e716a3a61dd`  
**Working tree note:** Unrelated local homepage/brand WIP was present and was **not** overwritten.

## Executive verdict

The apex → www HTTPS redirect chain is healthy and the site returns HTTP 200 on the canonical host. **Indexing is not production-ready.**

Live production was deployed **without** the production site environment:

| Signal | Live result |
|---|---|
| `robots.txt` | `Disallow: /` (crawl blocked) |
| Sitemap `<loc>` hosts | **All 52 URLs are `http://localhost:3000/...`** |
| Page canonical / `og:url` / JSON-LD URLs | **`http://localhost:3000/...`** |
| Page `<meta name="robots">` | `index, follow` (contradicts robots.txt) |
| Indexable confidence from this crawl | **0 / 52 pages** pass a self-canonical www check |

This matches a deployment where the custom domain is attached, but `NEXT_PUBLIC_SITE_ENV` is not `production` and `NEXT_PUBLIC_SITE_URL` was unset/localhost at build time. Documentation already describes the correct cutover (`docs/launch/VERCEL-PREVIEW-SETUP.md` §8); it was not applied on the live Production deployment.

**Do not submit the current sitemap to Google Search Console until the env cutover and redeploy are verified.**

---

## STEP 1 — Preflight

| Item | Value |
|---|---|
| Branch | `main` (tracks `origin/main`) |
| Commit | `8ea91034ee625855e50796a411b74e716a3a61dd` |
| Local `SITE_URL` / env | `.env.example` defaults to `http://localhost:3000`; production must use Vercel Production env |
| `metadataBase` | `new URL(siteOrigin())` in `app/layout.tsx` |
| Canonical helper | `absoluteUrl()` → `siteOrigin()` + trailing slash (`lib/seo.ts`) |
| Trailing-slash policy | `trailingSlash: true` in `next.config.ts` (D-04) |
| Sitemap | `app/sitemap.ts` from route registry (`inSitemap`) |
| Robots | `app/robots.ts` — allow only when `NEXT_PUBLIC_SITE_ENV === 'production'` |
| Intended canonical host | `https://www.koppiesystems.co.za` (`brand.productionOrigin`) |
| `brand.verification.domain` | still `false` in repo (flag lag; DNS/hosting for `.co.za` is live) |
| Vercel | Responses include `Server: Vercel`, `x-vercel-cache`, region `cpt1` |

Route registry at audit time (local validate): **64** routes, **52** indexable, **12** noindex. Live sitemap also listed **52** URLs (host wrong).

---

## STEP 2 — Domain variant matrix

| Start URL | Chain | Final URL | Final status |
|---|---|---|---|
| `http://koppiesystems.co.za/` | 308 → `https://koppiesystems.co.za/` → 308 → `https://www.koppiesystems.co.za/` | `https://www.koppiesystems.co.za/` | **200** |
| `https://koppiesystems.co.za/` | 308 → www | `https://www.koppiesystems.co.za/` | **200** |
| `http://www.koppiesystems.co.za/` | 308 → https www | `https://www.koppiesystems.co.za/` | **200** |
| `https://www.koppiesystems.co.za/` | (none) | same | **200** |

No redirect loops observed. HSTS present (`max-age=63072000`). Content-Type on final HTML: `text/html; charset=utf-8`.

### Secondary domain

| Host | Result |
|---|---|
| `koppiesystems.com` / `www.koppiesystems.com` | **DNS ENOTFOUND** (not configured) |

### Key path probes (www HTTPS)

| Path | Status | Notes |
|---|---|---|
| `/robots.txt` | 200 | `User-Agent: *` / `Disallow: /` |
| `/sitemap.xml` | 200 | 52 locs, all localhost |
| `/contact/` | 200 | |
| `/request-a-quote/` | 200 | |
| `/services/business-websites/` | 200 | |
| `/projects/` | 200 | |
| `/resources/` | 200 | |
| `/areas-we-serve/pretoria/` | 200 | |
| `/services/websites/`, `/work/`, `/areas/pretoria/`, `/packages/` | 404 | Wrong path guesses; real hubs are `/projects/`, `/website-packages/`, `/areas-we-serve/` |

---

## STEP 3 — Canonical consistency (repository)

Production-facing URL construction is centralised:

- `NEXT_PUBLIC_SITE_URL` / `siteOrigin()` / `absoluteUrl()`
- `metadataBase` from `siteOrigin()`
- `buildMetadata()` sets `alternates.canonical` and `openGraph.url`
- Sitemap + robots sitemap URL via `absoluteUrl()`
- JSON-LD via `lib/schema.ts` + `absoluteUrl()` / `siteOrigin()`

Hardcoded production domain appears only as **intended** constants/docs (`brand.productionOrigin`, launch docs), not as the live runtime origin. Runtime incorrectly fell back to `brand.fallbackSiteUrl` (`http://localhost:3000`) because Production env was missing.

Email addresses such as `hello@koppiesystems.co.za` / test stubs were **not** treated as URL defects.

---

## STEP 4 — Production HTML audit

Artifacts:

- `docs/technical/production-crawl-artifacts/production-html-audit.csv`
- `docs/technical/production-crawl-artifacts/production-html-summary.json`

### Crawl totals

| Metric | Count |
|---|---|
| Sitemap URLs audited (mapped to www) | 52 |
| HTTP 200 | 52 |
| Self-canonical on www | **0** |
| Canonical host = localhost | **52** |
| Pages with `noindex` meta | 0 (all inspected sitemap pages emit `index, follow`) |
| Pages passing “indexable under www self-canonical” | **0** |

### Per-page checks (all 52)

- Exactly one `<title>`: pass  
- Exactly one meta description: pass  
- Exactly one canonical: pass (but wrong host)  
- Exactly one H1: pass  
- Main copy present in HTML: pass  
- Duplicate titles / descriptions across the 52: none flagged  
- `staging_banner` auto-flag on `/services/seo-website-development/` only: **false positive** (copy contains the word “staging”; no staging chrome observed)

CSV columns: `url,status,title,description,canonical,robots,h1_count,indexable,error`.

---

## STEP 5 — Sitemap and robots

### robots.txt (live)

```text
User-Agent: *
Disallow: /
```

- No sitemap reference (expected when `isProductionSite()` is false).
- Public pages are therefore **disallowed for crawling** while HTML still advertises `index, follow`.

### sitemap.xml (live)

- 52 URLs  
- **Every** `<loc>` is `http://localhost:3000/...`  
- Paths themselves match the indexable route set (trailing slashes present)  
- Thank-you / template noindex routes were **not** observed in the live sitemap  
- Sitemap is unsafe to submit until hosts are rewritten to `https://www.koppiesystems.co.za`

### Preview / staging blocking

Intentional non-production robots behaviour is working as coded — but it is incorrectly still active on the **public Production domain**.

---

## STEP 6 — Structured data

Artifact: `docs/technical/production-crawl-artifacts/structured-data-summary.json` (+ per-type `jsonld-*.json`).

| Page type | URL tested | Valid JSON-LD | Fabricated ratings | Absolute URL issues |
|---|---|---|---|---|
| Home | `/` | Yes | None | localhost URLs throughout |
| Service | `/services/business-websites/` | Yes | None | localhost |
| Solution | `/solutions/contractors/` | Yes | None | localhost |
| Project hub | `/projects/` | Yes | None | localhost |
| Resource hub / article | `/resources/`, `/resources/website-cost-guides/` | Yes | None | localhost |
| Location | `/areas-we-serve/pretoria/` | Yes (layout schemas) | None | localhost |
| Contact | `/contact/` | Yes | None | localhost |
| Package hub guess `/packages/` | 404 | N/A | — | use `/website-packages/` |

Schema types observed include `Organization`, `WebSite`, `WebPage`, `Service`, `BreadcrumbList`, `ContactPage`, `ProfessionalService`, `CollectionPage`. No `aggregateRating` / invented review claims detected.

---

## STEP 7 — Browser runtime (Playwright)

Artifact: `docs/technical/production-crawl-artifacts/browser-audit-summary.json`  
Viewports: 1440×900, 1280×800, 768×1024, 390×844, 360×800  
Pages: home, business websites, custom web apps, projects, one package, cost article, Pretoria, contact, request-a-quote, pricing (50 checks).

| Check | Result |
|---|---|
| Non-200 document loads | **0** |
| Horizontal overflow | **0** |
| Hydration / React mismatch console hints | **0** |
| Contact / quote empty submit | Native validation blocks (4–5 `:invalid` fields) — **pass** |
| Thank-you redirect | **Not exercised** (no production lead submitted) |
| Console “Failed to load resource … 400” | Seen on form interaction paths; correlated with aborted RSC fetches after validation clicks — treat as noise unless reproduced without form submit |
| Broken images | Damtech `_next/image` asset `western-cape-dam-lining-reservoir-damtech.*.webp` failed naturalWidth=0 on projects views |

Failed-request noise was dominated by aborted `/_rsc=` navigations during empty-form validation clicks, not by missing primary documents.

---

## P0 / P1 / P2 fixes

### P0 — before any indexing or promotion

1. **Vercel Production environment (owner action — required)**  
   - `NEXT_PUBLIC_SITE_ENV=production`  
   - `NEXT_PUBLIC_SITE_URL=https://www.koppiesystems.co.za`  
   - Redeploy Production (NEXT_PUBLIC_* are build-time for prerendered HTML).  
2. **Re-verify live:**  
   - `robots.txt` allows `/`, disallows `/api/`, references `https://www.koppiesystems.co.za/sitemap.xml`  
   - Sitemap locs all `https://www.koppiesystems.co.za/...`  
   - Homepage canonical + `og:url` + JSON-LD `@id` / `url` use www HTTPS  
3. **Google Search Console** — after step 2 only: domain property, live URL Inspection on homepage + 5–8 commercial URLs, submit sitemap, request indexing.  
4. **Do not** submit the current localhost sitemap.  
5. Confirm production lead email delivery with **one** labelled test (not done in this audit).

### P1

1. Fix / replace the broken Damtech project image (or remove until screenshot pack lands — aligns with portfolio screenshot work).  
2. Set `brand.verification.domain = true` once owner accepts DNS cutover as complete; record in `docs/DECISION-LOG.md`.  
3. Align page-level robots with environment policy if non-production deploys should emit `noindex` meta as belt-and-braces (today only robots.txt blocks).  
4. Decide policy for `koppiesystems.com` (park + redirect to www `.co.za`, or leave unregistered).

### P2

1. PageSpeed / CWV on primary templates over SA mobile.  
2. Conversion / analytics IDs only after production env is correct.  
3. Re-run this crawl pack after cutover (`scripts/production-*.cjs`).

---

## Code change made in this audit

**Verified defect hardening only** (does not by itself repair the live deploy):

- `lib/validate.ts` — `validateDeploymentOrigin()`  
  - Fails validation when `NEXT_PUBLIC_SITE_ENV=production` but origin ≠ `https://www.koppiesystems.co.za`  
  - Fails when `VERCEL_ENV=production` without production site env + correct origin  
- `tests/deployment-origin.test.ts` — covering the above  
- Audit helper scripts (not runtime):  
  - `scripts/production-html-audit.cjs`  
  - `scripts/production-structured-data-audit.cjs`  
  - `scripts/production-browser-audit.cjs`  
  - `scripts/production-header-checks.cjs`  
- `eslint.config.mjs` — ignore `scripts/production-*.cjs`

Live fix remains: **set Vercel Production env vars and redeploy.**

---

## Commands executed

```text
git rev-parse / git status
curl domain variant matrix (apex/www http/https)
curl robots.txt, sitemap.xml, key paths
node scripts/production-html-audit.cjs
node scripts/production-structured-data-audit.cjs
node scripts/production-header-checks.cjs
npm install --no-save playwright   # local only for browser audit
node scripts/production-browser-audit.cjs
npx vitest run tests/deployment-origin.test.ts tests/validation.test.ts
npm run typecheck
npm run test
npm run validate:seo
npm run lint
```

## Test results (post-change)

| Check | Result |
|---|---|
| `tsc --noEmit` | Pass |
| Vitest (91 tests) | Pass |
| `validate:seo` | Pass — 64 routes / 52 indexable |
| ESLint | Pass after ignoring production `*.cjs` helpers |
| Production build | Not required for env-only live defect; run after Vercel env cutover redeploy |

## Artifacts directory

`docs/technical/production-crawl-artifacts/`

- `sitemap.xml` (live download)  
- `robots.txt` (live download)  
- `prod-urls.txt`  
- `production-html-audit.csv`  
- `production-html-summary.json`  
- `structured-data-summary.json` / `jsonld-*.json`  
- `browser-audit-results.json` / `browser-audit-summary.json`  
- `header-checks.json`

---

## Ops P0 re-verification (23 July 2026, post-cutover)

**Production deployment:** `seo-web-agency-platform-hwvfl6wkm` (redeploy of `e1ee8a5`) aliased to `https://www.koppiesystems.co.za`  
**Vercel env (split, not shared):**

| Variable | Production | Preview |
|---|---|---|
| `NEXT_PUBLIC_SITE_ENV` | `production` | `preview` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.koppiesystems.co.za` | `https://seo-web-agency-platform.vercel.app` |

**Important ops note:** These two variables must never share a single Preview+Production value. Updating a shared entry overwrote Production with Preview values and briefly re-blocked crawling (`Disallow: /`, `*.vercel.app` sitemap). Fixed by removing the shared entries and re-adding environment-specific ones, then redeploying Production.

### Pass table

| Check | Required | Result |
|---|---|---|
| `robots.txt` | Public pages allowed | **Pass** — `Allow: /`, `Disallow: /api/`, sitemap = www |
| Sitemap URLs | All `https://www.koppiesystems.co.za/` | **Pass** — 52/52 |
| Canonicals | 52/52 self-canonical | **Pass** — 52/52 |
| Open Graph URLs | Production www | **Pass** (sampled hubs + full HTML audit host checks) |
| JSON-LD URLs | Production www | **Pass** — no localhost / vercel.app in home LD; structured-data samples clean |
| Localhost references | 0 | **Pass** — 0 |
| Sitemap redirects | 0 | **Pass** — 0 |
| Sitemap non-200 URLs | 0 | **Pass** — 0 |
| Production build guard | Passes | **Pass** — `tests/deployment-origin.test.ts` + `validate:seo` |
| Noindex pages in sitemap | 0 | **Pass** — 12 non-sitemap routes; 0 leaked |

**Non-blocking:** HTML audit flagged `staging_banner` on `/services/seo-website-development/` — heuristic false positive (copy mentions “staging”/related terms); page robots = `index, follow`, canonical/OG on www.

**Cleared for:** Google Search Console sitemap submit + URL Inspection on homepage, core services, Work (`/projects/`), Pricing, and one resource page.

**Do not start Trust P0 until GSC submission is done by the owner** (manual Search Console step).

---

Live fix was applied and re-verified in **Ops P0 re-verification** above. Historical failure mode (localhost sitemap / `Disallow: /`) is closed on the current Production alias.

## Bottom line (historical — morning audit)

DNS and redirects for `koppiesystems.co.za` are fine. The public site is **not** yet a correctly configured production SEO surface: crawl is disallowed, and every canonical/sitemap/schema URL points at localhost. Fix Vercel Production env, redeploy, re-crawl, then use Search Console live URL tests as the indexing source of truth.
