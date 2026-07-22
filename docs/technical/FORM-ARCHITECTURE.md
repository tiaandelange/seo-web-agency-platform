# Form architecture

## Forms

| Form | Page | Fields |
|---|---|---|
| Quote request (primary) | `/request-a-quote/` | name*, email*, phone, company, website URL, service interest*, budget band, timeline, message*, consent*, honeypot, render-timestamp |
| Contact (short) | `/contact/` | name*, email*, phone, company, message*, consent*, honeypot, render-timestamp |
| SEO Audit eligibility | `/seo-audit/#eligibility` (also linked from advanced) | website size band, ecommerce/catalogue, multilingual/multi-domain, complexity flags, honeypot, render-timestamp → routes to basic intake, advanced intake, or custom quote (**no email**) |
| SEO Audit intake (Priority Fix) | `/seo-audit/intake/` | name*, company, website URL*, email*, phone, services*, areas, platform, page count, SEO concern*, GSC, GBP, priority pages, payment ref, permissions*, backup*, consent*, honeypot, render-timestamp · `tier=priority-fix` |
| SEO Audit intake (Advanced) | `/seo-audit/advanced/intake/` | Same core fields plus crawl/URL estimate, competitors, GA4 access, catalogue notes · `tier=advanced` |
| Service proof GET prefill | Selected `/services/[slug]/` demos | GET to `/request-a-quote/` with query params — **navigation**, not a lead post |
| Consultation / support enquiry | Reuse quote form with presets via link | No third form to maintain |

Full classification: `docs/technical/FORM-SUBMISSION-EMAIL-AUDIT.md`.  
Resend templates: `docs/technical/RESEND-INTEGRATION.md`.

SEO Audit actions live in `lib/seo-audit-actions.ts` and reuse `deliverLead()`. Payment webhook: `POST /api/seo-audit/webhook/` (shared secret; no browser trust of query success params). Per-tier checkout URLs via `SEO_AUDIT_BASIC_*` / `SEO_AUDIT_ADVANCED_*`.

File upload (briefs/plans): deliberately NOT rendered at v0.1 — needs a storage decision (size limits, virus scanning, POPIA retention). Documented here as the designed extension: add `<input type="file">` posting to the same action once storage is chosen.

## Processing flow (`lib/actions.ts` → `lib/lead-delivery.ts`)

1. Server action receives FormData (no client JS required).
2. Spam gate: honeypot empty; minimum-elapsed-time ≥3s when `rendered_at` is parseable; both silent-discard on failure (bots get thank-you without delivery).
3. Validation: required fields, email shape, length caps, website normalisation for proposals. Failure → `?error=1`.
4. Delivery via `deliverLead()`:
   - `LEAD_DELIVERY_PROVIDER=webhook` → POST JSON to `LEAD_WEBHOOK_URL` (optional `LEAD_WEBHOOK_SECRET` bearer).
   - `LEAD_DELIVERY_PROVIDER=resend` + `formType=contact|quote` → hosted Resend templates (`lib/email/*`). Internal first; confirmation only after internal success.
   - `LEAD_DELIVERY_PROVIDER=resend` + other form types (e.g. SEO-audit intake) → legacy Resend **text** until dedicated templates exist.
   - `log` / `EMAIL_DELIVERY_MODE=log` → server metadata log only (dev).
5. Delivery **success** → `/request-a-quote/thank-you/` (noindex) for contact and proposal.
6. Delivery **failure** → `?error=1` on the form page (never a false thank-you). Ops log: submission id, provider, reason, form type, timestamp — no message body or PII.

## POPIA / consent model

- Consent checkbox required server-side; label links `/legal/privacy-policy/`.
- Data minimisation: budget is a band, not an amount.
- Processors (hosting + email/webhook) named in the privacy policy draft.

## Anti-spam roadmap

v0.1: honeypot + time trap. If spam appears: Cloudflare Turnstile via env, server-verified.

## Security notes

- No secrets in client bundles; no SMTP from the browser; no Resend SDK in client components.
- Customer address is never used as `from` — only as `replyTo` on internal notifications.
- Rate limiting: platform-level (Vercel) at v0.1.
- Idempotency keys on template sends reduce duplicate provider emails on retries.
