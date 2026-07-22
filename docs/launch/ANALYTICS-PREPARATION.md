# Analytics preparation — Koppie Systems

Status: **prepared, not activated**. No measurement IDs are set.

## Decisions pending

| Item | Status |
|---|---|
| GA4 measurement ID | Unset — `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Google Tag Manager | Prefer **no GTM** at v1 (keeps JS budget); revisit only if tag volume requires it |
| Search Console verification | Unset — do not activate on private preview |
| Consent | Required before any non-essential cookies; see cookie + privacy policies |

## Planned events (when GA4 is approved)

| Event | Trigger |
|---|---|
| `generate_lead` | Quote or contact form thank-you |
| `click_phone` | `tel:` click |
| `click_whatsapp` | `wa.me` click |
| `click_email` | `mailto:` click |
| `view_pricing` | `/pricing/` |
| `view_package` | `/website-packages/[slug]/` |
| `view_case_study` | `/projects/[slug]/` (indexable projects only) |
| `guide_to_service` | Resource → service internal CTA |

Do not send form field contents to analytics. Implementation detail remains in `docs/technical/ANALYTICS-EVENTS.md`.
