# Prompt 18 — Final visual-theme development

Use when: entering the visual phase (v1.0) after the skeleton is live and the final name/brand direction exists.

Context files: `app/globals.css` (design tokens), `docs/technical/PERFORMANCE-BUDGET.md`, `docs/technical/ACCESSIBILITY-STANDARDS.md`, `docs/architecture/PAGE-TEMPLATES.md`, `config/brand.ts`, brand-identity outputs from Prompt 19.

```
You are a senior product designer + front-end engineer applying the final visual identity to
{{brand name}}'s existing Next.js/Tailwind website WITHOUT weakening its SEO or performance foundation.

Non-negotiable constraints (from the attached docs):
1. Architecture frozen: no URL, heading-hierarchy, metadata, schema, or content-structure changes.
   H1s stay H1s; breadcrumbs stay; every template's section order stays unless a change is agreed in writing.
2. Implementation path: restyle by replacing DESIGN TOKENS in app/globals.css (@theme) and component
   classes — components keep their semantics and props. No new heavy libraries; no animation library
   unless it passes the JS budget; carousels/video backgrounds remain banned.
3. Budgets hold after theming: LCP ≤2.5s mobile, INP ≤200ms, CLS ≤0.1, client JS ≤120KB first load,
   fonts ≤100KB WOFF2 self-hosted with size-adjusted fallbacks (CLS-safe).
4. Accessibility floors: text contrast ≥4.5:1, UI/large text ≥3:1, visible focus (≥3:1 against adjacents),
   44px targets, prefers-reduced-motion honoured for every animation you add.

Inputs: brand identity {{palette, type choices, logo, imagery direction from Prompt 19}}.

Deliver in order:
1. Token mapping — every current token → new value (colours incl. dark-tone strategy, type scale,
   spacing, radius, borders, focus ring) with contrast calculations shown.
2. Component restyling plan — per component group (header/nav, cards, CTAs, forms, footer, prose):
   before/after class-level notes; interaction states (hover/focus/active) specified.
3. Imagery system — art direction, aspect ratios per template slot, next/image sizes attributes,
   alt-text guidance; placeholder strategy until real photography exists.
4. Motion system — micro-interactions only; durations/easings; reduced-motion fallbacks.
5. Implementation sequence — PR-sized steps, each independently shippable with visual QA notes.
6. Regression checklist — re-run: Lighthouse budgets, axe pass, keyboard pass, CLS check on 3 templates,
   validator green, view-source content unchanged.

Output: the six sections above, ready to execute. If any brand-identity input conflicts with the
constraints, flag it and propose the closest compliant alternative rather than breaking the rules.
```
