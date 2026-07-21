# Search Console setup

## 1. Property creation (do this at DOMAIN level)

1. https://search.google.com/search-console → Add property → **Domain** (not URL-prefix) → enter the bare domain (e.g. `example.co.za`).
2. Verify via DNS TXT record at the registrar/DNS host (`google-site-verification=…`). Propagation up to a few hours; keep the record permanently.
3. Domain property covers all subdomains + both protocols — one property, no www/apex ambiguity.
4. Optional: add a URL-prefix property for the exact production origin too — it unlocks slightly different tooling views; harmless duplication.

## 2. Initial configuration

- Users: owner account (permanent) + any collaborator as Full user.
- Settings → verify "Ownership verified"; note crawl-stats access for later.
- Associate the GA4 property (Settings → Associations) when analytics exists.

## 3. Sitemap submission

1. Sitemaps → enter `sitemap.xml` → Submit.
2. Expect "Success" within minutes; "Discovered URLs" ≈ the indexable count in URL-REGISTER.csv (50 at launch). Investigate any mismatch immediately (the count is your architecture's integrity check).

## 4. First-week verification tasks

- URL Inspection: home + one service + one article → "Request indexing" for each.
- Live-test one page: confirm "URL is available to Google", canonical = user-declared, no noindex surprises.
- Page indexing report: watch "Crawled – currently not indexed" (normal early; sustained growth of it later = quality signal to act on) and "Excluded by 'noindex'" (should list exactly our deliberate noindex set — thank-you, project templates/categories).
- Rich results: Enhancements section should show Breadcrumbs (+ FAQ on /faq/) without errors.

## 5. Ongoing use (feeds the 90-day plan)

- Performance report weekly: queries, impressions, positions per page — this replaces guessed keyword volumes with real demand data (A-07 resolution).
- Page indexing monthly; Core Web Vitals when field data accrues; Security & Manual actions should stay empty.
- Every new/changed key page: URL Inspection → request indexing.

## Cautions

- Never verify or submit the staging host anywhere.
- Don't panic-resubmit sitemaps; once per structural change is enough.
- "Request indexing" is a queue hint, not a command — no guarantees on timing (rule 10 applies to our own expectations too).
