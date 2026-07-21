# Case-study framework

Projects are evidence assets, not galleries (blueprint Phase 7). Every project is a structured narrative: problem → objectives → scope → solution → process → functionality → SEO work → verified results.

## Content model (`types/content.ts` → `Project`)

| Field | Rules |
|---|---|
| `title`, `slug` | Outcome-flavoured name once real ("RFQ platform that cut quote turnaround", template names stay descriptive) |
| `clientDescriptor` | Real name ONLY with written permission; otherwise honest anonymised descriptor ("Gauteng civil contractor") |
| `industry`, `location` | Location only where publishable |
| `projectType`, `categories[]` | Taxonomy values |
| `serviceSlugs[]`, `solutionSlug?` | Drive "services used" links |
| `stack[]` | Real technologies only |
| `businessProblem` | 2–4 sentences in the client's terms — the hook |
| `objectives[]` | Measurable where possible |
| `scope[]` / `exclusionsNote?` | What was and wasn't in scope |
| `solutionSummary` | What we built and why those choices |
| `process[]` | Stage-by-stage, mirrors /process/ stages |
| `keyFunctionality[]` | Feature: benefit pairs |
| `seoWork[]?` | Only when SEO was actually performed |
| `results[]` | `{metric, value, verified}` — **render only `verified: true`**; empty = section hidden. No "300% more leads" folklore |
| `dates`, `projectStatus` | `completed` / `in-progress` / `template` |
| `publishPermission` | Boolean gate: false = never indexable, never named |
| `testimonial?` | Genuine + permissioned only |
| `featuredImage?`, `gallery[]` | Every image has descriptive alt; screenshots anonymised where required |
| `related{Project,Article}Slugs[]` | Curated |
| SEO fields | Standard shared set; templates fixed at `noindex: true` |

## The four launch templates (`content/projects/`)

All four are **clearly-badged example structures** (banner rendered on-page, `status: 'template'`, noindex, out of sitemap — D-07). They exist so the owner sees exactly what to collect per real project, and so layout/QA has realistic data. They mirror project types the founder can genuinely deliver (A-13):

1. `contractor-website-template` — SEO-focused contractor website (websites)
2. `catalogue-rfq-website-template` — product catalogue + RFQ website (websites/ecommerce)
3. `property-management-system-template` — property-management web application (admin-systems)
4. `admin-quotation-platform-template` — admin + quotation platform (admin-systems)

No real client names, figures or confidential details from any previous project appear in these files (rule 14).

## Converting a template to a real case study

1. Duplicate the template file → real slug; fill every field from the real project.
2. Obtain written publication permission (email suffices); set `publishPermission: true`, `placeholder: false`, `status: 'completed'`, `noindex: false`.
3. Add only verified results; delete unverified claims.
4. Update URL-REGISTER.csv; run validator; request indexing in GSC.
5. Add the project's slug to its service/solution/location related fields (it starts earning internal links).

## Publication cadence target

One real case study per completed project, published within 30 days of launch while evidence is fresh (90-day plan dependency).
