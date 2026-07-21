# Assumptions

All assumptions are reversible. Each one is tagged with where it is used.

| ID | Assumption | Basis | Used in |
|---|---|---|---|
| A-01 | The founder is based in Pretoria/Gauteng and serves clients remotely across South Africa. | Blueprint lists Pretoria first among location targets; existing workspace projects appear SA-based. | Local SEO plan, areas-we-serve, brand config `serviceAreas` |
| A-02 | The founder has a technical/engineering background and prior experience with contractor websites, property-management systems and admin/quotation tooling. | Stated in the brief; workspace contains a contractor website project and a property-management application (no confidential detail is reproduced anywhere in this repo). | Positioning, case-study templates |
| A-03 | Solo founder / very small team at launch; no office address to publish yet. | Typical for a new venture; no address supplied. | Organization schema (address omitted), GBP checklist (service-area business) |
| A-04 | Primary market: South African SMEs and technical/industrial businesses; billing in ZAR; audience reads en-ZA English. | Brief. | All content, pricing architecture |
| A-05 | Hosting on Vercel (or equivalent) with HTTPS and a single canonical host (`www` or apex to be chosen). | Phase 9 Vercel-compatible requirement. | Canonicalisation policy, launch checklist |
| A-06 | POPIA applies to lead forms; consent wording and a privacy policy are required before go-live. | SA law. | Form architecture, legal pages |
| A-07 | No keyword-tool subscription was available; search-demand ratings are qualitative (High/Medium/Low) based on SERP evidence gathered 2026-07-21, not numeric volumes. | Rule 12: no fabricated statistics. | Keyword research, keyword-to-page map |
| A-08 | Web research used a US-routed search index; SA-specific queries returned SA sources, which were preferred. SERPs should be re-verified from a ZA connection before major content investments. | Session environment. | Competitor research |
| A-09 | The uploaded PDF “SEO_First_Website_Blueprint_for_a_New_Business.pdf” matches the blueprint text in the briefing message. | PDF unreachable (sandbox VM failure); the message contains the complete 20-phase blueprint. | Whole project |
| A-10 | Indicative pricing ranges (see `data/packages.ts`) are placeholders anchored to 2026 SA market research: professional SEO-architecture sites R20k–R60k, ecommerce R60k–R150k+, low-end template market R2k–R10k. | Public 2026 pricing guides (sources in `docs/seo/COMPETITOR-RESEARCH.md`). | Pricing architecture, packages |
| A-11 | Node.js ≥ 18.18 (ideally 20/22 LTS) is available on the machine that runs the first build. | Next 15 requirement. | README installation |
| A-12 | The business will register a `.co.za` domain (possibly with a `.com` redirect). Domain unverified until purchased. | SA norm. | Name shortlist notes, launch checklist |
| A-13 | The four case-study templates mirror project types the founder can genuinely deliver (contractor site, catalogue+RFQ, property-management app, admin/quotation platform), so they can be swapped for real data with minimal restructuring. | Brief + A-02. | `content/projects/` |
