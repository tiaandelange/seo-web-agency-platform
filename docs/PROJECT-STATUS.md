# Project status

Project: SEO-first website platform — **Koppie Systems**.
Last updated: 2026-07-24 (production indexing live; SEO audit P0/P1 remediation).

## Current phase

**Production live and indexing.** Canonical host `https://www.koppiesystems.co.za` is crawlable (`robots.txt` Allow: `/`, sitemap submitted). Contact and proposal forms support Resend hosted templates. Remaining polish: GBP, GSC monitoring, attorney review of legal pages, and ongoing content depth — not an indexing hold.

## Phase summary

| Phase | Scope | Status |
|---|---|---|
| 1–20 | Blueprint structural foundation | ✅ Done |
| Validation | Install, lint, types, tests, SEO validator, build, runtime | ✅ Done |
| Brand strategy pack | Positioning, naming research, messaging, pricing, directions | ✅ Done |
| Koppie implementation | Config, messaging, visual system, metadata, wordmark | ✅ Merged to `main` |
| Launch prep | Contact, leads, legal drafts, case-study drafts, Vercel docs | ✅ Code complete 2026-07-22 |
| SEO Audit entry product | `/seo-audit/` + intake + thank-you, eligibility, env checkout | ✅ Implemented 2026-07-22 |
| SEO Audit two-tier system | Hub + `/seo-audit/advanced/` (R8,500), comparison, complexity gate | ✅ Implemented 2026-07-22 |
| Resend hosted templates | Contact + proposal internal/confirmation; audit inventory | ✅ Live when Vercel template env IDs set |
| Production crawl audit | Live www crawlability / canonicals / robots / Playwright | ✅ 2026-07-23 baseline; **indexing enabled 2026-07-24** |
| Portfolio screenshots | Replace live previews with WebP screenshots | ✅ 2026-07-23 — `docs/technical/PORTFOLIO-SCREENSHOT-MIGRATION.md` |
| Content / conversion audit | All indexable routes: proof, overlap, priorities | ✅ 2026-07-23 — `docs/strategy/CONTENT-AND-CONVERSION-AUDIT.md` |
| Trust / authorship (Prompt 4) | Project labels, authors, About, Jozi noindex | ✅ 2026-07-23 |
| Case studies (Prompt 5) | Damtech + Proplytic narratives + publication gate | ✅ 2026-07-23 — indexed (D-43) |
| Conversion proof (Prompt 6) | Homepage proof, service proof map, workflows, matrix, packages, contact | ✅ 2026-07-23 |
| Official verification | CIPC done; trademark, attorney review, payment provider | ⏳ Owner |
| Public launch | Domain DNS + production indexing | ✅ Live 2026-07-24 — GBP + ongoing GSC still owner |

## Architecture preserved

66 routes · 57 indexable · 9 noindex · route registry · sitemap/robots · canonicals · structured data · no fabricated reviews · Damtech/Proplytic indexed (D-43) · sitewide default OG image via `buildMetadata()`.

## Remaining owner work

See `docs/brand/KOPPIE-REMAINING-INPUTS.md`. Forms: `docs/technical/RESEND-INTEGRATION.md`. GBP logo asset: `public/images/brand/koppie-systems-logo-google.png`.
