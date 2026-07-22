# Koppie Systems — remaining owner inputs (public-launch gate)

Preview identity is on `main`. Private Vercel preview may proceed with `NEXT_PUBLIC_SITE_ENV=preview`. **Public indexing remains blocked** until blocking items below are cleared.

| # | Item | Status | Blocks public launch? |
|---|---|---|---|
| 1 | CIPC name verification / reservation for “Koppie Systems” | Open | Yes |
| 2 | Trademark screening (CIPC IP + TMView, classes 35/42) | Open | Advisable / Yes before spend |
| 3 | Domain DNS connected to production host (`koppiesystems.co.za` / www) | Owner named primary domain; DNS cutover open | Yes |
| 4 | Public telephone | **Complete** — `+27614188807` | No |
| 5 | WhatsApp number | **Complete** — `27614188807` | No |
| 6 | Live public email on brand domain (`hello@…`) | Proposed only — Gmail used for lead delivery ops, not public mailto | Yes for brand mailbox |
| 7 | Company registration number | Open | Yes |
| 8 | VAT status | **Complete** — not VAT registered | No |
| 9 | POPIA Information Officer | Open (forms route to contact channels) | Yes |
| 10 | Business hours | **Complete** — enquiries any day, respond ASAP (SA) | No |
| 11 | Google Business Profile | Not created | Yes for local SEO |
| 12 | Social profiles | None | No |
| 13 | Lead-delivery provider credentials on host | Code ready (Resend/webhook); secrets not in repo | Yes until Preview env configured & tested live |
| 14 | GA4 measurement ID | Unset — see `docs/launch/ANALYTICS-PREPARATION.md` | No |
| 15 | Search Console verification | Unset — not for preview | Yes at go-live |
| 16 | Final logo SVG supplied and installed | **Blocked** — no file supplied; provisional wordmark active | Yes for public brand |
| 17 | Case-study screenshots (PII-cleared) for Damtech + Proplytic | Permission granted; imagery open — pages stay **noindex** | Soft launch OK; credibility Yes |
| 18 | Testimonials with written permission | **Refused to invent** — none published | No |
| 19 | Final founder-biography approval | Draft with placeholder notice | Soft |
| 20 | Attorney review of legal pages | Operational drafts live; not attorney-approved | Advisable / Yes for public comfort |
| 21 | Production indexing explicitly authorised | **DO NOT ENABLE** | Yes |
| 22 | SEO Audit payment provider + live checkout (both tiers) + durable webhook idempotency | Code ready; checkout URLs unset | Yes before public Buy |
| 23 | SEO Audit commercial terms attorney review (both tiers + complexity refund policy) | Operational terms on product pages | Advisable before public Buy |

## Environment reminder

- Canonical URL stays env-driven (`NEXT_PUBLIC_SITE_URL`).
- Do not set `NEXT_PUBLIC_SITE_ENV=production` on a private preview.
- Production origin when authorised: `https://www.koppiesystems.co.za`
- Lead destination (ops): configure `LEAD_TO_EMAIL` in host env — never commit the value.
