# Implementation roadmap

## v0.1 — Structural foundation (this repository)

Everything in the blueprint that can be built before final naming/branding: documentation set, information architecture, typed content model, page skeletons, metadata/schema/sitemap/robots systems, validator, tests, prompt library.

## v0.2 — Owner decisions applied

1. Run first local build (`npm install`, `npm run check`, `npm run build`) and fix anything the sandbox outage hid.
2. Apply final name/domain/contact into `config/brand.ts` and `.env`.
3. Confirm pricing; wire lead delivery (email/webhook); legal pages reviewed.
4. Register domain, deploy to staging (noindex enforced via `NEXT_PUBLIC_SITE_ENV`), then production.
5. Search Console domain property, sitemap submission (see `docs/launch/`).

## v0.3 — Evidence layer

1. Replace case-study templates with 2–4 real permissioned projects; flip their indexation.
2. Add genuine testimonials; founder About content.
3. Google Business Profile live; NAP consistency pass.

## v1.0 — Visual identity phase

Apply the final theme by replacing design tokens and component styling only — architecture, URLs, metadata and content untouched. Use the prompt in the final report / `docs/prompts/18-visual-theme-development.md`.

## Months 1–12 — Content and authority

Follow `docs/content/12-MONTH-CONTENT-ROADMAP.csv` and `docs/launch/POST-LAUNCH-90-DAY-PLAN.md`: cost/comparison/guide content first, then industry solutions depth, then location depth (Cape Town when justified), monthly Search Console reviews.

## Technical follow-ups

- Upgrade Next 15.3 → 16.x with `npx @next/codemod@latest upgrade` once the build is verified (D-02).
- Re-evaluate CMS need at >2 authors or >4 articles/month (D-03).
- Add analytics (GA4) and consent banner when tracking goes live (Phase 17 docs).
