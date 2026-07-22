# Pricing decision

Prepared 2026-07-21 for owner sign-off. Reviews the placeholder ranges in `PRICING-ARCHITECTURE.md` / `data/packages.ts` against 2026 market evidence. **All figures remain `indicative: true` in the codebase until the owner confirms — nothing here publishes as final.**

## Market check (sources accessed 2026-07-21)

- Template/volume floor: R1,500–R8,000 once-off (shepherddesignedit.co.za; jwd.co.za; hikarilabs.co.za) and subscriptions R179–R7,999/month (cjxstudio.co.za).
- Professional tier: R25,000–R60,000 (symaxx.com/web-design/pricing); R8,000–R20,000 for smaller professional builds (hikarilabs.co.za).
- Custom applications: R80,000–R250,000+ (symaxx.com).
- Conclusion: the repository's placeholder ranges (A-10) remain market-consistent. No structural change needed; recommendations below are presentational.

## Recommended indicative ranges (confirm or amend each)

| Offering | Current placeholder | Recommendation | Note |
|---|---|---|---|
| Starter business website | R14,000–R25,000 | **Keep** | Deliberately above the template floor; the "cheap enquiry" filter. |
| Professional lead-generation website | R28,000–R60,000 | **Keep** | Sits exactly on the professional-tier evidence; hero package. |
| Product catalogue website | R45,000–R90,000 | **Keep** | Premium vs generic ecommerce is justified by RFQ/spec complexity. |
| Ecommerce website | R70,000–R160,000 | **Keep** | Matches R60k–R150k+ evidence. |
| Custom web system | from R80,000 (discovery R8,000–R15,000) | **Keep** | Paid discovery is the scope-protection mechanism — hold the line. |
| Hourly (out-of-plan) | R650–R950/h | **Keep** | Market band R450–R950/h; positioning supports the upper half. |
| SEO Audit & Priority Fix Pack | **R1,999 once-off (fixed)** | **Publish as fixed** | Entry product (D-30/D-31). Not indicative. |
| Advanced SEO Audit & Implementation Roadmap | **R5,999 once-off (fixed)** | **Publish as fixed** | Large-site tier (D-31). Custom above 250 URLs. |

## Indicative price presentation (recommended rules — already partially implemented)

1. Ranges only for builds, each rendered with the word "indicative" and the visible notice (implemented: `indicative: true` flag).
2. The `/pricing/` page stays the single "all numbers in one place" answer — it serves the highest-anxiety search and differentiates against "request a quote to see anything" competitors.
3. "What moves the price up/down" explanations stay adjacent to every range (scope honesty).
4. No discount theatre: no was/now, no countdowns, no "this month only".
5. VAT status statement added the day registration status is known (input #10).
6. Once confirmed, switch copy from "indicative range" to "typical range" — still ranges, never fixed public prices for builds.

## Payment terms (proposed — owner must confirm)

- Builds: 40% deposit · 40% at design/build milestone · 20% at handover. Work starts on deposit clearance.
- Custom systems: paid discovery invoiced separately; build quoted after discovery; milestone billing monthly for engagements >8 weeks.
- Support plans: monthly in advance, debit order/EFT; 30 days' notice to cancel.
- Out-of-plan work: quoted or hourly (published rate), invoiced monthly.
- Late payment: work pauses after 14 days overdue (stated in terms, applied with judgement).

## Exclusions (state on proposals and the pricing page)

Content writing beyond agreed scope; photography; logo/brand design (referred or quoted separately); paid advertising management; ongoing SEO retainers promising rankings (never sold); third-party licence fees (payment gateways, email services); domain/hosting fees unless on a care plan that includes them.

## Change-request rules (proposed)

- Scope defined in the proposal by pages, features and revision rounds (2 rounds included per phase).
- Changes within scope: included. New scope: written mini-quote before work proceeds — no verbal scope creep.
- "Scope down, don't price down" negotiation policy stands (PRICING-ARCHITECTURE.md).

## Owner decisions required

1. Confirm/adjust each range above (input #6 — launch-blocking unless prices are hidden).
2. Confirm deposit/milestone percentages and support billing terms.
3. Confirm the exclusions list.
4. Confirm the 2-revision-rounds rule.
