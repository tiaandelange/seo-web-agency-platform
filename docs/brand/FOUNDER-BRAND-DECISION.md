# Founder brand decision

Prepared 2026-07-21. Decide after (or together with) the name decision (`docs/business/FOUNDER-NAME-DECISION.md`). All three directions are name-adaptable — choosing a direction now does **not** lock the name, and vice versa. Implementation only begins after both decisions plus the approval-gate items in `docs/REQUIRED-USER-INPUTS.md`.

## The choice

| Option | Choose it if… |
|---|---|
| **A — Technical Precision** (recommended) | The launch priority is winning technical/industrial website buyers; you want the most differentiated, lowest-risk, photography-independent identity. |
| **B — Modern Systems Studio** | You expect custom systems/portals to overtake websites quickly and want the brand to lead with software-product credibility from day one. |
| **C — Commercial Growth Partner** | You decide the primary market is actually general owner-operators/SMBs and warmth beats niche signalling. (Note: this partially contradicts the confirmed D2 positioning.) |

Recommended: **A**, with C's single-warm-CTA discipline folded in (see `BRAND-DIRECTION-COMPARISON.md`).

## What your decision unlocks (in order)

1. Logo brief goes to a designer (wordmark-first brief per the chosen direction + final name; brief skeleton in Prompt 19).
2. Design tokens in `app/globals.css` are swapped per `DESIGN-TOKEN-MAP.md` (single file, no structural change).
3. Components restyled per `COMPONENT-RESTYLING-MAP.md`; regression run per `VISUAL-REGRESSION-CHECKLIST.md`.
4. Social/GBP/proposal templates derive from the same tokens.

## Decision sheet (owner completes)

- [ ] Primary brand direction: A / B / C (or A with amendments: ______________)
- [ ] Logo direction approved for designer brief: wordmark-first, mono + reverse variants, favicon-legible — yes / amend
- [ ] Confirm CTA discipline: one warm conversion colour reserved for primary CTAs — yes / no
- [ ] Typography approved (A: IBM Plex Sans/Mono · B: Space Grotesk + Inter · C: Bricolage or Plus Jakarta + Source Sans 3) — yes / substitute: ______________
- [ ] Photography policy until real imagery exists: diagram/screenshot-led, no stock people — confirm
- [ ] Anything the identity must include/avoid (personal preference, existing assets): ______________

## Hard constraints that bind whichever direction is chosen

- Implementation is a token swap + component classes only; routes, headings, metadata, schema, section order untouched (AGENTS.md rule 6; Prompt 18).
- Contrast floors: body ≥ 4.5:1, UI/large ≥ 3:1 — all three palettes were drafted to exceed these; final hexes re-verified at implementation.
- Fonts self-hosted WOFF2 ≤ 100 KB total with size-adjusted fallbacks; no icon fonts; no animation libraries; carousels/video backgrounds remain banned.
- `prefers-reduced-motion` disables all added motion.
