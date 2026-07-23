# Koppie Systems — Structural & Visual Theme Audit

**Target:** `https://www.koppiesystems.co.za`
**Repository:** `seo-web-agency-platform` (Next.js App Router)
**Method:** Live-browser crawl of every route in `sitemap.xml` (51 URLs), reading **rendered DOM + computed CSS** on each page, then diffed against the documented design system in `app/globals.css` (`@theme`) and `config/brand.ts`. All colour findings were re-verified with a **format- and alpha-aware** parser (see §5).
**Date:** 2026-07-23
**Scope:** 51 indexable routes (the "~60 pages" figure includes non-indexed/query-param variants; the canonical indexed set is 51).

> Written for Cursor ingestion. Anomalies are grouped by type so you can run multi-file edits per group. Every hex, size and width is a **measured computed value**, mapped back to the intended token. Machine-readable summary: `audit-data.json` (same folder). A ready-to-drop **`.cursorrules`** is at the repo root.

---

## Headline

**This site is unusually disciplined.** Fonts, colour palette and button system are effectively clean and token-driven. There are **no rogue fonts, no rogue hex colours, and no off-system button styles.** The real issues are a small, focused set of **heading-hierarchy and type-role** problems plus **minor layout drift**, concentrated on listing/index pages and the contact page. Fix effort is low and mostly shared-component level.

An important process note: a naive first-pass colour scan flagged several "pure black" surfaces and buttons. On alpha/format-aware re-verification these were all **false positives** — transparent backgrounds, modern `color(srgb …)` light greys, and correct `bg-ink/95` tokens expressed in `oklab()` — none were real. They have been removed. See §5.

---

## 1. Baseline Global Architecture (master template)

The canonical rules the audit measures every page against — from `app/globals.css @theme`, confirmed as the actual rendered value on the majority of pages.

### 1.1 Typography

| Role | Token | Intended | Rendered baseline | Font |
|------|-------|----------|-------------------|------|
| Body / UI | `--font-sans` → Inter | `1.0625rem` (17px) | Inter, 17px | **Inter** (51/51) |
| Headings | `--font-heading` → Manrope | — | Manrope | **Manrope** (51/51) |
| Mono / technical labels | `--font-mono` → IBM Plex Mono | — | IBM Plex Mono | **IBM Plex Mono** (26/51) |
| Page title (H1) | `--text-page-title` | `clamp(1.875–2.5rem)` → max **40px** | 40px on 49 pages | Manrope |
| Section title (H2) | `--text-section-title` | `clamp(1.75–2.5rem)` → max **40px** | 40px on 40 pages | Manrope |
| Card title (H3) | `--text-card-title` | 18px (`1.125rem`) | 16px on 30 pages | Manrope |
| Label | `--text-label` | 11px (`0.6875rem`) | — | mono |

**Font verdict: clean — only the three sanctioned families appear anywhere. Zero rogue fonts.**

### 1.2 Colour palette (source of truth — `@theme`)

| Semantic token | Hex | Role |
|----------------|-----|------|
| `--color-cta` | `#b85c24` | Signal Copper — primary commercial action |
| `--color-ink` | `#14242b` | Koppie Slate — headings, **dark bands (`.band-ink`)** |
| `--color-graphite` | `#2c3338` | Body text |
| `--color-muted` | `#4a5560` | Secondary text |
| `--color-accent` / `--color-link` | `#1e6f6d` | Mineral Teal — links & secondary |
| `--color-surface` | `#f6f7f4` | Cloud White — section background |
| `--color-sandstone` | `#e8dfc9` | Sandstone |
| `--color-notice` | `#fff8e6` | Notice band |
| `--color-input` | `#fbfcfa` | Form fields |
| `--color-canvas` | `#ffffff` | Page canvas |

**Palette verdict: clean.** Every rendered surface, text and dark band resolved to one of these tokens (dark sections correctly use `.band-ink` / `bg-ink`). **No hardcoded or off-token colours were confirmed.**

### 1.3 Layout / containers

| Container class | Token | Width |
|-----------------|-------|-------|
| `.koppie-container` | `--width-content` | **1152px** (72rem) — default page width |
| `.koppie-container-wide` | `--width-content-wide` | 1240px — interactive/preview grids only |
| `.koppie-container-narrow` | `--width-content-narrow` | 760px — readable long-form measure |

**Rendered baseline:** inner content container = **1152px on 49/51 pages** — the master container rule holds.

### 1.4 Navigation, header & footer

Every page (51/51) renders exactly **one `<main>`, one `<footer>`, and exactly one `<h1>`** — the wrapper contract holds site-wide. Footer is consistent (Services / Company / Resources / Get-in-touch, contact block from `config/brand.ts`, legal row). Expected interior landmark signature: **`header:2 / nav:3 / main:1 / footer:1`** (site header + hero header; primary + breadcrumb + footer nav).

### 1.5 Buttons (canonical — verified on-system)

| Role | Background | Text | Weight | Radius |
|------|-----------|------|--------|--------|
| Primary CTA | `--color-cta` `#b85c24` | `#ffffff` | 600 | `--radius-control` **4px** (`rounded-sm`) or `--radius-card` **10px** (`rounded-card`) |
| Secondary | `#ffffff` | `--color-ink` `#14242b` | 500 | 10px |

Both 4px and 10px are **sanctioned tokens**; observing both is correct, not drift. The only 0px-radius copper element is the accessibility **`.skip-link`** (off-screen until focused) — intended.

---

## 2. Structural Deviations Report

Grouped for multi-file editing. **No page is missing `<main>`, none has zero/duplicate `<h1>`, no rogue fonts.** The real structural issue is heading-level skipping on listing pages.

### S1 — Heading hierarchy skip on listing/index pages — 7 pages *(primary finding)*

Listing templates render card titles as `<h3>` **directly under the page `<h1>`**, skipping the `<h2>` level — and the page's real `<h2>` section headings appear *after* the card grid. Verified outline on `/website-packages/`: `H1 → H3×6 (package cards) → H2×2`. Same on `/solutions/`: `H1 → H3×6 → H2`. This breaks the document outline (WCAG 1.3.1 / 2.4.6).

```
/areas-we-serve/                     (spot-checked group; H1→H3 pattern)
/compare/
/process/
/resources/seo-guides/
/resources/website-cost-guides/
/solutions/            ← verified
/website-packages/     ← verified
```

**Fix (shared component):** promote the listing/card titles from `<h3>` to `<h2>`, or add a section-level `<h2>` above each card grid so cards can legitimately be `<h3>`. Almost certainly a single listing-grid component that propagates to all 7.

### S2 — Non-uniform landmark counts — low severity, confirm intent

| Page | header / nav / main / footer |
|------|------------------------------|
| Interior baseline (49) | 2 / 3 / 1 / 1 |
| `/` (home) | 1 / 2 / 1 / 1 — no breadcrumb, hero not wrapped in `<header>` |
| `/services/` | 2 / 4 / 1 / 1 — one extra `<nav>` (sub-navigation) |

Home legitimately omits the breadcrumb; consider wrapping its hero in `<header>` for parity. Confirm `/services/`'s extra `<nav>` is intentional (or make it a non-landmark `<div>`).

### S3 — Container width drift — `/contact/`

`/contact/` renders its form column at **512px** (≈32rem) via an ad-hoc `max-width`, not a container token (nearest is `--width-content-narrow` = 760px). Replace with `.koppie-container-narrow` or introduce a dedicated `--width-form` token. (Home is full-bleed `none` — acceptable hero pattern.)

### S4 — Hero H1 size inconsistency — minor

`/` hero H1 = **60px** (exceeds `--text-display-editorial` max of 56px); `/projects/` hero H1 = **56px**; all other pages = 40px. Pick one display role for hero H1s.

---

## 3. Visual Theme Anomalies

Fonts, palette and buttons are clean (see §1). The remaining theme issues are **type-role** mismatches — heading elements rendered at the wrong scale.

### V1 — Label-sized heading — `/contact/` *(real, verified)*

`/contact/` contains `<h3>What happens next</h3>` rendered at **11px** = `--text-label`. A label-scale value on a heading element is a visual + semantic mismatch. Use `<p class="text-label">` (or a styled `<span>`), or restore card-title scale if it should remain a heading.

### V2 — Inconsistent H3 scale on service pages *(real, verified)*

Service pages mix a single **28px** `<h3>` (section-like, e.g. "Common symptoms" on `/services/ecommerce-websites/`) with **16px** card-title H3s in the same document. Confirmed on `/services/ecommerce-websites/`; same pattern on `/services/custom-web-applications/` and `/services/seo-website-development/`. Give the 28px item its own role/token or bring it in line with the card-title scale.

### V3 — Reduced heading scale on legal & resources — confirm intent

Legal pages (`/legal/privacy-policy/`, `/terms-of-service/`, `/cookie-policy/`) render `<h2>` at **20px**; long-form resources pages render `<h2>` at **24px**, versus the 40px `--text-section-title`. Hierarchy is otherwise correct (no skips). This is most likely a deliberate article/long-form template — **if so, formalise it as a `--text-section-title-article` token** rather than leaving it as an inline size, so it stays consistent.

### V4 — Inline `style` attributes — minor

`/projects/` carries 7 inline-styled elements (highest; most pages 1–2). Migrate to token-backed utility classes.

### Confirmed clean (no action)
- **Fonts:** Inter / Manrope / IBM Plex Mono only.
- **Colour:** no rogue hex; dark bands correctly use `--color-ink` / `.band-ink`.
- **Buttons:** two roles, two sanctioned radii (4px / 10px); the 0px copper element is the intended skip-link.
- **Wrapper contract:** every page has exactly one `<main>`, one `<footer>`, one `<h1>`.

---

## 4. Cursor Project Rules Addendum

A ready-to-drop **`.cursorrules`** is written to the repo root. It encodes the baseline above so Cursor can patch the §2–§3 pages without drifting from the system.

> This repo already uses the modern `.cursor/rules/*.mdc` format (e.g. `brand-tokens.mdc`). The root `.cursorrules` is the legacy format you requested and is still honoured; it is written to **complement, not contradict** the existing `.mdc` rules. The same content can instead be delivered as `.cursor/rules/structure-theme-fixes.mdc` if you prefer.

Key guarantees in `.cursorrules`:
- Colour only via `@theme` tokens; dark surfaces via `--color-ink` / `.band-ink`.
- Button radius limited to `--radius-control` (4px) or `--radius-card` (10px).
- Container width via `--width-content*` tokens; no ad-hoc `max-w-*` on page shells.
- Heading elements follow the type-role scale and **never skip a level** (`H1→H2→H3`); listing card titles are `<h2>`.
- Structure, routes, metadata and heading hierarchy are never changed to achieve a *visual* fix.

---

## 5. Method, verification & honest caveats

- Routes enumerated from `sitemap.xml` (51 `<loc>` entries). Each loaded in a real Chromium tab; `getComputedStyle` sampled across up to 2,500 elements/page for font-family, colour, background, container `max-width`, heading sizes, landmark counts and button styling.
- **Colour re-verification:** the first automated pass used a simple `rgb()→hex` helper that mis-handled (a) transparent `rgba(0,0,0,0)`, (b) modern `color(srgb …)` float syntax, and (c) `oklab()` token output — producing spurious "pure black" hits on `/`, `/projects/`, `/services/`, `/services/custom-web-applications/` and `/contact/`. A second pass with a format- and alpha-aware parser found **zero** genuine opaque near-black surfaces or buttons; the one apparent hit was `<aside class="bg-ink/95">` (correct token). **All colour "anomalies" from the first pass were withdrawn.**
- Button "radius drift" was likewise re-checked: the two radii in use (4px, 10px) are both sanctioned tokens, and the 0px copper element is the intended `.skip-link`. No button anomaly stands.
- Findings retained (S1–S4, V1–V4) were each confirmed against live DOM values; heading-skip and type-role items were spot-verified on named pages.
- Raw/structured data: `audit-data.json` (same folder).
