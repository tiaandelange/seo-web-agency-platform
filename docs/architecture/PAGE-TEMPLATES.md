# Page-template specifications

21 structural templates. To avoid repeating identical requirements 21 times, the **baseline** applies to every template; each spec then lists only its specifics.

## Baseline (applies to ALL templates)

- **Metadata**: unique title (≤60 chars incl. template suffix), unique meta description (70–160 chars), self-canonical, OG title/description(/image when asset exists), robots per URL register. Implemented via `buildMetadata()`.
- **Structure**: exactly one H1; logical H2/H3 outline; breadcrumbs above H1 (except home); semantic landmarks (`header/nav/main/footer`); skip-link target `#main`.
- **Structured data**: `WebPage` + `BreadcrumbList` minimum (from `lib/schema.ts`), plus type-specific schema below. All generated from the same content objects as the visible page.
- **Conversion**: every commercial/transactional template ends with the quote CTA block; phone/email/WhatsApp links use `tel:`/`mailto:`/`wa.me` (rendered only when configured).
- **Accessibility**: visible focus states, labelled controls, alt text on all content images, no information conveyed by colour alone, reduced-motion respected.
- **Images**: framework image component, explicit dimensions, descriptive alt from data; no decorative stock imagery in skeleton phase.
- **Anti-duplication**: intro paragraphs, FAQ answers and section copy must be written per page — components may repeat, sentences may not. The validator flags duplicate titles/descriptions; duplicate body copy is an editorial rule (EDITORIAL-GUIDELINES.md).
- **Minimums**: indexable pages ≥300 words of unique substantive content (hubs exempt at ≥150 + cards); pages that can't meet this stay noindex or unbuilt.

## 1. Homepage `/`
Purpose: convert company-level commercial searches and referrals. Intent: commercial. H1: value proposition naming what we build + for whom + SA. Sections: H2 outcome promise w/ subcopy → H2 Services (6 cards) → H2 Who we build for (solutions strip) → H2 Why SEO-first (method proof, 3 points) → H2 Process (4 steps) → H2 Packages teaser → H2 honest new-studio proof block → H2 FAQ excerpt (3) → CTA. Above fold: H1, one-sentence differentiation, quote CTA + packages link. Trust: method transparency, stack facts, owner-led delivery (no fabricated numbers). Schema: adds `Organization` + `WebSite` + `ProfessionalService`. Links: services hub+6, solutions, packages, pricing, projects, quote. Not duplicated: service-page copy.

## 2. Services overview `/services/`
Purpose: route + rank for "web development services". H1 "Web development services". Sections: intro (how tiers relate) → H2 per tier (Website / Custom systems / Ongoing support) each with cards (title, 1-line problem, link) → H2 how to choose (links compare pages) → CTA. Schema: `WebPage` + `ItemList` of services. Links: all 11 services, compare hub, quote. Not duplicated: individual service scope detail.

## 3. Individual service `/services/{slug}/`
Purpose: own one commercial cluster. H1 = service name (+ SA where natural). Sections: intro (who it's for, outcome) → H2 Problems we solve (bullets from data) → H2 What's included (deliverables) → H2 What's not included (exclusions — trust) → H2 How it works (process excerpt) → H2 related package/pricing pointer → H2 FAQs (2–4, page-specific) → H2 Related projects/guides → CTA. Above fold: H1 + who-for sentence + CTA. Schema: adds `Service` (provider = Organization, areaServed from brand). Links: per INTERNAL-LINKING-MAP obligations. Not duplicated: other services' deliverables; package pricing tables.

## 4. Solution/industry `/solutions/{slug}/`
Purpose: industry-specific commercial capture; topical authority. H1 "Websites for {industry}". Sections: intro speaking the industry's language → H2 what {industry} needs from a website (pain points) → H2 recommended approach (maps to 2–3 services with reasons) → H2 relevant projects (when real) → H2 FAQs → CTA. Schema: `WebPage`(+`Service` NOT added — capability described belongs to services). Not duplicated: service deliverable lists (link, don't restate).

## 5. Packages overview `/website-packages/`
Purpose: transactional hub. H1 "Website packages & pricing". Sections: intro (how packages relate to custom scope) → package cards (name, for-whom, indicative range, link) → H2 what's always included (SEO-first baseline) → H2 not sure? (compare + consultation) → CTA. Schema: `ItemList`. Links: 5 packages, pricing, quote.

## 6. Individual package `/website-packages/{slug}/`
Purpose: convert price-intent searches. H1 = package name. Sections: intro (who it fits) → H2 What you get (inclusions) → H2 What it costs (indicative range + "indicative" label + what moves price) → H2 What's excluded → H2 Delivery timeline → H2 parent-service pointer → H2 FAQs → CTA. Schema: `Service` with `Offer` carrying `priceSpecification` only if owner confirms publishing numbers; until then Offer omitted (D-11 anti-manipulation). Not duplicated: parent service's capability narrative.

## 7. Projects overview `/projects/`
Purpose: proof hub. H1 "Projects & case studies". Sections: honest intro (new-studio status until real projects) → category links (when live) → project cards → H2 how we document projects (method credibility) → CTA. Schema: `CollectionPage`. Cards for template studies clearly badged "Example structure".

## 8. Project category `/projects/{category}/`
Purpose: filtered proof. H1 "{Category} projects". Noindex while empty of real projects (rule 3). Sections: intro → cards → related services block → CTA.

## 9. Project case study `/projects/{slug}/`
Purpose: evidence asset. H1 = project name (outcome-flavoured once real). Sections: summary strip (client descriptor, industry, location, stack, services — from data) → H2 The business problem → H2 Objectives → H2 Scope → H2 The solution → H2 Implementation process → H2 Key functionality → H2 SEO work (when performed) → H2 Results (ONLY verified numbers; section hidden otherwise) → H2 Testimonial (only genuine) → H2 Services used / related projects/guides → CTA. Schema: `Article` (+`Review` never unless genuine). Templates render with a prominent "EXAMPLE TEMPLATE" notice and noindex (D-07).

## 10. Resources overview `/resources/`
H1 "Guides & resources". Purpose: authority hub. Sections: intro (what we publish and why) → category cards (live only) → latest articles → CTA (soft). Schema: `CollectionPage`.

## 11. Guide/article `/resources/{slug}/`
Purpose: informational capture feeding a commercial page. H1 = the question/topic. Sections: direct answer in first 2 paragraphs → H2s per sub-question → in-body contextual link to supported service → H2 sources/method when citing figures → dated ("Updated {month year}" from data) → end CTA linking supported service ("get a tailored estimate"). Schema: `Article` (headline, dates, author when set). Not duplicated: commercial page copy; ranges must cite the pricing page rather than restate numbers that will go stale.

## 12. Comparison `/compare/{slug}/`
Purpose: decision-stage capture. H1 "{A} vs {B}…". Sections: 2-paragraph honest summary → criteria table (from data) → H2 When {A} is right → H2 When {B} is right → H2 Our verdict (conditional, no strawman) → H2 supported-service pointer → CTA (consultation). Schema: `Article`. Rule: represent the losing option fairly — credibility is the ranking asset.

## 13. Location `/areas-we-serve/{slug}/`
Purpose: local commercial capture. H1 "Website design & development in {City}". Sections: intro with genuine local specifics (service model, meeting availability, areas covered) → H2 services offered there (true subset) → H2 local projects (only real; hidden otherwise) → H2 how we work remotely/on-site → H2 FAQs (local) → CTA + contact block. Schema: `WebPage` + `ProfessionalService` with `areaServed` = city. Hard rule: no boilerplate city-swapping; each page's sections written from scratch (rule 11).

## 14. About `/about/`
Purpose: trust. H1 "About {brand}". Sections: who builds the sites (engineering-led story) → H2 how we're different (method, ownership) → H2 who we work with → H2 founder (real bio when supplied; placeholder clearly marked until then) → CTA. Schema: `AboutPage` + `Person` (when real bio exists).

## 15. Process `/process/`
Purpose: de-risk the purchase. H1 "Our web development process". Sections: intro (why process transparency) → H2 per stage (Discovery → SEO architecture → Build → Content & QA → Launch → Measure & support) each: what happens, what you get, your involvement → H2 timelines (honest ranges) → H2 FAQs → CTA. Schema: `WebPage` (+`HowTo` NOT used — service process, not instructions; avoids spammy fit).

## 16. Pricing `/pricing/`
Purpose: answer "what do you charge" commercially. H1 "Website design & development pricing". Sections: intro (philosophy: ranges published, quotes exact) → ranges table (all packages + hourly + support, all "indicative") → H2 what moves price up/down → H2 support plans summary → H2 cost-guide pointer (article) → H2 FAQs (payment terms etc.) → CTA. Schema: `WebPage` (no fake `Offer`/`AggregateRating`).

## 17. FAQ `/faq/`
Purpose: long-tail Q&A + objection handling. H1 "Frequently asked questions". Sections: grouped H2s (Cost & payment / Process & timelines / Technical & SEO / Support) with `<details>`-free semantic Q(H3)+A pairs. Schema: `FAQPage` (only page using it — D-09). Rule: questions not worth a page live here; a question graduating to an article gets removed here (no duplication).

## 18. Contact `/contact/`
Purpose: navigational conversion. H1 "Contact us". Sections: contact methods (rendered only when configured), hours, service areas, short form (name/email/phone/message + consent) → what happens next (response expectation) → quote-page pointer. Schema: `ContactPage` + `ProfessionalService` contact points.

## 19. Quote request `/request-a-quote/`
Purpose: primary conversion. H1 "Request a quote". Sections: reassurance intro (what happens after, no-obligation) → form: name*, email*, phone, company, service interest (select from services data), budget band (optional select of indicative bands), timeline, message*, consent* checkbox (POPIA wording), honeypot + time-trap → trust bullets (response time, direct-with-builder) → alternative contacts. Success → `/request-a-quote/thank-you/` (noindex) with next-steps copy. Schema: `ContactPage`.

## 20. Legal `/legal/{slug}/`
Purpose: compliance. H1 = document name. Sections: effective date, structured H2 clauses; PLACEHOLDER drafts clearly marked for legal review (owner input #10). Schema: `WebPage` only.

## 21. Not found (404)
Purpose: recover lost visits. H1 "Page not found". Sections: apology-free explanation, search-free recovery links (services, packages, resources, contact), quote CTA. Returns real 404 status. Schema: none. Never redirects.
