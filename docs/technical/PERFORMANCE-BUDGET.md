# Performance budget

Budgets are mobile-first (mid-range Android, 4G). Blueprint Phase 16 targets adopted as hard budgets.

## Core Web Vitals (75th percentile, field data once available)

| Metric | Budget | Notes |
|---|---|---|
| LCP | ≤ 2.5 s | Skeleton phase: LCP element is the H1/text block — should land well under 1.5 s; keep it so when hero imagery arrives (priority hint + AVIF/WebP + explicit dimensions) |
| INP | ≤ 200 ms | Minimal client JS: only the mobile-nav toggle is interactive; keep third-party scripts out of the critical path forever |
| CLS | ≤ 0.1 | All images carry width/height; no late-injected banners; fonts are system-stack (zero FOUT) in skeleton phase — if custom fonts arrive, use `size-adjust` fallbacks |

## Payload budgets (per page, first load, gzipped)

| Asset class | Budget |
|---|---|
| HTML | ≤ 50 KB |
| CSS | ≤ 50 KB |
| Client JS (first load) | ≤ 120 KB (framework baseline); zero page-specific client JS unless a feature demands it |
| Images above the fold | ≤ 200 KB |
| Web fonts | 0 KB now; ≤ 100 KB if visual phase adds fonts (WOFF2, subset, self-hosted) |
| Third-party scripts | 0 at launch; GA4 only after consent decision, loaded `afterInteractive` |

## Standing rules

1. Server components by default; `"use client"` requires a justification comment (current count: 1 — mobile nav).
2. No carousels, animation libraries, video backgrounds, or visual-effect JS (blueprint Phase 10 prohibition) — the visual phase must respect the budgets above, not just the skeleton.
3. `next/image` for all content imagery; explicit dimensions mandatory.
4. Static generation for every public route (no runtime data fetching on indexable pages).
5. Any budget breach blocks merge — measured by Lighthouse CI or manual Lighthouse run (checklist below).

## Measurement workflow

- Pre-launch: Lighthouse (mobile emulation) on home, one service, one article, pricing, quote page — record scores in PROJECT-STATUS. Targets: Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Post-launch: GSC Core Web Vitals report monthly + PageSpeed Insights field data once traffic qualifies (90-day plan).
- Regression tripwires: `npm run build` output size review per release; keep First Load JS reported by Next under budget.
