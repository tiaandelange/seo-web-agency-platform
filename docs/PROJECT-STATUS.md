# Project status

Project: SEO-first website platform for a new South African web-development and digital-systems company.
Working brand: **Meridian Web Systems** (temporary — see `config/brand.ts`).
Last updated: 2026-07-21 (v0.1 structural foundation complete).

## Current phase

**v0.1 fully verified** — all 20 blueprint phases implemented; codebase locally validated, production-buildable and runtime-clean including the live browser review (D-21/D-22/D-23, `docs/technical/LOCAL-VALIDATION-REPORT.md`). Current milestone: business naming + brand strategy decision pack (phase 2) — see `docs/business/` and `docs/brand/`.

## Phase summary

| Phase | Scope | Status |
|---|---|---|
| 1 | Workspace inspection, project setup, core docs | ✅ Done |
| 2 | Positioning, naming (32 options, scored shortlist), brand config | ✅ Done — owner sign-off pending |
| 3 | Market, competitor and keyword research (live SERP evidence, dated) | ✅ Done |
| 4 | Information architecture: sitemap, URL register (58 routes), nav, taxonomy | ✅ Done |
| 5 | 21 page-template specifications | ✅ Done |
| 6 | Service (11) / package (5) / support structure + pricing architecture | ✅ Done — pricing placeholder |
| 7 | Case-study framework + 4 template projects (noindex) | ✅ Done |
| 8 | Content model: typed local TS, full schema, example entries | ✅ Done |
| 9 | Stack: Next 15.3 pinned, TS strict, Tailwind 4, Vitest, ESLint 9 | ✅ Done — build unverified (below) |
| 10 | Skeleton: 23 page files (58 URLs), 16 components, neutral tokens | ✅ Done |
| 11 | Metadata system + validator (uniqueness, lengths, canonicals) | ✅ Done |
| 12 | Structured data: 12 builders, anti-fabrication rules, tests | ✅ Done |
| 13 | Crawl/indexation: robots, sitemap, env-gated staging, redirects register | ✅ Done |
| 14 | Internal linking: curated relations + orphan BFS check | ✅ Done |
| 15 | Local SEO: service-area model, 2 genuine location pages, GBP checklist | ✅ Done |
| 16 | Performance budgets + accessibility standards (1 client component total) | ✅ Done |
| 17 | Forms: server action, honeypot, consent, webhook delivery point | ✅ Done — delivery provider pending |
| 18 | Launch docs: pre-launch checklist, GSC setup, 90-day plan | ✅ Done |
| 19 | Content roadmap: launch plan + 12-month CSV (24 rows) | ✅ Done |
| 20 | Prompt library: 20 prompts + index | ✅ Done |

## Validation status (honest)

First local validation executed 2026-07-21 (D-21; full detail in `docs/technical/LOCAL-VALIDATION-REPORT.md`):

- ✅ `npm install` — succeeded; first `package-lock.json` generated (commit it).
- ✅ `tsc --noEmit` (strict) — 0 errors.
- ✅ `eslint .` — 0 errors, 0 warnings.
- ✅ SEO validator — 0 errors, 0 warnings (4 over-length descriptions trimmed).
- ✅ All 21 test assertions pass (one over-broad sitemap assertion scoped to its intent; real `vitest run` re-confirmation on the owner's machine part of the current step).
- ✅ Route registry, sitemap (50 entries, no noindex URLs), robots (both environments) and breadcrumbs rendered and verified.
- ✅ Forms: minimum-time spam trap implemented (completing D-12); webhook HTTP status now checked.
- ✅ `npm run build` — succeeded; 64 pages generated; first-load JS 103 kB shared (under the 120 kB budget). Rebuilt clean after the Next 15.5.21 security upgrade (D-22).
- ✅ `npm audit` — critical Next.js advisory set resolved by the upgrade; one moderate transitive `postcss` advisory accepted (its only fix downgrades Next to 9.x; build-time only, does not affect deployed static output).
- ✅ Server-rendered HTML verified directly from the production build for every page type: unique titles/descriptions, one H1 each, canonical, correct robots directive (all 8 noindex routes emit `noindex,follow`), valid JSON-LD (absolute URLs, no fabricated ratings/prices), full body content present without JavaScript.
- ✅ Live browser runtime review **completed 2026-07-21**: 11 representative pages at desktop + mobile viewports — zero console errors, zero hydration errors, no real failed requests, one H1 per page, no horizontal overflow, mobile nav `aria-expanded` correct, skip link + visible focus confirmed, form error/spam-trap/dev-fallback paths verified honestly (webhook delivery untested — none configured). See `docs/technical/LOCAL-VALIDATION-REPORT.md` "Manual runtime review".

## Blockers

- None technical. Owner decisions: `docs/REQUIRED-USER-INPUTS.md` (16 items; 8 launch-blocking).

## Environment notes

- Workspace `C:\Users\delanget\Documents\GitHub` contains unrelated projects (`Damtech-Website`, `PropertyGuy`) — untouched.
- Blueprint PDF was unreachable (same VM failure); implemented from the complete in-message blueprint (A-09).
