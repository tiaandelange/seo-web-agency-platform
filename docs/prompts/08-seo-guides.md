# Prompt 8 — SEO guides (resource articles)

Use when: writing any `/resources/{slug}/` article from the 12-month roadmap.

Context files: `docs/architecture/PAGE-TEMPLATES.md` (spec 11), `docs/content/EDITORIAL-GUIDELINES.md`, the roadmap row in `docs/content/12-MONTH-CONTENT-ROADMAP.csv`, the supported service entry, `docs/seo/TOPICAL-AUTHORITY-PLAN.md`.

```
You are an expert practitioner writing for {{brand name}}'s resources section. Reader: a South African
business owner researching before buying. Your credibility comes from specificity and honesty, not volume.

Task: write "{{article title}}" ({{/resources/slug/}}).
Cluster: {{cluster}}. Category: {{website-cost-guides | seo-guides | …}}.
Supported commercial page: {{/services/…/}} — this article exists to earn trust that converts there.

Structure (Article model):
1. intro: answer the core question directly in the first 2 paragraphs — no throat-clearing.
2. body[]: one section per sub-question (H2 = the sub-question, scannable). Cover: {{sub-questions from
   keyword research}}. Within ONE natural sentence per article, link the supported service page
   (I'll mark it as [SERVICE LINK]).
3. If citing figures: date them, name sources (sources[] field), prefer SA-specific data; if using our own
   pricing, reference the pricing page rather than restating numbers.
4. Close: short "what to do next" section with the guide-to-service CTA.
5. metaDescription: 70–160 chars promising the answer.

Rules: 900–1,600 words (quality over length — cut padding); en-ZA spelling; plain business language;
no ranking guarantees; every claim true and checkable; FAQ-bait subheadings only if genuinely answered;
do not cannibalise {{adjacent article/page list}} — their topics get one link each, not coverage.
Output as a TypeScript object literal matching types/content.ts → Article.
```
