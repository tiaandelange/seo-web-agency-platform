# Project publication checklist

Prepared 2026-07-21. The gate every project must pass before it stops being a noindex template and becomes a published, indexable case study. Complements `CASE-STUDY-FRAMEWORK.md` (structure/content rules); this checklist governs *permission and truth*. One completed copy of this checklist should be stored per published project.

## Gate 1 — Permission (all required)

- [ ] Written permission from the client (email is sufficient) covering: publication of the case study, the client's name **or** an agreed anonymised description, screenshots/imagery, and any figures quoted.
- [ ] Permission granted by someone authorised to give it (owner/director — record who and when).
- [ ] Scope of permission recorded: named vs anonymised; imagery allowed; results allowed; logo allowed.
- [ ] If the project is the founder's own product: self-permission noted, and any third-party data in screenshots cleared.
- [ ] Permission date + reference stored in the project file (`permission` fields per `types/content.ts`).

## Gate 2 — Truth (all required)

- [ ] Every stated fact is verifiable: scope, deliverables, timeline, technology.
- [ ] Results/metrics have a verifiable source (Search Console export, analytics screenshot, client-confirmed enquiry counts) — no estimates, no "approximately doubled".
- [ ] No implied outcomes ("rankings went up after launch" requires data, not memory).
- [ ] Challenges/limitations stated honestly where relevant — credibility beats gloss.
- [ ] The work described is genuinely the founder's/company's work (role stated honestly if collaborative).

## Gate 3 — Privacy and safety (all required)

- [ ] Screenshots contain no personal information (tenant names, customer emails, phone numbers, financial records) — check every pixel, including browser tabs and notification areas.
- [ ] No credentials, API keys, internal URLs or security-relevant configuration visible.
- [ ] No commercially sensitive client data (pricing, supplier lists, margins) without explicit clearance.
- [ ] POPIA check: any personal information shown has consent or is anonymised.

## Gate 4 — Content quality (per CASE-STUDY-FRAMEWORK.md)

- [ ] Follows the framework structure (context → problem → approach → build → outcome).
- [ ] Unique title + meta description (validator enforces lengths).
- [ ] At least one real image with descriptive alt text (validator enforces alt).
- [ ] Internal links: to the matching service page(s) and solution page; from the project hub.
- [ ] en-ZA prose; no banned agency language (`docs/business/MESSAGING-FRAMEWORK.md`).

## Gate 5 — Technical flip (do in one commit)

- [ ] `publishPermission` / permission fields set in `content/projects/<slug>.ts`.
- [ ] `noindex` flag removed per `docs/architecture/INDEXATION-RULES.md` (the registry computes sitemap inclusion automatically).
- [ ] Template badge no longer renders (driven by the same flags).
- [ ] Its category page indexation re-evaluated (auto-flips at ≥1 real project — verify in validator output).
- [ ] `npm run check` + `npm run build` pass; spot-check the built HTML (robots directive, JSON-LD, canonical).
- [ ] `docs/architecture/URL-REGISTER.csv` indexation column updated; decision-log entry added.

## Anti-patterns (never)

- Publishing a "representative example" as if it were a client project.
- Reusing template copy with a real client name pasted in.
- Quoting results from a different project than the one described.
- Publishing before permission is in writing — verbal agreement is not a gate pass.
