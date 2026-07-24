# Analytics preparation — Koppie Systems

Status: **implemented in code; inactive until measurement ID + consent**. See `docs/analytics.md`.

## Activation checklist

| Item | Status |
|---|---|
| GA4 measurement ID | Unset until `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured (prefer Production only) |
| Google Tag Manager | Not used |
| Consent banner | Shipped — prior-blocking Accept / Reject |
| Cookie + privacy policy | Updated for optional GA4 |
| Custom events | `generate_lead`, `contact_click`, `seo_audit_eligibility_complete` |

Do not send form field contents to analytics.
