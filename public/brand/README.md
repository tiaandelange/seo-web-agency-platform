# Brand masters — Koppie Systems

## Live (production UI)

- **`koppie-logo-symbol.svg`** — Figma circular mark (field = theme ink `#14242B`)
- Wordmark — HTML beside the mark in `components/brand-wordmark.tsx`
- **`app/icon.svg`** / **`app/apple-icon.svg`** — same mark (synced by build script)
- **`favicon.svg`** — copy under `public/brand/` for static review

No PNG logo assets ship with the site.

## Export / review lockups

`node scripts/build-logo-variants.cjs` regenerates:

| File | Role |
|---|---|
| `koppie-logo-horizontal.svg` | Mark + text (decks/print only) |
| `koppie-logo-white.svg` / `koppie-logo-dark.svg` | Mono exports |
| `logo-review.html` | Assembly sheet (`noindex`) |
