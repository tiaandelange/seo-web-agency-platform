# Design token map

Prepared 2026-07-21. Maps every current token in `app/globals.css` `@theme` to its target per brand direction. The visual phase edits **only these values** (plus `@font-face` additions). Contrast figures are pre-checks; re-verify at implementation with the final hexes.

## Current neutral tokens (baseline)

```css
--color-canvas: #ffffff;
--color-surface: #f6f7f8;
--color-ink: #16181d;
--color-muted: #4a5361;
--color-line: #e2e5e9;
--color-accent: #1f3a5f;
--color-accent-soft: #eef2f7;
--color-accent-contrast: #ffffff;
--color-notice: #fff8e6;
--color-notice-border: #e6d9a8;
--font-sans: ui-sans-serif, system-ui, …;
--radius-card: 0.5rem;
```

## Token targets per direction

| Token | A — Technical Precision | B — Modern Systems Studio | C — Commercial Growth Partner | Contrast rule |
|---|---|---|---|---|
| `--color-canvas` | #FFFFFF | #FFFFFF | #FFFFFF | — |
| `--color-surface` | #F4F6F8 | #F5F6FA | #F7F6F3 | ink on surface ≥ 4.5:1 |
| `--color-ink` | #121A24 (17.6:1) | #171923 (16.9:1) | #1C2321 (15.9:1) | ≥ 4.5:1 on canvas+surface |
| `--color-muted` | #46556A (7.5:1) | #4B5265 (7.0:1) | #4E5A55 (6.6:1) | ≥ 4.5:1 everywhere used |
| `--color-line` | #D8DEE6 | #E1E4EC | #E3E1DB | ≥ 3:1 vs adjacent fills when semantic |
| `--color-accent` | #0F3D5C (10.4:1) | #3B3FB6 (8.2:1) | #0E5A4A (7.9:1) | ≥ 4.5:1 as text; ≥ 3:1 as UI |
| `--color-accent-soft` | #EAF1F6 | #EDEEFB | #E9F1EE | decorative only |
| `--color-accent-contrast` | #FFFFFF | #FFFFFF | #FFFFFF | ≥ 4.5:1 on accent |
| `--color-notice` | keep #FFF8E6 | keep | keep | placeholder notices stay high-visibility |
| `--color-notice-border` | keep #E6D9A8 | keep | keep | — |
| `--font-sans` | 'IBM Plex Sans' + size-adjusted fallback stack | 'Inter' + fallback stack | 'Source Sans 3' + fallback stack | CLS-safe fallback metrics mandatory |
| `--radius-card` | 0.25rem | 0.5rem | 0.75rem | — |

## New tokens to add (per direction; additive, no renames)

| New token | A | B | C | Purpose |
|---|---|---|---|---|
| `--color-signal` / `--color-cta` | #B45309 (4.6:1) | — (accent doubles) | #B4451F (4.9:1) | single warm conversion colour (one per view) |
| `--color-panel` | #0E1621 (optional band) | #14161F | — | dark section background |
| `--color-panel-ink` | #FFFFFF (16:1) | #FFFFFF (16.4:1) | — | text on panel |
| `--font-display` | 'IBM Plex Sans' 600 | 'Space Grotesk' | 'Bricolage Grotesque' or 'Plus Jakarta Sans' | headings (B/C pair two families; A uses weight) |
| `--font-mono` | 'IBM Plex Mono' (subset) | — | — | figures/spec labels (A only) |
| `--radius-control` | 0.25rem | 0.375rem | 0.625rem | inputs/buttons distinct from cards |

Rules for additions: components consume new tokens via Tailwind theme utilities (Tailwind 4 maps `@theme` automatically); never hardcode a hex in a component; `--color-notice*` never changes (the honesty notice must not blend in).

## Font-face plan (all directions)

- WOFF2 only, self-hosted in `public/fonts/`, subset latin + currency; total ≤ 100 KB.
- `font-display: swap` + `size-adjust`/`ascent-override` fallback metrics tuned per family (CLS 0 target).
- Preload only the body-weight file on all pages (`<link rel="preload">` in root layout).
- Licences: IBM Plex, Space Grotesk, Inter, Source Sans 3, Plus Jakarta Sans, Bricolage Grotesque — all SIL OFL 1.1 (verify the downloaded release ships its OFL text; keep it in the repo beside the fonts).

## What never changes in this file's scope

`:focus-visible` outline rule (retint only), skip-link behaviour, breadcrumb separator mechanism, reduced-motion kill-switch — these live in `globals.css` below the theme block and are functional, not thematic.
