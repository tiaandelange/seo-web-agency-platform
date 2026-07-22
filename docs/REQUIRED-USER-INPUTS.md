# Required user inputs

Decisions only the owner can make. Nothing on this list blocks local development; items marked **Blocks launch** must be resolved before go-live.

| # | Decision | Where it lands | Blocks launch? |
|---|---|---|---|
| 1 | Final business name — **owner selected Koppie Systems** (preview). Still required: CIPC reservation/registration + trademark screening. Tracker: `docs/brand/KOPPIE-REMAINING-INPUTS.md` | `config/brand.ts` → `name`, `legalName`, `verification` | Yes (legal claims) |
| 2 | Final domain (`koppiesystems.co.za` / `.com` proposed) and preferred host — **ownership not verified**. Keep `NEXT_PUBLIC_SITE_URL` env-driven. | `NEXT_PUBLIC_SITE_URL`, DNS, canonicalisation | Yes |
| 3 | Verified contact details: phone, email, WhatsApp number | `config/brand.ts` → `contact` | Yes |
| 4 | Publish a physical address? (If no: remain a service-area business in GBP and schema) | `config/brand.ts` → `address`, GBP setup | Yes |
| 5 | Confirmed service areas (launch set: Pretoria, Johannesburg; Cape Town phase 2) | `data/locations.ts`, local SEO plan | No |
| 6 | Confirmed pricing ranges per package (currently indicative placeholders) | `data/packages.ts` | Yes (or hide prices) |
| 7 | Permission per real project to publish a case study (client name or anonymised, images, results) | `content/projects/*` — flip `publishPermission`, set `noindex: false` | No |
| 8 | Genuine testimonials with written permission | `data/testimonials.ts` | No |
| 9 | Founder bio, headshot decision, and how to present the team | `data/team.ts`, About page | No |
| 10 | Company registration details, VAT status, POPIA information officer contact | Legal pages, footer | Yes |
| 11 | Google accounts: Search Console, GA4 property, Google Business Profile | Env vars + launch checklists | Yes (GSC), GA optional |
| 12 | Lead-delivery choice: email provider (e.g. Resend/SMTP) or webhook for form submissions | `LEAD_WEBHOOK_URL` + `lib/actions.ts` TODO | Yes |
| 13 | Social profiles to create/link (LinkedIn recommended first) | `config/brand.ts` → `social`, Organization schema `sameAs` | No |
| 14 | Final brand and visual direction — **Koppie identity implemented for preview** (`docs/brand/KOPPIE-SYSTEMS-BRAND-IDENTITY.md`). Final logo still required. | Design tokens in `app/globals.css`; `components/brand-wordmark.tsx` | Soft (logo) |
| 15 | Sign-off on positioning — **approved and applied** (Koppie primary positioning). Confirm founder bio + ECSA wording for public launch. | Business docs + `data/team.ts` | Soft |
| 16 | Trademark screening for the chosen name (attorney or CIPC/TMView search) | Name shortlist | Advisable before spend |
