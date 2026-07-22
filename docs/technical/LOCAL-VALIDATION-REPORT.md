# Local validation report — launch preparation (2026-07-22)

## Commands

| Command | Result |
|---|---|
| `npm ci` | Pass (after stopping locked `next` processes) |
| `npm run check` | Pass — lint, tsc, **29** tests, SEO validator |
| `npm run build` | Pass — 64 pages; shared first-load JS ~103 kB |
| `npm run validate:seo` | Pass — 58 routes / 50 indexable / 8 noindex |
| `npm audit` | 3 transitive advisories in Next/sharp/postcss — **do not** `audit fix --force` (would downgrade Next; D-02/D-22) |

## Runtime (production `next start`)

- Homepage Koppie branding present; Meridian absent
- `robots.txt` → `Disallow: /` under non-production env
- Sample routes 200: services, pricing, contact, quote, privacy, projects, Pretoria
- No horizontal overflow on homepage spot-check

## Lead delivery tests (unit)

Covered in `tests/lead-delivery.test.ts`: log fallback, webhook success/HTTP fail/network fail/missing URL, Resend success/missing From/HTTP fail.

Live provider delivery requires host secrets (not committed).

## Blockers remaining

See `docs/brand/KOPPIE-REMAINING-INPUTS.md`. Production indexing: **DO NOT ENABLE**.
