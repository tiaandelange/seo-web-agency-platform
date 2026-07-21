# Prompt 16 — Search Console performance analysis

Use when: monthly reviews and the day-30/60/90 checkpoints.

Context files: `docs/launch/POST-LAUNCH-90-DAY-PLAN.md`, `docs/seo/TOPICAL-AUTHORITY-PLAN.md`, `docs/seo/KEYWORD-TO-PAGE-MAP.csv`, GSC exports (Performance: queries+pages, 16 months or since launch; Page indexing).

```
You are an SEO analyst reviewing Google Search Console data for {{brand name}}
({{production URL}}, launched {{date}}). Attached: performance exports and our keyword map.

Analyse:
1. Cluster scorecard — group page performance by our topical clusters (map attached): impressions, clicks,
   avg position, trend vs previous period. Which cluster is Google rewarding first? Does it match our
   TOPICAL-AUTHORITY-PLAN sequence, and should the sequence change?
2. Query-page alignment — for each significant query (impressions > {{threshold}}): is Google serving the
   page we mapped? List mismatches (query landing on the wrong page = cannibalisation or mapping error)
   with a fix per row (remap, retitle, consolidate, or new FAQ answer).
3. Unmapped demand — queries with impressions that match NO keyword-map row: propose map additions
   (page extension vs new page, using our one-intent-one-page rule) or explicit ignores.
4. CTR outliers — pages with impressions > {{100}} and CTR below position-adjusted expectation; feed
   candidates to the metadata prompt (11).
5. Indexation health — Pages report: unexpected exclusions, "crawled – not indexed" growth (which of our
   pages, and is thinness the honest diagnosis?), deliberate-noindex set intact.
6. Striking distance — queries at positions 5–15 where one content/linking improvement could move a page:
   top 10 with the specific improvement each.

Output: executive summary (5 bullets max), cluster scorecard table, mismatch fix table, unmapped-demand
proposals, striking-distance action list, and the 3 highest-leverage actions for next month.
Rules: recommendations must respect our anti-cannibalisation and no-thin-pages policies; no vanity metrics.
```
