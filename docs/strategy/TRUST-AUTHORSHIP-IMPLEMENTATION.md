# Trust & authorship implementation (Prompt 4)

**Date:** 23 July 2026  
**Commit basis:** Trust P0 on `main` after Ops P0 production cutover  
**Related:** `docs/strategy/SECOND-PASS-AUDIT.md`, D-34

## Summary

Completed P0 trust corrections without new routes or invented evidence: project classification, template unlinking, article authorship, About founder profile, and Pretoria/Johannesburg indexing gate.

## Project classifications

| Slug | Classification | Public label | Evidence |
|---|---|---|---|
| `damtech-website` | `client-project` | Live project | limited |
| `proplytic-property-software` | `internal-product` | Internal product | limited |
| `catalogue-rfq-website-template` | `template` | Template example | illustrative |
| `admin-quotation-platform-template` | `template` | Template example | illustrative |
| Wedding (showcase only) | personal | Personal event website | — |

Helpers: `lib/project-proof.ts` (`relatedProjectItems`, `isPublicProofProject`, `allowsClientLanguage`).

## Labels changed

- Proplytic showcase chip: **Live project** → **Internal product**
- Related-content `kind` now derives from classification (never “Project” for templates)

## Template links removed or relabelled

Templates removed from commercial `relatedProjectSlugs` on:

- Product catalogue websites  
- Ecommerce websites  
- RFQ and quotation systems  
- Custom web applications / admin (templates dropped; Proplytic kept)  
- Engineering companies solution  
- Manufacturers and suppliers solution  

`relatedProjectItems()` skips remaining template/placeholder refs and can fall back to `/projects/`.

## Author record

- Added `data/authors.ts` — `tiaan-de-lange` (Person), gated by `brand.verification.founderBioApproved`
- Set `founderBioApproved: true` (owner-directed Trust P0; **no ECSA claim**)
- `data/team.ts` mirrors the author record

## Articles updated

All live articles now have `authorSlug: 'tiaan-de-lange'`:

- `/resources/website-cost-south-africa/`
- `/resources/choosing-a-website-development-company/`
- `/resources/what-is-an-seo-first-website/`

Visible `ArticleAuthor` block + Article schema `author: Person` matching the byline; publisher remains Koppie Systems Organization.

## About-page changes

- Approved founder profile (name, role, short + long bio)
- Development philosophy and SA service context
- Explicit: no walk-in address; ECSA not claimed
- Placeholder notice removed

## Location decisions

| Page | Decision |
|---|---|
| Pretoria | **Indexable** — operating base, unique local FAQs, placeholder cleared, selected work linked as Pretoria-based studio proof |
| Johannesburg | **noindex** — route retained; no Johannesburg office; hub lists under “Also served (not a local office)” |
| Cape Town | Still planned / not generated |

Route totals: **64 / 51 indexable / 13 noindex** (D-34).

## Sitemap / indexing

- Johannesburg excluded from sitemap via `isLocationIndexable()`
- Pretoria remains in sitemap
- Case studies remain noindex (unchanged)

## Tests run

| Check | Result |
|---|---|
| `npm run lint` | Pass (warnings only in one-off audit script) |
| `npm run typecheck` | Pass |
| `npm run test` | Pass — 97 tests |
| `npm run validate:seo` | Pass — 64 / 51 / 13 |
| `npm run build` | Pass — first-load JS within budget |

New: `tests/trust-authorship.test.ts`

## Still awaiting owner approval

- ECSA registration wording (if any) for public use  
- Founder portrait image (none published)  
- Damtech / Proplytic full case-study narratives + indexation gate (Prompt 5)  
- Search Console submit (after this trust surface is deployed)  
- Domain verification flag in `brand.verification.domain`
