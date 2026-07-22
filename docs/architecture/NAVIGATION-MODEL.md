# Navigation model

Data source: `data/navigation.ts` (header + footer arrays consumed by `components/site-header.tsx` / `site-footer.tsx`). No JS-dependent mega-menus in the skeleton — plain crawlable anchors; a dropdown layer may be added in the visual phase without changing the data.

## Header (desktop + mobile)

| Order | Label | Href | Notes |
|---|---|---|---|
| 0 | [Brand name] | `/` | Logo/text link from `config/brand.ts` |
| 1 | Services | `/services/` | Hub; individual services discovered via hub cards |
| 2 | Solutions | `/solutions/` | |
| 3 | Packages | `/website-packages/` | |
| 4 | Projects | `/projects/` | |
| 5 | Resources | `/resources/` | |
| 6 | Pricing | `/pricing/` | |
| 7 | Contact | `/contact/` | |
| CTA | Request a Proposal | `/request-a-quote/` | Visually distinct button; present on mobile too |

Mobile: same items in a disclosure panel (`<details>`-free client toggle, aria-expanded, focus-trapped none — simple list). CTA pinned at panel bottom.

## Footer

Column 1 — Services (top demand): Business Websites, Lead Generation Websites, Product Catalogue Websites, Ecommerce Websites, Custom Web Applications, Website Maintenance & Support, → All services.

Column 2 — Company: About, Our Process, Projects, Pricing, FAQ, Contact.

Column 3 — Resources: Guides & Resources, Website Cost Guide, Comparisons, Areas We Serve, Request a Proposal.

Column 4 — Contact block: phone / email / WhatsApp from brand config (hidden while placeholders are empty), service areas line.

Legal row: Privacy Policy · Terms of Service · Cookie Policy · © year + trading name (from config).

## Rules

1. Header ≤ 7 links + 1 CTA. New sections must displace something, not append.
2. Every indexable URL must be reachable within 3 clicks of home via nav + hub cards + related links (validated by the orphan check in `scripts/seo-validate.ts`).
3. Nav labels are plain nouns matching page H1s (no cleverness — scent matching).
4. Noindex pages (project templates, thank-you) never appear in nav.
5. `aria-current="page"` on the active header item; nav landmarks: `<header> <nav aria-label="Primary">`, footer `<nav aria-label="Footer">`.
6. Footer service links limited to 6 + “All services” — footers are not sitemap dumps.
