# Content models

Typed definitions live in `types/content.ts`; entries in `data/*.ts` and `content/projects/*.ts`. This document is the editorial view of those types.

## Shared SEO fields (every indexable type)

`title` (page title part), `seoTitle?` (override), `metaDescription` (70–160), `slug`, `canonicalPath?`, `noindex?`, `ogTitle?`, `ogDescription?`, `socialImage?`, `heading` (H1), `intro` (lead paragraph), `status` (`live` | `draft` | `planned` | `template`), `dateCreated`, `dateUpdated`, `placeholder?` (true = contains unconfirmed content; rendered with a notice where visible).

## Type-specific fields

| Type | Key fields beyond shared |
|---|---|
| Service | `category` (website/system/recurring), `summary` (card line), `problems[]`, `deliverables[]`, `exclusions[]`, `faqs[]`, `related{Service,Package,Solution,Project,Article}Slugs`, `primaryKeywordCluster`, `ctaType` (quote/consultation) |
| Solution | `industry`, `painPoints[]`, `approach[]` (how we solve), `recommendedServiceSlugs[]`, `relatedProjectSlugs[]`, `faqs[]` |
| Package | `serviceSlug` (one parent), `idealFor[]`, `inclusions[]`, `exclusions[]`, `priceRange` (`{min,max,currency,indicative:true}` or null), `timeline` |
| Project | full case-study model — see CASE-STUDY-FRAMEWORK.md (problem, objectives, scope, solution, process, functionality, seoWork, verified results, permissions, testimonial, images) |
| Article | `category`, `supportsServiceSlugs[]` (≥1 enforced), `relatedArticleSlugs[]`, `body: {heading?, paragraphs[]}[]`, `sources[]?`, `author?` |
| Comparison | `optionA/optionB`, `criteria[{name, aNote, bNote}]`, `whenA[]`, `whenB[]`, `verdict`, `supportsServiceSlugs[]` |
| Location | `city`, `province`, `localIntro` (unique), `serviceSlugs[]` (true subset), `localFaqs[]`, `projectSlugs[]`, `consolidatedAreas[]` |
| FAQ | `question`, `answer`, `group` (cost/process/technical/support) |
| Testimonial | `quote`, `author`, `company?`, `permissionConfirmed` (render only when true) |
| TeamMember | `name`, `role`, `bio`, `placeholder` |
| SiteSettings | brand config (`config/brand.ts`) — name, contact, areas, social, hours |
| Redirect | `source`, `destination`, `permanent` |

## Authoring rules

1. One entry = one page = one primary intent (keyword map is the gatekeeper for new entries).
2. `metaDescription`, `intro` and `heading` are written fresh per entry — never copied from siblings.
3. Arrays render as semantic lists; every string is plain text (no HTML in data).
4. `placeholder: true` content must carry visible placeholder labelling when rendered (component-enforced for pricing and case-study templates).
5. Adding an entry automatically: creates the route (dynamic segment), enters the sitemap (if indexable), joins hub cards and related blocks (via slugs), joins the validator's link graph. No manual wiring.
6. Slug changes after launch require a redirect-register entry in the same commit.

## Workflow states

`planned` → listed in roadmap only, no route → `draft` → route generated in dev, noindex — wait, drafts are NOT generated in production builds at all → `live` → generated + indexable per register → (`template` = generated, noindex, badge — projects only).
