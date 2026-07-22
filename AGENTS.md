# Agent instructions — SEO-first website platform

Binding rules for any AI agent or contributor working in this repository. Detail lives in the referenced docs; this file is the index, not a copy.

## 1. SEO architecture is frozen

- 64 routes = 52 indexable + 12 noindex. Do not add, remove or rename URLs without a documented SEO reason recorded in `docs/DECISION-LOG.md` and mirrored in `docs/architecture/URL-REGISTER.csv`.
- All routing, indexation flags, sitemap and robots output derive from `lib/routes.ts` (single source of truth, D-15). Never hand-edit sitemap/robots logic per page.
- Canonicals: trailing-slash, self-referencing, built by `buildMetadata()` in `lib/seo.ts` only. Standards: `docs/seo/METADATA-STANDARDS.md`.
- Indexation rules: `docs/architecture/INDEXATION-RULES.md`. Never flip noindex→index without the gate conditions being met (e.g. project publication permission).
- URL changes require a redirect in `data/redirects.ts` + `docs/seo/REDIRECT-REGISTER.csv`, no chains, internal links re-pointed in the same commit.

## 2. Validation and tests are protected

- Never weaken `lib/validate.ts`, `scripts/seo-validate.ts` or any test in `tests/`. Fix the code, not the check. Scoping an over-broad assertion requires a decision-log entry (precedent: F-12).
- Required before declaring any task complete: `npm run check` (lint + typecheck + 21 tests + SEO validator) and `npm run build` both pass clean.

## 3. Performance and client-JS budget

- Budgets (binding): LCP ≤ 2.5 s mobile, INP ≤ 200 ms, CLS ≤ 0.1, first-load client JS ≤ 120 KB. Detail: `docs/technical/PERFORMANCE-BUDGET.md`.
- Server components by default. The site currently has exactly one client component (`components/mobile-nav.tsx`); every new `'use client'` needs a written justification in the PR/commit and must survive the JS budget.
- Banned: heavy animation libraries, carousels, video backgrounds, render-blocking third-party scripts.

## 4. Accessibility (WCAG 2.2 AA)

- Floors: body-text contrast ≥ 4.5:1, UI/large text ≥ 3:1, visible focus everywhere (never remove `:focus-visible` styling without an equal replacement), 44 px touch targets, `prefers-reduced-motion` honoured. Detail: `docs/technical/ACCESSIBILITY-STANDARDS.md`.
- Exactly one H1 per page; heading levels never skip; skip link stays first in the tab order.

## 5. Content truthfulness (non-negotiable)

- Never fabricate clients, projects, testimonials, reviews, statistics, rankings claims or guarantees (D-07, D-10). No `AggregateRating`/review schema until genuine permissioned data exists.
- Project case studies stay noindex templates until `publishPermission` is genuinely granted by the owner — gate: `docs/content/CASE-STUDY-FRAMEWORK.md`.
- Pricing stays `indicative: true` with the visible notice until the owner confirms final prices (`docs/REQUIRED-USER-INPUTS.md` #6).
- Research claims in docs need a source citation and access date.

## 6. Brand tokens, not hardcoding

- Every visible company detail (name, contact, areas, tagline) comes from `config/brand.ts`. Never hardcode brand strings in components, pages or data.
- Active public identity is Koppie Systems (`docs/brand/KOPPIE-SYSTEMS-BRAND-IDENTITY.md`). Do not reintroduce Meridian as public branding. Unverified registration, domain, phone and testimonials must stay hidden or explicitly provisional.
- Visual identity changes happen by swapping design tokens in `app/globals.css` `@theme` and component classes only — never by restructuring templates. Procedure: `docs/prompts/18-visual-theme-development.md`, plan: `docs/brand/VISUAL-IMPLEMENTATION-PLAN.md`.

## 7. Git and documentation discipline

- One concern per commit; never mix validation repairs with brand/content work.
- Material decisions go to `docs/DECISION-LOG.md`; assumptions to `docs/ASSUMPTIONS.md`; anything only the owner can decide to `docs/REQUIRED-USER-INPUTS.md`.
- Keep `docs/PROJECT-STATUS.md` current when a phase completes.
- No uncontrolled dependency upgrades (version pins are deliberate — D-02/D-22). Never commit secrets, `.env*` values or real credentials.

## 8. Owner approval gate (current phase)

Do not replace the working business name, register anything, publish real client content or apply a final visual identity until the owner has decided: final name, domain, brand direction, logo direction, pricing presentation, service areas, project permissions, verified contact details. Tracker: `docs/REQUIRED-USER-INPUTS.md`.
