# Conversion proof upgrade (Prompt 6)

**Date:** 23 July 2026  
**Commit:** pending at write time — see git history for `feat(conversion): homepage proof and service conversion upgrade`  
**Checks:** `npm run check` + `npm run build` passed (110 tests; 64 / 51 / 13 routes; homepage first-load JS 114 kB)

## Objective

Increase commercial proof and conversion clarity without new routes or a full redesign. No invented clients, metrics, rankings or reviews.

## Homepage sections changed

| Change | Detail |
|---|---|
| Hero lead | Explicit websites + operational layer (forms, portals, dashboards, quoting) |
| **HomeProofStrip** (new, early) | Damtech, Proplytic, wedding screenshots with truthful status labels + link to `/projects/` |
| **CapabilityPaths** (new) | Three weighted paths: business websites; ecommerce & catalogues; portals & systems |
| ProofPreview | Cross-reference to selected work above; still architecture/method proof, not fake logos |

Order: Hero → Proof strip → Enquiry system → Capability paths → Capability map → …rest.

## Service pages changed

| Surface | Change |
|---|---|
| Central map | `data/service-proof-map.ts` — every live service → project / labelled demo / honest none |
| Generic services | Proof block + optional RFQ/portal workflow + commerce matrix from map |
| Ecommerce | Commerce model matrix + proof block (honest “no public ecommerce CS yet”) |
| SEO websites | Damtech proof block |
| Custom systems | Proplytic + Industrial Engine demo proof |
| Catalogue | Matrix + Damtech adjacent proof; `relatedProjectSlugs` → Damtech |
| RFQ | Illustrative 7-step workflow + Damtech + Industrial Engine |
| Portals / admin | Illustrative auth→reporting workflow + Proplytic |

## Proof mappings (summary)

- **Damtech:** business, lead-gen, SEO, redesign, RFQ, catalogue (adjacent)
- **Proplytic:** custom apps, admin, portals
- **Industrial Engine (labelled demo):** RFQ, custom apps, catalogue
- **None / method-only:** ecommerce (matrix instead), maintenance

## Workflow demos added

- `IllustrativeWorkflow` — server-rendered HTML/CSS, no new client dependency
- RFQ: submit → review → items → generate → send → respond → track
- Portal/admin: auth → roles → records → documents → requests → statuses → notifications → reporting
- Label: “Illustrative workflow” on every demo

## Ecommerce matrix

Five models on ecommerce + catalogue pages: standard checkout, catalogue only, RFQ basket, trade/customer pricing, custom integrations. Stacked cards (no horizontal scroll).

## Package changes

`data/package-clarity.ts` + `PackageClarityGrid` on every package page: suitable customer, pages, content responsibility, forms, SEO, revisions, hosting, support, delivery, exclusions, price drivers. Indicative prices unchanged (D-11).

## Contact / proposal changes

`ProposalExpectations` on `/contact/` and `/request-a-quote/`: response timeframe, next steps, prep list, no-obligation first scoping discussion, suitable project types, privacy link, phone/WhatsApp/email fallback. Form fields unchanged. No production delivery test (not authorised).

## Tests

| Check | Result |
|---|---|
| lint | Pass (existing audit-script warnings only) |
| typecheck | Pass |
| test | Pass — 110 tests (incl. `conversion-proof.test.ts`) |
| validate:seo | Pass — 64 / 51 / 13 |
| build | Pass — homepage first-load 114 kB ≤ 120 kB |

## Remaining evidence gaps

1. Owner index approval for Damtech / Proplytic case studies (still noindex).
2. No public ecommerce or pure catalogue client case study yet.
3. Maintenance / redesign still thin on dedicated project proof.
4. Production form E2E delivery test still owner-authorised only.
5. Wedding remains personal showcase — not commercial client proof.

## Decision

**D-36** — Prompt 6 conversion proof upgrade recorded in `docs/DECISION-LOG.md`.
