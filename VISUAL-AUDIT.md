# Koppie Systems — Visual Appeal Audit (all 51 pages)

**Target:** `https://www.koppiesystems.co.za`
**Question:** which pages fail to carry the homepage's visual philosophy, and why.
**Method:** live-browser crawl of all 51 routes, counting the visual devices each page actually renders (hero imagery, `band-ink` dark bands, `shadow-card` elevated cards, card components, colour blocks, gradients, rounded panels), scored against the homepage as the reference.

The Cursor prompt that fixes these pages is in **`CURSOR-PROMPT-visual-upgrade.md`** (same folder). It only uses components and tokens that already exist in this repo.

---

## The core finding

The homepage is visually rich (score **58**): an image hero, 3 dark `band-ink` content bands, 6 elevated cards, 10 card components, 23 gradient panels, a numbered "system" flow. Most other pages inherit almost none of that.

Two hard numbers tell the story:

- **40 of 51 pages render zero imagery.** Only the homepage, `/projects/`, and the nine service-detail pages have any images at all.
- **The `.contour-grid` texture motif is defined in `app/globals.css` but used on zero pages** — a finished visual asset sitting completely unused.

The bland pages also **bypass the richer components that already exist**. Legal/FAQ/compare/package-detail pages render with the minimal `<PageHeader>` + raw `<p>` prose, instead of `PageHero` (which already supports `editorial` and dark `inverse` variants and an `aside` visual slot), `CardGrid`, and the closing `CtaQuote` band. The toolkit is there; these pages just don't call it.

So this is **not** a design-system problem — the system is good. It's an **application** problem: entire page templates were built plain.

---

## Tiered results (blandest first)

### Tier 1 — Barren (score ≤ 11) — 13 pages · top priority

Near pure-text-on-white. No imagery, no cards, no dark bands, no closing CTA. This is where your "no visual appeal" comment lands hardest.

| Page | Score | What it has |
|------|-------|-------------|
| `/legal/privacy-policy/` | 4 | one band (footer) only |
| `/legal/terms-of-service/` | 4 | one band only |
| `/legal/cookie-policy/` | 4 | one band only |
| `/faq/` | 9 | 1 card, 1 shadow |
| `/compare/website-vs-web-application/` | 9 | 1 card, 1 shadow |
| `/compare/wordpress-vs-nextjs/` | 9 | 1 card, 1 shadow |
| `/compare/custom-website-vs-template/` | 9 | 1 card, 1 shadow |
| `/compare/website-maintenance-options/` | 9 | 1 card, 1 shadow |
| `/website-packages/starter-business-website/` | 11 | 3 cards |
| `/website-packages/professional-business-website/` | 11 | 3 cards |
| `/website-packages/product-catalogue-website/` | 11 | 3 cards |
| `/website-packages/ecommerce-website/` | 11 | 3 cards |
| `/website-packages/custom-web-system/` | 11 | 3 cards |

### Tier 2 — Weak (score 12–19) — 18 pages

Some cards, but plain white heroes, no imagery, at most one dark band.

```
/solutions/contractors/            /solutions/engineering-companies/
/solutions/manufacturers-and-suppliers/   /solutions/property-businesses/
/solutions/professional-services/  /solutions/small-businesses/
/resources/seo-guides/             /resources/website-cost-guides/
/resources/website-cost-south-africa/     /resources/what-is-an-seo-first-website/
/resources/choosing-a-website-development-company/
/areas-we-serve/                   /seo-audit/            /seo-audit/advanced/
/services/                         /services/website-maintenance-and-support/
/request-a-quote/                  /pricing/
```

### Tier 3 — Adequate density, but a plain hero (score 20–38) — 19 pages

These have cards/bands lower down but open with a plain white `PageHero` (`variant="standard"`) — no eyebrow visual, no imagery, no motif. **This is why `/about/` (score 23) still reads as flat in your screenshot: the device count is fine, but the top of the page is bare.**

```
/about/  /process/  /contact/  /projects/  /compare/  /resources/
/solutions/  /website-packages/  /areas-we-serve/pretoria/
+ the 9 service-detail pages (these are the best interior pages — they have hero demos + 2 images each)
```

### Reference — Homepage (score 58)

Image hero · 3 `band-ink` content bands · numbered system flow · 10 cards · 23 gradient panels.

---

## What each tier is missing vs the homepage

| Device (already in the codebase) | Home | Tier 1 | Tier 2 | Tier 3 |
|----------------------------------|:----:|:------:|:------:|:------:|
| Image / visual media in hero | ✅ | ❌ | ❌ | ❌ |
| `PageHero` `editorial`/`inverse` variant | ✅ | ❌ (uses `PageHeader`) | ⚠️ standard | ⚠️ standard |
| Dark `band-ink` content band (not just footer) | ✅×3 | ❌ | ⚠️×1 | ⚠️×1 |
| `CardGrid` + cards | ✅ | ❌ | ⚠️ | ✅ |
| Closing `CtaQuote` band | ✅ | ❌ | ⚠️ | ✅ |
| `.contour-grid` texture motif | (unused) | ❌ | ❌ | ❌ |
| Surface (`bg-surface`) alternating sections | ✅ | ❌ | ⚠️ | ✅ |

---

## Recommended approach (summary — full prompt in the companion file)

Reuse the existing template, do not restyle it. In priority order:

1. **Tier 1 legal pages** — wrap the plain hero in `PageHero variant="editorial"` with an eyebrow and the `.contour-grid` motif; drop the long prose into a two-column layout with a sticky in-page table-of-contents card (`shadow-card`); close with a `CtaQuote` band. Same for cookie/terms.
2. **Tier 1 compare + FAQ** — give each a proper `PageHero`, render the comparison/FAQ items as `CardGrid` cards on a `bg-surface` band, add one `band-ink` "which is right for you" band, close with `CtaQuote`.
3. **Tier 1 package-detail pages** — add an `inverse` hero, a feature `CardGrid`, and a `band-ink` pricing band; mirror the homepage package section.
4. **Tier 2/3 heroes** — switch `PageHero` from `standard` to `editorial`/`inverse`, add an `aside` visual and the `.contour-grid` motif; alternate `bg-surface` sections; ensure every page ends on a `CtaQuote` band.
5. **Imagery** — introduce a reusable illustrative/diagram element (the homepage's system-flow / capability-map style) for the 40 image-less pages, using the existing motif and tokens rather than stock photos.

All colour, type, spacing and radius come from the existing `@theme` tokens — no new design values.
