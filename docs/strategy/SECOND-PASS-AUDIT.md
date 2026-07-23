# Koppie Systems second-pass audit

**Date:** 23 July 2026  
**Basis:** Production crawl artefacts (including post-cutover verification), portfolio screenshot migration, and content/conversion audit. Live domain was not independently browsed in the auditor’s environment; production conclusions rely on those artefacts.

## Current verdict

The website has moved from **technically blocked** to **technically launch-ready**, but it is still **commercially under-proven**.

| Area | Previous position | Current position | Score |
|---|---|---|---:|
| Crawlability | Production blocked | Cleared | **9.5/10** |
| Canonicals and sitemap | Localhost URLs | 52/52 correct | **9.5/10** |
| Technical SEO | Strong code, bad production env | Strong code and production config | **9/10** |
| Portfolio presentation | Broken live reconstructions | Consistent screenshots | **8.5/10** |
| Case-study depth | Incomplete | Still incomplete | **5/10** |
| Content architecture | Good | Good | **8.5/10** |
| Trust and authorship | Weak | Still weak | **5/10** |
| Local SEO credibility | Placeholder pages | Still unresolved | **5/10** |
| Service proof | Mostly claims/templates | Still insufficient | **5.5/10** |
| Conversion readiness | Good forms and structure | Needs stronger confidence signals | **7/10** |
| Overall | 7/10 | **7.8/10** | |

Production cutover is verified: robots allow crawling, all 52 sitemap URLs use the production `www` host, all 52 canonicals self-reference correctly, sitemap URLs return 200, and no localhost or Vercel preview references remain.

Project previews are resolved: six WebP screenshots replace live-coded reconstructions; cards use one reusable 16:9 screenshot component; mobile screenshots swap below 640px; public “pending” wording removed.

Remaining problem: **proof, authorship and commercial substance — not route architecture or technical SEO**.

Do not create more pages. Enough routes exist. Next gains come from Search Console, truthful project classification, authorship, completed Damtech/Proplytic case studies, visible workflows on main service pages, and clearer commercial expectations.

---

## Exact next sequence

### Manual step before Cursor (owner)

1. Confirm the domain property in Google Search Console.
2. Submit `https://www.koppiesystems.co.za/sitemap.xml`.
3. Live URL Inspection for homepage, business websites, custom web applications, projects, pricing, website-cost resource, Pretoria.
4. Request indexing for the homepage and primary commercial pages.

### Cursor prompts (in order)

1. **Prompt 4** — Trust, authorship and truthful project labels (`TRUST-AUTHORSHIP-IMPLEMENTATION.md`)
2. **Prompt 5** — Complete Damtech and Proplytic case studies (`CASE-STUDY-COMPLETION.md`)
3. **Prompt 6** — Homepage proof and service conversion upgrade (`CONVERSION-PROOF-UPGRADE.md`)

Full prompt text for Prompts 4–6 is retained in the conversation that produced this audit; execute them verbatim when the previous gate is cleared.

---

## Priority map (summary)

### P0

- Template / illustrative labels on catalogue, ecommerce, engineering, manufacturers pages
- Resource article authorship (all three live articles)
- Pretoria / Johannesburg indexing gate
- About / founder identity (supports authorship)

### Highest P1

- Damtech and Proplytic case-study narratives (keep noindex until publication gate + owner approval)

### P1

- Homepage proof section
- Service proof mapping (Damtech / Proplytic / labelled demos)
- RFQ workflow illustration; portal/admin workflows
- Ecommerce / catalogue model matrix
- Package scope clarity; contact/proposal expectations
- Business websites, lead gen, custom apps, SEO service strengthening (no fabricated metrics)

### P2–P3

- Services hub categorisation; redesign / maintenance clarity; comparisons; small-businesses monitoring

---

## Page notes (condensed)

Full page-by-page guidance from the second-pass audit lives in the originating conversation. Key hard rules:

- No unverified client counts, rankings, revenue or conversion percentages.
- Templates and illustrative demos must never read as completed client projects.
- Johannesburg must not imply a physical office unless one exists.
- Case studies stay noindex until the publication gate and owner approval clear.
- Prefer real projects over templates; otherwise Work page, process, labelled demo, or remove cleanly.
