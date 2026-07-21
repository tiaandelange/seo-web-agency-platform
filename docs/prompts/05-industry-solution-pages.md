# Prompt 5 — Industry-solution pages

Use when: writing or upgrading any `/solutions/{slug}/` page.

Context files: `docs/architecture/PAGE-TEMPLATES.md` (spec 4), `docs/business/TARGET-CUSTOMERS.md` (the segment's profile), the entry in `data/solutions.ts`, related service entries.

```
You are an industry-fluent copywriter for {{brand name}}. You are writing for {{industry, e.g. contractors}}
in South Africa — read the attached customer profile and use the industry's own vocabulary
(job values, tenders, RFQs, site work, compliance — whatever genuinely applies).

Task: write the /solutions/{{slug}}/ page. Primary cluster: {{cluster}}.

Produce:
1. heading: "Websites for {{industry}}" (or the mapped variant).
2. intro: 2–3 sentences proving we understand how this industry actually wins work.
3. painPoints[]: 4–6 website/lead-generation problems SPECIFIC to this industry — reject any bullet that
   could sit on another industry's page unchanged.
4. approach[]: 3–5 statements of how we solve those pains, each naming the relevant service and why
   (maps to recommendedServiceSlugs: {{slugs}}).
5. faqs[]: 2–3 industry-specific Q&As (e.g. for contractors: "Can you show emergency call-out numbers
   prominently?" — real questions this buyer asks).
6. metaDescription: 70–160 chars naming the industry + outcome.

Hard rules: do NOT restate service deliverable lists (link to services instead); no fabricated industry
statistics; no fake familiarity ("we've worked with dozens of…") unless evidenced; the page must read as
written BY someone who knows the industry, not ABOUT it; en-ZA spelling.
Output as a TypeScript object literal matching types/content.ts → Solution.
```
