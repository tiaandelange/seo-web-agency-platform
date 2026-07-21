# Pricing architecture

## Market anchors (2026 research — see COMPETITOR-RESEARCH.md)

- Template/volume market: R1,990–R10,000 (we do not compete here).
- Professional business sites with SEO architecture: ~R20,000–R60,000.
- Ecommerce: ~R60,000–R150,000+.
- Agency hourly rates: mostly R450–R950/h.

## Our structure

Three presentation layers, one data source (`data/packages.ts`):

1. **Packages** (`/website-packages/…`) — productised entry points with indicative “from” ranges. Serve price-intent searches honestly.
2. **Pricing page** (`/pricing/`) — all ranges in one table + what moves price up/down + hourly rate + support plans. Serves “website design prices south africa” intent and disarms the biggest buyer anxiety.
3. **Service pages** — no hard numbers; link to pricing/packages (keeps scope pages evergreen).

## Presentation rules (anti-fabrication)

- Every figure renders with the word “indicative” and the data flag `indicative: true`; final numbers only via quote.
- No “was/now” discounting, no fake urgency.
- Ranges, never single prices, for builds; support plans may show fixed prices once confirmed.
- VAT status must be stated once registered (owner input #10).

## Placeholder ranges (owner must confirm — input #6)

| Offering | Indicative range (ZAR) |
|---|---|
| Starter business website | 14,000–25,000 |
| Professional lead-generation website | 28,000–60,000 |
| Product catalogue website | 45,000–90,000 |
| Ecommerce website | 70,000–160,000 |
| Custom web system | from 80,000 (discovery 8,000–15,000) |
| Hourly (out-of-plan) | 650–950/h |
| Support plans | see SUPPORT-PACKAGES.md |

## Rationale for sitting above the volume market

The positioning (D-06) sells measurable lead generation and systems capability to businesses with high job values; a R5k price signal would contradict the promise and attract the wrong buyer. The Starter package is the defensible floor: it exists to catch smaller businesses in the audience without dragging the brand into template-price comparisons.

## Discount and negotiation policy (proposed)

- Scope down, don’t price down (remove pages/features rather than cutting rate).
- Phased delivery for budget-constrained fits (site now, system later).
- No free spec work beyond the published discovery offer.
