# Accessibility standards

Target: WCAG 2.2 AA on every page. Accessibility is architecture here, not polish — the semantic structure that serves screen readers is the same structure Google parses.

## Implemented in the skeleton

- Landmarks: single `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<footer>`; skip link as first focusable element → `#main`.
- Headings: one H1 per page (PageHeader component), no skipped levels in templates.
- Breadcrumbs: `<nav aria-label="Breadcrumb">` + ordered list + `aria-current="page"`.
- Mobile nav: real `<button>` with `aria-expanded`/`aria-controls`; menu links are plain anchors; Escape-free simple disclosure (no focus trap needed for non-modal disclosure).
- Forms: every input has a visible `<label for>`; required fields marked in the label text (not colour/asterisk alone); consent checkbox with full wording as label; errors (when implemented) will use `aria-describedby` + text, not colour.
- Links vs buttons: navigation = `<a>`, actions = `<button>` — no divs with handlers.
- Focus: visible `:focus-visible` outline token (`--focus-ring`) on all interactive elements; never `outline: none` without replacement.
- Motion: `prefers-reduced-motion: reduce` disables all transitions/animations globally (tokens include none to disable yet — rule stands for the visual phase).
- Images: alt required by the `ImageRef` type; decorative images (none currently) would use `alt=""`.
- Language: `<html lang="en-ZA">`.
- Tap targets ≥ 44×44 px via spacing tokens; text ≥ 16 px base.

## Deferred to the visual phase (with hard constraints)

- Colour contrast: current neutral tokens pass AA (dark text on light surfaces ≥ 7:1). The final palette MUST keep: body text ≥ 4.5:1, large text/UI ≥ 3:1, focus indicators ≥ 3:1 against adjacent colours.
- Custom fonts: must remain ≥ 16 px body, no thin weights below 4.5:1 effective contrast.
- Any added animation must respect the reduced-motion rule and never autoplay > 5 s.

## Testing checklist (per release)

1. Keyboard-only pass: tab through header → page → forms → footer on 3 templates; no traps, logical order, visible focus everywhere.
2. axe DevTools (or `@axe-core/cli` against the built site): zero critical/serious issues.
3. Screen-reader smoke test (NVDA or VoiceOver): landmarks announced, form labels read, breadcrumb sensible.
4. Zoom 200%: no loss of content/function, no horizontal scroll at 320 px width.
5. Lighthouse a11y ≥ 95 on sampled pages.

Automated axe testing can be added to CI later (`@axe-core/playwright`) — documented option, not installed at v0.1 to keep the dependency surface minimal until the first build is verified.
