# Analytics (GA4) — Koppie Systems

Lean, consent-gated Google Analytics 4. No Google Tag Manager.

## 1. Environment variable

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

- Read only from `NEXT_PUBLIC_GA_MEASUREMENT_ID` (never hard-coded).
- If unset or empty, no GA script loads and custom events no-op.
- Prefer setting this on **Vercel Production** only; leave unset on preview/local unless deliberately testing.

## 2. Consent behaviour

| State | Storage (`localStorage` key `koppie_analytics_consent`) | Behaviour |
|---|---|---|
| `unknown` | unset | Banner shown; GA not loaded |
| `granted` | `granted` | `<GoogleAnalytics>` loads when measurement ID is set |
| `denied` | `denied` | Banner hidden; GA stays unloaded |

- Prior blocking only: no GA script, requests or `_ga` / `_ga_*` cookies before Accept.
- No Consent Mode v2 / cookieless pings.
- Footer **Cookie settings** reopens the preference dialog.
- Changing **granted → denied** clears accessible `_ga` / `_ga_*` cookies (current host, `.koppiesystems.co.za`, path `/`) and reloads the page.

## 3. Events and approved parameters

| Event | Trigger | Parameters |
| --- | --- | --- |
| `generate_lead` | Confirmed successful form submission | `form_id` |
| `contact_click` | Phone, email or WhatsApp click | `contact_method`, `link_location` |
| `seo_audit_eligibility_complete` | Completed SEO eligibility routing | `audit_route` |

Page views, sessions and engagement (including time-related engagement metrics) come from GA4 automatically. Do not add custom pageview or timer events.

## 4. Form IDs (`form_id`)

| `form_id` | Form |
|---|---|
| `contact` | `/contact/` |
| `request_quote` | `/request-a-quote/` |
| `seo_audit_intake` | `/seo-audit/intake/` and `/seo-audit/advanced/intake/` |

## 5. Success-only form tracking

Server actions return structured success/error state (no thank-you redirect from the action itself on real leads).

Client flow:

1. `useActionState` receives confirmed `{ status: 'success', track: true, … }` after `deliverLead()` succeeds.
2. A one-time `useRef` guard fires `generate_lead` once.
3. Client navigates to the thank-you (or next) URL.

No event on: submit click, validation failure, delivery failure, spam/honeypot discard (`track: false`), thank-you refresh, or direct thank-you navigation.

## 6. SEO-audit `audit_route` mapping

| Outcome | `audit_route` |
|---|---|
| Priority Fix Pack intake | `priority_fix_pack` |
| Advanced Audit intake | `advanced_audit` |
| Custom proposal / inactive-tier fallback | `custom_proposal` |
| Spam silent discard (not tracked) | `other` (with `track: false`) |

Eligibility completion is separate from `generate_lead` on intake submit.

## 7. Contact clicks

Delegated document listener (`ContactClickTracker`):

- `contact_method`: `phone` \| `email` \| `whatsapp`
- `link_location`: `header` \| `footer` \| path-based page buckets \| `general_cta`
- Never sends `href`, destination numbers or email addresses.

## 8. How to test consent

1. Clear site data / set `localStorage` without `koppie_analytics_consent`.
2. Before Accept: Network has no `googletagmanager.com/gtag` / GA collect; no `_ga` cookie.
3. Reject: preference persists; banner stays away; Cookie settings still works.
4. Accept (with a real test measurement ID): GA loads once; refresh keeps consent.

## 9. How to test events

Use GA4 **DebugView** (or Realtime) with a test property:

- Successful contact / quote / intake → one `generate_lead` with the correct `form_id`.
- Failed validation / delivery → no `generate_lead`.
- tel / mailto / wa.me → `contact_click` with method + location only.
- Eligibility complete → one `seo_audit_eligibility_complete` with stable `audit_route`.

## 10. Manual GA4 / Vercel steps (not in code)

1. Create a GA4 property and web data stream; copy the Measurement ID.
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` on Vercel (Production).
3. Mark `generate_lead` (and optionally `contact_click`) as key events / conversions.
4. Associate the GA4 property with Google Search Console.
5. Confirm cookie + privacy policy copy still match the live behaviour after legal review.

## 11. PII prohibition

Never send to GA4: names, emails, phone/WhatsApp numbers, company names, website URLs from forms, message text, form field values, `mailto:`/`tel:`/`wa.me` destinations, server response bodies, or internal IDs tied to a person.

Implementation detail: `lib/analytics.ts`, `components/analytics/*`, form success hooks in `components/analytics/use-success-tracking.ts`.
