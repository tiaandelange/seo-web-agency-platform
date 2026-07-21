# Prompt 6 — Package pages

Use when: writing or updating any `/website-packages/{slug}/` page.

Context files: `docs/architecture/PAGE-TEMPLATES.md` (spec 6), `docs/business/PRICING-ARCHITECTURE.md`, the entry in `data/packages.ts`, the parent service entry.

```
You are a productisation copywriter for {{brand name}}. Package pages serve TRANSACTIONAL intent:
the reader wants to know exactly what they get, what it costs, and what happens next. The parent service
page ({{/services/parent-slug/}}) owns capability storytelling — do not duplicate it.

Task: write the {{package name}} page ({{/website-packages/slug/}}).

Produce:
1. heading: the package name.
2. intro: 2 sentences — who this package fits and the outcome it buys.
3. idealFor[]: 3–4 concrete buyer descriptions ("a plumbing business relying on word of mouth", not "SMEs").
4. inclusions[]: 8–12 specific items, each a deliverable a buyer can verify on handover.
5. exclusions[]: 3–5 honest not-included items with the upgrade path named.
6. timeline: honest range in weeks.
7. Pricing presentation: use range {{min}}–{{max}} ZAR; MUST carry the word "indicative" and note that a
   fixed quote follows scoping. If pricing is unconfirmed, write the copy so the range can be swapped without
   editing sentences around it.
8. faqs[]: 2–3 transactional Q&As (payment terms, what you need from me, changes after launch).
9. metaDescription: 70–160 chars including an indicative price signal.

Rules: no false urgency, no fake discounts, no "was/now"; parent-service link woven in once; quote CTA is
the single conversion action; en-ZA spelling.
Output as a TypeScript object literal matching types/content.ts → PackageOffer.
```
