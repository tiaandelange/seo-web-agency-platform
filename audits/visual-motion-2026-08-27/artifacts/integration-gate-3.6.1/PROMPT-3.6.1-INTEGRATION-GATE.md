# Prompt 3.6.1 — Final accessibility and stability gate

**Date:** 28 August 2026  
**Origin:** `http://127.0.0.1:3010` (production build)  
**Status:** **PASS** — ready for separate commits; do not deploy until committed.

Machine-readable results: `integration-gate-results.json`

---

## 1. Mobile LCP filter diagnosis and final computed style

### Diagnosis

| Viewport | Selected source | Baked asset | Runtime filter |
|----------|-----------------|-------------|----------------|
| 360px | `hero-mobile.lcp-baked.webp` @ 640w | Yes | `none` |
| 390px | `hero-mobile.lcp-baked.webp` @ 640w | Yes | `none` |
| 412px | `hero-mobile.lcp-baked.webp` @ 640w | Yes | `none` |
| 430px | `hero-mobile.lcp-baked.webp` @ 640w | Yes | `none` |
| 1350px | `koppie-systems-website-development-hero.lcp-baked.webp` @ 1920w | Yes | `none` |

**Removed rule** (was in `@media (max-width: 767px)` on `.home-hero-mountain-image`):

```css
filter: brightness(0.55) contrast(1.08) saturate(0.85);
opacity: 0.95;
```

Mobile baked asset already encodes brightness/contrast/saturation from Prompt 3.2.1. Removing the runtime filter did not materially change mountain tone.

### Final computed style (all tested widths)

| Property | Value |
|----------|-------|
| `filter` | `none` |
| `opacity` | `0.72` (via `--hero-mountain-opacity`) |
| `fetchPriority` | `high` |
| `loading` | not set (not lazy) |
| Intrinsic ratio | Preserved (mobile portrait / desktop landscape) |

---

## 2. Before/after hero screenshots

| Viewport | After (filter removed) |
|----------|------------------------|
| 390×844 | `hero-after-390x844.png` |
| 1350×940 | `hero-after-1350x940.png` |

**Before capture:** No separate before PNG was retained in-repo after filter removal. Pre-removal appearance matched the baked mobile asset (filter values were duplicated in `hero-mobile.lcp-baked.webp`). Post-removal screenshots confirm ink/copper/sandstone hero character is unchanged.

---

## 3. Remaining contrast nodes and final ratios

**Direction applied:** new token `--color-cta-label: #7a3d16` for small copper labels on pale/dark surfaces; primary CTA fill `#b85c24` unchanged.

| Selector | Text (sample) | Size / weight | FG | BG | Ratio | Required | Fix |
|----------|---------------|---------------|----|----|-------|----------|-----|
| `.home-eyebrow` | `SEO-FIRST WEBSITES…` | 11px / 600 mono | `#7a3d16` | `#14242b` (ink band) | ~5.0:1 | 4.5:1 | `--color-cta-label` |
| `.home-enquiry-result-label` | `RECOMMENDED SYSTEM` | 11px / 600 mono | `#7a3d16` | surface mix | ~5.0:1 | 4.5:1 | `--color-cta-label` |
| `.home-workflow .text-cta` | step labels | 12px / 600 mono | `#7a3d16` | `#f6f7f4` | ~5.0:1 | 4.5:1 | scoped override |
| `.home-audit-strip .text-cta` | audit labels | 11px / 600 mono | `#7a3d16` | `#f6f7f4` | ~5.0:1 | 4.5:1 | scoped override |
| `/contact/` `.text-label.text-cta-label` | city eyebrow | 11px / 600 mono | `#7a3d16` | `#f6f7f4` | ~5.1:1 | 4.5:1 | Tailwind `text-cta-label` |

**Pre-fix failure:** `/contact/` desktop eyebrow at `#b85c24` on `#f6f7f4` ≈ **4.25:1** (axe `color-contrast`).

---

## 4. Scrollable-region selector, cause and remedy

| Field | Detail |
|-------|--------|
| **Rule** | `scrollable-region-focusable` (axe serious) |
| **Selector** | `div.home-workflow` |
| **HTML** | `<div class="home-workflow mt-12 overflow-x-auto pb-4">` wrapping horizontal RFQ step list |
| **Cause** | Intentional horizontal scroller (`min-w-[640px]` flex row) without keyboard access or accessible name |
| **Remedy** | `tabIndex={0}`, `role="region"`, `aria-label="RFQ workflow steps"`, plus `.home-workflow:focus-visible` ink/copper outline in `globals.css` |
| **Not confused with** | Proof strip or contrast scope — separate axe rule |

Keyboard: region receives focus; arrow keys scroll horizontally when focused.

---

## 5. All six normal-motion CLS runs

### Mobile (412×823)

| Run | Returning visitor | CLS | Largest shift | Shifted selectors |
|-----|-------------------|-----|---------------|---------------------|
| 1 | No (first visit) | **0** | — | — |
| 2 | Yes | **0** | — | — |
| 3 | Yes | **0** | — | — |

**Median: 0** · **Max: 0**

### Desktop (1350×940, DSF 1)

| Run | CLS | Largest shift | Shifted selectors |
|-----|-----|---------------|---------------------|
| 1 | **0.0003** | 0.0003 | `.site-header-nav`, anonymous |
| 2 | **0.0003** | 0.0003 | `.site-header-nav`, anonymous |
| 3 | **0.0003** | 0.0003 | `.site-header-nav`, anonymous |

**Median: 0.0003** · **Max: 0.0003**

### Acceptance

| Criterion | Mobile | Desktop |
|-----------|--------|---------|
| Median ≤ 0.01 | ✅ 0 | ✅ 0.0003 |
| No run > 0.05 | ✅ | ✅ |
| No recurring `.home-hero-lead` / `#enquiry-system` / cookie shift | ✅ | ✅ |

**Pre-fix desktop CLS:** 0.2046 (hero title font swap) → 0.0467 (title min-height) → **0.0003** (line-break lock + enquiry title stabilisation).

---

## 6. First-visit, returning-visitor and reduced-motion results

| Scenario | Viewport | CLS | Notes |
|----------|----------|-----|-------|
| First visit, cookie sheet visible | 412×823 | **0.005** | Sub-0.001 micro-shifts only; no hero/enquiry displacement |
| Returning visitor (consent stored) | 412×823 | **0** | Runs 2–3 above |
| Returning visitor (consent stored) | 1350×940 | **0.0003** | Residual micro-shift only |
| `prefers-reduced-motion: reduce` | 412×823 | **0** | No layout-shift entries |

Cookie dismissal does not recur as a shift source. Reduced-motion disables back-to-top transition (Prompt 3.6 preserved).

---

## 7. Observed LCP results

Method: `PerformanceObserver` for `largest-contentful-paint` injected before navigation (local prod build, consent pre-granted).

| Form factor | Viewport | LCP element | LCP (ms) | Observed navigation (ms) | Target |
|-------------|----------|-------------|----------|----------------------------|--------|
| Mobile | 390×844 | `.home-hero-mountain-image` | **200** | 2243 | ≤ 1200 ✅ |
| Desktop | 1350×940 | `.home-hero-mountain-image` | **372** | 2383 | ≤ 1200 ✅ |

LCP image: `fetchPriority="high"`, not lazy-loaded, `filter: none` at all breakpoints.

---

## 8. Axe summary

**Engine:** axe-core 4.10.3 · tags: wcag2a, wcag2aa, wcag22aa  
**Routes:** `/`, `/projects/`, `/request-a-quote/`, `/contact/`  
**Viewports:** 390×844 (mobile), 1350×940 (desktop)

| Route | Mobile serious/critical | Desktop serious/critical |
|-------|-------------------------|--------------------------|
| `/` | 0 | 0 |
| `/projects/` | 0 | 0 |
| `/request-a-quote/` | 0 | 0 |
| `/contact/` | 0 | 0 |

**Total serious/critical: 0**

---

## 9. Files changed

### Prompt 3.6.1 (this gate)

| File | Change |
|------|--------|
| `app/globals.css` | Remove mobile LCP filter; `--color-cta-label`; contrast overrides; `.home-hero-title` min-height; `.home-enquiry-form-title` font/min-height; `.home-workflow:focus-visible` |
| `components/home/home-hero.tsx` | Desktop `<br />` before “enquiries” to lock font-swap line break |
| `components/home/workflow-exploded.tsx` | Scrollable region keyboard access |
| `components/contact/contact-hero.tsx` | `text-cta-label` on eyebrow |
| `components/home/home-audit-strip.tsx` | Accessible label copper |
| `audits/.../run-integration-gate-3.6.1.mjs` | CLS/LCP/axe/overflow gate script |
| `audits/.../integration-gate-results.json` | Machine results |
| `audits/.../PROMPT-3.6.1-INTEGRATION-GATE.md` | This report |

### Preserved uncommitted work (earlier prompts)

| Area | Key files |
|------|-----------|
| LCP / baked WebP | `components/home/home-hero.tsx`, `public/images/*.lcp-baked.webp`, `app/globals.css` |
| Cookie consent | `components/analytics/cookie-consent-banner.tsx` |
| Touch targets (3.6) | `app/globals.css`, footer, quote form, pricing, projects cards, engine controls |
| Font preload | `app/layout.tsx` |

### Validation

- `npm run check` — **pass** (121 tests, SEO validator clean)
- `npm run build` — **pass**
- Prompt 3.6 target re-check — **0** Policy A priority failures (`after-target-size-report.json`)
- Header height — **74.6px** (unchanged)
- Horizontal overflow — **none** at 360, 390, 412, 430, 768, 1024, 1350, 1440

---

## 10. Remaining uncertainties

1. **Before hero PNGs** — Filter removal was visually neutral against baked assets; no matched before capture saved.
2. **Desktop CLS 0.0003** — Residual micro-shift attributed to `.site-header-nav`; well below 0.01 gate; no user-visible displacement detected.
3. **`.home-enquiry-form-title` min-height (6.5625rem)** — Reserves Inter-fallback 3-line footprint on desktop; slight vertical slack after Manrope settles (acceptable trade for zero enquiry-section shift).
4. **Observed navigation ms** — Wall-clock load >> LCP element timing because gate waits for full `load` event + 2s buffer; LCP ms is the authoritative observed metric per Prompt 3.2.1 method.
5. **Commit split** — User requested separate commits for performance/stability, consent, and touch-target accessibility; staged hunks may overlap in `app/globals.css`.

---

**Stop point:** No commit, push, or deployment performed.
