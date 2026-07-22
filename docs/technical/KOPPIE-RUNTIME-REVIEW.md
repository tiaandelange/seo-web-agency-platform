# Visual / runtime regression — Koppie preview (2026-07-22)

Branch: `brand/koppie-systems`. Method: clean `npm run build`, `next start` on port 3011, HTTP content sweep + temporary Playwright Chromium (temp directory; lockfile untouched).

## Automated gates

- `npm run check` — PASS (lint, tsc, 21/21 tests, SEO validator)
- `npm run build` — PASS (64 pages, 103 kB shared JS)
- `npm run validate:seo` — PASS (58 / 50 / 8)

## Content invariance (sampled)

11 representative pages: homepage, service, solution, package, project template, article, comparison, location, contact, request-a-quote, about.

- Koppie Systems present; Meridian absent from active HTML
- Exactly one H1 per page
- Homepage H1: “Websites and systems built to generate enquiries”
- Primary CTA: “Request a Proposal”
- Project templates remain noindex (route registry unchanged)

## Browser runtime (Playwright mobile 375px)

| Check | Result |
|---|---|
| Console / page errors | Zero on `/`, `/contact/`, `/request-a-quote/`, `/services/business-websites/` |
| Horizontal overflow | 0px |
| One H1 | Pass |
| Mobile nav open/close + aria-expanded | Pass |

## Accessibility / contrast

Documented in `docs/brand/CONTRAST-AUDIT.md` — all listed combinations PASS WCAG AA (white on Copper 4.57:1; Teal links 5.50:1; Slate/Sandstone combinations ≥12:1).

## Performance notes

- First-load shared JS remains 103 kB (≤120 kB budget)
- Fonts via `next/font` (Manrope 500/600/700, Inter 400/500/600, IBM Plex Mono 400/500, latin subset, `display: swap`)
- Still exactly one client component (`mobile-nav.tsx`)
- Contour/grid motif is CSS-only

## Logo status

Temporary typographic wordmark + provisional geometric K. Not owner-final. See `docs/brand/LOGO-PRODUCTION-BRIEF.md`.
