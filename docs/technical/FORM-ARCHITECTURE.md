# Form architecture

## Forms

| Form | Page | Fields |
|---|---|---|
| Quote request (primary) | `/request-a-quote/` | name*, email*, phone, company, service interest, budget band, timeline, message*, consent*, honeypot, render-timestamp |
| Contact (short) | `/contact/` | name*, email*, message*, consent*, honeypot, render-timestamp |
| SEO Audit eligibility | `/seo-audit/#eligibility` (also linked from advanced) | website size band, ecommerce/catalogue, multilingual/multi-domain, complexity flags, honeypot, render-timestamp → routes to basic intake, advanced intake, or custom quote |
| SEO Audit intake (Priority Fix) | `/seo-audit/intake/` | name*, company, website URL*, email*, phone, services*, areas, platform, page count, SEO concern*, GSC, GBP, priority pages, payment ref, permissions*, backup*, consent*, honeypot, render-timestamp · `tier=priority-fix` |
| SEO Audit intake (Advanced) | `/seo-audit/advanced/intake/` | Same core fields plus crawl/URL estimate, competitors, GA4 access, catalogue notes · `tier=advanced` |
| Consultation / support enquiry | Reuse quote form with `enquiryType` preset via link (`/request-a-quote/?type=consultation` or `?type=custom-seo-audit`) — no third form to maintain |

SEO Audit actions live in `lib/seo-audit-actions.ts` and reuse `deliverLead()`. Payment webhook: `POST /api/seo-audit/webhook/` (shared secret; no browser trust of query success params). Per-tier checkout URLs via `SEO_AUDIT_BASIC_*` / `SEO_AUDIT_ADVANCED_*`.

File upload (briefs/plans): deliberately NOT rendered at v0.1 — needs a storage decision (size limits, virus scanning, POPIA retention). Documented here as the designed extension: add `<input type="file">` posting to the same action once storage is chosen.

## Processing flow (`lib/actions.ts` → `lib/lead-delivery.ts`)

1. Server action receives FormData (no client JS required).
2. Spam gate: honeypot empty; minimum-elapsed-time ≥3s when `rendered_at` is parseable; both silent-discard on failure (bots get thank-you without delivery).
3. Validation: required fields, email shape, length caps. Failure → `?error=1`.
4. Delivery via `deliverLead()`:
   - `LEAD_DELIVERY_PROVIDER=webhook` → POST JSON to `LEAD_WEBHOOK_URL` (optional `LEAD_WEBHOOK_SECRET` bearer).
   - `LEAD_DELIVERY_PROVIDER=resend` → Resend HTTP API (`LEAD_DELIVERY_API_KEY` / `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` verified domain).
   - `log` / unset → server metadata log only (dev).
5. Delivery **success** → `/request-a-quote/thank-you/` (noindex).
6. Delivery **failure** → `?error=1` on the form page (never a false thank-you). Ops log: submission id, provider, reason, form type, timestamp — no message body.

## POPIA / consent model

- Consent checkbox required server-side; label links `/legal/privacy-policy/`.
- Data minimisation: budget is a band, not an amount.
- Processors (hosting + email/webhook) named in the privacy policy draft.

## Anti-spam roadmap

v0.1: honeypot + time trap. If spam appears: Cloudflare Turnstile via env, server-verified.

## Security notes

- No secrets in client bundles; no SMTP from the browser.
- Rate limiting: platform-level (Vercel) at v0.1.
