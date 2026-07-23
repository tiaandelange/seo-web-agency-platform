# Cursor Prompt — Visual Upgrade of Bland Pages

Paste the block below into Cursor (Agent mode, this repo open). It is scoped to **reuse the existing design template only** — existing components, existing `@theme` tokens, no new colours, no content or SEO changes. Supporting detail is in `VISUAL-AUDIT.md`.

> Tip: run it **one tier at a time** (start with Tier 1). Do a tier, review the diff and the pages in the browser, then continue. Feed Cursor the tier's page list from `VISUAL-AUDIT.md`.

---

```
You are working in the Koppie Systems Next.js repo (seo-web-agency-platform).

GOAL
Bring the visually bland pages up to the same design and theme philosophy as the
homepage. The homepage is the reference for "how a Koppie Systems page should feel":
an expressive hero, alternating light/surface sections, at least one dark band-ink
content band, elevated cards, and a closing CTA band. Many interior pages (legal,
FAQ, comparisons, package details, and most plain heroes) are near-plain text on
white. Fix that WITHOUT changing the design system, the copy, the routes, the
metadata, or the heading hierarchy.

HARD CONSTRAINTS (do not violate)
1. REUSE THE EXISTING TEMPLATE. Only use components and utilities that already
   exist in this repo. Do NOT invent new colours, fonts, radii, shadows or spacing.
   Every colour/size/space MUST come from the @theme tokens in app/globals.css
   (--color-*, --radius-card, --radius-control, --width-content*, --text-*, etc.)
   or from an existing utility class (.band-ink, .contour-grid, .shadow-card,
   .shadow-elevated, .koppie-container / -narrow / -wide, bg-surface, bg-canvas,
   text-ink, text-muted, text-sandstone, etc.).
2. Prefer existing components over new markup:
   - components/layout/page-hero.tsx  (PageHero — has variant "standard" | "editorial"
     | "inverse", plus optional `eyebrow`, `description`, `aside`, `meta`)
   - components/cards.tsx  (CardGrid, LinkCard, ServiceCard, SolutionCard, PackageCard,
     ArticleCard, ComparisonCard)
   - components/cta-quote.tsx  (CtaQuote — the closing CTA band)
   - components/layout/section.tsx + container.tsx
   - components/typography/{eyebrow,heading,lead}.tsx
   - components/related-content.tsx, components/trust-signals.tsx, components/seo-audit-cta.tsx
   If a genuinely new small presentational component is unavoidable, put it under
   components/ and build it ONLY from existing tokens/utilities, matching the
   home/* components' style.
3. Do NOT change: page copy/text, routes, <title>/meta, JSON-LD, or the number/order
   of headings. Keep exactly one <h1> per page and never skip a heading level
   (listing/card titles are <h2>). This is a VISUAL upgrade only.
4. Use the .contour-grid motif (defined in app/globals.css but currently unused on
   every page) as the lightweight hero/section texture — it is the intended,
   zero-asset way to add visual interest. No stock photography.
5. Keep it accessible and fast: maintain contrast (band-ink already pairs with
   light text tokens), keep focus styles, no layout-shift-heavy media, no new heavy
   dependencies.

WHAT "GOOD" LOOKS LIKE (mirror the homepage rhythm)
- Expressive hero: PageHero with variant "editorial" or "inverse", an `eyebrow`
  label, a `description` Lead, and where it helps an `aside` visual. Apply the
  .contour-grid motif behind inverse/editorial heroes.
- Alternating sections: interleave bg-canvas and bg-surface bands so the page has
  rhythm instead of one long white column. Use components/layout/section.tsx.
- At least one dark band-ink content band per page (not just the footer) — e.g. a
  "why this matters / which is right for you" band, styled like the homepage's
  dark system bands.
- Cards over prose walls: convert bullet lists and comparison/FAQ blocks into
  CardGrid + the appropriate card component, with .shadow-card elevation.
- Every page ends with a CtaQuote band (the same closing CTA the homepage/service
  pages use).

PAGES TO FIX — do these in tiers, committing after each tier:

TIER 1 (barren — do first):
- app/legal/[slug]/page.tsx  -> privacy-policy, terms-of-service, cookie-policy
    Currently uses <PageHeader> + raw <section>/<p>. Replace the header with
    PageHero variant="editorial" (eyebrow e.g. "Legal", contour-grid motif). Render
    the long-form doc in a two-column layout: sticky in-page table-of-contents card
    (.shadow-card) on the side, article body using the existing
    .text-section-title-article H2 scale. Close with CtaQuote. Keep all legal copy
    and the placeholder/effective-date logic intact.
- app/faq + the four app/compare/* detail pages:
    Give each a PageHero (editorial). Render FAQ Q&As / comparison points as
    CardGrid cards on a bg-surface band. Add one band-ink summary band
    ("which is right for you"). Close with CtaQuote.
- the five app/website-packages/* detail pages:
    Add an inverse PageHero, a feature CardGrid, and a band-ink pricing/summary band
    that mirrors the homepage "Packages" section. Close with CtaQuote.

TIER 2 (weak — plain heroes + thin bodies):
  solutions/* detail, resources/* articles, areas-we-serve, seo-audit(+advanced),
  services index, services/website-maintenance-and-support, request-a-quote, pricing.
    Upgrade PageHero from "standard" to "editorial"/"inverse" with eyebrow + aside +
    contour-grid; alternate bg-surface sections; convert lists to CardGrid; ensure a
    band-ink band and a closing CtaQuote on each.

TIER 3 (fine density, plain hero — lightest touch):
  about, process, contact, projects, and the section index pages (solutions,
  website-packages, resources, compare, areas-we-serve/pretoria).
    Mainly upgrade the hero: PageHero editorial/inverse + eyebrow + aside visual +
    contour-grid, so the top of the page is no longer bare. Add a closing CtaQuote
    where one is missing. (about/ specifically: give it an expressive editorial hero
    with the motif — its lower sections are already fine.)

PROCESS
- Start with Tier 1. For each page/template: read the current file, identify the
  plain header/prose, and refactor to the components above.
- After each tier: run the app, and visually confirm each page now has a hero
  treatment, alternating sections, at least one dark band, cards instead of prose
  walls, and a closing CTA — matching the homepage feel.
- Show me the diff per tier before moving on. Do not touch page text or SEO.
```

---

## Notes for you (not part of the prompt)

- The audit and this prompt are grounded in a live crawl: **40/51 pages have no imagery**, `.contour-grid` is **unused on every page**, and the bland templates call the minimal `PageHeader` instead of the capable `PageHero`. The design system itself is healthy — this is purely about applying it.
- If Cursor starts inventing colours or new CSS, stop it and point it back to constraint #1 (tokens only). The existing `.cursor/rules/brand-tokens.mdc` and the `.cursorrules` at the repo root already enforce this.
- Best run tier-by-tier so you can review ~3–5 pages of diff at a time rather than 30 at once.
