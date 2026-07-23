# Project status

Project: SEO-first website platform — **Koppie Systems**.
Last updated: 2026-07-22 (Resend template delivery on `integration/resend-form-delivery`).

## Current phase

**Private preview + form email integration.** Contact and proposal forms support published Resend hosted templates (internal + confirmation). Production indexing: **DO NOT ENABLE.** Form email: enable only after published template IDs are set on Vercel (see `docs/technical/RESEND-INTEGRATION.md`).

## Phase summary

| Phase | Scope | Status |
|---|---|---|
| 1–20 | Blueprint structural foundation | ✅ Done |
| Validation | Install, lint, types, tests, SEO validator, build, runtime | ✅ Done |
| Brand strategy pack | Positioning, naming research, messaging, pricing, directions | ✅ Done |
| Koppie implementation | Config, messaging, visual system, metadata, wordmark | ✅ Merged to `main` |
| Launch prep | Contact, leads, legal drafts, case-study drafts, Vercel docs | ✅ Code complete 2026-07-22 |
| SEO Audit entry product | `/seo-audit/` + intake + thank-you, eligibility, env checkout | ✅ Implemented 2026-07-22 |
| SEO Audit two-tier system | Hub + `/seo-audit/advanced/` (R5,999), comparison, complexity gate | ✅ Implemented 2026-07-22 |
| Resend hosted templates | Contact + proposal internal/confirmation; audit inventory | ✅ Code on branch; **env templates required before production** |
| Production crawl audit | Live www crawlability / canonicals / robots / Playwright | ✅ 2026-07-23 — **Production env misconfigured** (see `docs/technical/PRODUCTION-CRAWL-AUDIT.md`) |
| Portfolio screenshots | Replace live previews with WebP screenshots | ✅ 2026-07-23 — `docs/technical/PORTFOLIO-SCREENSHOT-MIGRATION.md` |
| Content / conversion audit | All indexable routes: proof, overlap, priorities | ✅ 2026-07-23 — `docs/strategy/CONTENT-AND-CONVERSION-AUDIT.md` (no bulk rewrite) |
| Trust / authorship (Prompt 4) | Project labels, authors, About, Jozi noindex | ✅ 2026-07-23 — `docs/strategy/TRUST-AUTHORSHIP-IMPLEMENTATION.md` |
| Case studies (Prompt 5) | Damtech + Proplytic narratives + publication gate | ✅ 2026-07-23 — indexed (D-43) |
| Conversion proof (Prompt 6) | Homepage proof, service proof map, workflows, matrix, packages, contact | ✅ 2026-07-23 — `docs/strategy/CONVERSION-PROOF-UPGRADE.md` |
| Official verification | CIPC, trademark, DNS cutover, logo file, attorney review, payment provider | ⏳ Owner |
| Public launch | Production domain env, indexing, GBP, GSC | 🚫 Blocked |

## Architecture preserved

66 routes · 57 indexable · 9 noindex · route registry · sitemap/robots · canonicals · structured data · no fabricated reviews · Damtech/Proplytic indexed (D-43, 2026-07-23) · Trust P0 authorship + project labels · Homepage/service conversion proof upgrade.

## Blockers (public launch)

See `docs/brand/KOPPIE-REMAINING-INPUTS.md`. Preview: `docs/launch/VERCEL-PREVIEW-SETUP.md`. Form email: `docs/technical/RESEND-INTEGRATION.md`.
