# SEO Audit product system (two-tier)

Updated 2026-07-22 (D-30 / D-31).

## Hub

| Field | Value |
|---|---|
| Route | `/seo-audit/` (index) — primary commercial hub |
| Intent | Broad transactional: SEO audit South Africa, website SEO audit, once-off SEO audit |
| Role | Explains audits, compares both packs, eligibility routing, CTAs |

## Tier 1 — Priority Fix Pack

| Field | Value |
|---|---|
| Price | R1,999 once-off |
| Size | ≤10 indexable pages |
| Implementation | 5 fixes or 90 minutes |
| Plan | 30 days |
| Turnaround | 5 business days after access |
| Intake / thank-you | `/seo-audit/intake/`, `/seo-audit/thank-you/` (noindex) |

## Tier 2 — Advanced Audit & Implementation Roadmap

| Field | Value |
|---|---|
| Route | `/seo-audit/advanced/` (index) |
| Price | R5,999 once-off |
| Size | ≤250 crawlable URLs · ≤25 priority pages · ≤3 competitors |
| Implementation | 8 fixes or 2 hours |
| Plan | 90 days |
| Turnaround | 7–10 business days after access |
| Intake / thank-you | `/seo-audit/advanced/intake/`, `/seo-audit/advanced/thank-you/` (noindex) |

Detail: `docs/business/ADVANCED-SEO-AUDIT-PRODUCT.md`.

## Complexity gate

Above advanced limits (or multilingual / multi-store / malware / forensic migration / enterprise workshops) → **custom audit proposal** — lead retained, not rejected.

## Checkout

Env per tier (`SEO_AUDIT_BASIC_*`, `SEO_AUDIT_ADVANCED_*`). Public Buy inactive until payment provider + webhooks verified. Default CTA = intake/request.

## Config source

`config/seo-audit-product.ts` — single source for prices, limits, routes and CTAs.
