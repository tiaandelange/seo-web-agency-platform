# Crawl and indexation policy

## Crawlability

1. All navigation and content links are plain `<a href>` (Next `<Link>`) — no JS-only navigation, no onclick routers, no buttons-as-links.
2. All indexable content is server-rendered (static generation); view-source must show the full content. No SEO-critical client-rendering (blueprint Phase 9 hard rule).
3. URLs: lowercase, hyphenated slugs, trailing slash, no underscores, no parameters for content.
4. `robots.txt` (app/robots.ts): production → allow all, `Disallow: /api/`, sitemap line; non-production → disallow all (rule INDEXATION-RULES #1).
5. XML sitemap (app/sitemap.ts): indexable URLs only, absolute, trailing slash, `lastModified` from content dates. Single sitemap (<50k URLs by orders of magnitude); split only if ever needed.

## Parameter and variant control

- No content behind query strings. Future filters/sort on catalogue-style listings: render client-side state or canonical to the clean URL; never generate crawlable filter permutations.
- `utm_*`/tracking params: never used in internal links; external campaigns land on canonical URLs (self-canonical neutralises duplicates).
- Pagination: not needed at launch volumes; when needed, use `/page/2/` paths with self-canonicals (documented decision required at that point).

## Status-code policy

- Unknown slug → real 404 (`notFound()` in dynamic routes, `app/not-found.tsx` UI). No soft-404s, no catch-all redirects to home.
- Removed content → 301 to the closest equivalent via the redirect register; 410 acceptable for spam/junk URLs if ever needed.
- Planned-but-unpublished entries (status `planned`) are not generated → 404 until real.

## Redirects

- Source of truth: `data/redirects.ts` (typed) consumed by `next.config.ts`; mirrored in `docs/seo/REDIRECT-REGISTER.csv` with date + reason.
- Rules: 301 for permanent moves; no chains (register must point at final destinations; validator warns on chain targets); re-point internal links to the new URL — redirects are for external/bookmarked traffic, not internal plumbing.

## Staging protection

- Env-gated robots (above) + platform-level noindex headers on previews + non-production deployments never submitted to GSC. Launch checklist verifies robots.txt on the production host before sitemap submission.

## Host and protocol

See `CANONICALISATION-POLICY.md` — one HTTPS host, platform-level 301 from the alternate host, HSTS via hosting defaults.
