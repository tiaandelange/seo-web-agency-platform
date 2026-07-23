# Portfolio screenshot migration report

**Date:** 23 July 2026  
**Objective:** Replace live-coded project hero previews with optimised screenshot previews.

## Result

Work/project cards no longer reconstruct Damtech, Proplytic or the wedding site in-browser. They render consistent 16:9 WebP screenshots with a light browser chrome, responsive mobile swaps below 640px, and truthful public status labels.

## Screenshots added

| File | Source | Size |
|---|---|---|
| `public/images/work/damtech-desktop.webp` | Live `https://www.dam-tech.co.za/` @ 1440×900 | ~118 KB |
| `public/images/work/damtech-mobile.webp` | Live Damtech @ 390×844 | ~36 KB |
| `public/images/work/proplytic-desktop.webp` | Live `https://www.proplytic.co.za/` @ 1440×900 | ~60 KB |
| `public/images/work/proplytic-mobile.webp` | Live Proplytic @ 390×844 | ~26 KB |
| `public/images/work/wedding-desktop.webp` | Local `Wedding_site` static server @ 1440×900 | ~99 KB |
| `public/images/work/wedding-mobile.webp` | Local wedding site @ 390×844 | ~32 KB |

Capture helper: `scripts/capture-work-screenshots.cjs`  
Manifest: `docs/technical/production-crawl-artifacts/screenshot-raw/capture-manifest.json`

## Files changed (primary)

- `components/projects/project-screenshot.tsx` — new reusable component
- `components/projects/project-showcase-card.tsx` — wired to screenshots
- `data/projects-showcase.ts` — screenshot fields + public labels
- `app/projects/[slug]/page.tsx` — case-study media section
- `content/projects/damtech-website.ts` / `proplytic-property-software.ts` — featuredImage + gallery; `placeholder: false` (still `noindex: true`)
- `components/cards.tsx` — removed “screenshots pending” chip
- `app/globals.css` — screenshot frame styles; removed unused project-layer hover rules
- `tests/project-screenshots.test.ts` — replaces preview provenance tests
- `package.json` — removed `preview:check-sources`

## Old code removed

- Entire `components/projects/project-preview/**` tree (authentic HTML/CSS reconstruction, viewports, scale hooks)
- `data/project-preview-sources.ts`
- `public/project-previews/**`
- Preview extraction/CSS scripts (`prepare-authentic-previews`, `regenerate-preview-css`, `build-wedding-preview-css`, etc.)
- `tests/project-preview.test.ts`

Industrial Engine on `/projects/` was **kept** — it is a separate systems demonstration, not a portfolio site thumbnail.

## Status labels (public)

| Project | Label |
|---|---|
| Damtech | Live project |
| Proplytic | Live project |
| Wedding | Personal event website |

No “screenshots pending”, “publication pending”, or “case study in preparation” on public cards.

## Test results

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run test` | Pass (89 tests) |
| `npm run validate:seo` | Pass (64 routes / 52 indexable / 12 noindex) |
| `npm run lint` | Pass |
| `npm run build` | Pass |

## Visual limitations

- Screenshots are viewport captures of the live/local hero state at capture time; later source-site changes require re-running the capture script.
- Card frames use `object-fit: cover` inside 16:9 — tall mobile UIs are cropped to the shared ratio on small breakpoints (intentional for card height consistency).
- Wedding capture used the local `Wedding_site` tree (no public production URL in showcase data).
- Cookie/consent UI is best-effort hidden before capture; residual overlays may appear if sites change banner markup.
- Case studies remain **noindex** until the remaining narrative/publication gate is cleared (screenshots alone do not flip indexing).
