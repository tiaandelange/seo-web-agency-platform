# Metadata standards

Implementation: `lib/seo.ts` → `buildMetadata()`. Root layout sets the title template; every page passes its own fields from content data. The validator enforces uniqueness and length.

## Title

- Template: `%s | {brand.name}` (from `config/brand.ts`); home overrides with a full custom title (`title.absolute`).
- Page part ≤ ~35–40 chars where possible so the full title stays ≤60; validator warns >60 total.
- Pattern by type: Service → `{Service Name}` (SA modifier included only where it reads naturally, e.g. seoTitle override "Ecommerce Website Development South Africa"); Article → the question itself; Location → `Website Design & Development in {City}`.
- No keyword stuffing, no pipes inside the page part, no duplicated brand.

## Meta description

- 70–160 chars, unique per page, written as an answer + reason-to-click, includes the primary phrase naturally once, ends with a soft action where sensible.
- Never auto-truncated content dumps; written per page in data.

## Canonical

- Always self-referencing absolute URL with trailing slash, built by `absoluteUrl()` from `NEXT_PUBLIC_SITE_URL`. Cross-page canonicals only via explicit `canonicalPath` (none at launch).

## Robots

- From route registry `index` flag → `index,follow` or `noindex,follow`. Never `nofollow` internally.

## Open Graph / social

- `og:title` (defaults to title), `og:description` (defaults to meta description), `og:type` (`website` | `article`), `og:url` (canonical), `og:locale` = `en_ZA`, `og:site_name` = brand name.
- `og:image`: site-wide default asset pending (KNOWN PLACEHOLDER — visual phase); field supported per page via `socialImage`.
- Twitter card: `summary_large_image` once the image exists; harmless meanwhile.

## Dates

- `article:modified_time` emitted for articles/projects from `dateUpdated`; visible "Updated {Month Year}" rendered from the same field (one source).

## Meta keywords

- Never emitted (blueprint rule 9).

## Overrides

- `seoTitle` overrides the title part; `ogTitle`/`ogDescription` override socials — all optional per entry, so editorial control never requires code changes.
