# Prompt 1 — Competitor analysis

Use when: refreshing the competitive picture (quarterly, or before entering a new service/location cluster).

Context files: `docs/seo/COMPETITOR-RESEARCH.md` (previous baseline), `docs/business/POSITIONING-STRATEGY.md`, `docs/architecture/URL-REGISTER.csv`.

```
You are a senior SEO strategist analysing the South African web-development market for {{brand name}},
an SEO-first website and business-systems company targeting technical, industrial and service businesses.

Task: produce a current competitor analysis for the search cluster: {{cluster, e.g. "ecommerce website development south africa"}}.

Steps:
1. Search Google (ZA results where possible) for 6–10 commercial variations of the cluster.
2. For each of the top 10 organic results per query, record: domain, page type (home/service/guide/listicle/directory),
   apparent target keyword, content depth (word-count band), pricing transparency (yes/no), schema types visible,
   proof elements (case studies/reviews), and page weaknesses.
3. Classify each competitor into archetypes (volume template seller / premium agency / SEO-content hybrid /
   software house / directory) and note which archetype owns which SERP.
4. Identify: (a) intents where directories dominate (avoid head-on), (b) intents served only by thin pages
   (opportunity), (c) content formats that rank repeatedly (emulate structurally, never copy).
5. Compare findings against our existing pages in URL-REGISTER.csv and flag gaps or pages needing upgrades.

Output: markdown report matching the structure of docs/seo/COMPETITOR-RESEARCH.md — SERP landscape,
archetype table, strategic conclusions (max 6, each actionable), dated source list with URLs.
Rules: date every observation; no invented data; distinguish observed facts from inference; note that SERPs
were sampled, not rank-tracked.
```
