# Component restyling map

Prepared 2026-07-21. Component-by-component plan for the visual phase. All 16 components in `components/` keep their **props, semantics, DOM structure and ARIA unchanged** — only class lists change. Written for Direction A with direction-agnostic notes; consumes tokens from `DESIGN-TOKEN-MAP.md`.

| Component | Visual changes | States to specify | Invariants (do not touch) |
|---|---|---|---|
| `site-header.tsx` | Text brand → logo (SVG wordmark, height ≤ 32 px, explicit dims); nav link type/spacing; active-route underline; header border token | Link hover (underline), focus (ring), active route (underline + weight) | Nav structure, link hrefs from `data/navigation.ts`, skip-link target, sticky behaviour (none today — keep) |
| `mobile-nav.tsx` | Button border/label styling; menu panel surface, dividers, CTA block colour | Button hover/focus; menu link press state; 44 px targets | `useState` logic, `aria-expanded`/`aria-controls`, conditional render, the fact it is the only client component |
| `site-footer.tsx` | Column layout typography, muted palette, top border; optional deep-ink band (A) with verified contrast | Link hover/focus on dark if band used | Link set, legal links, brand config consumption |
| `breadcrumbs.tsx` | Muted colour, separator tint, truncation on mobile | Link hover/focus | `aria-label`, list semantics, CSS-content separator (not read by SR), BreadcrumbList JSON-LD pairing |
| `page-header.tsx` | Display type scale (H1), lede width (≤ 75ch), optional rule/dimension motif (A) | — | H1 uniqueness, heading order, server rendering |
| `section.tsx` | Background alternation canvas/surface; standardised `py` rhythm; optional numbered headings (A: "03 — Process") | — | Section order, heading levels, container width `max-w-6xl` |
| `cards.tsx` (service/package/project/article variants) | Border-first cards (A: hairline + 4 px radius), title/desc/meta type, price row styling (indicative notice stays), category tags | Hover (border-strengthen + title underline; B/C add shadow), focus-within ring, disabled none | Card links (internal-linking system), heading levels inside cards, alt-text patterns, template badge on project templates |
| `related-content.tsx` | List/card styling consistent with cards | Hover/focus as cards | Which links render (curated relations) |
| `cta-quote.tsx` | Primary CTA = solid `--color-cta`/signal (one per view), secondary = outline accent; supporting text muted | Hover (darken 8%), focus (ring), active (darken 12%) | CTA hrefs, single-CTA-per-view discipline, no sticky/floating |
| `quote-form.tsx` | Input borders (`--radius-control`), label weight, help text muted, consent row spacing, submit = primary button | Input focus (accent border + ring), error banner (existing `?error=1` styling — keep prominent), invalid state (border + icon + text, never colour-only) | Field names, honeypot, `rendered_at`, required attributes, server action wiring, POPIA consent text |
| `contact-form.tsx` | Same system as quote-form | Same | Same |
| `trust-signals.tsx` | Icon + claim layout (inline SVG per icon rules), method-first ordering per `MESSAGING-FRAMEWORK.md` trust framework | — | Only verifiable claims render; no ratings/logos until permissioned |
| `process-steps.tsx` | Numbered technical steps (A: drawing-style numerals/rules) | — | Step count/order (matches process page content), heading levels |
| `faq-list.tsx` | Question weight, answer prose width, divider rules | If disclosure ever added: it isn't — stays fully rendered text | Server-rendered Q+A text (crawlable), FAQPage JSON-LD only on /faq/ |
| `placeholder-notice.tsx` | Keep high-visibility notice tokens (`--color-notice*` unchanged); typography aligned only | — | Renders wherever placeholder content exists — never de-emphasise |
| `json-ld.tsx` | none — no visual surface | — | Everything |

## Page-level surfaces without dedicated components

| Surface | Plan |
|---|---|
| Homepage hero | Copy per approved set in `docs/content/HOMEPAGE-MESSAGING-OPTIONS.md`; layout unchanged; optional direction motif (A: dimension-annotated diagram as SVG, explicit dims, lazy if below fold — it isn't: keep it light, inline) |
| Comparison tables | Prose-width tables, header row surface tint, row hover tint; horizontal scroll wrapper below 480 px with visible affordance — no content removal |
| Article typography | Type scale via prose classes: h2/h3 hierarchy, 60–75ch measure, list/blockquote/table styling, code/mono for figures (A) |
| Project case studies | Figure + caption pattern for screenshots (16:9), spec-sheet summary block (A styling), outcome section reserved for verified metrics only |
| Pricing page | Range table typography; "indicative" notice styling unchanged in prominence; what-moves-price panels on surface |

## Rules that bind every row

1. Class changes only; if a change seems to need DOM restructuring, stop and record a decision-log entry first.
2. Every interactive element: visible focus (3 px ring), 44 px minimum target, state not conveyed by colour alone.
3. No new `'use client'`; no component libraries; icons are inline SVG.
4. After each component group: `npm run check`, build, and the view-source text diff (content byte-identical apart from class attributes).
