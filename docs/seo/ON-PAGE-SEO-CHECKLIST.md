# On-page SEO checklist

Run per page before flipping any page to `live` (and re-run on significant edits). Automated items are covered by `npm run validate:seo` + tests; manual items need eyes.

## Automated (validator)

- [ ] Unique title, ≤60 chars total; unique meta description 70–160 chars
- [ ] Self-canonical present; trailing-slash form
- [ ] Exactly one H1 (component-enforced via PageHeader; validator checks data)
- [ ] Page reachable from home (orphan BFS)
- [ ] All related-slug references resolve; no broken internal links
- [ ] Indexable ⇒ in sitemap; noindex ⇒ absent from sitemap
- [ ] Images referenced in data carry alt text
- [ ] Slug lowercase-hyphenated; no category/entry slug collisions

## Manual — content quality

- [ ] Primary intent stated in the first two sentences; page answers it without scrolling past filler
- [ ] ≥300 words unique substantive copy (hubs ≥150 + cards); no copy pasted between sibling pages
- [ ] Primary phrase appears in H1, intro, and once in an H2 — naturally, no stuffing
- [ ] Secondary questions answered in on-page FAQ block rather than spawned as new pages
- [ ] Every factual claim true today and either evergreen or dated; placeholders visibly labelled
- [ ] en-ZA spelling; reading level plain-business (short sentences, no agency jargon)
- [ ] One clear primary CTA; contextual links per INTERNAL-LINKING-MAP obligations
- [ ] No fabricated proof (reviews, counts, logos, results) — rule 12

## Manual — technical spot checks

- [ ] View-source: content present in server HTML (no client-only content)
- [ ] Breadcrumb visible + valid BreadcrumbList (Rich Results Test)
- [ ] Type-specific schema present and matching visible content
- [ ] Mobile viewport: no horizontal scroll, tap targets ≥44px, CTA visible near fold
- [ ] Lighthouse mobile: perf ≥90 skeleton phase; a11y ≥95; zero CLS from images (dimensions set)

## Cadence

Full-site validator on every build (CI-ready script); manual checklist on new/edited pages; quarterly full-site content audit (see 90-day plan → ongoing).
