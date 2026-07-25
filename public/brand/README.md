# Brand masters — Koppie Systems

## Live (production UI)

- **`koppie-logo-symbol-nobg.svg`** — live header mark (transparent, no circular field)
- **`koppie-logo-symbol.svg`** — Figma circular mark (field = theme ink `#14242B`; favicon/apple)
- Wordmark — HTML beside the mark in `components/brand-wordmark.tsx`
- **`app/icon.svg`** — SVG favicon (synced by build script)
- **`app/favicon.ico`** / **`public/favicon.ico`** — classic ICO fallback (16/32/48)
- **`public/apple-touch-icon.png`** — 180×180 Apple home-screen icon
- **`favicon.svg`** — copy under `public/brand/` for static review

Chrome logos in UI stay SVG; raster favicons are generated from the circular mark.

## Export / review lockups

`node scripts/build-logo-variants.cjs` regenerates:

| File | Role |
|---|---|
| `koppie-logo-horizontal.svg` | Mark + text (decks/print only) |
| `koppie-logo-white.svg` / `koppie-logo-dark.svg` | Mono exports |
| `logo-review.html` | Assembly sheet (`noindex`) |
