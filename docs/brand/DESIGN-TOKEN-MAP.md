# Design token map

Updated 2026-07-22 for **Koppie Systems** preview implementation. Source: `docs/brand/KOPPIE-SYSTEMS-BRAND-IDENTITY.md`. Contrast: `docs/brand/CONTRAST-AUDIT.md`.

## Implemented semantic → brand mapping (`app/globals.css` `@theme`)

| Semantic token | Value | Brand role |
|---|---|---|
| `--color-canvas` | `#FFFFFF` | Pure white reading surface |
| `--color-surface` | `#F6F7F4` | Cloud White sections/cards |
| `--color-ink` | `#14242B` | Koppie Slate — headings, dark bands, footer |
| `--color-muted` | `#4A5560` | Secondary text (AA) |
| `--color-graphite` | `#2C3338` | Body text |
| `--color-line` | `#D6DBD9` | Borders |
| `--color-accent` / `--color-link` | `#1E6F6D` | Mineral Teal — links / secondary |
| `--color-cta` | `#B85C24` | Signal Copper — primary CTAs |
| `--color-sandstone` / `--color-accent-soft` | `#E8DFC9` | Warm supporting surfaces |
| `--color-cta-contrast` / `--color-accent-contrast` | `#FFFFFF` | Text on dark / CTA |
| `--radius-card` | `0.625rem` | 10px medium radius |
| Fonts | Manrope / Inter / IBM Plex Mono via `next/font` | Heading / body / technical |

Functional colours (success/warning/error/information/disabled/input) match the brand brief.

## Rules

- Components use semantic Tailwind utilities (`bg-cta`, `text-link`, `bg-ink`, …) — not raw hex.
- Signal Copper is reserved for commercial action; never for errors.
- Sandstone is not used for small text on white.
- Provisional wordmark lives in `components/brand-wordmark.tsx` until `brand.verification.logoFinal`.
