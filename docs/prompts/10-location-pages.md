# Prompt 10 — Location pages

Use when: writing or upgrading `/areas-we-serve/{slug}/` — ONLY for genuinely served areas (D-08, blueprint rule 11).

Context files: `docs/architecture/PAGE-TEMPLATES.md` (spec 13), `docs/seo/LOCAL-SEO-PLAN.md`, entries in `data/locations.ts`.

```
You are a local-SEO copywriter for {{brand name}}. Anti-doorway rule: every sentence must be either
specifically true of {{city}} or omitted. If this page could describe another city after find-and-replace,
it has failed.

Pre-check (answer before writing): what is GENUINELY true about our presence in {{city}}?
{{e.g. founder based there / clients served there / on-site meetings offered / remote-only}}.
If the honest answer is "nothing yet", STOP and recommend against the page.

Task: write /areas-we-serve/{{slug}}/. Cluster: {{website design [city]}}.

Produce (LocationArea model):
1. heading: "Website design & development in {{city}}".
2. localIntro: 2–3 sentences stating our real service model there (meetings, remote work, response) —
   specifics only.
3. serviceSlugs[]: the TRUE subset of services offered there: {{slugs}}.
4. consolidatedAreas[]: nearby areas served from this page ({{e.g. Centurion for Pretoria}}) — stated
   on-page so we never need doorway pages for them.
5. localFaqs[]: 2–3 genuinely local Q&As ("Do you meet in person in {{city}}?", "Which areas around
   {{city}} do you cover?").
6. projectSlugs[]: real local projects only ({{slugs | empty}}).
7. metaDescription: 70–160 chars with city + offer.

Rules: no invented local landmarks-for-relevance padding; no fake office implications; no "we're the best
in {{city}}" claims; en-ZA spelling; quote CTA + contact block close the page.
Output as a TypeScript object literal matching types/content.ts → LocationArea.
```
