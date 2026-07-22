# Sitemap (information architecture)

Authoritative human-readable map. Machine source of truth: `lib/routes.ts` (drives `app/sitemap.ts`, breadcrumbs and the SEO validator). Full per-URL flags: `URL-REGISTER.csv`.

Legend: ✅ indexable at launch · 🚫 generated but noindex · 🕐 planned, not generated.

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
│   └── /website-maintenance-and-support/        ✅ (all support plans on this one page)
├── /solutions/                                  ✅ Hub (industries)
│   ├── /contractors/                            ✅
│   ├── /engineering-companies/                  ✅
│   ├── /manufacturers-and-suppliers/            ✅
│   ├── /property-businesses/                    ✅
│   ├── /professional-services/                  ✅
│   └── /small-businesses/                       ✅
├── /website-packages/                           ✅ Hub (transactional)
│   ├── /starter-business-website/               ✅
│   ├── /professional-business-website/          ✅
│   ├── /product-catalogue-website/              ✅
│   ├── /ecommerce-website/                      ✅
│   └── /custom-web-system/                      ✅
├── /projects/                                   ✅ Hub (honest “new studio” copy)
│   ├── /websites/                               🚫 noindex until ≥1 real project (D-07)
│   ├── /ecommerce/                              🚫
│   ├── /admin-systems/                          🚫
│   └── /[project-slug]/                         🚫 4 clearly-marked case-study templates
├── /resources/                                  ✅ Hub
│   ├── /website-cost-guides/                    ✅ category
│   ├── /seo-guides/                             ✅ category
│   ├── /ecommerce-guides/                       🕐 planned (empty at launch — D-18)
│   ├── /business-systems/                       🕐 planned
│   └── /[article-slug]/                         ✅ 3 launch articles
├── /compare/                                    ✅ Hub
│   ├── /custom-website-vs-template/             ✅
│   ├── /wordpress-vs-nextjs/                    ✅
│   ├── /website-vs-web-application/             ✅
│   └── /website-maintenance-options/            ✅
├── /areas-we-serve/                             ✅ Hub
│   ├── /pretoria/                               ✅ (Centurion consolidated here)
│   ├── /johannesburg/                           ✅ (Sandton/Midrand consolidated here)
│   └── /cape-town/                              🕐 phase 2 (D-08)
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

Counts at launch: **52 indexable URLs**, 12 generated-noindex (thank-you/intake utilities + project gates), planned categories remain deferred.

## Consolidations vs the blueprint’s starting hypothesis

| Hypothesised page | Decision |
|---|---|
| Per-plan maintenance pages | Consolidated into one maintenance service page (thin-page risk) |
| `next.js development` service page | Consolidated into custom-web-applications + wordpress-vs-nextjs compare until demand proves out |
| Cape Town location | Deferred (rule 11 — needs genuine evidence) |
| `ecommerce-guides`, `business-systems` categories | Defined in taxonomy, not generated while empty |
| Property-management system service page | Carried inside property-businesses solution + case study until search demand justifies a page |
| `/legal/` index page | Not created; three children only |
