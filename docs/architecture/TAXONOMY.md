# Taxonomy

Controlled vocabularies used across content types. All values are slugs (lowercase, hyphenated); adding a value = editing the typed union in `types/content.ts` (compile-time enforcement, no free-text drift).

## Service categories (`ServiceCategory`)
- `website` — Tier 1 website services
- `system` — Tier 2 custom systems
- `recurring` — Tier 3 support/maintenance

## Project categories (`ProjectCategory`) — drive /projects/ sub-listings
- `websites`
- `ecommerce`
- `admin-systems`

Rule: project slugs must never equal a category slug (`websites`, `ecommerce`, `admin-systems`) — both resolve under `/projects/{slug}`; the validator enforces the collision check.

## Resource categories (`ResourceCategory`) — drive /resources/ sub-listings
- `website-cost-guides` (live)
- `seo-guides` (live)
- `ecommerce-guides` (planned — D-18, not generated while empty)
- `business-systems` (planned)

Same collision rule for article slugs vs category slugs.

## Industries (`IndustrySlug`) — the /solutions/ set
`contractors`, `engineering-companies`, `manufacturers-and-suppliers`, `property-businesses`, `professional-services`, `small-businesses`.

## Locations (`LocationSlug`)
`pretoria`, `johannesburg` (live); `cape-town` (planned). New locations require: real service evidence, unique local content, owner sign-off (rule 11).

## Cross-type relationships (all by slug reference, validated)

| From | Field | To |
|---|---|---|
| Service | `relatedPackageSlugs` | Package |
| Service | `relatedSolutionSlugs` | Solution |
| Service | `relatedProjectSlugs` | Project |
| Service | `relatedArticleSlugs` | Article |
| Solution | `recommendedServiceSlugs` | Service |
| Package | `serviceSlug` | Service (exactly one) |
| Project | `serviceSlugs` / `solutionSlug` | Service / Solution |
| Article | `supportsServiceSlugs` | Service (≥1 — enforced) |
| Comparison | `supportsServiceSlugs` | Service |
| Location | `serviceSlugs` / `projectSlugs` | Service / Project |

## Tags

No free-form tag system. Tags create crawlable thin archives; the controlled categories above cover every navigation need. Revisit only with evidence of user need.
