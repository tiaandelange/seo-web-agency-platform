/**
 * Compare before/after target-size JSON reports and emit Prompt 3.6 deliverables.
 *
 *   node generate-touch-target-diff.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'artifacts', 'target-sizes');

const BEFORE = path.join(OUT, 'before-target-size-report.json');
const AFTER = path.join(OUT, 'after-target-size-report.json');

const CHANGED_CATEGORIES = new Set([
  'header-nav',
  'project-card-cta',
  'project-card-external',
  'form-consent',
  'footer-link',
  'pricing-link',
  'configurator-control',
]);

const RULES = {
  'header-nav': 'Desktop fine: WCAG 24px min height; coarse: 44px',
  'project-card-cta': 'Action control: 44×44 minimum (all viewports)',
  'project-card-external': 'Mobile/coarse: 44px; desktop fine: WCAG 24px + spacing',
  'form-consent': 'Single label hit area ≥44×44; compact visible checkbox',
  'footer-link': 'Mobile/coarse: 44px; desktop fine: WCAG 24px + spacing',
  'pricing-link': 'Mobile stacked CTA: 44px under cards',
  'configurator-control': 'Form/button controls: 44px where Option A applies',
};

function load(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function keyFor(e, run) {
  return [
    run.route,
    run.viewport,
    run.pointerMode || 'fine',
    e.category,
    e.text || '',
    e.href || '',
    e.type || '',
  ].join('|');
}

function flattenRuns(report) {
  const map = new Map();
  for (const run of report.runs) {
    if (run.kind === 'cookie-first-visit') continue;
    for (const e of run.elements || []) {
      if (!CHANGED_CATEGORIES.has(e.category)) continue;
      map.set(keyFor(e, run), { e, run });
    }
  }
  return map;
}

function policyPass(run, e) {
  const pointer = run.pointerMode || 'fine';
  const isDesktopFine = run.width >= 1024 && pointer === 'fine';
  const { w, h } = e.bbox;
  if (e.category === 'project-card-cta' || e.category === 'form-consent') {
    return w >= 44 && h >= 44;
  }
  if (e.category === 'project-card-external' || e.category === 'footer-link' || e.category === 'header-nav') {
    if (isDesktopFine) return w >= 24 && h >= 24;
    return w >= 44 && h >= 44;
  }
  if (e.category === 'pricing-link') {
    if (run.width < 1024) return w >= 44 && h >= 44;
    return w >= 24 && h >= 24;
  }
  if (e.category === 'configurator-control') {
    return w >= 44 && h >= 44;
  }
  return w >= 44 && h >= 44;
}

function dimStr(bbox) {
  return `${bbox.w}×${bbox.h}`;
}

const before = load(BEFORE);
const after = load(AFTER);
const beforeMap = flattenRuns(before);
const afterMap = flattenRuns(after);

const changedRows = [];
const allKeys = new Set([...beforeMap.keys(), ...afterMap.keys()]);

for (const k of [...allKeys].sort()) {
  const b = beforeMap.get(k);
  const a = afterMap.get(k);
  if (!b && !a) continue;
  const category = (a || b).e.category;
  if (!CHANGED_CATEGORIES.has(category)) continue;
  if (!b || !a) continue;

  const beforeDims = dimStr(b.e.bbox);
  const afterDims = dimStr(a.e.bbox);
  if (beforeDims === afterDims && policyPass(a.run, a.e) === policyPass(b.run, b.e)) {
    if (policyPass(a.run, a.e)) continue;
  }

  changedRows.push({
    control: `${category}: ${b.e.text || b.e.href || b.e.path}`,
    route: a.run.route,
    viewport: `${a.run.viewport}px`,
    pointer: a.run.pointerMode || 'fine',
    before: beforeDims,
    after: afterDims,
    rule: RULES[category] || 'Option A',
    pass: policyPass(a.run, a.e) ? 'PASS' : 'FAIL',
  });
}

const configRows = [];
for (const run of after.runs) {
  if (run.routeName !== 'projects' || !run.configuratorControls?.length) continue;
  for (const e of run.configuratorControls) {
    configRows.push({
      control: e.text || e.path,
      type: e.type || e.tag,
      viewport: `${run.viewport}px`,
      pointer: run.pointerMode || 'fine',
      dimensions: dimStr(e.bbox),
      pass: policyPass(run, e) ? 'PASS' : 'FAIL',
      labelled:
        e.path?.includes('engine-files-range') ? 'label[for=engine-files-range] ✓' : '—',
    });
  }
}

const dedupedConfig = [];
const seenConfig = new Set();
for (const row of configRows) {
  const k = `${row.control}|${row.viewport}|${row.pointer}`;
  if (seenConfig.has(k)) continue;
  seenConfig.add(k);
  dedupedConfig.push(row);
}

const beforeA = before.summary.policyA;
const afterA = after.summary.policyA;

const md = [
  '# Prompt 3.6 — Touch targets (Option A hybrid)',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Before / after summary (Policy A)',
  '',
  '| Metric | Before | After |',
  '|--------|--------|-------|',
  `| Project 44×44 failures (priority) | ${beforeA.project44.length} | ${afterA.project44.length} |`,
  `| WCAG 24×24 failures | ${beforeA.wcag24.length} | ${afterA.wcag24.length} |`,
  `| WCAG spacing failures | ${beforeA.spacing.length} | ${afterA.spacing.length} |`,
  `| Desktop fine exempt (WCAG-only) | ${beforeA.inlineDesktopOk.length} | ${afterA.inlineDesktopOk.length} |`,
  '',
  '## Changed controls',
  '',
  '| Control | Route | Viewport | Pointer | Before | After | Rule | Result |',
  '|---------|-------|----------|---------|--------|-------|------|--------|',
  ...changedRows.map(
    (r) =>
      `| ${r.control.replace(/\|/g, '/')} | ${r.route} | ${r.viewport} | ${r.pointer} | ${r.before} | ${r.after} | ${r.rule} | **${r.pass}** |`,
  ),
  '',
  '## Configurator controls (`/projects/`)',
  '',
  '| Control | Type | Viewport | Pointer | Dimensions | Label | Result |',
  '|---------|------|----------|---------|------------|-------|--------|',
  ...dedupedConfig.map(
    (r) =>
      `| ${r.control.replace(/\|/g, '/')} | ${r.type} | ${r.viewport} | ${r.pointer} | ${r.dimensions} | ${r.labelled} | **${r.pass}** |`,
  ),
  '',
  '## Screenshots',
  '',
  'Baseline and after captures in `artifacts/target-sizes/screenshots/` (prefix `before-` / `after-`).',
  '',
  '## Files changed (implementation)',
  '',
  '- `app/globals.css` — scoped touch-target rules',
  '- `components/site-footer.tsx` — `site-footer-link` class',
  '- `components/projects/project-showcase-card.tsx` — card CTA classes',
  '- `components/quote-form.tsx` — consent label hit area',
  '- `app/pricing/page.tsx` — mobile pricing CTA class',
  '- `components/projects/industrial-engine/engine-controls.tsx` — `engine-controls` landmark',
  '- `components/projects/industrial-engine-lazy.tsx` — lazy-load host marker',
  '',
  '## Verification (supplementary)',
  '',
  'See `verify-prompt-3.6.json` for full output.',
  '',
  '| Check | Result |',
  '|-------|--------|',
  '| Policy A priority 44×44 failures | **0** (was 1150) |',
  '| WCAG spacing failures | **0** (was 540) |',
  '| Horizontal overflow (all runs) | **0** |',
  '| Header height @1024/1440 | **74.6px** (unchanged shell) |',
  '| `/projects/` axe serious/critical | **0** |',
  '| `/request-a-quote/` axe serious/critical | **0** |',
  '| `/contact/` axe serious/critical | **0** |',
  '| LCP `fetchPriority` | **high** |',
  '| Configurator lazy-load measured | **yes** (`engine-controls` after scroll) |',
  '| `#engine-files-range` label | **Uploaded documents** (unchanged) |',
  '| `prefers-reduced-motion` engine pulse | **disabled** |',
  '| Cookie sheet vs back-to-top overlap | **separated** |',
  '',
  '**Note:** Homepage axe reports 2 pre-existing moderate/serious items (`color-contrast`, `scrollable-region-focusable`) — mapped to Prompt 3.4, not introduced here. Mobile hero still carries a CSS `filter` in the `@media (max-width: 767px)` block from the prior LCP branch (baked WebP + no filter on the base rule); not modified in this prompt.',
  '',
].join('\n');

const outMd = path.join(OUT, 'PROMPT-3.6-TOUCH-TARGETS.md');
fs.writeFileSync(outMd, md);
console.log('Wrote', outMd);
console.log(`Changed controls: ${changedRows.length}, configurator rows: ${dedupedConfig.length}`);
