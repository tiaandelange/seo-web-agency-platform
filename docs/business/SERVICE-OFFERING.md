# Service offering

Three tiers. Each service has one dedicated URL (see `docs/architecture/URL-REGISTER.csv`) and one primary search intent (see `docs/seo/KEYWORD-TO-PAGE-MAP.csv`). Full scope definitions per offering: `docs/business/PRODUCTISED-SERVICES.md`.

## Tier 1 — Website services (acquisition engine)

| Service | URL slug | Core buyer |
|---|---|---|
| Business websites | `business-websites` | Any SME needing a credible, rankable site |
| Lead-generation websites | `lead-generation-websites` | Contractors/service businesses that live on enquiries |
| Product catalogue websites | `product-catalogue-websites` | Manufacturers, suppliers, distributors |
| Ecommerce websites | `ecommerce-websites` | Retailers/B2B sellers taking payment online |
| Website redesign | `website-redesign` | Owners of underperforming existing sites |
| SEO website development | `seo-website-development` | Buyers who name SEO as the requirement |

## Tier 2 — Custom systems (margin + differentiation)

| Service | URL slug | Core buyer |
|---|---|---|
| Custom web applications | `custom-web-applications` | Businesses with a process no product fits |
| Admin panel development | `admin-panel-development` | Owners running the business on spreadsheets |
| RFQ and quotation systems | `rfq-and-quotation-systems` | Quote-driven sellers (industrial, supply) |
| Customer and supplier portals | `customer-and-supplier-portals` | Businesses with repeat B2B interactions |

## Tier 3 — Recurring services (retention + cash flow)

| Service | URL slug | Notes |
|---|---|---|
| Website maintenance and support | `website-maintenance-and-support` | Umbrella page for all care plans (see `SUPPORT-PACKAGES.md`) |

Recurring sub-offerings (sold as plans, not separate SEO pages, to avoid thin/cannibal pages): hosting administration, essential care, business support, ecommerce support, web-application support, search-performance reporting, content and SEO support.

## How tiers connect commercially

1. Tier 1 wins the client through organic search.
2. Every Tier 1 build ships with measurement, giving a natural Tier 3 attach (“keep it fast, secure and reporting”).
3. Tier 2 grows from trust: catalogue site → RFQ system → supplier portal; business site → admin panel.

## Packaging

Productised entry points live under `/website-packages/` (Starter, Professional, Product Catalogue, Ecommerce, Custom Web System) so price-intent searchers get a direct answer while service pages stay scope-focused. See `docs/business/PRICING-ARCHITECTURE.md`.
