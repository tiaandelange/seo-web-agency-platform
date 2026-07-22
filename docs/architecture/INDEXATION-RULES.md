# Indexation rules

Single mechanism: every route in `lib/routes.ts` carries `index: boolean` + `inSitemap: boolean`. `buildMetadata()` emits `robots: noindex,follow` when `index: false`; `app/sitemap.ts` includes only `inSitemap: true`. The validator fails the build if an indexable page is missing from the sitemap or a noindex page appears in it.

## Ruleset

| # | Rule | Implementation |
|---|---|---|
| 1 | Staging/preview never indexes | `NEXT_PUBLIC_SITE_ENV !== 'production'` → `robots.txt` disallow all (app/robots.ts); belt-and-braces: deploy previews keep default Vercel noindex header |
| 2 | Project case-study templates: noindex, out of sitemap, until `publishPermission: true` **and** `placeholder: false` | D-07; flags in `content/projects/*` |
| 3 | Project category listings: noindex while they contain zero real projects | computed in `lib/routes.ts` from project data |
| 4 | Resource categories generate only when they contain ≥1 live article | D-18; planned categories 404 until then |
| 5 | `/request-a-quote/thank-you/` and `/seo-audit/thank-you/` (+ `/seo-audit/intake/`): noindex, follow, out of sitemap | conversion URLs must never earn organic entrances |
| 6 | Location pages only for genuinely served areas with unique content | D-08; new ones require owner sign-off |
| 7 | No query-parameter content: filters/sorting (future catalogue features) must be client-state or rel=canonical to the clean URL; tracking params (`utm_*`) never internally linked | CRAWL-AND-INDEXATION-POLICY.md |
| 8 | One host, HTTPS, trailing slash — enforced at platform level + `trailingSlash: true` | CANONICALISATION-POLICY.md |
| 9 | 404s return real 404 status via `app/not-found.tsx`; no soft-404 redirects to home | Next default behaviour |
| 10 | Legal pages: index (harmless, occasionally searched); `/legal/` itself does not exist | D-20 |
| 11 | Nothing is ever "noindexed in robots.txt" — robots.txt controls crawling, meta robots controls indexing; we block crawling only for `/api/` | policy docs |

## State transitions

- Template project → real project: set real content, `publishPermission: true`, `placeholder: false`, `noindex: false`; validator then requires it in the sitemap; its category flips indexable automatically at ≥1 real project.
- Planned category/location → live: add content entry with `status: 'live'`; route generates; register/CSV updated in the same commit (kept honest by the validator diffing registry vs CSV is manual — see checklist).

## Change control

Any indexation-flag change = one line in `docs/DECISION-LOG.md` + URL-REGISTER.csv update. GSC URL-inspection after each transition (see launch docs).
