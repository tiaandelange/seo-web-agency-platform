# Analytics events

Status: **implemented, consent-gated**. GA4 loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set **and** the visitor has accepted analytics cookies. Canonical guide: `docs/analytics.md`.

## Stack

- GA4 via `@next/third-parties/google` (`GoogleAnalytics` + `sendGAEvent`), loaded only after consent.
- No Google Tag Manager.
- POPIA prior-blocking consent banner; preference in `localStorage` (`koppie_analytics_consent`).
- No remarketing / advertising tags.

## Custom events (v1 — do not rename once live)

| Event | Trigger | Parameters |
|---|---|---|
| `generate_lead` | Confirmed successful form submission | `form_id`: `contact` \| `request_quote` \| `seo_audit_intake` |
| `contact_click` | `tel:` / `mailto:` / WhatsApp click | `contact_method`, `link_location` |
| `seo_audit_eligibility_complete` | Eligibility routing completed | `audit_route` |

Commercial page views use GA4 automatic `page_view` / engagement — no custom pageview events.

## Implementation notes

- Helper: `lib/analytics.ts` (client) — no-ops without consent or measurement ID.
- Forms: server actions return success state; client fires `generate_lead` once, then navigates.
- Never send form field contents, names, emails, phones or message text as event params.
