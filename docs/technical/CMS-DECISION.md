# CMS decision

## Decision

**Typed local TypeScript content files** (`data/*.ts`, `content/projects/*.ts`), version-controlled with the code. No headless CMS, no database, no MDX pipeline at v0.1. (Decision D-03.)

## Options considered

| Option | Assessment |
|---|---|
| Typed TS/MDX local files | Zero infra, zero cost, type-checked referential integrity (broken related-links fail the build), instant static generation, Git history as audit trail. Editing requires code comfort — acceptable: the founder is the only author and is technical. **Chosen** (plain TS over MDX: articles are structured section objects, so no markdown pipeline needed yet). |
| Lightweight headless CMS (Sanity/Contentful/Payload) | Better for non-technical editors and >1 author; adds accounts, API tokens, webhooks, preview complexity, and a second deploy dependency — none justified by current authoring volume. Revisit trigger below. |
| Database-backed admin | The blueprint explicitly warns against complexity-for-appearance. Unjustified at this scale; would also make the site's own admin a maintenance liability before the business has customers. |

## Revisit triggers (any one → re-evaluate, likely Sanity or Payload)

- More than 2 regular content authors, or a non-technical author.
- Sustained cadence >4 articles/month.
- Client-requested content demos where the company site doubles as a CMS showcase.
- Need for scheduled publishing or editorial workflow states beyond Git PRs.

## Migration posture (why this doesn't paint us into a corner)

All content flows through typed interfaces (`types/content.ts`) and accessor functions (`lib/content.ts`). A future CMS swaps the accessor implementations (fetch instead of import); pages, SEO systems and components don't change. The schema doc (`CONTENT-SCHEMA.md`) doubles as the future CMS schema spec.

## Supported content types (blueprint Phase 8 checklist)

Services ✓ solutions ✓ packages ✓ projects ✓ articles ✓ FAQs ✓ locations ✓ team members ✓ testimonials ✓ sitewide settings (`config/brand.ts`) ✓ SEO metadata (shared fields) ✓ redirects (`data/redirects.ts`) ✓ — each with the full per-page SEO field set (see CONTENT-SCHEMA.md).
