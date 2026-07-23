# Case-study completion — Damtech & Proplytic (Prompt 5)

**Date:** 23 July 2026  
**Repo commit (this work):** pending on `main`  
**Related:** `docs/strategy/TRUST-AUTHORSHIP-IMPLEMENTATION.md`, publication gate in `lib/case-study-publication.ts`

## Source repositories audited (read-only)

| Project | Path | Branch | Commit | Working tree |
|---|---|---|---|---|
| Damtech | `C:\Users\delanget\Documents\GitHub\Damtech-Website` | `main` | `a96ab2e` | Clean |
| Proplytic (PropertyGuy) | `C:\Users\delanget\Documents\GitHub\PropertyGuy` | `main` | `ab25f63` | Dirty — `frontend/api/_lib/propertyCalculator/financialMetrics.ts` modified; **no fetch/reset/clean** |

Neither source repository was modified.

## Verified features used in public copy

### Damtech
- Next.js / TypeScript / Tailwind public site with service, regional, projects, calculators, quote/RFQ and contact routes
- Supabase-backed admin: RFQ inbox, customers, suppliers, quote builder/preview/revisions, pricing catalogues and CSV/tank import pipelines
- React-PDF quote PDFs; Resend email; Upstash rate limiting
- Auth/permissions modules for admin areas

### Proplytic
- Vite + React + TypeScript SPA; Supabase auth/data; React Query; Chart.js; pdfmake; Stripe; Resend
- Authenticated portfolio dashboard, properties, tenants, leases, invoices, statements, documents, financials, reports, settings, admin
- Public marketing: pricing, login/signup, calculators, legal

## Claims deliberately excluded
- Rankings, traffic, lead volume, revenue, MRR, conversion rates
- Testimonials
- Real tenant/customer PII or financial figures in screenshots
- Treating marketing-site sample figures as measured outcomes

## Files changed
- `content/projects/damtech-website.ts` — full narrative, stack, constraints, status, RFQ/admin scope
- `content/projects/proplytic-property-software.ts` — full application narrative
- `types/content.ts` — `liveUrl`, `constraints`, `currentStatusNarrative`, gate flags
- `lib/case-study-publication.ts` — publication gate
- `data/projects.ts` — `isProjectIndexable` uses gate + owner index approval
- `app/projects/[slug]/page.tsx` — overview, constraints, current status, truthful related kinds
- `data/services.ts` — RFQ service related proof → Damtech
- `tests/case-study-publication.test.ts`

## Screenshot assets
- `/images/work/damtech-desktop.webp`, `damtech-mobile.webp`
- `/images/work/proplytic-desktop.webp`, `proplytic-mobile.webp`

## Publication-gate result

| Project | Narrative ready | Owner index approval | `noindex` | Indexable |
|---|---|---|---|---|
| Damtech | Yes | **No** | true | **No** |
| Proplytic | Yes | **No** | true | **No** |

Gate blockers until owner flips approval + `noindex: false`: `ownerCaseStudyIndexApproval false`, `noindex still true`.

## Indexing decision
Keep both case studies **noindex / out of sitemap** until the owner reviews the narratives and sets `ownerCaseStudyIndexApproval: true` and `noindex: false` in one commit (checklist Gate 5).

## Internal links
- Damtech already linked from business websites, lead-gen, SEO, contractors; **added** to RFQ & quotation systems
- Proplytic remains on custom apps, admin, portals, property solutions

## Tests / build

| Check | Result |
|---|---|
| `npm run lint` | Pass (existing audit-script warnings only) |
| `npm run typecheck` | Pass |
| `npm run test` | Pass — 104 tests |
| `npm run validate:seo` | Pass — 64 / 51 / 13 |
| `npm run build` | Pass |

## Remaining owner approvals
1. Read Damtech + Proplytic case-study pages on staging/production preview  
2. Set `ownerCaseStudyIndexApproval: true` and `noindex: false` when ready for GSC  
3. Optional: approve additional safe feature screenshots beyond marketing homepage  
4. Optional: verified metrics later (never invent)
