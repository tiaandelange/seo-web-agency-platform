# Brand Direction A — Technical Precision

Prepared 2026-07-21. **Name-adaptable:** nothing below depends on any specific company name, wordmark letterforms or initials; every motif works for any shortlisted name. Constraints honoured: performance budgets (`docs/technical/PERFORMANCE-BUDGET.md`), WCAG 2.2 AA (`docs/technical/ACCESSIBILITY-STANDARDS.md`), token-swap implementation only (`docs/prompts/18-visual-theme-development.md`).

## Strategic rationale

Speak the visual language of the audience's own documents — engineering drawings, datasheets, survey plans — so the site reads as "built by people like us" to contractors, engineers and manufacturers. Credibility through restraint: in a market of gradient-heavy agency sites, disciplined precision *is* the differentiation.

## Target-client perception

"These people are exact. If their own site is this considered, our project will be too." Perceived as: senior, methodical, mid-to-premium priced, safe to bring to a board/partner.

## Colour-system direction (WCAG pre-checked)

Cool, ink-heavy, one restrained signal colour. Proposed token values (final at implementation):

| Role (token) | Hex | Contrast on canvas #FFFFFF | Use |
|---|---|---|---|
| canvas | #FFFFFF | — | page background |
| surface | #F4F6F8 | — | cards, alternating sections |
| ink | #121A24 | 17.6:1 | body text |
| muted | #46556A | 7.5:1 | secondary text |
| line | #D8DEE6 | — | borders, rules (3.2:1 vs surface for UI edges) |
| accent | #0F3D5C (drawing-ink blue) | 10.4:1 | links, buttons, focus |
| accent-contrast | #FFFFFF | 10.4:1 on accent | button text |
| signal | #B45309 (survey amber) | 4.6:1 | sparse highlights, "indicative" notices |

Dark-tone strategy: optional deep-ink footer/hero band (#0E1621, white text 16:1). No dark mode at launch.

## Typography direction

- **Headings + body: IBM Plex Sans** (SIL OFL 1.1 — free, self-hostable WOFF2; designed for technical contexts). Two weights (400/600) ≈ 60–80 KB total — inside the 100 KB font budget.
- **Accent/mono: IBM Plex Mono** for figures, spec tables, code-like labels (one weight, subset).
- Size-adjusted system-font fallback metrics to hold CLS at 0. Type scale: calm, 1.2 ratio; generous line-height (1.6 body).

## Logo-concept direction (brief-level; name-independent)

Wordmark-first: engineered spacing, all-caps or small-caps, medium weight — no icon dependence. Optional compact mark: a **register/crosshair tick** (the mark a setting-out engineer leaves) usable as favicon/avatar. Mono and reverse variants mandatory; must survive 16 px favicon. Works identically for any candidate name.

## Iconography direction

1.5 px stroke line icons, square joints, technical-drawing character (think ISO symbol sets, not rounded consumer icons). One colour (ink or accent). Inline SVG, no icon-font library.

## Photography & imagery direction

Real work contexts when permissioned photography exists: workshops, sites, screens-in-use — documentary, not stocky. Until then: **no fake stock people**; use diagram-led imagery (below) and honest UI screenshots with device frames. Duotone treatment (ink + accent) unifies mixed-quality sources.

## Diagram & technical-graphic direction

The signature asset: **drawing-convention diagrams** — dimension lines, leader arrows, section hatching, grid paper backgrounds at 4% opacity — used to explain process, architecture and RFQ workflows. Produced as optimised SVG; this is where the brand outclasses stock-photo competitors for this audience.

## Interface personality

Quiet, flat, ruled. Hairline borders over shadows; rectangular geometry (small 4 px radius); visible structure (breadcrumbs, section numbering like "03 — Process"); hover = underline/border-strengthen, not lift/scale; motion limited to ≤150 ms opacity/colour transitions.

## Strengths

- Strongest audience-mirror for segments 1–3; hardest for volume agencies to imitate credibly.
- Cheap to execute well: type + lines + SVG diagrams, no photography dependency.
- Naturally fast (no heavy imagery) and naturally accessible (high contrast is the aesthetic).
- Ages slowly; survives the systems expansion (drawings suit software architecture too).

## Weaknesses

- Can read austere/cold to segment 5 (professional services) and segment 6 (general SMB).
- Needs excellent typography discipline — done lazily it looks unfinished rather than precise.
- Low colour warmth gives conversion CTAs less pop; the signal colour must be protected from overuse.

## SEO & performance implications

Positive: minimal imagery keeps LCP text-first; two WOFF2 subsets fit the budget; SVG diagrams are lightweight and cacheable. No new client JS. Risk: none identified; diagram SVGs need explicit width/height to hold CLS 0.

## Accessibility considerations

All text roles ≥ 7:1 (exceeds AA, approaches AAA); signal amber reserved for large text/accents at 4.6:1. Focus ring: 3 px accent on white ≥ 3:1 against adjacents. Hairline borders must stay ≥ 3:1 against both adjoining fills for UI boundaries. Diagrams require text alternatives (figure captions carrying the information, not alt-only).
