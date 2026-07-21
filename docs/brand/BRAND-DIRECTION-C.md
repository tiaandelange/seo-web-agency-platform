# Brand Direction C — Commercial Growth Partner

Prepared 2026-07-21. **Name-adaptable:** no motif depends on a specific name, wordmark or initials. Constraints honoured: performance budgets, WCAG 2.2 AA, token-swap implementation only.

## Strategic rationale

Lead with the *outcome* — enquiries, growth, a business that runs smoother — in a warmer, more approachable register. Optimised for conversion among owner-operators (segments 1, 5, 6) who buy confidence and clarity, not technical vocabulary. The engineering substance stays in the copy and proof sections; the visual layer sells momentum and trustworthiness.

## Target-client perception

"These people will get my phone ringing, and they're easy to deal with." Perceived as: energetic but professional, priced mid-market-plus, human. Lowest intimidation factor of the three directions.

## Colour-system direction (WCAG pre-checked)

Warm neutrals, a deep teal-green primary (trust + growth without cliché green), and a warm conversion accent:

| Role (token) | Hex | Contrast | Use |
|---|---|---|---|
| canvas | #FFFFFF | — | page background |
| surface | #F7F6F3 (warm paper) | — | cards, sections |
| ink | #1C2321 | 15.9:1 | body text |
| muted | #4E5A55 | 6.6:1 | secondary text |
| line | #E3E1DB | — | borders |
| accent | #0E5A4A (deep teal-green) | 7.9:1 | links, primary buttons, focus |
| accent-contrast | #FFFFFF | 7.9:1 on accent | button text |
| cta (warm) | #B4451F (burnt orange) | 4.9:1 | primary conversion CTA only |
| cta-contrast | #FFFFFF | 4.9:1 on cta | CTA text (large/bold ≥ 3:1 required; passes normal-text AA too) |

Rule: burnt orange appears **only** on the primary CTA — a single conversion signal per view.

## Typography direction

- **Headings: Bricolage Grotesque** or **Plus Jakarta Sans** (both SIL OFL, self-hostable) — friendly weight and slight character without silliness.
- **Body: Source Sans 3** (SIL OFL) — warm, highly readable workhorse.
- Two files each, subset, ≈ 85–95 KB; size-adjusted fallbacks mandatory.

## Logo-concept direction (brief-level; name-independent)

Mixed-case wordmark, medium-round terminals, confident weight. Optional mark: **upward path/step motif** (growth without the cliché arrow-chart) or a speech-mark/enquiry motif tying to "the phone rings". Mono + reverse variants; favicon-legible.

## Iconography direction

Rounded 2 px line icons with occasional warm-accent fill dots; consistent optical size; friendly but not cartoonish. Inline SVG.

## Photography & imagery direction

People-forward *when real*: the founder, real clients on real sites (with permission), authentic SA business contexts. Until permissioned photography exists, use warm-toned illustration-free layouts: big type, surface blocks, honest screenshots. **No stock handshakes or call-centre women** — fake warmth is worse than none.

## Diagram & technical-graphic direction

Simplified outcome-first graphics: before/after page mock pairs, a three-step "found → chosen → run" journey strip, plain-language annotated screenshots. Less drawing-convention than A, less system-notation than B — every graphic answers "what do I get?".

## Interface personality

Roomy and reassuring: larger type scale, 10–12 px radius, soft single-layer shadows, warm surface alternation, prominent CTA buttons (44 px+ targets by default), progress indicators on forms, friendly microcopy ("This takes about two minutes"). Motion: gentle 200 ms ease-out on reveals, fully disabled under reduced-motion.

## Strengths

- Highest expected conversion warmth for owner-operators; the request-a-quote journey feels easiest here.
- Most human of the three — supports referrals, GBP presence and a founder-fronted brand.
- Warm palette + single CTA colour is a genuinely disciplined conversion system, not decoration.

## Weaknesses

- Weakest audience-mirror for engineering/industrial buyers (segments 2–3) — can read "marketing agency", the very category the positioning avoids.
- Depends most on real photography to reach full strength; weakest of the three while no permissioned imagery exists.
- Least differentiated: warm-professional is a crowded register in SA web design.

## SEO & performance implications

Neutral: same token-swap mechanics, SVG graphics, no new client JS. Watch: larger type scale must not push the H1/LCP below the fold on mobile; before/after mock images need strict sizing and lazy-loading below the fold.

## Accessibility considerations

All body roles ≥ 6.6:1. The burnt-orange CTA is 4.9:1 with white text — passes AA for normal text with margin; must not shrink below 16 px text. Two accent hues (teal + orange) must never be the only differentiator of state (icons/underlines accompany). Focus ring teal 3 px, verified against warm surfaces.
