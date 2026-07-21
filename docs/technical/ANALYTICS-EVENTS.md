# Analytics events

Status: **instrumentation-ready, nothing loaded**. No analytics script ships until (a) GA4 property exists (owner input #11) and (b) the consent approach is confirmed. Event names and semantics are fixed now so data is clean from day one.

## Stack plan

- GA4 via `@next/third-parties` (or plain gtag snippet) loaded `afterInteractive`, only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set AND consent granted.
- GTM only if tag complexity ever justifies it (it currently does not — one destination). Decision logged if that changes.
- POPIA-conscious: IP anonymisation defaults in GA4; no remarketing/ads signals at launch; cookie policy page documents cookies before any are set; consent banner required before analytics cookies (see FORM-ARCHITECTURE for the consent model).

## Conversion events (canonical names — do not rename once live)

| Event | Trigger | Params |
|---|---|---|
| `quote_form_submit` | Quote form success (thank-you page view doubles as backup trigger) | `service_interest`, `budget_band` (band label only, no PII) |
| `contact_form_submit` | Contact form success | — |
| `consultation_request` | Consultation CTA form/link | `source_page_type` |
| `phone_click` | `tel:` link click | `placement` (header/footer/contact/page-body) |
| `email_click` | `mailto:` click | `placement` |
| `whatsapp_click` | wa.me click | `placement` |
| `package_view` | Package detail page view | `package_slug` |
| `pricing_view` | /pricing/ view | — |
| `case_study_view` | Project detail view | `project_slug` |
| `guide_to_service_click` | In-article link to a commercial page | `article_slug`, `target_slug` |

Key conversions in GA4: `quote_form_submit`, `consultation_request`, `phone_click`, `whatsapp_click`.

## Implementation notes (when activated)

- Fire events from a tiny helper (`lib/analytics.ts`, to be added) that no-ops when GA is absent — components already render the links; the helper attaches handlers, so activation is additive.
- Thank-you page (`/request-a-quote/thank-you/`) is the server-truth conversion point — it only renders after a successful action, making `page_view` there a reliable backup conversion.
- Never send form field contents, names, emails, phone numbers or message text as event params (POPIA + GA policy).
- UTM discipline: campaign links land on canonical URLs; GBP website link uses `?utm_source=google&utm_medium=organic&utm_campaign=gbp` (self-canonical neutralises SEO impact).

## Reporting cadence

Monthly: conversions by landing page + source; guide→service click-through; package view→quote rate. Feeds the 90-day plan reviews.
