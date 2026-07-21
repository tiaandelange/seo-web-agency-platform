# Project status

Project: SEO-first website platform for a new South African web-development and digital-systems company.
Working brand: **Meridian Web Systems** (temporary — see `config/brand.ts`).
Last updated: 2026-07-21 (v0.1 structural foundation complete).

## Current phase

**v0.1 complete** — all 20 blueprint phases implemented as documentation + code. Next milestone: first local build verification (v0.2 step 1 in `IMPLEMENTATION-ROADMAP.md`).

## Phase summary

| Phase | Scope | Status |
|---|---|---|
| 1 | Workspace inspection, project setup, core docs | ✅ Done |
| 2 | Positioning, naming (32 options, scored shortlist), brand config | ✅ Done — owner sign-off pending |
| 3 | Market, competitor and keyword research (live SERP evidence, dated) | ✅ Done |
| 4 | Information architecture: sitemap, URL register (58 routes), nav, taxonomy | ✅ Done |
| 5 | 21 page-template specifications | ✅ Done |
| 6 | Service (11) / package (5) / support structure + pricing architecture | ✅ Done — pricing placeholder |
| 7 | Case-study framework + 4 template projects (noindex) | ✅ Done |
| 8 | Content model: typed local TS, full schema, example entries | ✅ Done |
| 9 | Stack: Next 15.3 pinned, TS strict, Tailwind 4, Vitest, ESLint 9 | ✅ Done — build unverified (below) |
| 10 | Skeleton: 23 page files (58 URLs), 16 components, neutral tokens | ✅ Done |
| 11 | Metadata system + validator (uniqueness, lengths, canonicals) | ✅ Done |
| 12 | Structured data: 12 builders, anti-fabrication rules, tests | ✅ Done |
| 13 | Crawl/indexation: robots, sitemap, env-gated staging, redirects register | ✅ Done |
| 14 | Internal linking: curated relations + orphan BFS check | ✅ Done |
| 15 | Local SEO: service-area model, 2 genuine location pages, GBP checklist | ✅ Done |
| 16 | Performance budgets + accessibility standards (1 client component total) | ✅ Done |
| 17 | Forms: server action, honeypot, consent, webhook delivery point | ✅ Done — delivery provider pending |
| 18 | Launch docs: pre-launch checklist, GSC setup, 90-day plan | ✅ Done |
| 19 | Content roadmap: launch plan + 12-month CSV (24 rows) | ✅ Done |
| 20 | Prompt library: 20 prompts + index | ✅ Done |

## Validation status (honest)

The build sandbox was unavailable for the entire session (`VM_LOGON_RIGHT_DENIED` — D-16). Therefore:

- ❌ Not executed: `npm install`, dev build, production build, `eslint`, `tsc --noEmit`, `vitest`.
- ✅ Executed instead: static consistency sweep — all 23 page files export metadata (56 metadata call sites); all 8 dynamic routes lock `dynamicParams`; zero internal raw `<a href="/…">`; exactly one `'use client'` file; no meta-keywords anywhere; no unescaped JSX-text apostrophes; slug cross-references spot-verified; route arithmetic recounted (50 indexable + 8 noindex = 58, matching URL register and tests).
- **First action on a working machine:** `npm install && npm run check && npm run build` — fix anything reported, then record results here.

## Blockers

- Build verification (above).
- Owner decisions: `docs/REQUIRED-USER-INPUTS.md` (16 items; 8 launch-blocking).

## Environment notes

- Workspace `C:\Users\delanget\Documents\GitHub` contains unrelated projects (`Damtech-Website`, `PropertyGuy`) — untouched.
- Blueprint PDF was unreachable (same VM failure); implemented from the complete in-message blueprint (A-09).
