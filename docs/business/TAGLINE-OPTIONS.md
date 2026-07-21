# Tagline options

Prepared 2026-07-21. Name-agnostic (works with any of the shortlisted names). Tested against the positioning sentence, the audience's distrust of agency gloss, and the anti-fabrication rules (no implied guarantees). Current placeholder in `config/brand.ts`: "SEO-first websites & business systems" (functional, keepable as the *title-template* strapline even if a marketing tagline is chosen).

| # | Tagline | Angle | Strengths | Risks |
|---|---|---|---|---|
| 1 | **Websites that win work.** | Outcome | Four words; alliterative; "work" speaks to contractors/industry; no guarantee implied (websites *that* win, not *will* win) | Slightly broad |
| 2 | Built to be found. | SEO mechanism | Clean double meaning (findable + solidly built) | Doesn't carry the systems layer |
| 3 | Measured. Built. Found. | Method | Engineering cadence; mirrors the measure-first method | Fragmented; needs the brand voice around it |
| 4 | The website, and the system behind it. | Scope | Uniquely states the D2+D3 combination no competitor leads with | Longer; less punchy |
| 5 | Engineered to rank. Built to convert. | Mechanism pair | Precise; audience-flattering vocabulary | "Rank" edges toward a promise — acceptable ("engineered to", not "guaranteed to") but watch context |
| 6 | From first search to signed quote. | Journey | Captures search → enquiry → quotation system span | Abstract on first hearing |
| 7 | Websites for businesses that quote. | Audience | Sharp niche filter (quote-driven B2B) | Excludes ecommerce/service segments |
| 8 | Structure wins searches. | Philosophy | Distinctive; method-first | Too clever for some buyers |

## Recommendation

**Primary: #1 "Websites that win work."** — short enough for the logo lockup, honest, audience-correct, and it survives the systems expansion (systems also win/handle work).

**Secondary (page/campaign use): #4** for the About/Services context where the full scope needs stating, and **#5** for the SEO-service pages.

Rejected during drafting: "Your growth partner online" (vague agency filler), "Ranking made real" (implied guarantee), "Digital done right" (generic), anything with "solutions".

## Usage rules

- The tagline is marketing voice; the `config/brand.ts` `tagline` field also feeds the `<title>` template — keep the functional descriptor there ("SEO-first websites & business systems") for keyword value, and use the marketing tagline in hero/footer copy instead. Decide at implementation.
- Never set the tagline in a heading tag that competes with the page H1.
