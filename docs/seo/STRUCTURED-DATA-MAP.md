# Structured data map

Builders in `lib/schema.ts`; rendered via `<JsonLd/>` (`components/json-ld.tsx`) from the same content objects as the visible page. Absolute URLs only (`absoluteUrl()`). Tests: `tests/schema.test.ts`. Policy: schema mirrors visible content — nothing invisible, nothing fabricated (blueprint Phase 12).

## Type usage by page

| Page | Types emitted |
|---|---|
| All pages (root layout) | `Organization` (with `@id` + `logo` ImageObject), `WebSite` (publisher ref, `alternateName`, `inLanguage`) |
| Home | `ProfessionalService` (areaServed from brand config; address omitted while null), `WebPage` (+ optional `primaryImageOfPage` when a visible preferred image is present) |
| Every subpage | `WebPage` (`isPartOf` WebSite, `breadcrumb` ref) + `BreadcrumbList` |
| Service pages | `Service` (name, description, provider→Organization `@id`, areaServed, serviceType) |
| Package pages | `Service`; `Offer` deliberately omitted until owner confirms publishable pricing (D-11) |
| Articles / comparisons | `Article` (headline, description, datePublished, dateModified, author→Organization until personal author set, mainEntityOfPage) |
| Project case studies | `Article` (real projects only get indexed; templates carry schema but noindex) |
| `/faq/` only | `FAQPage` + `Question`/`Answer` mirroring visible Q&As (D-09: no rich-result expectation — Google restricts FAQ rich results to authoritative gov/health sites since Aug 2023; markup kept because it is valid and costless) |
| `/about/` | `AboutPage`; `Person` added when a real founder bio is published |
| `/contact/`, locations | `ContactPage` / `WebPage` + `ProfessionalService` with `contactPoint` (only configured channels) and per-city `areaServed` |
| Hubs | `CollectionPage` + `ItemList` of children |
| Legal, thank-you, 404 | `WebPage` only / none for 404 |

## Prohibited until genuinely true (hard rules)

- `Review`, `AggregateRating` — no reviews exist; adding them would be fabrication.
- `Offer.price` / `priceSpecification` — pricing is indicative placeholder (D-11).
- `Product` on service packages — services are not products; no schema-shopping for rich results.
- `LocalBusiness` postal address — omitted while `brand.address` is null; `ProfessionalService` (a LocalBusiness subtype) is used with `areaServed` only, which is valid for service-area businesses.
- Fake `sameAs` — only real profiles from brand config.

## Identity graph

`Organization @id = {origin}/#organization`; `WebSite @id = {origin}/#website`; each page's `WebPage` references both. One organisation node sitewide prevents entity duplication.

## Validation workflow

1. `npm run test` — structural unit tests (required fields, absolute URLs, no banned types).
2. Rich Results Test + Schema.org validator on: home, one service, one package, one article, /faq/, one location (pre-launch checklist).
3. GSC Enhancements reports monitored post-launch (90-day plan).
