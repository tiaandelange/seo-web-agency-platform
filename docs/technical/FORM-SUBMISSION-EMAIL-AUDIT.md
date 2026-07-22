# Form submission & email delivery audit

Last updated: 2026-07-22  
Branch: `integration/resend-form-delivery`  
Baseline: `npm run check` + `npm run build` + `npm run validate:seo` — **PASSED** (66 tests, 64 routes).

## Inventory table

| Route | Form/component | Submission control | Handler | Data collected | Current delivery | Required email | Template mapping | Status |
| ----- | -------------- | ------------------ | ------- | -------------- | ---------------- | -------------- | ---------------- | ------ |
| `/contact/` | `ContactForm` → `QuoteForm` (`formType=contact`) | `type=submit` “Send message” | `submitLead` (`lib/actions.ts`) | name*, email*, phone, company, message*, consent*, honeypot, rendered_at | `deliverLead()` (log / webhook / Resend raw text) | Internal + customer confirmation | `RESEND_TEMPLATE_CONTACT_INTERNAL` · `RESEND_TEMPLATE_CONTACT_CONFIRMATION` | **Wire templates** |
| `/request-a-quote/` | `QuoteForm` (`formType=quote`) | `type=submit` “Send project details” | `submitLead` | name*, email*, phone, company, website, service*, budget, timeline, message*, consent*, honeypot, rendered_at | Same | Internal + customer confirmation | `RESEND_TEMPLATE_PROPOSAL_INTERNAL` · `RESEND_TEMPLATE_PROPOSAL_CONFIRMATION` | **Wire templates** |
| `/request-a-quote/thank-you/` | None | — | — | — | Success landing only | None | — | N/A (navigation) |
| `/seo-audit/` (+ `#eligibility`) | `SeoAuditEligibilityForm` | `type=submit` assess | `assessSeoAuditEligibility` | size/complexity flags, honeypot, rendered_at | **Routing only** (no lead email) | None for eligibility | — | Classified: routing form |
| `/seo-audit/advanced/` | Same eligibility (requested advanced) | `type=submit` | `assessSeoAuditEligibility` | Same | Routing only | None | — | Classified: routing form |
| `/seo-audit/intake/` | `SeoAuditIntakeForm` (`priority-fix`) | `type=submit` | `submitSeoAuditIntake` | Full intake + permissions | `deliverLead()` raw / webhook / log | Order/intake emails | **Missing templates** | Documented; do not reuse contact/proposal |
| `/seo-audit/advanced/intake/` | `SeoAuditIntakeForm` (`advanced`) | `type=submit` | `submitSeoAuditIntake` | Same + advanced fields | Same | Order/intake emails | **Missing templates** | Documented |
| `/seo-audit/thank-you/` · `/seo-audit/advanced/thank-you/` | None | — | — | — | Thank-you only | Must not email on page view | — | N/A |
| `POST /api/seo-audit/webhook/` | Payment webhook stub | HTTP POST | `app/api/seo-audit/webhook/route.ts` | Provider event payload | Logs only; no Resend | Paid-order emails after verified payment | **Missing templates** | Disabled until provider + templates |
| `/services/...` (workflow builder, ecommerce readiness) | GET `<form action="/request-a-quote/">` | `type=submit` | Browser GET navigation | Query prefill only | No server action | None | — | Classified: navigation CTA via GET |
| Sitewide “Request a Proposal” | `Link` / header CTA | Navigation | — | — | — | None | — | Navigation CTA |
| Mobile nav disclosure | `MobileNav` (client) | UI toggle | — | — | — | None | — | UI-only |
| Ecommerce demo radios | CSS `:has` radios | UI | — | — | — | None | — | UI-only |
| Home capability radios | CSS radios | UI | — | — | — | None | — | UI-only |
| Newsletter / support / application | — | — | — | — | — | — | — | **Not present** |

## Control classification summary

| Class | Examples |
| ----- | -------- |
| Genuine form submission | Contact, proposal, SEO-audit intake |
| Routing / assessment form (no email) | SEO-audit eligibility |
| Payment / checkout | Env-gated Buy CTAs; webhook stub (no browser-trust emails) |
| Navigation CTA | Header Request a Proposal; GET prefill forms on service proof pages |
| UI-only | Mobile nav, capability / ecommerce layer radios |
| Unsupported / dead submission | None found |

## Missing templates (future)

1. Koppie — New SEO Audit Order  
2. Koppie — SEO Audit Order Confirmation  
3. Koppie — SEO Audit Intake Received  
4. Koppie — Advanced SEO Audit Order Confirmation  

Do **not** map intake or payment events onto contact/proposal templates.

## Primary vs secondary delivery (contact & proposal)

1. **Primary:** internal Resend template to Koppie ops mailbox. Failure → form `?error=1`, no thank-you, no confirmation.  
2. **Secondary:** customer confirmation only after primary succeeds. Confirmation failure → still treat lead as received; log non-PII ops metadata.

## Idempotency keys

- `contact-internal/{submissionReference}`  
- `contact-confirmation/{submissionReference}`  
- `proposal-internal/{submissionReference}`  
- `proposal-confirmation/{submissionReference}`  

No PII in keys.

## Environment variable names (values never committed)

See `.env.example` and `docs/technical/RESEND-INTEGRATION.md`.

## Launch gate

Template IDs/aliases must be **published** in Resend and set on Vercel before enabling `LEAD_DELIVERY_PROVIDER=resend` (or template mode) in production.
