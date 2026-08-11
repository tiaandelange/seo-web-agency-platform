# Sitemap (information architecture)

Authoritative human-readable map. Machine source of truth: `lib/routes.ts` (drives `app/sitemap.ts`, breadcrumbs and the SEO validator). Full per-URL flags: `URL-REGISTER.csv`. Crawl snapshot (not the live generator): `docs/technical/production-crawl-artifacts/sitemap.xml`.

Legend: ✅ indexable · 🚫 generated but noindex · 🕐 planned, not generated.

```
/                                                ✅ Home — company-level commercial intent
├── /services/                                   ✅ Hub
│   ├── /business-websites/                      ✅
│   ├── /lead-generation-websites/               ✅
│   ├── /product-catalogue-websites/             ✅
│   ├── /ecommerce-websites/                     ✅
│   ├── /custom-web-applications/                ✅
│   ├── /admin-panel-development/                ✅
│   ├── /rfq-and-quotation-systems/              ✅
│   ├── /customer-and-supplier-portals/          ✅
│   ├── /website-redesign/                       ✅
│   ├── /seo-website-development/                ✅
│   ├── /analytics-and-conversion-tracking/      ✅
│   ├── /search-care/                            ✅ monthly SEO health (D-45)
│   └── /website-maintenance-and-support/        ✅ (all support plans on this one page)
├── /solutions/                                  ✅ Hub (industries)
│   ├── /contractors/                            ✅
│   ├── /engineering-companies/                  ✅
│   ├── /manufacturers-and-suppliers/            ✅
│   ├── /property-businesses/                    ✅
│   ├── /professional-services/                  ✅
│   └── /small-businesses/                       ✅
├── /website-packages/                           ✅ Hub (transactional)
│   ├── /one-page-website/                       ✅
│   ├── /starter-business-website/               ✅
│   ├── /professional-business-website/          ✅
│   ├── /product-catalogue-website/              ✅
│   ├── /ecommerce-website/                      ✅
│   └── /custom-web-system/                      ✅
├── /projects/                                   ✅ Hub
│   ├── /websites/                               ✅ (Damtech published)
│   ├── /ecommerce/                              🚫 until ≥1 real ecommerce project
│   ├── /admin-systems/                          ✅ (Proplytic published)
│   ├── /damtech-website/                        ✅
│   └── /proplytic-property-software/            ✅
├── /resources/                                  ✅ Hub
│   ├── /website-cost-guides/                    ✅ category
│   ├── /seo-guides/                             ✅ category
│   ├── /ecommerce-guides/                       🕐 planned (empty — D-18)
│   ├── /business-systems/                       🕐 planned
│   ├── /website-cost-south-africa/              ✅
│   ├── /seo-cost-south-africa/                  ✅ (D-46)
│   ├── /what-is-an-seo-first-website/           ✅
│   └── /choosing-a-website-development-company/ ✅
├── /compare/                                    ✅ Hub
│   ├── /custom-website-vs-template/             ✅
│   ├── /wordpress-vs-nextjs/                    ✅
│   ├── /website-vs-web-application/             ✅
│   └── /website-maintenance-options/            ✅
├── /areas-we-serve/                             ✅ Hub
│   ├── /pretoria/                               ✅ (Centurion consolidated here)
│   ├── /johannesburg/                           🚫 deferred evidence / indexation gate
│   └── /cape-town/                              🕐 phase 2 (D-08)
├── /seo-audit/                                  ✅ Priority Fix Pack hub
│   ├── /intake/                                 🚫
│   ├── /thank-you/                              🚫
│   └── /advanced/                               ✅ Advanced audit
│       ├── /intake/                             🚫
│       └── /thank-you/                          🚫
├── /about/                                      ✅
├── /process/                                    ✅
├── /pricing/                                    ✅
├── /faq/                                        ✅
├── /contact/                                    ✅
├── /request-a-quote/                            ✅
│   └── /thank-you/                              🚫 conversion completion
└── /legal/
    ├── /privacy-policy/                         ✅
    ├── /terms-of-service/                       ✅
    └── /cookie-policy/                          ✅
```

Current registry totals: **68 routes / 59 indexable / 9 noindex** (validator). Planned empty categories remain deferred.

## Consolidations vs the blueprint’s starting hypothesis

| Hypothesised page | Decision |
|---|---|
| Per-plan maintenance pages | Consolidated into one maintenance service page (thin-page risk) |
| Ranking SEO retainer product | Not sold; Search Care + Measurement are the honest monthly products (D-45, D-47) |
| `next.js development` service page | Consolidated into custom-web-applications + wordpress-vs-nextjs compare until demand proves out |
| Cape Town location | Deferred (rule 11 — needs genuine evidence) |
| `ecommerce-guides`, `business-systems` categories | Defined in taxonomy, not generated while empty |
| Property-management system service page | Carried inside property-businesses solution + case study until search demand justifies a page |
| `/legal/` index page | Not created; three children only |
