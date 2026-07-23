# Content and conversion audit

**Date:** 23 July 2026  
**Scope:** Every indexable route in the Koppie Systems registry (52), plus noindex drafts that affect commercial trust  
**Method:** Route registry + content models + page templates (no bulk rewrite; no redirects/deletes executed)  
**Related:** `docs/technical/PRODUCTION-CRAWL-AUDIT.md`, `docs/technical/PORTFOLIO-SCREENSHOT-MIGRATION.md`  
**Raw extract:** `docs/strategy/_content-audit-raw.json`

---

## Executive summary

The site's information architecture is commercially sensible: services, solutions, packages, comparisons, resources and locations are separated for different intents. Lexical overlap between sibling pages is **low** (token Jaccard generally under 25% on core copy), so this is not a mass doorway-page problem.

The commercial weakness is **proof and authorship**, not URL count:

1. Only **two real projects** exist (Damtech, Proplytic). Both now have screenshots but remain **noindex** case studies.
2. Several service and solution pages still **link template projects** as "Project" related items — those templates are examples, not client proof.
3. **All three live resource articles lack a real author/byline**; founder bio is still gated (`founderBioApproved: false`).
4. **Pretoria and Johannesburg** are indexable but flagged `placeholder: true` with **zero local project links**.
5. Homepage capability storytelling is strong; **verifiable proof still appears too late**.
6. Production indexing is still blocked by the env defect from the crawl audit — content quality work should not assume organic traffic until that is fixed.

**Verdict:** Keep the route set. Do not add city or industry pages. Prioritise finishing two case studies, labelling or unlinking templates, adding authors, and deepening Portals/RFQ/Ecommerce proof. Then reassess which supporting pages earn their index slot.

---

## Complete route table (indexable = 52)

Word counts are **content-model approximations** (intro + structured fields), not full rendered HTML.

| URL | Type | Intent | Audience | H1 sense | Words | CTA | Project | Service | Author | Index | Similarity | Action |
|---|---|---|---|---|---:|---|---|---|---|---|---|---|
| `/` | homepage | Orient + enquire | Tech/industrial/service biz | Brand hero | — | Proposal | Showcase trio | Websites+systems | — | Y | Low | Expand |
| `/services/` | hub | Navigate | Same | Services | thin | Quote | — | All | — | Y | Low | Keep |
| `/services/business-websites/` | service | Buy | Established biz | Business website design | 349 | Quote | Damtech | SEO/redesign/maint | — | Y | Low | Expand |
| `/services/lead-generation-websites/` | service | Buy | Contractors/quote-driven | Lead generation websites | 298 | Quote | Damtech | SEO/business/maint | — | Y | Low | Expand |
| `/services/product-catalogue-websites/` | service | Buy | Manufacturers | Product catalogue websites | 307 | Quote | **Template** | RFQ/ecom/maint | — | Y | Low | Expand |
| `/services/ecommerce-websites/` | service | Buy | Online sellers | Ecommerce websites | 285 | Quote | **Template** | Catalogue/SEO/maint | — | Y | Low | Expand |
| `/services/custom-web-applications/` | service | Consult | Process-heavy SMEs | Custom web applications | 304 | Consult | Proplytic+**tmpl** | Admin/RFQ/portals | — | Y | Low | Expand |
| `/services/admin-panel-development/` | service | Consult | Ops teams | Admin panel development | 286 | Consult | **Tmpl**+Proplytic | Custom/RFQ/portals | — | Y | Low | Expand |
| `/services/rfq-and-quotation-systems/` | service | Consult | Quote-driven B2B | RFQ and quotation systems | 292 | Consult | **Templates only** | Catalogue/admin/custom | — | Y | Low | Expand |
| `/services/customer-and-supplier-portals/` | service | Consult | B2B accounts | Customer/supplier portals | 287 | Consult | Proplytic | Admin/custom/RFQ | — | Y | Low | Expand |
| `/services/website-redesign/` | service | Buy | Weak existing sites | Website redesign | ~280 | Quote | **None** | Packages | — | Y | Low | Expand |
| `/services/seo-website-development/` | service | Buy | SEO-aware buyers | SEO website development | ~290 | Quote | Damtech | Packages | — | Y | Low | Expand |
| `/services/website-maintenance-and-support/` | service | Retain | Site owners | Maintenance and support | ~280 | Quote | **None** | — | — | Y | Low | Expand |
| `/solutions/` | hub | Navigate | Industry buyers | Industry solutions | thin | Quote | — | — | — | Y | Low | Keep |
| `/solutions/contractors/` | solution | Fit | Trades | Websites for contractors | ~220 | Quote | Damtech | Lead-gen/SEO/maint | — | Y | Low | Expand |
| `/solutions/engineering-companies/` | solution | Fit | Engineering | Websites for engineering | ~230 | Quote | **Template** | Business/RFQ/portals | — | Y | Low | Expand |
| `/solutions/manufacturers-and-suppliers/` | solution | Fit | Manufacturers | Manufacturers and suppliers | ~230 | Quote | **Template** | Catalogue/RFQ/ecom | — | Y | Low | Expand |
| `/solutions/property-businesses/` | solution | Fit | Property | Property businesses | ~220 | Quote | Proplytic | Custom/portals | — | Y | Low | Keep |
| `/solutions/professional-services/` | solution | Fit | Practices | Professional services | ~210 | Quote | **None** | Business/SEO | — | Y | Med | Expand |
| `/solutions/small-businesses/` | solution | Fit | SMEs | Small businesses | ~210 | Quote | Damtech | Business/packages | — | Y | Med | Consolidate* |
| `/website-packages/` | hub | Self-qualify | Package shoppers | Website packages | thin | Quote | — | — | — | Y | Low | Keep |
| `/website-packages/starter-business-website/` | package | Buy | New/small | Starter package | ~260 | Quote | — | business-websites | — | Y | Low | Expand |
| `/website-packages/professional-business-website/` | package | Buy | Lead-gen firms | Professional package | ~280 | Quote | — | lead-generation | — | Y | Low | Expand |
| `/website-packages/product-catalogue-website/` | package | Buy | Catalogue sellers | Catalogue package | ~260 | Quote | — | catalogue | — | Y | Low | Expand |
| `/website-packages/ecommerce-website/` | package | Buy | Online sellers | Ecommerce package | ~260 | Quote | — | ecommerce | — | Y | Low | Expand |
| `/website-packages/custom-web-system/` | package | POA | Systems buyers | Custom web system | ~250 | Quote | — | custom apps | — | Y | Low | Expand |
| `/projects/` | hub | Proof | Evidence seekers | Projects | — | Quote | Showcase | — | — | Y | Low | Keep |
| `/resources/` | hub | Educate | Researchers | Resources | thin | Soft | — | — | — | Y | Low | Keep |
| `/resources/website-cost-guides/` | res-cat | Browse | Cost researchers | Website cost guides | thin | Articles | — | business | — | Y | Low | Keep |
| `/resources/seo-guides/` | res-cat | Browse | SEO researchers | SEO guides | thin | Articles | — | SEO | — | Y | Low | Keep |
| `/resources/website-cost-south-africa/` | article | Educate | SA buyers | Website cost in SA | 506 | Services | — | business | **MISSING** | Y | Low | Expand |
| `/resources/choosing-a-website-development-company/` | article | Educate | Provider shoppers | Choosing a company | 332 | Services | — | business | **MISSING** | Y | Med | Expand |
| `/resources/what-is-an-seo-first-website/` | article | Educate | SEO-curious | What is SEO-first | 347 | SEO svc | — | SEO | **MISSING** | Y | Med | Expand |
| `/compare/` | hub | Decide | Comparers | Comparisons | thin | Quote | — | — | — | Y | Low | Keep |
| `/compare/custom-website-vs-template/` | comparison | Decide | Build approach | Custom vs template | ~320 | Quote | — | business/SEO | — | Y | Low | Keep |
| `/compare/wordpress-vs-nextjs/` | comparison | Decide | Stack choosers | WordPress vs Next.js | ~300 | Quote | — | custom/SEO | — | Y | Low | Keep |
| `/compare/website-vs-web-application/` | comparison | Decide | Scope choosers | Website vs web app | ~280 | Quote | — | business/custom | — | Y | Low | Keep |
| `/compare/website-maintenance-options/` | comparison | Decide | Care plans | Maintenance options | ~280 | Quote | — | maintenance | — | Y | Low | Keep |
| `/areas-we-serve/` | hub | Local | Geo buyers | Areas we serve | thin | Contact | — | — | — | Y | Low | Keep |
| `/areas-we-serve/pretoria/` | location | Local trust | PTA/Centurion | Design in Pretoria | thin+FAQ | Quote | **None** | Many | — | Y | Med | Expand |
| `/areas-we-serve/johannesburg/` | location | Local trust | JHB metro | Design in Johannesburg | thin+FAQ | Quote | **None** | Many | — | Y | Med | Expand |
| `/about/` | about | Trust | All | About | — | Contact | — | — | Founder gated | Y | Low | Expand |
| `/process/` | process | Reduce risk | Buyers | Our process | — | Quote | — | — | — | Y | Low | Keep |
| `/pricing/` | pricing | Self-qualify | Budget-aware | Pricing | — | Quote | — | Packages | — | Y | Low | Expand |
| `/seo-audit/` | product | Productise | Site owners | SEO audits | — | Intake | — | SEO | — | Y | Low | Keep |
| `/seo-audit/advanced/` | product | Upsell | Serious SEO | Advanced SEO audit | — | Intake | — | SEO | — | Y | Low | Keep |
| `/faq/` | faq | Objections | All | FAQ | — | Quote | — | — | — | Y | Low | Keep |
| `/contact/` | contact | Convert | Ready | Contact | — | Form | — | — | — | Y | Low | Expand |
| `/request-a-quote/` | quote | Convert | Proposal-ready | Request a proposal | — | Form | — | — | — | Y | Low | Expand |
| `/legal/privacy-policy/` | legal | Compliance | All | Privacy | — | — | — | — | — | Y | Low | Keep |
| `/legal/terms-of-service/` | legal | Compliance | All | Terms | — | — | — | — | — | Y | Low | Keep |
| `/legal/cookie-policy/` | legal | Compliance | All | Cookies | — | — | — | — | — | Y | Low | Keep |

\* Consolidate later only if Search Console shows shared intent with business-websites; do not delete now.

### Noindex / non-sitemap (trust-relevant)

| URL | Role | Note | Action |
|---|---|---|---|
| `/projects/{websites,ecommerce,admin-systems}/` | Categories | Index only when category has indexable project | Keep noindex |
| `/projects/damtech-website/`, `/projects/proplytic-property-software/` | Real case studies | Screenshots yes; narrative draft; correctly noindex | Expand then index |
| `/projects/*-template/` | Examples | Must not read as client proof in related links | Keep noindex; relabel in UI |
| Thank-you / audit intake routes | Utilities | Correctly noindex | Keep |
| Cape Town location | Planned | Not generated | Keep planned |

---

## Page-by-page decisions (by family)

### Homepage — Expand (P1)

Working: capability map, systems workflow language, industrial tone, CTAs.  
Missing: early truthful proof strip; explicit "websites + workflows behind them"; light Pretoria/SA context in support copy.  
Do not invent client counts, conversion rates, or rankings.

### Services — Expand (P1), keep all 11

Deliverables are already specific. Main gaps: live project proof (especially where templates are linked), workflow UI for RFQ/portals/admin, FAQ depth, stack callouts, ecommerce model clarity.

**Ecommerce framing required on-page:** standard checkout vs catalogue-without-checkout vs quote-request ecommerce vs trade pricing vs stock/delivery rules — state standard vs custom.

**Portals and RFQ:** show submit → review → price → quote → accept → track → documents → report, even if demos are labelled illustrative.

### Solutions — Keep/Expand; fix template proof links

Industry copy is distinct (not noun-swapped). Risks: engineering/manufacturers point at templates; professional-services has no project; small-businesses overlaps business-websites commercially (monitor, don't delete yet).  
No new industry pages until each has unique workflows + proof.

### Packages — Expand (P1)

Good self-qualification (pages, inclusions, exclusions, indicative ZAR, timelines). Still `placeholder: true` pending owner price confirmation (D-11). Promote content responsibility, revisions, hosting/support, and price drivers into the body. Keep complex systems assessment-based.

### Projects — Expand real case studies; keep templates noindex

| Project | Screenshots | Narrative | Verified results | Work card | Index |
|---|---|---|---|---|---|
| Damtech | Yes | Incomplete | 0 | Live project | noindex until Gate |
| Proplytic | Yes | Incomplete | 0 | Live project | noindex until Gate |
| Wedding | Showcase only | No CS route | — | Personal event website | N/A |
| Templates | No | Example only | — | Must not sell as clients | noindex |

Case-study checklist: context, problem, scope, functionality, technical approach, constraints, screenshots, honest result or omit, service links, CTA.

### Resources — Expand authorship (P1)

| Article | SA context | Sources | Author | Note |
|---|---|---|---|---|
| website-cost-south-africa | Strong | 4 | Missing | Strategic — deepen |
| choosing-a-website-development-company | Moderate | 0 | Missing | Differentiate from cost guide |
| what-is-an-seo-first-website | Moderate | 0 | Missing | Differentiate from SEO service |

Add author, visible dates, sources where needed, commercial next step. Do not mass-publish filler.

### Comparisons — Keep

Fair criteria and honest "when B wins" sections. Light refresh only.

### Locations — Expand the two live pages only

Genuine local intros exist; both lack project links and still `placeholder: true`. Do not create more cities. Cape Town stays planned.

### Contact / proposal — Expand commercial UX (P1)

Forms are technically sound. Add response expectations, prep list, next steps, free discussion?, phone/email fallback, privacy/consent clarity. Production email E2E still required.

### About / process / pricing / FAQ / SEO audit / legal

About blocked on founder bio approval. Pricing must stay aligned with packages. Legal Keep.

---

## Cannibalisation map

```text
"business website South Africa"
  PRIMARY   /services/business-websites/
  SUPPORT   packages/starter, solutions/small-businesses, cost article
  RISK      small-businesses ≈ same buyer; seo-website-development (method vs product)

"lead generation / contractor website"
  PRIMARY   /services/lead-generation-websites/
  SUPPORT   solutions/contractors, packages/professional
  RISK      Low if contractors stays proof-heavy

"catalogue / RFQ / B2B sell"
  PRIMARY   product-catalogue + rfq-and-quotation-systems
  SUPPORT   solutions/manufacturers-and-suppliers
  RISK      Template proof; ecommerce must not claim full RFQ depth

"custom systems / portals"
  PRIMARY   custom-web-applications, portals, admin-panel
  SUPPORT   solutions/property-businesses (Proplytic)
  RISK      Shared "streamline ops" language without UI proof

"website cost SA"
  PRIMARY   /resources/website-cost-south-africa/
  SUPPORT   /pricing/, packages
  RISK      choosing-a-company article — keep criteria-focused

"Pretoria web design"
  PRIMARY   /areas-we-serve/pretoria/
  RISK      Thin without local proof; do not clone cities
```

---

## Thin-content and trust risks

| Risk | Severity | Notes |
|---|---|---|
| Template projects linked as "Project" | P0 | RelatedContent has no "Example template" badge |
| Locations indexable + placeholder + no projects | P0 | Expand or hold until substance |
| Articles without author | P0 | Expertise / trust |
| Case studies noindex while Work sells them | P1 | OK short-term; finish narratives |
| Package prices placeholder | P1 | OK if clearly indicative |
| professional-services unproven | P1 | Expand workflows or demote later |
| Production robots/canonical localhost | P0 ops | Crawl audit — blocks organic value |

Lexical similarity is not the main thin-content risk. Shared generic agency claims without unique proof is.

---

## Missing proof inventory (main services)

| Service | Live project | Screenshot path | Workflow UI | Deliverables | Pricing link | FAQ>=3 |
|---|---|---|---|---|---|---|
| business-websites | Damtech | via project | — | Yes | Packages | Yes |
| lead-generation | Damtech | via project | Partial | Yes | Packages | No |
| product-catalogue | Template only | No | Needed | Yes | Packages | No |
| ecommerce | Template only | No | Needed | Yes | Packages | No |
| custom-web-apps | Proplytic (+tmpl) | Partial | Needed | Yes | Package | No |
| admin-panel | Template + Proplytic | Partial | Needed | Yes | Package | No |
| rfq-quotation | Templates only | No | Critical | Yes | Package | No |
| portals | Proplytic | Partial | Critical | Yes | Package | No |
| redesign | None | No | — | Yes | Package | No |
| seo-website-dev | Damtech | via project | Dedicated view helps | Yes | Package | No |
| maintenance | None | No | — | Yes | None | No |

Also generally missing on service pages: explicit stack, dedicated process section, author/reviewer. Never invent customers, testimonials, traffic, rankings, revenue, or conversion rates.

---

## Internal-link gaps

1. Locations → Damtech / Proplytic with honest geography notes.  
2. Services → prefer live projects; templates only if labelled illustrative.  
3. Ecommerce ↔ catalogue ↔ RFQ with explicit commerce-model language.  
4. Articles → packages + pricing + one comparison each.  
5. Solutions without projects → process / Industrial Engine / proposal — not fake case studies.  
6. Homepage proof strip → `/projects/` + two live case studies.

---

## Priority implementation sequence

### P0 — trust / index quality

1. Fix Production `NEXT_PUBLIC_SITE_URL` / `SITE_ENV` before expecting Search Console wins.  
2. Label or unlink template projects in RelatedContent.  
3. Add real article authors (or withhold article emphasis until authored).  
4. Pretoria / Johannesburg: attach proof or clear placeholder with real local substance.  
5. Keep Work free of pending wording (screenshot migration done).

### P1 — main service and conversion

1. Finish Damtech + Proplytic case-study narratives; flip noindex when Gate criteria met.  
2. Homepage proof strip + systems distinction.  
3. RFQ + portals (+ admin) illustrative workflow demos, clearly labelled.  
4. Ecommerce model matrix on ecommerce and catalogue pages.  
5. Confirm package indicative prices; surface revisions/hosting/price drivers.  
6. Contact / proposal commercial expectations copy.  
7. Approve founder bio for About + bylines.

### P2 — resources and supporting

1. Deepen cost guide; add sources; differentiate choosing-a-company.  
2. Light comparison refreshes only.  
3. Align process + pricing with packages.  
4. FAQ coverage on thin service pages.

### P3 — future expansion

1. New pages only from real search demand + business evidence.  
2. More locations only with genuine local proof.  
3. New industries only with unique workflows.  
4. After GSC data: consolidate small-businesses if it cannibalises business-websites.

---

## What this audit does not do

- Bulk rewrite of copy  
- Redirects, noindex flips, or deletions  
- New location or industry URLs  
- Invented testimonials, metrics, or client logos  

Review this document, then commission targeted rewrites by priority — not a whole-site regenerate.

---

## Files

| Item | Path |
|---|---|
| This report | `docs/strategy/CONTENT-AND-CONVERSION-AUDIT.md` |
| Raw JSON | `docs/strategy/_content-audit-raw.json` |
| Generator | `scripts/content-conversion-audit.ts` |
