# Internal linking map

Principle: links are editorial assertions of relevance, not plumbing. Every link type below is data-driven (slug references in `data/*`), rendered by the related-content components, and validated (`scripts/seo-validate.ts`: broken refs, orphans). We never auto-link everything to everything (blueprint Phase 14).

## Link obligations by page type

| Page type | Must link to | Via |
|---|---|---|
| Home | Top 6 services, packages hub, projects, pricing, request-a-quote | Section cards + CTA |
| Service | Relevant package(s), relevant solution(s), relevant project(s), 1–2 supporting guides, request-a-quote | `related*Slugs` + CTA block |
| Solution | 2–3 recommended services, relevant projects, request-a-quote | `recommendedServiceSlugs` |
| Package | Its one parent service, pricing, request-a-quote | `serviceSlug` |
| Project | Services used, its solution/industry page, related projects, explanatory guides, request-a-quote | project fields |
| Article | Its supported commercial page (prominent, in-body + end CTA), sibling articles, applicable projects | `supportsServiceSlugs` |
| Comparison | The 1–2 services it supports, consultation CTA | `supportsServiceSlugs` |
| Location | Services genuinely offered there, local projects (when real), contact, areas hub | location fields |
| Hubs | All live children as cards | collection queries |
| Pricing | Packages, maintenance service, cost-guide article, fixed-price SEO audits | curated |
| Process/About/FAQ | Services hub, contact/quote | curated |
| SEO Audit hub `/seo-audit/` | Advanced audit page, SEO service, redesign, maintenance, relevant guides, pricing | curated + CTAs |
| Advanced audit `/seo-audit/advanced/` | Audit hub, ecommerce/catalogue/redesign services, technical guides | curated + CTAs |

## Canonical link directions (avoid loops of equal weight)

- Informational → commercial → transactional (see SEARCH-INTENT-MAP). 
- Proof (projects) points at commercial pages; commercial pages point at proof. Both allowed — different anchor semantics (“see this work” vs “service used”).
- Transactional pages do not link back into articles.

## Anchor-text rules

1. Descriptive, natural anchors (“product catalogue website development”), never “click here”.
2. Vary anchors for the same target across pages; the target’s own H1 phrasing is the default.
3. In-body contextual links beat card grids for equity — articles must contain ≥1 in-body link to the supported service.
4. Max ~5 related items per block; curation over completeness.

## Orphan prevention

Reachability check: BFS from `/` over header + footer + hub cards + all related-slug links must reach every indexable URL (test in `tests/seo-validation.test.ts`). Noindex pages are exempt but must still be reachable from at least the hub that owns them (project templates ← /projects/).

## Current curated matrix (launch data)

See the `related*` fields in `data/services.ts`, `data/solutions.ts`, `data/articles.ts`, `data/comparisons.ts`, `data/locations.ts` — the data IS the map; this document defines the rules the data must satisfy.
