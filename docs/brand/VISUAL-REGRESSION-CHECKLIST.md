# Visual regression checklist

Prepared 2026-07-21. Run after **each step** of `VISUAL-IMPLEMENTATION-PLAN.md` (quick pass: sections 1–3) and in full before visual-phase sign-off. Purpose: prove the theme changed and nothing else did.

## 1. Automated gates (every step)

- [ ] `npm run check` — lint, typecheck, 21 tests, SEO validator: zero errors, zero warnings.
- [ ] `npm run build` — succeeds; route table unchanged (57 static + 2 dynamic); first-load JS ≤ 120 KB shared.
- [ ] Font payload: total WOFF2 ≤ 100 KB (list files + sizes).

## 2. Content invariance (every step)

Diff built HTML (before vs after) for one page per template type — homepage, service, solution, package, project template, article, comparison, location, contact, request-a-quote, thank-you:

- [ ] Identical: title, meta description, canonical, robots directive.
- [ ] Identical: H1 text and full heading outline (h1→h2→h3 order).
- [ ] Identical: all internal link hrefs and anchor text.
- [ ] Identical: JSON-LD blocks (byte-for-byte).
- [ ] Body text content unchanged (class/style attributes excepted).
- [ ] Noindex routes still emit `noindex,follow`; sitemap still lists exactly the 50 indexable URLs.

## 3. Accessibility (every step for touched components; full at sign-off)

- [ ] Contrast audit of the final token values: body ≥ 4.5:1 on every background it appears on; UI/large ≥ 3:1; focus ring ≥ 3:1 against adjacents (record the measured ratios).
- [ ] Keyboard pass: tab through header → nav → page → forms → footer; skip link first; focus always visible; no traps; mobile nav operable by keyboard.
- [ ] axe (or equivalent) scan on 3 templates: zero new violations.
- [ ] Forms: labels associated, errors announced in text (not colour-only), consent checkbox reachable, 44 px targets.
- [ ] `prefers-reduced-motion`: enable in OS/emulation and confirm no animation/transition runs.
- [ ] Zoom 200%: no loss of content/functionality, no horizontal overflow.

## 4. Visual/layout (full pass at sign-off)

At 360, 768, 1280 px on the 11 representative pages:

- [ ] No horizontal overflow (`scrollWidth ≤ clientWidth`).
- [ ] CLS: Lighthouse/DevTools performance trace ≤ 0.1 on homepage, one article, one package page (fonts are the usual culprit — verify fallback metrics).
- [ ] LCP element is the H1/hero text (not an image) and ≤ 2.5 s on throttled mobile.
- [ ] Cards align on grid; images hold ratio (no stretch); placeholder notices still prominent.
- [ ] Comparison tables scroll horizontally below 480 px with visible affordance.
- [ ] Dark bands (if used): text contrast re-measured; ≤ 2 per page.

## 5. Interaction states (sign-off)

- [ ] Every link/button: distinct hover, focus, active states per the maps.
- [ ] Mobile nav: opens/closes, `aria-expanded` correct, menu removed from DOM when closed, body links unreachable while open is false — matches the baseline runtime review.
- [ ] Primary CTA: exactly one loudest action per screen-view on commercial pages.
- [ ] Form error path (`?error=1`), native validation block, and honest success path (per configured delivery mode) re-tested in a real browser.

## 6. Performance (sign-off)

- [ ] Lighthouse (mobile, throttled) on homepage + one service + one article: Performance ≥ 90, budgets met (LCP ≤ 2.5 s, INP proxy/TBT sane, CLS ≤ 0.1).
- [ ] No new client JS chunks beyond baseline (compare build output sizes).
- [ ] Images: `next/image` with `sizes`, explicit dimensions everywhere; SVGs optimised.

## 7. Sign-off record

- [ ] All sections above dated and initialled; measured values recorded (not just ticks).
- [ ] Git checkpoint/tag created; `docs/PROJECT-STATUS.md` and decision log updated.
- [ ] Any deviation documented with a decision-log entry and owner acknowledgement.
