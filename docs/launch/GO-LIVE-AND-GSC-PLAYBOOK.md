# Go-live & Google Search Console playbook

**Prepared:** 2026-07-23 · **Site:** https://www.koppiesystems.co.za · **Repo:** `seo-web-agency-platform`

This is the exact sequence to finish before you (a) call the site publicly launched and (b) submit `sitemap.xml` to Google Search Console. Work top to bottom — later steps assume earlier ones passed. Each step ends with a **Cursor prompt** you can paste straight into Cursor to make the code/config change. Steps that are owner-only actions (registrar, CIPC, Google) say so, and their Cursor prompt just records the result in the repo so the config stays the single source of truth.

---

## What is already correct (verified live, 2026-07-23)

You do **not** need to fix these — confirmed by a live crawl today:

- Apex/`http`/non-www all 308-redirect to `https://www.koppiesystems.co.za` (no loops, HSTS present).
- `robots.txt` serves `Allow: /`, `Disallow: /api/`, and `Sitemap: https://www.koppiesystems.co.za/sitemap.xml` — i.e. **production env is active** (`NEXT_PUBLIC_SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://www.koppiesystems.co.za`).
- Homepage canonical / OG URLs resolve to the www host (the earlier "localhost sitemap + `Disallow: /`" failure in `PRODUCTION-CRAWL-AUDIT.md` is closed).
- 64 routes / 52 indexable / 12 noindex; sitemap URL count matches; no fabricated reviews.

The remaining work is **legal truth, a few config flags, lead-delivery + analytics wiring, verification gates, then the GSC submission itself.**

---

# Part A — Before you go live

## Step 1 — Make the company/legal claims true

**Why:** The footer still reads "Trading name for preview — company registration not yet verified," `config/brand.ts` has `verification.registration=false` and an empty `registrationNumber`, and `legalName` is marked "Proposed." You cannot publicly present as a registered company until CIPC registration is done. This is a launch blocker for legal claims (REQUIRED-USER-INPUTS #1, #10).

**Owner action first:** Complete CIPC company registration; obtain the registration number. Then record it in the repo:

```
In config/brand.ts, update the `brand` object with the confirmed company details:
set registrationNumber to the CIPC number, set verification.registration = true,
and if the registered name differs from legalName, correct legalName.
Then find and remove the preview disclaimer "Trading name for preview — company
registration not yet verified" (search components/site-footer.tsx and any data it
pulls from) so the footer shows the normal registered-company line instead.
Run `npm run typecheck` and `npm run test`. Show me a diff before finishing.
```

## Step 2 — Appoint a POPIA Information Officer and finalise legal pages

**Why:** `data/legal.ts` privacy policy currently says "Until a dedicated POPIA Information Officer is appointed…requests may be sent through the contact form." The pages are operational drafts, **not attorney-reviewed** (REQUIRED-USER-INPUTS #10; KOPPIE-REMAINING-INPUTS #9, #20). Naming the Information Officer is a launch blocker; attorney review is strongly advisable before public traffic.

**Owner action first:** Name the Information Officer; have an attorney review privacy, terms and cookie policies. Then apply edits:

```
In data/legal.ts, update the privacy policy: replace the interim "until an
Information Officer is appointed" wording with the named POPIA Information Officer
and their contact route. Apply any attorney-reviewed wording changes to the
privacy-policy, terms-of-service and cookie-policy entries, and bump each doc's
dateUpdated and effectiveDate to today. Keep placeholder:false. Confirm the cookie
policy still matches reality (no non-essential cookies until GA4 is enabled).
Run `npm run test`.
```

## Step 3 — Confirm the brand mailbox is live

**Why:** `brand.verification.emailLive` is already `true`, so the site renders `hello@koppiesystems.co.za` as a public `mailto:`. That address must actually receive and be monitored, or you are publishing a dead contact route (KOPPIE-REMAINING-INPUTS #6).

**Owner action:** Send a test email to `hello@koppiesystems.co.za` and confirm it lands in a monitored inbox. No code change needed if it works. If you decide to launch without the brand mailbox and rely on forms/WhatsApp only:

```
In config/brand.ts set verification.emailLive = false so the public mailto: is
hidden everywhere and the contact copy falls back to the forms/WhatsApp routes.
Run `npm run test` and grep the codebase to confirm no component hardcodes the
email outside config/brand.ts.
```

## Step 4 — Trademark screening (advisable before spend)

**Why:** Not a hard technical blocker, but advisable before marketing spend (REQUIRED-USER-INPUTS #16; KOPPIE-REMAINING-INPUTS #2, classes 35/42). Owner/attorney action — record the outcome only.

```
In config/brand.ts set verification.trademark = true only if screening is clear,
and add a one-line entry to docs/DECISION-LOG.md noting the screening date and
result. No visible copy depends on this flag today — confirm that with a grep.
```

## Step 5 — Flip the domain-verified flag

**Why:** DNS is live and the production host is serving correctly, but `brand.verification.domain` is still `false` in the repo (flag lag noted in the crawl audit P1). Align the flag with reality.

```
In config/brand.ts set verification.domain = true (DNS cutover to
https://www.koppiesystems.co.za is complete and verified live). Add a line to
docs/DECISION-LOG.md recording the cutover date. Run `npm run test` and
`npm run validate:seo`.
```

## Step 6 — Fix the broken project image ✅ Done (2026-07-23)

**Status:** Resolved. The old authentic-preview asset `western-cape-dam-lining-reservoir-damtech.webp` is no longer referenced. Damtech cards and case-study views use:

- `/images/work/damtech-desktop.webp` (present, ~118 KB)
- `/images/work/damtech-mobile.webp` (present, ~36 KB)

Verified locally on `/projects/` (`naturalWidth` > 0) and on production (`200` for both public and `/_next/image` URLs). No further code change required for this item.

## Step 7 — Decide indexation for the case studies

**Status:** Done (D-43, 2026-07-23). Damtech + Proplytic are indexable; `/projects/websites/` and `/projects/admin-systems/` unlocked. Route totals **66 / 57 indexable / 9 noindex**.

**Why (historical):** Case studies were complete but noindex pending explicit owner approval.

## Step 8 — Final logo (polish, not a hard blocker)

**Why:** A provisional PNG circular lockup is installed; SVG masters are still desirable for crisp rendering (REQUIRED-USER-INPUTS #14). Launch is possible without, but replace when you have the file.

```
I will drop final logo SVG master(s) into public/brand. Wire them into the
brand-wordmark / header / footer components in place of the provisional PNG,
update docs/brand/ASSET-REGISTER.md, and set verification.logoFinal accordingly.
Verify header and footer render the SVG at 1x and 2x. Show the diff.
```

## Step 9 — Decide the secondary domain policy

**Why:** `koppiesystems.com` is unregistered (crawl audit: DNS ENOTFOUND). No action is required to launch, but decide so it is not left as a gap a competitor can take (crawl audit P1.4).

```
Record my secondary-domain decision in docs/DECISION-LOG.md: [PARK koppiesystems.com
and 301 it to https://www.koppiesystems.co.za / LEAVE unregistered]. If parking with
a redirect, note that the redirect is configured at the registrar/host, not in
next.config.ts, and add a reminder to the pre-launch checklist.
```

## Step 10 — Wire and live-test lead delivery (blocker)

**Why:** Forms currently default to `LEAD_DELIVERY_PROVIDER=log`. Real enquiries will vanish until Resend hosted templates + env are configured on Vercel and one submission is tested end-to-end (REQUIRED-USER-INPUTS #12; KOPPIE-REMAINING-INPUTS #13/#13b; `docs/technical/RESEND-INTEGRATION.md`). Hard blocker.

**Owner action first:** In Resend, publish the four templates (New Contact Enquiry, Contact Enquiry Confirmation, New Proposal Request, Proposal Request Confirmation) and verify the sending domain. Then set the **server-only** env vars on Vercel Production (never `NEXT_PUBLIC_`): `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_INTERNAL_TO_EMAIL`, `RESEND_REPLY_TO_EMAIL`, the four `RESEND_TEMPLATE_*` IDs, and `LEAD_DELIVERY_PROVIDER=resend`. Redeploy.

```
Walk me through verifying the Resend lead-delivery path end to end against
docs/technical/RESEND-INTEGRATION.md: confirm lib/lead-delivery.ts and lib/actions.ts
read the RESEND_* env correctly, that the internal notification fires before the
customer confirmation, and that an internal-send failure blocks the thank-you page.
Then give me a checklist to submit one real contact and one real proposal on
production and confirm both internal + confirmation emails arrive at the monitored
inbox. Do not put any secret values in the repo.
```

## Step 11 — Decide analytics for launch

**Why:** GA4 is prepared but not activated; `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset and there are zero cookies today (`ANALYTICS-PREPARATION.md`). GA is optional for launch. Note: turning it on introduces cookies, so the cookie policy (Step 2) must already reflect that.

```
I want to [LAUNCH WITHOUT GA4 for now / ENABLE GA4 with measurement ID G-XXXX].
If enabling: set NEXT_PUBLIC_GA_MEASUREMENT_ID on Vercel Production, implement the
planned events from docs/launch/ANALYTICS-PREPARATION.md (generate_lead, click_phone,
click_whatsapp, click_email, view_pricing, view_package, view_case_study,
guide_to_service) per docs/technical/ANALYTICS-EVENTS.md, ensure no form field
contents are ever sent, and confirm consent/cookie behaviour matches the cookie
policy. If launching without: confirm the ID stays unset and no analytics script or
cookie loads.
```

## Step 12 — SEO-audit paid checkout (only if selling now)

**Why:** The paid audit "Buy" flow needs live checkout URLs and a payment provider; `NEXT_PUBLIC_SEO_AUDIT_*_CHECKOUT_URL` are unset (REQUIRED-USER-INPUTS #22/#23). If you are launching the audit as a paid product day one, this is a blocker; otherwise skip and keep the enquiry CTA.

```
I am [ENABLING paid SEO-audit checkout now / launching audits as enquiry-only].
If enabling: set NEXT_PUBLIC_SEO_AUDIT_BASIC_CHECKOUT_URL and
NEXT_PUBLIC_SEO_AUDIT_ADVANCED_CHECKOUT_URL on Vercel, set the payment webhook
secret, verify webhook idempotency, and test both tiers end to end. If enquiry-only:
confirm the pages route to the intake/quote flow and no dead "Buy" button shows.
```

---

# Part B — Pre-launch verification gates

Run these **after** Steps 1–12 and after the final redeploy. Nothing below should be skipped.

## Step 13 — Green full check

```
Run `npm run check` (lint, typecheck, tests, validate:seo) and paste the full
output. If anything fails, fix it and rerun until green. Confirm validate:seo
reports the route/indexable counts I expect after Step 7.
```

## Step 14 — Confirm Vercel production env is split, then redeploy

**Why:** The crawl audit's ops note warns that `NEXT_PUBLIC_SITE_ENV` / `NEXT_PUBLIC_SITE_URL` must be **environment-specific**, not a single shared Preview+Production value — a shared entry previously overwrote Production and re-blocked crawling. Owner action on Vercel; verify then redeploy Production.

```
Give me the exact Vercel env-var table I should see: NEXT_PUBLIC_SITE_ENV and
NEXT_PUBLIC_SITE_URL must exist as SEPARATE Production and Preview entries
(Production = production / https://www.koppiesystems.co.za; Preview = preview /
the vercel.app host), never as one shared value. Remind me to redeploy Production
after any change because these are build-time for prerendered HTML.
```

## Step 15 — Re-verify the live production URL

```
Give me copy-paste curl commands (and what output to expect) to verify on the live
site after redeploy: (1) robots.txt = Allow /, Disallow /api/, sitemap on www;
(2) sitemap.xml is valid XML with every <loc> on https://www.koppiesystems.co.za
and no noindex URLs; (3) view-source canonical + og:url on the homepage, one
service, one package and one article are absolute, self, www and trailing-slash.
```

## Step 16 — Crawl the live site

**Why:** PRE-LAUNCH-CHECKLIST quality gate. Tooling action (Screaming Frog free tier covers 50 URLs).

```
Give me a Screaming Frog crawl checklist for https://www.koppiesystems.co.za: what
to configure, and the exact things to confirm — zero internal 404s, zero redirect
chains, one H1 per page, unique titles and meta descriptions across all indexable
pages, and that only the intended 12 noindex routes are excluded.
```

## Step 17 — Rich Results / structured-data test

```
List the exact URLs to run through Google's Rich Results Test (home, one service,
one website-package, one resource article, /faq/, one areas-we-serve location) and
tell me which schema types and enhancements (BreadcrumbList everywhere, FAQ on
/faq/) must validate with no critical errors. No code change expected unless one
fails — if so, point me at lib/schema.ts.
```

## Step 18 — Lighthouse mobile budgets

```
Give me the Lighthouse mobile run plan for home, one service, one article, /pricing/
and /request-a-quote/, with the pass thresholds from PRE-LAUNCH-CHECKLIST
(Perf >=90, A11y >=95, SEO >=95). If any page misses, diagnose against
docs/technical/PERFORMANCE-BUDGET.md and propose the smallest fix. Then record the
scores in docs/PROJECT-STATUS.md.
```

## Step 19 — Forms end-to-end on production

```
Give me a manual test script for production: submit the contact form and the
request-a-quote form with real data, confirm the thank-you page only shows after a
successful send, verify the noindex tag on the thank-you page, test the honeypot
(filling the hidden field is silently discarded), and confirm tel:/mailto:/WhatsApp
links work on a real phone. Tie each step back to the delivery confirmation from
Step 10.
```

## Step 20 — Mobile, keyboard and content pass

```
Give me a final manual pass checklist: no horizontal scroll at 320px, tap targets
and CTA visibility on mobile, a keyboard-only navigation pass per
docs/technical/ACCESSIBILITY-STANDARDS, and a content sweep for any leftover
placeholder/lorem text and en-ZA spelling. List the specific pages to check.
```

## Step 21 — Safety nets

```
Help me create the launch safety nets: git tag v1.0-launch on the deployed commit,
confirm the previous Vercel deployment is one-click restorable, and give me a
template to store (outside the repo) a backup of the production env vars and DNS
records. Add a short "rollback procedure" note to docs/launch/.
```

---

# Part C — Google Search Console submission

Only start this once Part B is green. Reference: `docs/launch/SEARCH-CONSOLE-SETUP.md`.

## Step 22 — Create and verify the Search Console property

**Why:** Use a **Domain** property (covers apex + www + both protocols), verified by DNS TXT — cleaner than URL-prefix for this setup. Owner action at Google + registrar.

```
Walk me through creating a Google Search Console DOMAIN property for
koppiesystems.co.za and verifying it with a DNS TXT record at my registrar. Tell me
exactly where the google-site-verification value goes, that I keep the record
permanently, and how to confirm "Ownership verified." Note that this repo does NOT
need NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION set because I'm using DNS verification —
confirm that's fine and leave the env var unset.
```

## Step 23 — Submit the sitemap

```
Give me the exact Search Console steps to submit the sitemap: Sitemaps > enter
"sitemap.xml" > Submit. Tell me the "Discovered URLs" count I should expect to match
my indexable route count (confirm the number from validate:seo after Step 7), and
what to do if it mismatches. Remind me not to resubmit repeatedly.
```

## Step 24 — Inspect and request indexing for key pages

```
Give me the URL Inspection plan: run the live test on the homepage plus my core
commercial URLs (business-websites service, lead-generation service, /projects/,
/pricing/, one website-package, one resource article, /faq/, /areas-we-serve/pretoria/),
confirm each shows "URL is available to Google", user-declared canonical matches,
and no unexpected noindex — then Request Indexing on each. Note that indexing is a
hint, not a guarantee.
```

## Step 25 — Analytics + GA association (only if GA4 enabled in Step 11)

```
If GA4 is live: show me how to associate the GA4 property with Search Console
(Settings > Associations) and how to confirm in GA4 DebugView that generate_lead,
click_phone, click_whatsapp and click_email fire correctly on production, with
consent behaviour verified.
```

## Step 26 — Google Business Profile (local SEO)

**Why:** Recommended for local SEO (REQUIRED-USER-INPUTS #11; `docs/launch/GOOGLE-BUSINESS-PROFILE-CHECKLIST.md`). Note you publish no street address — set up as a service-area business. Owner action.

```
Walk me through creating a Google Business Profile as a SERVICE-AREA business
(no public street address; areas: Pretoria, Centurion, Gauteng, South Africa) per
docs/launch/GOOGLE-BUSINESS-PROFILE-CHECKLIST.md. Once it has a public URL, set
brand.googleBusinessProfile in config/brand.ts and add it (plus any LinkedIn) to
brand.social so it flows into Organization schema sameAs. Run `npm run test`.
```

## Step 27 — Post-launch monitoring

```
Set up the post-launch cadence from docs/launch/POST-LAUNCH-90-DAY-PLAN.md: assign a
monitoring owner and create calendar reminders for the weekly Performance report,
monthly Page-indexing report, and Core Web Vitals once field data accrues. Summarise
the first-week Search Console tasks I should not forget.
```

---

# Blocker summary (must-clear before go-live)

| # | Blocker | Type | Step |
|---|---|---|---|
| 1 | CIPC registration number + remove preview footer disclaimer | Legal + code | 1 |
| 2 | POPIA Information Officer named; legal pages attorney-reviewed | Legal + code | 2 |
| 3 | `hello@` mailbox live & monitored (or hide it) | Owner/config | 3 |
| 4 | Resend templates + env set and one live-tested submission | Integration | 10 |
| 5 | `npm run check` green | Code | 13 |
| 6 | Vercel env split (Prod vs Preview) + redeploy | Ops | 14 |
| 7 | Live re-verify robots/sitemap/canonicals on www | Verify | 15 |
| 8 | GSC domain property verified + sitemap submitted | Google | 22–23 |

**Advisable but not hard blockers:** trademark screening (4), fix broken Damtech image (6), case-study indexation decision (7), final logo SVG (8), secondary-domain policy (9), GA4 (11), paid checkout (12), GBP (26).

Full pre-existing checklist: `docs/launch/PRE-LAUNCH-CHECKLIST.md`. Detailed crawl evidence: `docs/technical/PRODUCTION-CRAWL-AUDIT.md`.
