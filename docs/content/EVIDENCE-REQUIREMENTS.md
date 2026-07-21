# Evidence requirements

Prepared 2026-07-21. The complete register of what is placeholder today, what genuine material is required to replace it, and which existing work could become real evidence. Machine-readable row-level register: `PLACEHOLDER-REPLACEMENT-REGISTER.csv`. Publication gates for projects: `PROJECT-PUBLICATION-CHECKLIST.md`.

## 1. Placeholder inventory (verified against the codebase 2026-07-21)

| Area | Current state | Where |
|---|---|---|
| Business name + legal name | "Meridian Web Systems (Pty) Ltd" placeholder, not registered | `config/brand.ts` |
| Contact details | phone/email/WhatsApp empty strings (hidden in UI) | `config/brand.ts` |
| Physical address | `null` (service-area business) — decision pending | `config/brand.ts` |
| Business hours | placeholder "Mon–Fri 08:00–17:00" | `config/brand.ts` |
| Social profiles / GBP | empty | `config/brand.ts` |
| Founder identity | "Founder" with `[PLACEHOLDER]` bio, `placeholder: true` | `data/team.ts` |
| Testimonials | empty by design (renders nothing) | `data/testimonials.ts` |
| Pricing | all ranges `indicative: true` with visible notice | `data/packages.ts` |
| Legal pages | structured drafts with `[PLACEHOLDER]` sections: company identity, Information Officer, processors, retention, effective dates | `data/legal.ts` (3 docs) |
| Case studies | 4 template projects, `noindex`, badge rendered, no permission flags | `content/projects/*-template.ts` |
| Screenshots / project imagery | none — `public/images/` contains only `.gitkeep` | `public/images/` |
| Social share image (OG) | not present | `public/` |
| Service-area confirmation | Pretoria/Johannesburg/Centurion/Gauteng assumed (A-01) | `config/brand.ts`, `data/locations.ts` |
| Company registration / VAT / POPIA officer | none supplied | legal pages, footer |

## 2. Genuine content required (priority order)

### Launch-blocking (site cannot go live honestly without these)

1. **Verified contact details** — a real email (on the final domain), phone and/or WhatsApp the founder answers.
2. **Registered company details** — final name, registration number, VAT status, POPIA Information Officer name/contact (feeds legal pages + footer).
3. **Legal review** — a qualified review completing the three legal drafts (effective dates, processors, retention).
4. **Confirmed pricing** — owner sign-off per `docs/business/PRICING-DECISION.md` (or hide prices).
5. **Lead delivery** — a real `LEAD_WEBHOOK_URL`/email provider, tested end-to-end.

### High-value (transforms credibility; not strictly launch-blocking)

6. **Founder biography** — 60–120 words + long-form for About: name, qualification (mechanical engineering), project history, the standard applied. Headshot decision (real photo strongly recommended for Direction C, useful for all).
7. **2–4 real case studies** — see candidate list below; each needs the publication checklist passed.
8. **Project screenshots** — real UI/site imagery per published project (specs in the checklist).
9. **1–3 genuine testimonials** — written permission, name/company/role confirmed.
10. **Measurable results** — only with client permission and verifiable source (Search Console exports, enquiry counts); never approximated.

### Deferred (post-launch)

11. Google Business Profile (needs registered entity + contact).
12. Client logos ("trusted by") — only with per-logo permission.
13. Qualification certificates/registrations if publicly claimed (e.g. ECSA status — claim nothing unverified).

## 3. Candidate genuine case studies (owner to confirm permissions)

Identified from the founder's known project history (A-02, A-13). **Nothing from these projects — names, screenshots, code, results — may be published without express permission; unrelated repositories in the workspace were not opened for this audit.**

| Candidate | Maps to template | Permission questions for the owner |
|---|---|---|
| **DamTech** (contractor website) | `contractor-website-template` | May the client be named? Screenshots? Any enquiry/ranking data shareable? Who grants permission? |
| **Proplytic / PropertyGuy** (property-management system) | `property-management-system-template` | Is this the founder's own product (self-permission) or client-owned? Which screens are safe to show (no tenant PII)? |
| Admin/quotation tooling from project history | `admin-quotation-platform-template` | Which system, whose data, what can be anonymised? |
| Any catalogue/RFQ work | `catalogue-rfq-website-template` | Does a real example exist yet, or does this template wait for the first client? |

Rule (D-07): each template flips to a real, indexable case study **only** when its checklist passes; otherwise it stays a labelled noindex template. Category pages auto-flip when they gain one real project.

## 4. Collection plan

1. Owner completes the decision pack (name, contact, registration) — unblocks items 1–5.
2. Owner answers the permission questions above per project — unblocks 7–8.
3. Founder bio drafted from a 15-minute questionnaire (background, projects, standards) — unblocks 6.
4. First client engagements include a permission clause (testimonial + case-study request at handover) — feeds 9–10 systematically.
