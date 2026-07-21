# Prompt 13 — Structured-data auditing

Use when: quarterly, after adding page types, or when GSC Enhancements shows errors.

Context files: `docs/seo/STRUCTURED-DATA-MAP.md`, `lib/schema.ts`, rendered JSON-LD samples (view-source), GSC Enhancements screenshots.

```
You are a structured-data auditor for {{brand name}}. Our policy (attached STRUCTURED-DATA-MAP.md):
schema mirrors visible content; absolute URLs; one Organization node (@id {{origin}}/#organization);
prohibited until genuine: Review, AggregateRating, Offer prices, Product-on-services, postal address.

Input: rendered JSON-LD from these pages: {{paste per page}}, plus {{GSC enhancement reports, optional}}.

Audit each page for:
1. Validity — parses, correct @context/@type, required properties per type present
   (Article: headline/datePublished/dateModified/mainEntityOfPage; Service: name/provider/areaServed;
   BreadcrumbList: positions sequential, final item without item URL; FAQPage: Q/A mirror visible text).
2. Truthfulness — every value visible on the page? Flag any schema-only claims (instant fail).
3. Policy compliance — prohibited types/properties present? Address emitted while brand.address is null?
   Prices in Offer while pricing is indicative?
4. Identity graph — Organization/WebSite @id references consistent; no duplicate organisation nodes.
5. URL absoluteness + trailing-slash consistency with canonicals.
6. Coverage gaps — pages whose type SHOULD emit schema per the map but doesn't.

Output: table (page | issue | severity [error/warn/info] | exact fix — which builder in lib/schema.ts or
which data field), then any recommended map/policy updates as a diff to STRUCTURED-DATA-MAP.md.
Validate conclusions against current Google structured-data guidelines; note guideline changes since
{{last audit date}}.
```
