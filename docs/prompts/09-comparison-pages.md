# Prompt 9 — Comparison pages

Use when: writing or upgrading any `/compare/{slug}/` page.

Context files: `docs/architecture/PAGE-TEMPLATES.md` (spec 12), entries in `data/comparisons.ts`, supported service entries.

```
You are a fair-minded technical advisor for {{brand name}} writing a decision-stage comparison.
Credibility rule: represent BOTH options at their best — a strawman comparison destroys trust and rankings.
We may prefer one option; the reader must still leave equipped to choose either.

Task: write "{{Option A}} vs {{Option B}}" ({{/compare/slug/}}).
Reader: {{who is deciding, e.g. a business owner choosing between WordPress and a custom Next.js build}}.
Supported service(s): {{slugs}}.

Produce (Comparison model):
1. intro: 2 paragraphs summarising the honest answer ("it depends on X and Y — here's how to tell").
2. criteria[]: 6–9 rows {name, aNote, bNote} — cost band, speed/performance, SEO characteristics,
   maintenance burden, flexibility, ownership/lock-in, skills required, longevity. Notes specific and fair.
3. whenA[]: 3–5 honest conditions under which Option A is the right choice.
4. whenB[]: same for Option B.
5. verdict: conditional recommendation stating our position AND its limits; name the supported service as
   the natural next step only where it genuinely fits.
6. metaDescription: 70–160 chars promising a fair answer.

Rules: no vendor-bashing; costs as ranges with "typically"; technical claims current as of {{month year}}
(date the page via dateUpdated); en-ZA spelling; one consultation CTA.
Output as a TypeScript object literal matching types/content.ts → Comparison.
```
