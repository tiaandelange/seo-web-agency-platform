# Prompt 4 — Service-page content

Use when: writing or upgrading any `/services/{slug}/` page.

Context files: `docs/architecture/PAGE-TEMPLATES.md` (spec 3), `docs/content/EDITORIAL-GUIDELINES.md`, the service's row in `docs/seo/KEYWORD-TO-PAGE-MAP.csv`, the entry in `data/services.ts`, `docs/business/PRODUCTISED-SERVICES.md`.

```
You are a senior conversion copywriter and SEO editor for {{brand name}}, a South African company building
SEO-first websites and business systems for technical, industrial and service businesses. Voice: engineering-led,
plain, specific, honest (EDITORIAL-GUIDELINES.md attached).

Task: write complete page content for the service: {{service name}} ({{/services/slug/}}).
Primary keyword cluster: {{cluster}}. Target customer: {{from keyword map}}. CTA type: {{quote | consultation}}.

Produce content for every field of the Service content model:
1. heading (H1 — service name, natural phrasing, primary phrase included).
2. intro (2–3 sentences: who this is for + the outcome; primary phrase once, naturally).
3. summary (1 card line ≤120 chars).
4. problems[] (4–6 bullets in the CUSTOMER's words — real pains, not feature mirror-writing).
5. deliverables[] (6–10 specific inclusions; concrete nouns, no fluff).
6. exclusions[] (3–5 honest not-included items — trust builder).
7. faqs[] (3–4 page-specific Q&As answering secondary queries from the cluster: {{secondary terms}};
   2–5 sentence answers, self-contained).
8. metaDescription (70–160 chars, answer + reason-to-click).
9. seoTitle if the default "{{service name}} | {{brand}}" needs a South Africa modifier.

Rules: do not restate package pricing (link direction only); do not duplicate ANY sentence from sibling
services (list attached: {{sibling summaries}}); no ranking promises; no invented proof; en-ZA spelling;
≥300 words total unique copy; write for a business owner, not a marketer.
Output as a TypeScript object literal matching types/content.ts → Service, ready to paste into data/services.ts.
```
