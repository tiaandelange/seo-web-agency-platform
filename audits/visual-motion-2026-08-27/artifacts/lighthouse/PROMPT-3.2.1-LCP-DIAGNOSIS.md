# Prompt 3.2.1 — Homepage LCP (final)

## Exact LCP element

`img.home-hero-mountain-image` inside `div.home-hero-mountains > picture`
(all 6 live baseline passes + all local verify passes)

## Timing breakdown (live baseline, simulated)

| Pass | LCP | TTFB | Load delay | Load dur | Render delay | fetchPriority |
|------|-----|------|------------|----------|--------------|---------------|
| m1 | 3.56s | 557 | 19 | 191 | 504 | missing |
| m2 | 3.91s | 224 | 14 | 258 | **1360** | missing |
| m3 | 3.84s | 366 | 29 | 241 | **1311** | missing |
| d1 | 3.58s | 360 | 36 | 433 | 717 | missing |
| d2 | 4.19s | 371 | 26 | 491 | **1015** | missing |
| d3 | 3.42s | 185 | 33 | 206 | 694 | missing |

Dominant variable: **element render delay**. Network payload ~66 KB already fine. Doc TTFB short.

## Root cause

1. Art-directed `getImageProps({ priority: true })` did **not** emit `fetchpriority=high` → Medium priority (LCP discovery fail).
2. Runtime CSS `filter: brightness/contrast/saturate` on the LCP `<img>` inflated paint cost under CPU throttle.

## Implementation (no composition / copy change)

| Change | File |
|--------|------|
| `fetchPriority="high"`; strip `loading=lazy` | `components/home/home-hero.tsx` |
| Point at filter-baked WebPs | `components/home/home-hero.tsx` |
| Remove CSS filter from LCP img | `app/globals.css` |
| Baked assets | `public/images/hero-mobile.lcp-baked.webp` (31 KB), `…hero.lcp-baked.webp` (43 KB) |
| Defer Plex Mono preload | `app/layout.tsx` |

## Metrics

### Live baseline (simulated medians — Prompt 3.2)

| | Perf | LCP | CLS | TBT | Bytes |
|--|------|-----|-----|-----|-------|
| Mobile | 0.87 | 3.84s | 0 | 39ms | 561 KB |
| Desktop | 0.64 | 3.58s | 0.0006 | 116ms | 723 KB |

### Live observed LCP (same reports, unthrottled)

| | Observed LCP median |
|--|---------------------|
| Mobile | 1.86s |
| Desktop | 1.54s |

### Local after fix (`local-lcp-final` / `local-lcp2`)

| | Sim LCP | Obs LCP | CLS | TBT | Bytes | fetchPriority |
|--|---------|---------|-----|-----|-------|---------------|
| Mobile | ~3.9–4.1s | **~0.84s** | 0.118 (lead font) | ~90–114ms | **519 KB** | true |
| Desktop | ~4.1s | **~0.90s** | 0.205 (enquiry-system; also live pass1) | ~63ms | **692 KB** | true |

**Do not treat local simulated LCP vs live simulated LCP as a regression** — localhost + LH simulate throttling is not comparable to production edge. Prefer **observed** LCP and a post-deploy live re-run.

Byte delta: mobile **−42 KB**, desktop **−31 KB**.

## Remaining risks

1. **Simulated LCP still >2.5s** until proven on live after deploy.
2. **Local CLS** on `.home-hero-lead` (font swap exposed by earlier paint) and `#enquiry-system` (same culprit as live desktop outlier) — follow-up; not fixed in this ticket beyond Plex preload deferral.
3. Homepage first-load JS **124 KB** (budget 120 KB) — pre-existing, unchanged by this ticket.
4. Confirm baked mountain tone vs live screenshots in `artifacts/screenshots/lcp-3.2.1/`.

## `/contact/` desktop a11y 0.96

- **Scoring audit:** `color-contrast` (weight 7)
- **Selector:** `header.contact-hero … p.text-label.text-cta`
- **Issue:** copper `#b85c24` on surface `#f6f7f4` = 4.25:1 (need 4.5:1 at 11px)
- **Map → Prompt 3.4** (small-label contrast)
- Non-scoring: `label-content-name-mismatch` on logo (weight 0)
