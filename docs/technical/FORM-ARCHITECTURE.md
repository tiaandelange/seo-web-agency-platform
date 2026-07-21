# Form architecture

## Forms

| Form | Page | Fields |
|---|---|---|
| Quote request (primary) | `/request-a-quote/` | name*, email*, phone, company, service interest (select from services data), budget band (optional select, indicative bands), timeline (select), message*, consent* (checkbox), honeypot, render-timestamp |
| Contact (short) | `/contact/` | name*, email*, message*, consent*, honeypot, render-timestamp |
| Consultation / support enquiry | Reuse quote form with `enquiryType` preset via link (`/request-a-quote/?type=consultation`) — no third form to maintain |

File upload (briefs/plans): deliberately NOT rendered at v0.1 — needs a storage decision (size limits, virus scanning, POPIA retention). Documented here as the designed extension: add `<input type="file">` posting to the same action once storage is chosen.

## Processing flow (implemented in `lib/actions.ts`, server action)

1. Server action receives FormData (no client JS required — form works with JS disabled; progressive enhancement can come later).
2. Spam gate: honeypot field must be empty; (documented option) minimum-elapsed-time check against the rendered timestamp; both silent-discard on failure (bots get a generic success).
3. Validation: required fields present, email shape, message length caps (anti-abuse), field-length limits.
4. Delivery: if `LEAD_WEBHOOK_URL` is set → POST JSON to it (email service, Zapier/Make, or own endpoint). If unset → server-side log only (dev mode). **No secrets in client code; no direct SMTP from the browser — ever.**
5. Redirect to `/request-a-quote/thank-you/` (noindex) — the reliable conversion point.
6. Failure path: redirect back with `?error=1` (page renders a polite retry notice); no data loss beyond the attempt (documented enhancement: session-less repopulation is deliberately skipped at v0.1).

## POPIA / consent model

- Consent checkbox label states: purpose (respond to the enquiry), storage, no third-party sharing beyond the processing provider, and links the privacy policy. Unchecked = submission rejected server-side.
- Data minimisation: we ask only what a quote needs; budget is a band, not an amount.
- Retention + information-officer details go in the privacy policy (owner input #10; legal review required — pages are marked placeholder drafts).
- Analytics cookies are separate from form consent — see ANALYTICS-EVENTS.md; no analytics loads at v0.1.

## Anti-spam roadmap

v0.1: honeypot (+ time-trap ready). If spam appears: add Cloudflare Turnstile (privacy-friendlier than reCAPTCHA) — keyed via env, server-verified in the action. Never block on JS-dependent CAPTCHA without a fallback contact path (email link remains).

## Security notes

- Server action validates everything server-side regardless of any client validation.
- Rate limiting: platform-level (Vercel) at v0.1; in-action IP throttle documented as an option if abuse appears.
- No form data is ever written into URLs (except the boolean `?error=1`) or logged with PII in production log drains.
