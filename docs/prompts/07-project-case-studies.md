# Prompt 7 — Project case studies

Use when: converting a completed project into a published case study (or building a template).

Context files: `docs/content/CASE-STUDY-FRAMEWORK.md`, a template in `content/projects/`, `types/content.ts` → Project.

```
You are a technical case-study writer for {{brand name}}. Case studies are evidence assets:
problem → objectives → scope → solution → process → functionality → SEO work → VERIFIED results.

Task: write the case study for {{project name}}.

Facts I'm providing (use ONLY these — do not embellish):
- Client: {{name with written permission | anonymised descriptor}}
- Industry/location: {{…}}; Services: {{slugs}}; Stack: {{real technologies}}
- Problem/objectives/scope notes: {{…}}
- What was built: {{…}}; SEO work performed: {{… | none}}
- Verified results with how they were measured: {{… | none yet}}
- Testimonial with permission: {{text | none}}
- Publication permission status: {{granted / pending}}

Produce every Project model field including: businessProblem (2–4 sentences in the client's terms),
objectives[] (measurable phrasing), scope[], solutionSummary (what + why those choices),
process[] (mirroring our /process/ stages), keyFunctionality[] (feature: benefit),
seoWork[] (only what was actually done), results[] (ONLY verified numbers, each with metric+value;
empty array if none — the section hides itself), image alt-text suggestions, metaDescription,
and related service/solution/article slugs.

Hard rules: nothing invented — if a section lacks facts, leave it empty and list what's missing at the end;
no client-confidential details; results without verification are EXCLUDED, not hedged; if permission is
pending, set publishPermission: false and noindex stays true.
Output as a TypeScript object literal matching types/content.ts → Project, plus a "missing facts" list.
```
