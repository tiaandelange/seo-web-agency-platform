# Breadcrumb model

Breadcrumbs render on every page except home, immediately above the H1, as both visible navigation and `BreadcrumbList` JSON-LD (same data, one source: `getBreadcrumbs()` in `lib/routes.ts`, which walks the `parent` chain of the route registry).

## Patterns

| Page type | Trail |
|---|---|
| Service | Home › Services › {Service} |
| Solution | Home › Solutions › {Industry} |
| Package | Home › Website Packages › {Package} |
| Project category | Home › Projects › {Category} |
| Project case study | Home › Projects › {Project} (category shown as tag, not trail — one canonical parent) |
| Resource category | Home › Resources › {Category} |
| Article | Home › Resources › {Category} › {Article} |
| Comparison | Home › Comparisons › {Comparison} |
| Location | Home › Areas We Serve › {City} |
| Core pages (about, process, pricing, faq, contact, quote) | Home › {Page} |
| Legal | Home › {Document} (no /legal/ crumb — no index page exists) |
| Thank-you | Home › Request a Quote › Thank You (noindex page; visible crumb only, no schema emission needed but harmless — we emit for consistency) |

## Rules

1. One canonical parent per page — a project belongs to `/projects/` even though tagged with a category; tags never create second trails.
2. Last item = current page, not linked, `aria-current="page"`.
3. Visible labels = the `title` field of the route registry (matches H1 sense).
4. JSON-LD `BreadcrumbList` uses absolute URLs via `absoluteUrl()`; final item carries no `item` URL (per Google guidance) — implemented in `lib/schema.ts`.
5. Markup: `<nav aria-label="Breadcrumb"><ol>…` with `›` separators as CSS content (not text nodes read by screen readers).
