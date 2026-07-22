# Local validation report — Resend template delivery (2026-07-22)

## Baseline (branch start)

| Command | Result |
|---|---|
| `npm run check` | Pass — lint, tsc, **66** tests, SEO validator |
| `npm run build` | Pass — 64 routes; shared first-load JS ~103 kB |
| `npm run validate:seo` | Pass — 64 / 52 indexable / 12 noindex |

## After Resend template integration

| Command | Result |
|---|---|
| `npm run check` | Pass — lint, tsc, **83** tests, SEO validator |
| `npm run build` | Pass — 64 routes; first-load JS ≤ 120 kB budget |
| `npm run validate:seo` | Pass — unchanged route totals |
| `npm audit` | 3 transitive advisories (postcss/sharp via Next) — **do not** `audit fix --force` (D-02/D-22) |

## Email delivery tests

- `tests/lead-delivery.test.ts` — log, webhook, legacy Resend text for SEO-audit intake
- `tests/email-delivery.test.ts` — config failures, variable builders, contact/proposal template payloads (no html/text/react), internal-blocks-confirmation, confirmation soft-fail, idempotency keys, no PII in logs

Live provider delivery requires published template IDs on the host (not committed).

## Blockers remaining

Published Resend template IDs/aliases on Vercel before production form email. See `docs/technical/RESEND-INTEGRATION.md`. Production indexing: **DO NOT ENABLE**.
