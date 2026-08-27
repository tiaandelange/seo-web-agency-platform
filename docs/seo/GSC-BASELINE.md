# SEO and lead-measurement baseline — Koppie Systems

**Property:** `koppiesystems.co.za` (canonical host `https://www.koppiesystems.co.za`)  
**Source:** owner-confirmed Google Search Console Performance extract  
**Recorded:** 2026-08-27  
**Status:** first written baseline. Add a dated section or a new file for the next extract; never mix windows.

This file records Search Console totals for one window and the lead-event contract in the repository. It is not a ranking report, a conversion report, or a grade of the site.

Related: `docs/analytics.md`, `docs/technical/ANALYTICS-EVENTS.md`, `docs/launch/SEARCH-CONSOLE-SETUP.md`, `docs/launch/POST-LAUNCH-90-DAY-PLAN.md`.

---

## 1. Date range

| Field | Value |
|---|---|
| Start | 22 July 2026 |
| End | 24 August 2026 |
| Search type | **Not confirmed** in this extract (Web / Image / Video / News filter was not supplied) |
| Comparison | None |

Production indexing went live on **24 July 2026** (`docs/PROJECT-STATUS.md`). This window includes days immediately before that date.

A separate 28-day screenshot (28 July–24 August 2026: 6 clicks, 676 impressions) is **not** this extract. Do not average or merge the two.

---

## 2. Property totals

| Metric | Value | Notes |
|---|---|---|
| Clicks | **8** | Owner-confirmed |
| Impressions | **689** | Owner-confirmed |
| CTR | **1.16%** | Calculated: 8 ÷ 689. GSC may display **1.2%**. n = 8 — not a KPI target |
| Average position (property) | **Not supplied** | Do not reuse 61.3 from the other window |

---

## 3. Country filter

Country is one Search Console dimension. Subtracting the South Africa row from the property total is valid. **Do not add this table to Query or Page tables.**

| Slice | Clicks | Impressions | Avg. position |
|---|---:|---:|---:|
| South Africa | 4 | 610 | 66.55 |
| Implied complement (not South Africa) | 4 | 79 | Not supplied |
| Property total | 8 | 689 | Not supplied |

South Africa is **50%** of clicks (4 ÷ 8) and **88.5%** of impressions (610 ÷ 689). Which countries make up the complement is unknown. Do not publish a complement CTR.

---

## 4. Device filter

| Slice | Clicks | Impressions | Avg. position |
|---|---:|---:|---:|
| Desktop | 5 | 577 | 64.13 |
| Mobile | 3 | 108 | 43.23 |
| Implied complement (not Desktop or Mobile) | 0 | 4 | Not supplied |
| Property total | 8 | 689 | Not supplied |

Desktop is **62.5%** of clicks and **83.7%** of impressions. Do not label the 4 leftover impressions as tablet. Do not blend 64.13 and 43.23 into a site-wide position.

---

## 5. Query export limitation

| Field | Value |
|---|---|
| Visible query-table impressions | **533** |
| Clicks attributed in the query table | **0** |
| Reason | Low-volume click queries are hidden / anonymised |

**Do not add 533 to 689, 610, or any other total.** The eight property clicks exist; they are not in this query table. Do not conclude which queries converted.

---

## 6. Page-level results

**Not provided** for 22 July–24 August 2026. No GSC Pages export is in the repository.

Until a Page-dimension export for this (or a later labelled) window is filed, do not name landing URLs, page CTR, or page position.

When a Page export arrives: record it as its own table. **Do not add Page totals to Query or Country totals.** Search Console dimensions do not reconcile when queries are anonymised.

---

## 7. Limitations

1. Anonymised queries: the query table is a partial view of the same window.
2. Dimensions are not additive across each other (Page + Query + Country + Device).
3. Eight clicks cannot diagnose titles, CTR, or metadata quality.
4. Average position is impression-weighted inside each filter, not a stable rank.
5. GSC clicks are not leads.
6. Search type for this extract is unconfirmed.

---

## 8. Lead-measurement contract (repository)

Verified in code on 2026-08-27. Not verified in the GA4 UI (no Admin access in this pass).

| Event | Role | Fires when |
|---|---|---|
| `generate_lead` | **Primary** | Server action returns `{ status: 'success', track: true }` after `deliverLead()` succeeds. `form_id`: `contact` \| `request_quote` \| `seo_audit_intake` |
| `contact_click` | Secondary | Click on `tel:` / `mailto:` / WhatsApp. Params: `contact_method`, `link_location` only |
| `seo_audit_eligibility_complete` | Secondary | Eligibility routing completed (`track: true`). **Not a lead** |

`generate_lead` does **not** fire on: submit-button click, eligibility completion, scroll, page view, validation failure, delivery failure, spam/honeypot (`track: false`), thank-you refresh, or direct thank-you visits.

Implementation: `lib/actions.ts`, `lib/seo-audit-actions.ts`, `components/analytics/use-success-tracking.ts`, `lib/analytics.ts`. Event names: `lib/analytics-types.ts`.

### Consent and measurement ID

- GA4 loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set **and** `localStorage` `koppie_analytics_consent` is `granted` (`components/analytics/analytics-provider.tsx`).
- The measurement ID is **not in git**. `.env.example` leaves it empty. `.env.local` is gitignored. Do not commit a `G-` value.
- This site uses prior-blocking only (no Consent Mode v2). Denied or unknown consent → no GA4 events. The lead can still arrive by email.
- There is no server-side Measurement Protocol ping. **Mailbox / Resend is the operational lead record**; GA4 is the consented subset.
- No automated tests currently cover these events.

---

## 9. Owner checklist (GA4 + Search Console)

Do these in product UIs. This repository pass did **not** complete them.

| # | Action | Where | Done when |
|---|---|---|---|
| 1 | Associate GA4 with Search Console | GSC **Settings → Associations** and GA4 Admin | Both products show the link |
| 2 | Mark `generate_lead` as a **key event** | GA4 Admin → Events / Key events | Listed as key event. Optionally `contact_click`. Do **not** mark `seo_audit_eligibility_complete` as a lead |
| 3 | Confirm the live measurement ID | Vercel Production env `NEXT_PUBLIC_GA_MEASUREMENT_ID` vs GA4 Admin stream | ID matches; still not committed to git |
| 4 | Compare GA4 leads with successful site emails | Same calendar window: GA4 `generate_lead` by `form_id` vs Resend/internal inbox (contact, proposal, audit intake) | Counts match **or** the gap is documented (consent denied / ID unset in that environment) |
| 5 | DebugView (only with GA4 access) | Test submit with consent **granted** | One `generate_lead` after a real successful delivery; none on eligibility or failed validation |
| 6 | File a Page-dimension export | GSC Performance → Pages, same labelled date range | §6 of this file can be filled; still not summed with Query/Country |

---

## 10. Documentation that is stale relative to this baseline

Do not treat these as this extract. They were not rewritten in the same change as this file except where a pointer was added.

| File | Drift |
|---|---|
| `docs/launch/POST-LAUNCH-90-DAY-PLAN.md` Days 1–7 | Previously said impressions would be ~0. Now points here. |
| `docs/launch/ANALYTICS-PREPARATION.md` | Still describes the measurement ID as unset. True of **git**; Production env is owner-confirmed separately. |
| `docs/launch/GO-LIVE-AND-GSC-PLAYBOOK.md` Steps 11 and 25 | Lists events that are not in code (`click_phone`, `view_pricing`, …). Live names are in `docs/analytics.md`. |
| `docs/content/PLACEHOLDER-REPLACEMENT-REGISTER.csv` P-33 | Still “GA measurement ID unset (disabled)”. |
| `docs/prompts/17-conversion-rate-optimisation.md` | Uses non-existent event names (`quote_form_submit`, `phone_click`, …). |

---

## 11. Next extract template

| Field | Next extract |
|---|---|
| Date range | |
| Search type (Web / Image / Video / News) | |
| Clicks / impressions / GSC CTR / property avg. position | |
| South Africa clicks / impressions / position | |
| Desktop / Mobile / other device (if shown) | |
| Query export: visible impressions / attributed clicks | |
| Page export attached? | Yes / No |
