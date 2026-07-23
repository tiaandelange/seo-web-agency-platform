# Required user inputs

Decisions only the owner can make. Nothing on this list blocks local development; items marked **Blocks launch** must be resolved before go-live.

| # | Decision | Where it lands | Blocks launch? |
|---|---|---|---|
| 1 | Final business name — **owner selected Koppie Systems** (preview). Still required: CIPC reservation/registration + trademark screening. Tracker: `docs/brand/KOPPIE-REMAINING-INPUTS.md` | `config/brand.ts` → `name`, `legalName`, `verification` | Yes (legal claims) |
| 2 | Final domain — **named** `koppiesystems.co.za` / canonical `https://www.koppiesystems.co.za`. DNS cutover + ownership proof still required before production env. | `NEXT_PUBLIC_SITE_URL`, DNS | Yes |
| 3 | Verified contact — **phone + WhatsApp set** (`+27614188807`). Public brand-domain email still open. | `config/brand.ts` → `contact` | Soft (email) |
| 4 | Publish a physical address? **No** — nationwide & international service-area policy. | `config/brand.ts` → `address` | No |
| 5 | Confirmed service areas (launch set: Pretoria, Johannesburg; Cape Town phase 2) | `data/locations.ts`, local SEO plan | No |
| 6 | Confirmed pricing ranges per package (currently indicative placeholders) | `data/packages.ts` | Yes (or hide prices) |
| 7 | Permission per real project — **Damtech + Proplytic authorised**; screenshots still required for indexation | `content/projects/*` | Soft |
| 8 | Genuine testimonials — **do not invent**; none published | `data/testimonials.ts` | No |
| 9 | Founder bio, headshot decision, and how to present the team | `data/team.ts`, About page | No |
| 10 | Company registration + VAT — **VAT not registered** recorded; reg number + Information Officer open | Legal pages, footer | Yes (reg / IO) |
| 11 | Google accounts: Search Console, GA4 property, Google Business Profile | Env vars + launch checklists | Yes (GSC), GA optional |
| 12 | Lead-delivery — **Resend hosted templates for contact/proposal**; set published template IDs + From/To/Reply-To on host; live-test to approved inbox | `.env` + `lib/email/*` + `lib/lead-delivery.ts` | Yes until live-tested |
| 12b | Future Resend templates for SEO-audit order/intake/payment (do not reuse contact/proposal) | Resend dashboard + env | Yes before paid-audit email automation |
| 13 | Social profiles to create/link (LinkedIn recommended first) | `config/brand.ts` → `social`, Organization schema `sameAs` | No |
| 14 | Final brand — preview identity live; **final logo SVG not supplied** | `docs/brand/ASSET-REGISTER.md` | Yes for public brand |
| 15 | Sign-off on positioning — **approved and applied**. Founder bio **approved for public About/articles** (Trust P0, 2026-07-23) without ECSA claims. Confirm ECSA wording separately if/when verified. | Business docs + `data/authors.ts` / `data/team.ts` | Soft |
| 16 | Trademark screening for the chosen name (attorney or CIPC/TMView search) | Name shortlist | Advisable before spend |
