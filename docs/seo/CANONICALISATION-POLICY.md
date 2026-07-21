# Canonicalisation policy

## Preferred URL form (every URL, no exceptions)

`https://` + `{final host}` + lowercase hyphenated path + trailing slash.

- Host decision pending domain purchase (owner input #2). Recommendation: `www` subdomain (cookie/CDN flexibility) with apex 301 → www. Either is fine; consistency is the requirement.
- `trailingSlash: true` in `next.config.ts` makes Next 308-redirect the non-slash form; internal links always written with the slash.
- Enforcement layers: platform redirect (apex↔www, http→https) → Next trailing-slash redirect → self-canonical tag.

## Canonical tags

- Every page emits exactly one self-referencing canonical, absolute, built by `absoluteUrl()` from `NEXT_PUBLIC_SITE_URL` (so staging canonicals point at staging — combined with staging noindex this is safe and avoids cross-host leakage).
- Cross-canonicals only via explicit `canonicalPath` in content data with a decision-log entry (none exist at launch).
- Canonicals never point at redirecting or noindex URLs (validator rule).

## Duplicate-risk inventory and resolutions

| Risk | Resolution |
|---|---|
| http/https, www/apex | Platform 301s, one host |
| Trailing-slash variants | `trailingSlash: true` 308 |
| Case variants | All internal links lowercase; no mixed-case routes exist |
| Tracking-parameter URLs | Self-canonical on the clean URL; params never internally linked |
| Package vs service near-duplicates | Distinct intents + distinct copy (D-13), both self-canonical |
| Article vs pricing page | Distinct intents (SEARCH-INTENT-MAP); cross-linked, never merged |
| Future syndicated/republished content | Requires `canonicalPath` + decision-log entry before publishing |

## Verification

Pre-launch: crawl the site (Screaming Frog or `scripts/seo-validate.ts` + live crawl) asserting: 1 canonical per page, canonical == requested URL for all 200s, all internal links 200 without redirect hops. Post-launch: GSC Page indexing report — "Duplicate without user-selected canonical" must stay at zero.
