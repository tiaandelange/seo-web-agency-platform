# Brand asset register — Koppie Systems

| Asset | Status | Path | Notes |
|---|---|---|---|
| Primary circular mark (SVG) | **Active (live)** | `public/brand/koppie-logo-symbol.svg` | Figma master; field `#14242B` = `--color-ink` |
| Header brand lockup | **Active (live)** | `components/brand-wordmark.tsx` | SVG mark + HTML “Koppie” / “Systems” |
| Favicon / apple icon | **Active (live)** | `app/icon.svg`, `app/apple-icon.svg` | Synced from symbol via `scripts/build-logo-variants.cjs` |
| Export lockups | **Optional** | `public/brand/koppie-logo-horizontal.svg` etc. | Not used in site chrome |
| React logo helpers | **Available** | `components/brand/koppie-logo.tsx` | Same SVG + HTML text pattern |
| Social share default (1200×630) | **Open** | — | Derive from mark + type |

## Policy

- Website chrome: **SVG mark + HTML wordmark** — no PNG logos.
- Circular field uses theme ink so it matches dark bands / immersive header.
- Rebuild icons after editing the symbol: `node scripts/build-logo-variants.cjs`.
