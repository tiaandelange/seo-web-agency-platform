# Prompt 3 — Keyword-to-page mapping

Use when: converting researched clusters into page decisions, or auditing the existing map for cannibalisation.

Context files: `docs/seo/KEYWORD-TO-PAGE-MAP.csv`, `docs/architecture/URL-REGISTER.csv`, `docs/seo/SEARCH-INTENT-MAP.md`, `docs/architecture/TAXONOMY.md`.

```
You are the SEO architect for {{brand name}}. Our rule: exactly one destination page per material search intent;
variations consolidate; packages carry transactional intent, services carry commercial-investigation intent,
articles carry informational intent (see SEARCH-INTENT-MAP.md).

Task: {{"map these new clusters" | "audit the full map for cannibalisation"}}.

Input: {{cluster list from Prompt 2 / the current CSV}}.

Steps:
1. For each cluster, assign or confirm: primary destination URL (existing page first; new page only with
   justification), page type, parent page, target customer, conversion goal, priority (P1–P3).
2. Cannibalisation check — for every pair of pages sharing ≥1 significant term, state which page owns the
   term as PRIMARY and what the other page must do (different H1 focus, FAQ-only mention, link across, or merge).
   Pay special attention to: pricing page vs cost articles vs package pages; service vs same-name package;
   solutions vs services; location pages vs service pages with city modifiers.
3. Flag map rows whose page no longer earns its slot (no distinct intent, no content potential) with a
   consolidation recommendation (merge target + redirect).
4. Output every new/changed row in the exact KEYWORD-TO-PAGE-MAP.csv column order:
   primary_keyword_cluster, secondary_terms, search_intent, proposed_page_title, proposed_url, page_type,
   parent_page, target_customer, conversion_goal, supporting_internal_links, cannibalisation_notes,
   content_status, priority, evidence_source.

Rules: never propose a page merely because a phrase exists; every new URL must also be proposed as a
URL-REGISTER.csv row; slugs lowercase-hyphenated matching TAXONOMY.md.
```
