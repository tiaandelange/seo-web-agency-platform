# Brand Direction B — Modern Systems Studio

Prepared 2026-07-21. **Name-adaptable:** no motif depends on a specific name, wordmark or initials. Constraints honoured: performance budgets, WCAG 2.2 AA, token-swap implementation only.

## Strategic rationale

Present the company as a **digital-product studio** — the people who build portals, dashboards and SaaS-grade systems — so the D3 expansion layer (admin panels, RFQ systems, portals) feels like the obvious next purchase, not a stretch. Borrow the visual credibility of modern developer/product brands (clean interfaces, structured grids, dark-surface accents) while staying business-serious.

## Target-client perception

"These people build software, not brochures." Perceived as: current, technically deep, slightly premium; attractive to the property-systems and manufacturer segments and to future SaaS/portal buyers; comfortable for national/remote engagement.

## Colour-system direction (WCAG pre-checked)

Neutral greys with a confident indigo working colour and a dark "product" surface for heroes/code-like panels:

| Role (token) | Hex | Contrast | Use |
|---|---|---|---|
| canvas | #FFFFFF | — | page background |
| surface | #F5F6FA | — | cards, sections |
| ink | #171923 | 16.9:1 on canvas | body text |
| muted | #4B5265 | 7.0:1 | secondary text |
| line | #E1E4EC | — | borders |
| accent | #3B3FB6 (indigo 700) | 8.2:1 | links, buttons, focus |
| accent-contrast | #FFFFFF | 8.2:1 on accent | button text |
| panel (dark surface) | #14161F | white text 16.4:1 | hero band, system/feature panels |
| panel-accent | #8B90F5 on panel | 6.8:1 | highlights on dark |

## Typography direction

- **Headings: Space Grotesk** (SIL OFL; self-hostable WOFF2) — modern product character without being trendy-fragile.
- **Body: Inter** (SIL OFL) — the neutral product-UI standard; excellent at small sizes for spec tables.
- Two files each, subset, ≈ 90 KB total — inside budget with size-adjusted fallbacks (CLS-safe).

## Logo-concept direction (brief-level; name-independent)

Lowercase or mixed-case wordmark with one engineered detail (a squared terminal or connected pair of letters — decided per final name). Compact mark: **modular block/bracket motif** (two joined rectangles suggesting components/systems) for favicon/avatar. Mono + reverse variants; must read on the dark panel colour.

## Iconography direction

Geometric line icons with rounded 2 px strokes, consistent 24 px grid; occasional filled accent shape for feature call-outs. Inline SVG only.

## Photography & imagery direction

Interface-led, not people-led: honest product screenshots in simple browser/device frames on panel backgrounds; abstract system diagrams (nodes, flows) as section art. Photography only when real permissioned project imagery exists. No laptop-with-coffee stock (explicitly banned by Prompt 19 rules).

## Diagram & technical-graphic direction

**System/flow diagrams**: rounded nodes, directional connectors, swimlane process graphics for RFQ/quotation workflows — the visual proof that "we build the system behind the website". SVG, consistent node grammar reused across pages.

## Interface personality

Structured and componenty: visible card grid, generous spacing scale, 8 px radius, subtle elevation on interactive cards (shadow + border, not scale), dark hero band on the homepage, micro-interactions ≤ 200 ms (opacity/transform-y 2 px) with reduced-motion kill switch.

## Strengths

- Makes the systems/expansion offer visually self-evident — best long-term fit if D3 becomes the main business.
- Modern enough to attract the property/SaaS-adjacent buyers and future staff.
- Screenshot-friendly: case studies of admin panels/portals will look native in this system.

## Weaknesses

- Reads "software company" first — the contractor in segment 1 may feel it's not for them; risks softening the D2 website-buyer signal at launch.
- Dark panels and indigo are the current default of the global dev-tool aesthetic — differentiation is medium, and it can date faster than A.
- Two font families = more budget pressure than A (still compliant, less headroom).

## SEO & performance implications

Neutral-to-positive: SVG-led imagery, no heavy libraries, no new client JS. Dark hero band is pure CSS. Watch: elevation shadows are cheap, but any temptation toward animated hero graphics must be refused (budget + reduced-motion). Fonts at ~90 KB leave little headroom for a third face — none allowed.

## Accessibility considerations

Indigo accent 8.2:1 on white and white-on-panel 16:1 both exceed AA. Panel-accent on dark verified 6.8:1. Interactive cards need a visible focus treatment distinct from hover elevation (3 px ring). Flow diagrams need textual process descriptions adjacent (already the pattern — server-rendered prose carries the content; diagrams illustrate).
