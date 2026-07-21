# Content schema

Normative source: `types/content.ts`. This document explains the schema for humans and future CMS migration.

## Shared: `SeoFields` (every indexable entry)

```
title: string            // page-title part (template appends brand)
seoTitle?: string        // full override of the title part
metaDescription: string  // 70–160 chars, unique
slug: string             // lowercase-hyphenated, unique within type, no category collisions
canonicalPath?: string   // explicit cross-canonical (rare; decision-log required)
noindex?: boolean        // default false
ogTitle?, ogDescription?, socialImage?: string
```

## Shared: `BaseContent extends SeoFields`

```
heading: string          // H1
intro: string            // lead paragraph under H1
status: 'live' | 'draft' | 'planned' | 'template'
dateCreated: string      // ISO yyyy-mm-dd
dateUpdated: string      // ISO — drives lastModified + visible "Updated"
placeholder?: boolean    // true → visible placeholder labelling where rendered
```

## Entities (fields beyond BaseContent)

- **Service**: `category: 'website'|'system'|'recurring'`, `summary`, `problems: string[]`, `deliverables: string[]`, `exclusions: string[]`, `faqs: Faq[]`, `relatedServiceSlugs/relatedPackageSlugs/relatedSolutionSlugs/relatedProjectSlugs/relatedArticleSlugs: string[]`, `primaryKeywordCluster`, `ctaType: 'quote'|'consultation'`.
- **Solution**: `industry`, `painPoints: string[]`, `approach: string[]`, `recommendedServiceSlugs: string[]` (1–3), `relatedProjectSlugs: string[]`, `faqs: Faq[]`.
- **PackageOffer**: `serviceSlug`, `idealFor: string[]`, `inclusions: string[]`, `exclusions: string[]`, `priceRange: { min: number; max: number; currency: 'ZAR'; indicative: true } | null`, `timeline`.
- **Project**: see CASE-STUDY-FRAMEWORK.md (full field table) — includes `publishPermission: boolean`, `results: {metric,value,verified}[]`, `testimonial?: Testimonial`, `featuredImage?: ImageRef`, `gallery: ImageRef[]`, `categories: ProjectCategory[]`, `serviceSlugs`, `solutionSlug?`, `stack: string[]`, narrative fields.
- **Article**: `category: ResourceCategory`, `supportsServiceSlugs: string[]` (min 1 — validator), `relatedArticleSlugs: string[]`, `body: ArticleSection[]` where `ArticleSection = { heading?: string; paragraphs: string[] }`, `sources?: {label,url}[]`, `author?: string`.
- **Comparison**: `optionA`, `optionB`, `criteria: {name, aNote, bNote}[]`, `whenA: string[]`, `whenB: string[]`, `verdict`, `supportsServiceSlugs: string[]`.
- **LocationArea**: `city`, `province`, `serviceSlugs: string[]`, `consolidatedAreas: string[]`, `localFaqs: Faq[]`, `projectSlugs: string[]`.
- **Faq**: `question`, `answer`, `group?: 'cost'|'process'|'technical'|'support'`.
- **Testimonial**: `quote`, `author`, `company?`, `permissionConfirmed: boolean` (false → never rendered).
- **TeamMember**: `name`, `role`, `bio`, `placeholder?`.
- **Redirect**: `source`, `destination`, `permanent: boolean`.
- **ImageRef**: `src`, `alt` (required non-empty — validator), `width`, `height`.

## Integrity rules (enforced by `scripts/seo-validate.ts` + tests)

1. Slug uniqueness per type; slugs match `/^[a-z0-9]+(-[a-z0-9]+)*$/`.
2. Article/project slugs must not collide with their category slugs (shared URL namespace).
3. Every `*Slugs` reference resolves to an existing entry.
4. `Article.supportsServiceSlugs.length >= 1`.
5. `metaDescription` length 70–160; titles unique; descriptions unique.
6. `status: 'live'` + `noindex: false` ⇒ in sitemap; `noindex: true` ⇒ not in sitemap.
7. Projects: `publishPermission: false` ⇒ `noindex` forced true (computed, cannot be overridden in data).
8. Packages: `priceRange` non-null ⇒ rendered with the literal word "indicative".
9. All `ImageRef.alt` non-empty.

## Example entries

Real examples ship in `data/` (11 services, 6 solutions, 5 packages, 3 articles, 4 comparisons, 3 locations, FAQs) and `content/projects/` (4 templates) — those files are the living reference.
