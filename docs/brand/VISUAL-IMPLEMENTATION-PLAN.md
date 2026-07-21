# Visual implementation plan

Prepared 2026-07-21. The execution plan for the future visual-design phase (v1.0). Written against **recommended Direction A (Technical Precision)** but structured so any approved direction slots in — every step consumes the direction's token sheet, not hardcoded values. **Do not execute until the approval gate clears** (`docs/REQUIRED-USER-INPUTS.md`: name, domain, direction, logo, pricing, areas, permissions, contact).

Companion documents: `DESIGN-TOKEN-MAP.md` (token-by-token), `COMPONENT-RESTYLING-MAP.md` (component-by-component), `VISUAL-REGRESSION-CHECKLIST.md` (verification).

## Non-negotiables (verbatim from the frozen architecture)

Preserved without exception: page section order; H1/H2 hierarchy; crawlable server-rendered text; internal links; structured data; metadata; route structure; noindex protection; performance budgets (LCP ≤ 2.5 s mobile, INP ≤ 200 ms, CLS ≤ 0.1, client JS ≤ 120 KB first load); WCAG 2.2 AA. Implementation is design tokens + component classes only. No new client components; no animation libraries; no carousels/video backgrounds.

## Implementation sequence (each step independently shippable, `npm run check` + build green after each)

### Step 0 — Prerequisites
Final name in `config/brand.ts` (owner-verified), logo files delivered (SVG wordmark + mark, mono/reverse), fonts licensed and subset to WOFF2.

### Step 1 — Tokens + fonts (1 commit)
Replace the `@theme` block in `app/globals.css` per `DESIGN-TOKEN-MAP.md`; add `@font-face` with `font-display: swap` and size-adjusted fallbacks; self-host WOFF2 under `public/fonts/`. Verify: contrast audit, CLS on 3 templates, font payload ≤ 100 KB.

### Step 2 — Header + navigation (1 commit)
`site-header.tsx` (logo swap-in for text brand, nav link states), `mobile-nav.tsx` (visual only — button/menu classes; the `useState` disclosure logic and ARIA are untouched). Verify: aria-expanded behaviour unchanged, 44 px targets, focus ring visible on all links.

### Step 3 — Core content components (1–2 commits)
`section.tsx` (background alternation rules), `page-header.tsx` (display type scale), `breadcrumbs.tsx` (separator/contrast), `cards.tsx` (all card variants — service/package/project/article), `related-content.tsx`. Verify: card grids at 360/768/1280, hover/focus states, no layout shift.

### Step 4 — Conversion surfaces (1 commit)
`cta-quote.tsx` (primary CTA hierarchy — single warm signal colour rule), `quote-form.tsx` + `contact-form.tsx` (inputs, labels, error banner, consent row, button), `trust-signals.tsx`, `placeholder-notice.tsx` (must stay visually prominent — honesty device). Verify: form error + success paths re-tested, input contrast, target sizes.

### Step 5 — Long-form surfaces (1 commit)
Article/prose typography (headings scale, lists, tables for comparison pages), `faq-list.tsx`, `process-steps.tsx` (numbered technical styling), project case-study layout, `site-footer.tsx`. Verify: comparison tables responsive (no horizontal overflow at 360 px), prose line length 60–75ch.

### Step 6 — Imagery + OG (1 commit)
Diagram/graphic assets (SVG, per direction), OG/social image (1200×630) wired into metadata defaults, favicon/app icons from the mark. Verify: structured data unchanged, OG renders, icons crisp at 16 px.

### Step 7 — Full regression + sign-off
Run `VISUAL-REGRESSION-CHECKLIST.md` end to end. Tag/checkpoint commit.

## Cross-cutting specifications

- **Responsive behaviour:** current breakpoints stay (mobile-first, `lg` nav switch, `max-w-6xl` containers). No container width changes without CLS re-check.
- **Hover states:** colour/border/underline transitions ≤ 150 ms; never scale/translate on text blocks; card hover = border-strengthen (+ shadow only in Direction B/C).
- **Focus states:** 3 px ring in accent, 2 px offset, ≥ 3:1 against every adjacent fill — replaces nothing, restyles the existing `:focus-visible` rule only.
- **Reduced motion:** the existing global kill-switch stays; any added transition must be inside it.
- **Image ratios:** cards 16:9; case-study hero 16:9; inline article figures 4:3 or natural with explicit dimensions; founder headshot 1:1. All via `next/image` with `sizes`.
- **Icon rules:** inline SVG only, 24 px grid, single colour from tokens, `aria-hidden` unless meaningful, no icon fonts.
- **Spacing rules:** spacing derives from the Tailwind scale already in use; section vertical rhythm standardised (e.g. `py-16 lg:py-24`); no ad-hoc pixel values.
- **Section backgrounds:** alternate canvas/surface only; dark panel (Direction B) or deep-ink band (A) limited to ≤ 2 per page; text on dark verified ≥ 4.5:1.
- **Button hierarchy:** primary (solid accent/CTA colour, one per view) → secondary (outline accent) → tertiary (text link with underline). Forms use primary only.
- **Conversion emphasis:** the single-warm-CTA discipline (from Direction C) applies regardless of chosen direction: exactly one visually loudest action per screen-view; sticky/floating CTAs are not introduced (performance + annoyance).

## Risk controls

- Any brand-identity input that conflicts with budgets/accessibility is flagged and substituted with the closest compliant alternative (Prompt 18 rule) — never silently accepted.
- View-source diff before/after each step: text content, headings, links, JSON-LD byte-identical (class attributes excepted).
- If a step degrades Lighthouse budgets, it reverts — the checkpoint-per-step sequence exists for that.
