# Koppie Systems — remaining owner inputs (public-launch gate)

Preview identity is implemented. Public launch remains blocked until the items below are resolved. Tracker companion: `docs/REQUIRED-USER-INPUTS.md` and `docs/content/PLACEHOLDER-REPLACEMENT-REGISTER.csv`.

| # | Item | Status | Blocks public launch? |
|---|---|---|---|
| 1 | CIPC name verification / reservation for “Koppie Systems” | Open | Yes |
| 2 | Trademark screening (CIPC IP + TMView, classes 35/42) | Open | Advisable / Yes before spend |
| 3 | Domain ownership (`koppiesystems.co.za` + `.com`) | Open | Yes |
| 4 | Public telephone | Not supplied — hidden | Yes (or approve no-phone policy) |
| 5 | WhatsApp number | Not supplied — hidden | No |
| 6 | Live email accounts (`hello@…` once domain owned) | Proposed only — not rendered | Yes |
| 7 | Company registration number | Open | Yes |
| 8 | VAT status | Open — ranges VAT-neutral | Yes (for invoice wording) |
| 9 | POPIA Information Officer | Open | Yes |
| 10 | Business hours | Empty — hidden | No |
| 11 | Google Business Profile | Open | Yes for local SEO |
| 12 | Social profiles | None | No |
| 13 | Lead-delivery provider (`LEAD_WEBHOOK_URL`) | Unset — server-log fallback | Yes |
| 14 | GA4 measurement ID | Unset | No |
| 15 | Search Console verification | Unset | Yes at go-live |
| 16 | Final logo (replace provisional wordmark) | Provisional only | Yes for public brand |
| 17 | Case-study permissions (DamTech, PropertyGuy/Proplytic, etc.) | Open — templates remain noindex | No for soft launch; Yes for credibility |
| 18 | Project screenshots (PII-cleared) | None | With #17 |
| 19 | Testimonials with written permission | None | No |
| 20 | Final founder-biography approval (+ verified ECSA wording) | Draft published with placeholder notice | Soft — notice remains until approved |

## Environment reminder

- Canonical URL must stay env-driven (`NEXT_PUBLIC_SITE_URL`).
- Do not set `NEXT_PUBLIC_SITE_ENV=production` on a private preview.
- Do not hardcode `https://koppiesystems.co.za` until domain ownership is confirmed.
