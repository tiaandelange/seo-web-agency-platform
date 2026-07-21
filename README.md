# SEO-first website platform — Meridian Web Systems (working brand)

Production-quality structural foundation for a new South African website-development and digital-systems company. Built SEO-first: search demand decided the architecture; the visual identity is deliberately deferred to a later phase and applies by swapping design tokens only.

Working brand **“Meridian Web Systems” is a temporary placeholder** — every visible company detail comes from `config/brand.ts`.

## Project purpose

Rank for commercially valuable website-development searches in South Africa, convert that traffic into quote requests and consultations, and scale into a full website + business-systems company (admin panels, RFQ/quotation systems, portals). The complete strategy lives in `docs/` — start with `docs/PROJECT-STATUS.md` and `docs/IMPLEMENTATION-ROADMAP.md`.

## Strategic positioning (recommended, pending sign-off)

SEO-first websites and lead-generation systems for **technical, industrial and service businesses**, expanding into custom operational systems. Rationale and scoring: `docs/business/POSITIONING-STRATEGY.md`. Name candidates and scores: `docs/business/NAME-SHORTLIST.md`.

## Technology stack

Next.js 15.5 (App Router, static generation, server components), TypeScript strict, Tailwind CSS v4 (token-driven), Vitest, ESLint 9, tsx for scripts. Vercel-compatible. Version pinning rationale (and the planned Next 16 upgrade path): `docs/DECISION-LOG.md` D-02 and the security upgrade D-22.

## Installation

```bash
# Node.js >= 18.18 (20/22 LTS recommended)
npm install
cp .env.example .env.local   # then edit values
```

## Local development

```bash
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + tests + SEO validator (run before commits)
npm run build      # production build
npm run start      # serve the production build
```

> **Validation status:** fully validated 2026-07-21 — install, strict type check, lint, all 21 tests, SEO validator, production build (64 pages) and the live-browser runtime review all pass with zero errors (see `docs/technical/LOCAL-VALIDATION-REPORT.md`, D-21/D-23).

## Environment variables (`.env.example`)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute origin; drives canonicals, sitemap, robots, JSON-LD URLs |
| `NEXT_PUBLIC_SITE_ENV` | `production` enables indexing; anything else = robots disallow all (staging protection) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional; analytics stays disabled while unset (see `docs/technical/ANALYTICS-EVENTS.md`) |
| `LEAD_WEBHOOK_URL` | Where form submissions POST; unset = server log only (`docs/technical/FORM-ARCHITECTURE.md`) |

## Project structure

```
app/            Routes (App Router; dynamic segments render from typed data)
components/     Reusable structural components (header, cards, forms, schema, …)
config/brand.ts Central brand configuration — THE place for name/contact/areas
content/        Long-form content entries (projects/ case-study files)
data/           Typed content: services, solutions, packages, articles, comparisons,
                locations, faqs, navigation, redirects, legal, team, testimonials
docs/           Business, SEO, architecture, content, technical, launch docs + prompts
lib/            seo.ts (metadata), schema.ts (JSON-LD), routes.ts (route registry),
                actions.ts (form server action), validate.ts (SEO validation engine)
public/         Static assets (images/, icons/, documents/)
scripts/        seo-validate.ts CLI
tests/          Vitest suites (validation, routes, schema, seo/sitemap/robots)
types/          content.ts — the content model
```

## Content management

Typed local TypeScript content (no CMS — decision and revisit triggers in `docs/technical/CMS-DECISION.md`). Field reference: `docs/technical/CONTENT-SCHEMA.md`. Editorial rules: `docs/content/EDITORIAL-GUIDELINES.md`. Adding an entry automatically creates the route, sitemap entry, hub cards, related links and validator coverage — no manual wiring.

- **Add a service**: append a `Service` object to `data/services.ts` (copy an existing entry; check the keyword map first — one page per intent). Add a row to `docs/architecture/URL-REGISTER.csv` and `docs/seo/KEYWORD-TO-PAGE-MAP.csv`. Run `npm run check`.
- **Add a project**: create `content/projects/<slug>.ts` from a template file, register it in `data/projects.ts`, follow `docs/content/CASE-STUDY-FRAMEWORK.md` (permission gates indexation automatically).
- **Add an article**: append to `data/articles.ts` with `category` + `supportsServiceSlugs` (≥1 enforced); its category page and internal links follow automatically.
- **Add a location**: only for genuinely served areas (rule 11) — append to `data/locations.ts` with unique local copy; see `docs/prompts/10-location-pages.md`.

## How the SEO systems work

- **Metadata**: every page calls `buildMetadata()` (`lib/seo.ts`) — unique title into the layout template, unique description, self-canonical (trailing slash), robots from the route registry, Open Graph. Standards: `docs/seo/METADATA-STANDARDS.md`.
- **Structured data**: builders in `lib/schema.ts` rendered via `<JsonLd/>` from the same content objects as the page. Type map + prohibitions: `docs/seo/STRUCTURED-DATA-MAP.md`.
- **Sitemap & robots**: `app/sitemap.ts` and `app/robots.ts` derive from `lib/routes.ts` (single source of truth). Indexable ⇔ in sitemap, enforced by validator + tests. Staging can never index (`NEXT_PUBLIC_SITE_ENV`).
- **Indexation control**: flags computed in `lib/routes.ts` per `docs/architecture/INDEXATION-RULES.md` (e.g. project templates and empty categories are noindex automatically).
- **Redirects**: add to `data/redirects.ts` (consumed by `next.config.ts`) and mirror in `docs/seo/REDIRECT-REGISTER.csv`. No chains; re-point internal links in the same commit.
- **Validation**: `npm run validate:seo` (also in `npm run check` and tests) — uniqueness, description lengths, slug rules, broken references, sitemap consistency, orphan reachability, project-permission rules, image alt text.

## Testing

`npm run test` runs Vitest suites: full SEO validation, route-registry invariants (50 indexable / 8 noindex at launch), breadcrumb trails, JSON-LD builder correctness, metadata behaviour, sitemap/robots output per environment.

## Deployment

Any Node host; Vercel is the assumed default. Set the four env vars (`NEXT_PUBLIC_SITE_ENV=production` **only** on production). Follow `docs/launch/PRE-LAUNCH-CHECKLIST.md` top to bottom, then `docs/launch/SEARCH-CONSOLE-SETUP.md`, then `docs/launch/POST-LAUNCH-90-DAY-PLAN.md`.

## Search Console

Domain-level property, DNS TXT verification, submit `sitemap.xml`, then weekly Performance reviews — full procedure in `docs/launch/SEARCH-CONSOLE-SETUP.md` and the analysis prompt in `docs/prompts/16-search-console-analysis.md`.

## Known placeholders (visibly labelled in the UI)

Working brand name and legal name; contact details (phone/email/WhatsApp empty → hidden); all pricing ranges (`indicative: true`, notice rendered); founder bio; the four case-study templates (noindex + badge); legal pages (structured drafts pending review); social image asset; business hours. Master list with owners: `docs/REQUIRED-USER-INPUTS.md`.

## Remaining decisions

See `docs/REQUIRED-USER-INPUTS.md` — final name/domain/contact, pricing confirmation, project publication permissions, testimonials, GBP/GA accounts, POPIA officer, brand direction. Development-blocking: none. Launch-blocking: items marked accordingly.

## Documentation index

`docs/PROJECT-STATUS.md` · `DECISION-LOG.md` · `ASSUMPTIONS.md` · `REQUIRED-USER-INPUTS.md` · `IMPLEMENTATION-ROADMAP.md` — plus `business/` (positioning, customers, offering, differentiation, names, services, support, pricing), `seo/` (competitors, keywords, keyword-to-page map, intent, topical authority, metadata, checklist, structured data, crawl/canonical policies, redirects, local SEO), `architecture/` (sitemap, URL register, navigation, breadcrumbs, taxonomy, internal linking, indexation, 21 page templates), `content/` (models, editorial, case-study framework, launch plan, 12-month roadmap), `technical/` (CMS, schema, performance, accessibility, analytics, forms), `launch/` (pre-launch, Search Console, GBP, 90-day plan), `prompts/` (20 reusable AI prompts).
