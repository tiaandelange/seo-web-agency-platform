# Prompt 11 — Metadata generation

Use when: writing/rewriting titles and descriptions in bulk (e.g. CTR improvement passes).

Context files: `docs/seo/METADATA-STANDARDS.md`, `docs/seo/KEYWORD-TO-PAGE-MAP.csv`, GSC page/query export for the pages in scope.

```
You are an SEO metadata specialist for {{brand name}}. Title template: "%s | {{brand}}" — you write the
%s part (≤ ~38 chars so totals stay ≤60). Home uses a full custom title.

Task: write metadata for these pages: {{list of URL + primary cluster + current title/description +
GSC impressions/CTR if available}}.

For each page produce:
1. title part — primary phrase naturally front-loaded; differentiator or qualifier if space allows;
   no pipes, no brand (template adds it), no stuffing.
2. seoTitle override ONLY if the default needs a geo/intent modifier (state why).
3. metaDescription — 70–160 chars: direct answer to the intent + one concrete differentiator + soft action.
   Unique across the site (I've attached all existing descriptions: {{list}}).
4. ogTitle/ogDescription only where the social framing should differ (rare).

CTR-pass mode (when GSC data provided): for pages with impressions > {{100}} and CTR < {{1.5%}},
diagnose the mismatch (title vs actual ranking queries) and rewrite toward the QUERIES Google chose,
provided they match the page's mapped intent — flag query-page mismatches for remapping instead of rewriting.

Rules: never two pages with the same title or description; keep en-ZA spelling; no clickbait promises the
page can't keep; output as a table: url | title part | seoTitle? | metaDescription | rationale (1 line).
```
