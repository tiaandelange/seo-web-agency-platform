# Local validation report

Date: 2026-07-21. Purpose: first execution of install, lint, type check, tests, SEO validation, production build and runtime review (previous session could not run any of these — D-16).

Status: **VERIFIED — production-buildable and runtime-clean.** All executable checks pass on the owner's Windows machine (Node/npm) and were cross-checked in a Linux sandbox. Server-rendered HTML for every page type was inspected directly from the production build output. The previously open live-browser console review was **completed on 2026-07-21** (see "Manual runtime review" below): zero console errors, zero hydration errors, no real failed requests, mobile navigation and forms behave correctly.

## Environment note

Validation ran in a split environment:

- **Sandbox (Linux, Node 22.22.3 / npm 10.9.8):** full source inspection; `tsc --noEmit`; `eslint .`; the SEO validator (`lib/validate.ts` executed via a pure-JS TypeScript loader because tsx's esbuild binary is platform-specific); all four Vitest suites executed assertion-for-assertion through a minimal vitest-compatible runner (same code under test, same matchers).
- **Owner's machine (Windows):** `npm install` (generated the first `package-lock.json`); real `vitest run`, `npm audit`, `npm run build` and the runtime review are executed here because the sandbox's network allowlist blocked registry downloads mid-session (only Windows-native binaries are installed).

Every failure found was repaired in the repository; nothing was suppressed, skipped or weakened.

## Phase 1 — repository inspection (static review)

### Intended versions

| Tool | Declared | Notes |
|---|---|---|
| Node.js | >= 18.18.0 (`engines`) | verified against Node 22 |
| npm | not pinned | npm 10.x used |
| Next.js | 15.3.3 (exact pin) | D-02: deliberate pin below Next 16 |
| React / React-DOM | 19.1.0 (exact pin) | matches Next 15.3 |
| TypeScript | ^5.8.3 | strict mode on; passes clean |
| Tailwind CSS | ^4.1.7 (+ @tailwindcss/postcss) | v4, token-driven via globals.css |
| ESLint | ^9.27.0 + eslint-config-next 15.3.3 | flat config; passes clean |
| Vitest | ^3.1.4 | node environment, tests/**/*.test.ts |
| tsx | ^4.19.4 | runs scripts/seo-validate.ts |

### Findings

| # | Finding | Severity | Resolution |
|---|---|---|---|
| F-01 | **No lockfile** (`package-lock.json` absent; never generated because the previous session could not run npm). | Medium | `npm install` executed; `package-lock.json` (272 KB) generated — commit it. |
| F-02 | No stale generated files; clean tree. | — | None needed. |
| F-03 | No hardcoded absolute local paths in code. | — | None needed. |
| F-04 | Environment fallbacks all present (site URL, staging robots, webhook-less form mode). | — | None needed. |
| F-05 | All required scripts present (`validate:seo` is the repo's SEO-validation script name; kept — no duplicate alias added). | — | Verified. |
| F-06 | `/contact/` and `/request-a-quote/` read `searchParams` (error banner) ⇒ render dynamically, not statically. Metadata remains static. | Low | Accepted trade-off; confirm in build output route table. |
| F-07 | `components/quote-form.tsx` emitted `rendered_at` but `lib/actions.ts` never read it — D-12 claims "honeypot + minimum-time spam checks", so the time-trap was documented but not implemented. | Low | **Fixed**: minimum-elapsed-time check (<3 s ⇒ silent discard) implemented in `lib/actions.ts`; skipped when the field is missing/unparseable so legitimate visitors can never be falsely rejected. |
| F-08 | All imports resolve to declared deps; no undeclared imports; no unused declared packages. | — | Confirmed after install. |
| F-09 | Exactly one client component (`components/mobile-nav.tsx`) — matches the performance budget. | — | Confirmed. |
| F-10 | Dynamic routes use `generateStaticParams()` + `dynamicParams = false`; async `params`/`searchParams` signatures match Next 15. | — | Confirmed by tsc. |
| F-11 | Webhook delivery in `lib/actions.ts` did not check `response.ok` — HTTP-error responses (e.g. 500) from the lead webhook would count as delivered. | Low | **Fixed**: non-OK responses are now logged for ops follow-up (status only, no PII). |
| F-12 | `tests/seo.test.ts` asserted no sitemap URL contains `-template/` — false positive: `/compare/custom-website-vs-template/` is a legitimately indexable comparison page. The four noindex project templates were correctly excluded; the assertion was broader than its intent. | Low (test defect) | **Fixed**: assertion narrowed to `/projects/…-template/` URLs, preserving the protection it was written for. Implementation unchanged. |
| F-13 | Four meta descriptions were 161–165 chars — inside the hard 50–200 rule but outside the 70–160 ideal (validator warnings). | Low | **Fixed**: descriptions trimmed to ≤160 without changing meaning (`website-maintenance-and-support`, `choosing-a-website-development-company`, `what-is-an-seo-first-website`, `pretoria`). Validator now passes with zero warnings. |
| F-14 | After the Next 15.5.21 upgrade (D-22), the auto-generated `next-env.d.ts` (gitignored, "should not be edited") contains a triple-slash reference to `./.next/types/routes.d.ts`, which `@typescript-eslint/triple-slash-reference` flags — `npm run lint` failed on a file no human authored. | Low | **Fixed** (2026-07-21): `next-env.d.ts` added to the ESLint flat-config `ignores` list in `eslint.config.mjs`. Linting of all authored files is unchanged; this is the standard treatment for Next's generated declaration file. |

## Execution results

| Check | Command or method | Initial result | Corrections made | Final result |
| ----- | ----------------- | -------------- | ---------------- | ------------ |
| Dependency installation | `npm install` (owner machine) | No lockfile; install succeeded | Lockfile generated (commit it) | ✅ PASS |
| Audit | `npm audit` (owner machine) | 1 critical + 1 moderate advisory set vs Next 15.3.3 | Upgraded Next → 15.5.21 (D-22) | ✅ resolved; 1 moderate transitive `postcss` remains (accepted — see below) |
| Lint | `eslint .` (via `npm run check`) | 0 errors, 0 warnings | — | ✅ PASS (twice) |
| Type check | `tsc --noEmit` (strict) | 0 errors | — | ✅ PASS (twice) |
| Tests | real `vitest run` (owner) + sandbox runner | 20/21 — one false-positive assertion (F-12) | Test assertion scoped correctly | ✅ 21/21 PASS |
| SEO validation | `npm run validate:seo` | 0 errors, 4 warnings (F-13) | Descriptions trimmed | ✅ PASS — 0 errors, 0 warnings |
| Production build | `npm run build` (owner machine) | ✅ compiled; 64 pages generated | — (rebuilt clean after upgrade) | ✅ PASS |
| Local runtime | `npm run start` (owner) | server healthy, HTTP 200 | — | ✅ PASS (server confirmed serving) |
| Route review | prerendered HTML + route registry | 58 routes = 50 indexable + 8 noindex; 57 static HTML files + 2 dynamic form routes; parents resolve | — | ✅ PASS |
| Sitemap | `.next/server/app/sitemap.xml.body` | 50 `<loc>` entries, absolute trailing-slash URLs, zero noindex URLs | — | ✅ PASS |
| Robots | `.next/server/app/robots.txt.body` | dev/staging: `Disallow: /` (staging protection); production build path emits allow + sitemap | — | ✅ PASS |
| Metadata | prerendered HTML sweep, all 57 pages | every page: 1 title, 1 description, self-canonical, robots directive; 56 unique titles + 56 unique descriptions | — | ✅ PASS |
| Structured data | parsed JSON-LD from built HTML (6 page types) | valid JSON; absolute URLs; no undefined; no aggregateRating/review/offers/price | — | ✅ PASS |
| Form review | code review `lib/actions.ts`, `components/quote-form.tsx` | honeypot ✓, consent ✓, server validation ✓, no secrets ✓; time-trap missing (F-07), webhook status unchecked (F-11) | Both fixed | ✅ PASS |
| Accessibility | HTML + CSS structural review | skip link, exactly one H1/page, labelled inputs, aria-expanded/aria-hidden, focus-visible, reduced-motion all present | — | ✅ PASS (structural) |
| Responsive layout | HTML/CSS review; no fixed-width containers | mobile-first Tailwind, disclosure nav <lg, `max-w-6xl` containers; no page reported horizontal overflow in built HTML | — | ✅ PASS (structural) |
| Browser console | live tool blocked by localhost network isolation | not observable via automation | **closed 2026-07-21** — full live-browser runtime review executed (section below) | ✅ PASS — see "Manual runtime review" |

### Environmental limitation (resolved 2026-07-21)

The original browser-automation tool ran Chrome in a network context that could not reach the owner's `localhost:3000`, leaving the live console review open. This has now been **closed**: a full live-browser runtime review was executed on the owner's machine (see the next section). The original mitigation reasoning (zero build warnings, one client component, all ranking content server-rendered) was confirmed correct — no runtime console errors exist.

## Manual runtime review (2026-07-21) — CLOSED ✅

Method: production build served via `next start` on port 3010 (port 3000 was occupied by another local process; same build output). A temporary Playwright (Chromium) script — installed in a system temp directory, **no change to `package.json`, `package-lock.json` or any repository dependency** — drove a real browser over 11 representative pages at desktop (1280×800) and mobile (375×700) viewports, capturing console messages, page errors, failed requests and layout metrics. Raw output: `validation-logs/runtime-check-output.txt` (local only, gitignored). 80 automated assertions ran; every substantive check passed.

Pages covered: homepage, `/services/business-websites/`, `/solutions/contractors/`, `/website-packages/professional-business-website/`, `/projects/contractor-website-template/`, `/resources/website-cost-south-africa/`, `/compare/custom-website-vs-template/`, `/areas-we-serve/pretoria/`, `/contact/`, `/request-a-quote/`, `/request-a-quote/thank-you/`.

| Check | Result |
|---|---|
| Console errors / React errors / hydration errors (all 11 pages × 2 viewports) | ✅ **Zero.** No `console.error`, no `console.warning`, no `pageerror` events on any page. |
| Failed internal requests | ✅ None real. The only `requestfailed` events were `?_rsc=` **Link-prefetch requests aborted by the browser** (`net::ERR_ABORTED`) during page settle — normal Next.js prefetch cancellation, not failures. Both affected endpoints (`/contact/`, `/request-a-quote/` RSC payloads) verified returning HTTP 200 when fetched directly. |
| Exactly one H1 per page | ✅ 11/11 pages, both viewports. |
| Horizontal overflow | ✅ 0px overflow on every page at 375px and 1280px. |
| Mobile navigation | ✅ Toggle present with `aria-controls="mobile-menu"`; `aria-expanded` false → true on open → false on close; menu (8 links) renders and is removed from the DOM on close; zero console errors during interaction. |
| Keyboard focus | ✅ Skip link ("Skip to main content") is the first tab stop; focused elements show the visible 3px solid outline from `globals.css`. |
| Form error state | ✅ `/request-a-quote/?error=1` renders the server-driven error banner. Empty submit blocked by native `required` validation (URL unchanged). |
| Form spam time-trap | ✅ A **valid form submitted immediately** (<3s after render) redirected to the thank-you page but produced **no** `[lead]` server-log entry — silently discarded exactly as designed (D-12). |
| Form success path (honest) | ✅ A valid form submitted after >3s redirected to `/request-a-quote/thank-you/` and the server logged exactly one `[lead] received (no LEAD_WEBHOOK_URL configured)` entry — the **development fallback path**. ⚠️ **Webhook delivery was NOT tested and is NOT claimed** — no `LEAD_WEBHOOK_URL` is configured (owner input #12). What is verified: validation, spam traps, redirect flow and the fallback log path. |

Environment note: the two form pages render dynamically (F-06), so the runtime test exercised the real server action, not a prerendered shell. The temporary Playwright installation and Chromium download live entirely outside the repository and are not committed.

### Audit disposition

- **Critical (Next.js 15.3.3):** resolved by the controlled upgrade to 15.5.21 (D-22) — stays within Next 15, re-verified with full check + build.
- **Moderate (`postcss <8.5.10`, transitive via Next's bundled toolchain):** `npm audit fix --force` would downgrade Next to 9.x (a catastrophic breaking change), so it is **not** applied. This is a build-time CSS-stringify XSS that does not affect the deployed static output. Accepted and tracked; clears naturally on a future Next minor that bundles patched postcss.

## Route arithmetic (verified)

58 routes total = 50 indexable (in sitemap) + 8 noindex (excluded): `/request-a-quote/thank-you/`, 3 project categories (`websites`, `ecommerce`, `admin-systems`), 4 template case studies. Matches `tests/routes.test.ts` and the URL register.

## Files changed during validation

| File | Change | Reason |
|---|---|---|
| `package-lock.json` | generated | F-01 — reproducible installs |
| `lib/actions.ts` | time-trap implemented; webhook HTTP status checked | F-07, F-11 |
| `tests/seo.test.ts` | template-URL assertion scoped to `/projects/` | F-12 (false positive) |
| `data/services.ts`, `data/articles.ts` (×2), `data/locations.ts` | 4 meta descriptions trimmed to ≤160 chars | F-13 |
| `eslint.config.mjs` | generated `next-env.d.ts` added to ESLint ignores | F-14 |
| `.gitignore` | `validation-logs/` excluded (local log captures) | housekeeping |
| `docs/technical/LOCAL-VALIDATION-REPORT.md` | this report | Phase 14 |
| `docs/PROJECT-STATUS.md`, `docs/DECISION-LOG.md`, `README.md` | validation status updated | Phase 14 |
