# Brand asset register — Koppie Systems

| Asset | Status | Path | Notes |
|---|---|---|---|
| Primary mark without circular field (SVG) | **Active (live)** | `public/brand/koppie-logo-symbol-nobg.svg` | Transparent; used in header lockup |
| Circular mark (SVG) | **Available** | `public/brand/koppie-logo-symbol.svg` | Figma master with field `#14242B`; favicon/apple still use this |
| Header brand lockup | **Active (live)** | `components/brand-wordmark.tsx` | SVG mark + HTML “Koppie” / “Systems” |
| Favicon (SVG) | **Active (live)** | `app/icon.svg` | Synced from symbol via `scripts/build-logo-variants.cjs` |
| Favicon (ICO fallback) | **Active (live)** | `app/favicon.ico`, `public/favicon.ico` | 16/32/48 PNG-in-ICO from circular mark; classic `/favicon.ico` |
| Apple touch icon | **Active (live)** | `public/apple-touch-icon.png` | 180×180; used instead of `app/apple-icon` (broken under `trailingSlash`) |
| Manifest icon (512×512) | **Active (live)** | `public/icon.png` | Referenced by `app/manifest.ts` |
| Google Business / Organization logo (1024×1024) | **Active (live)** | `public/images/brand/koppie-systems-logo-google.png` | White background; Organization `logo` ImageObject; upload manually to GBP |
| Export lockups | **Optional** | `public/brand/koppie-logo-horizontal.svg` etc. | Not used in site chrome |
| React logo helpers | **Available** | `components/brand/koppie-logo.tsx` | Same SVG + HTML text pattern |
| Social share default (1200×630) | **Active (live)** | `app/opengraph-image.jpg`, `app/twitter-image.jpg` | File-convention OG/Twitter; mirror at `public/images/og/koppie-systems.jpg` |
| Homepage preferred thumbnail (1200×675) | **Active (live)** | `public/images/seo/koppie-systems-homepage-thumbnail.jpg` | Visible on home + `primaryImageOfPage`; labelled illustrative (section copy + footer strip; no white callout card) |

## Policy

- Website chrome: **SVG mark + HTML wordmark** — no PNG logos.
- Circular field uses theme ink so it matches dark bands / immersive header.
- Rebuild icons after editing the symbol: `node scripts/build-logo-variants.cjs` (SVG variants + favicon.ico + apple-touch-icon.png).
