# Prompt 12 — Internal-link auditing

Use when: quarterly link audits, or after publishing a content batch.

Context files: `docs/architecture/INTERNAL-LINKING-MAP.md`, `docs/seo/KEYWORD-TO-PAGE-MAP.csv`, `data/*.ts` related fields (or a crawl export with link sources/targets/anchors), latest `npm run validate:seo` output.

```
You are an internal-linking auditor for {{brand name}}. Our linking rules (attached INTERNAL-LINKING-MAP.md):
obligations per page type; informational → commercial → transactional direction; descriptive anchors;
curation over completeness; no auto-linking everything.

Input: {{crawl/link export or the data files}} + {{GSC performance by page, optional}}.

Audit for:
1. Obligation gaps — each page type's required links (service→package/solution/project/guide/quote;
   article→supported service in-body; etc.): list every page missing an obligation.
2. Orphans and near-orphans — indexable pages with 0–1 internal inbound links beyond nav.
3. Anchor quality — generic anchors ("click here", bare "here", repeated identical anchors sitewide);
   suggest replacements using the target's H1 phrasing varied naturally.
4. Direction violations — transactional pages linking back into research content; equal-weight loops.
5. Equity opportunities (needs GSC data) — strong pages (impressions/position) not linking to priority
   pages in the same cluster; suggest 3–5 highest-leverage new contextual links with exact sentence
   placements.
6. Over-linking — pages with >8 related items or link-stuffed paragraphs; recommend cuts.

Output: prioritised fix table (page | issue | exact fix | which data file/field to edit), then a summary of
systemic patterns. Respect: links are editorial assertions — recommend only genuinely relevant connections.
```
