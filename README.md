# SEO-first website platform — Koppie Systems

Production-quality foundation for **Koppie Systems**, a Pretoria-based website-development and digital-systems company serving technical, industrial and service businesses throughout South Africa.

Public preview identity is Koppie Systems. Company registration, trademark and domain ownership are **not yet verified** — do not treat proposed domains or legal status as live facts. Canonical URL is always env-driven.

## Positioning

> Koppie Systems builds SEO-first websites and practical digital systems for technical, industrial and service businesses.

Tagline: **Built to be found. Designed to work.**

Brand source of truth: [`docs/brand/KOPPIE-SYSTEMS-BRAND-IDENTITY.md`](docs/brand/KOPPIE-SYSTEMS-BRAND-IDENTITY.md). Remaining launch inputs: [`docs/brand/KOPPIE-REMAINING-INPUTS.md`](docs/brand/KOPPIE-REMAINING-INPUTS.md).

## Technology stack

Next.js 15.5 (App Router), TypeScript strict, Tailwind CSS v4 (token-driven Koppie palette), Vitest, ESLint 9. Manrope / Inter / IBM Plex Mono via `next/font`.

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

> **Validation status:** technical baseline verified 2026-07-21; Koppie preview identity implemented 2026-07-22 on branch `brand/koppie-systems` — see `docs/PROJECT-STATUS.md`.

## Environment variables (`.env.example`)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute origin; drives canonicals, sitemap, robots, JSON-LD URLs. Do not hardcode the proposed production domain until ownership is confirmed. |
| `NEXT_PUBLIC_SITE_ENV` | `production` enables indexing; anything else = robots disallow all (staging protection) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional; analytics stays disabled while unset |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console HTML-tag value |
| `LEAD_WEBHOOK_URL` | Form submissions POST target; unset = server log only |

## Project structure

```
app/            Routes (App Router; dynamic segments render from typed data)
components/     Structural components (header/wordmark, cards, forms, schema, …)
config/brand.ts Central brand configuration — THE place for name/contact/areas/verification
content/        Long-form content entries (projects/ case-study files)
data/           Typed content: services, solutions, packages, articles, …
docs/           Business, SEO, architecture, brand, launch docs + prompts
lib/            seo.ts, schema.ts, routes.ts, actions.ts, validate.ts
public/         Static assets
scripts/        seo-validate.ts CLI
tests/          Vitest suites
types/          content.ts
```

## Content management

Typed local TypeScript content (no CMS). Adding an entry automatically creates the route, sitemap entry, hub cards, related links and validator coverage.

## How the SEO systems work

- **Metadata**: `buildMetadata()` (`lib/seo.ts`) — unique title, description, self-canonical, robots, Open Graph.
- **Structured data**: `lib/schema.ts` via `<JsonLd/>`. No fabricated ratings/reviews/prices.
- **Sitemap & robots**: derive from `lib/routes.ts`. Staging can never index.
- **Validation**: `npm run validate:seo` (also in `npm run check`).

## Known placeholders / unverified

Phone, WhatsApp, live email, registration, VAT, domain ownership, final logo, case-study permissions, testimonials — see `docs/brand/KOPPIE-REMAINING-INPUTS.md`. Project templates remain noindex. Pricing remains indicative.

## Documentation index

Start with `docs/PROJECT-STATUS.md`, `docs/brand/KOPPIE-SYSTEMS-BRAND-IDENTITY.md`, `AGENTS.md`.
