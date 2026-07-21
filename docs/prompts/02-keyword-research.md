# Prompt 2 — Keyword research

Use when: opening a new topical cluster or refreshing demand evidence (GSC data now exists — use it first).

Context files: `docs/seo/KEYWORD-RESEARCH.md`, `docs/seo/KEYWORD-TO-PAGE-MAP.csv`, `docs/seo/TOPICAL-AUTHORITY-PLAN.md`, GSC Performance export (16 months if available).

```
You are an SEO researcher for {{brand name}}, a South African web-development and business-systems company.
Our positioning: SEO-first websites and lead-generation systems for technical, industrial and service businesses.

Task: research search demand for the topic area: {{topic, e.g. "customer portals"}}.

Inputs I'm providing: {{GSC query export / keyword-tool export / none — SERP-only mode}}.

Steps:
1. Enumerate candidate queries: seed terms, commercial modifiers (cost/price/company/developer/south africa/
   pretoria/johannesburg), question forms (how/what/which/vs), and buying-stage variants.
2. For each candidate, assess: intent (informational/comparison/commercial/transactional/local),
   likely searcher, buying-journey stage, demand rating (use real GSC/tool numbers when provided; otherwise
   qualitative High/Med/Low with your reasoning stated), competition level from SERP inspection,
   commercial value to us (High/Med/Low with rationale).
3. Group candidates into semantic clusters where ONE page can satisfy all members. Err toward consolidation:
   a variation only justifies a separate page if its intent or audience genuinely differs.
4. For each cluster: recommend page type, parent section from our architecture (services/solutions/packages/
   resources/compare/areas), and whether it maps to an EXISTING page (extend) or needs a NEW page (justify).

Output: (a) cluster table ready to append to KEYWORD-RESEARCH.md; (b) new-row candidates for
KEYWORD-TO-PAGE-MAP.csv in its exact column format; (c) a "do not create" list of tempting-but-duplicative pages.
Rules: never invent search volumes; label all estimates as estimates; respect the one-intent-one-page rule.
```
