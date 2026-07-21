# Required user inputs

Decisions only the owner can make. Nothing on this list blocks local development; items marked **Blocks launch** must be resolved before go-live.

| # | Decision | Where it lands | Blocks launch? |
|---|---|---|---|
| 1 | Final business name (see `docs/business/NAME-SHORTLIST.md`) + CIPC name reservation/registration | `config/brand.ts` → `name`, `legalName` | Yes |
| 2 | Final domain (`.co.za` recommended) and preferred host (`www` vs apex) | `NEXT_PUBLIC_SITE_URL`, DNS, canonicalisation | Yes |
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
| 14 | Final brand and visual direction (phase 2 — see recommended next prompt in the final report) | Design tokens in `app/globals.css` | No |
| 15 | Sign-off on recommended positioning (Direction 2) and the working service list | Business docs | No |
| 16 | Trademark screening for the chosen name (attorney or CIPC/TMView search) | Name shortlist | Advisable before spend |
