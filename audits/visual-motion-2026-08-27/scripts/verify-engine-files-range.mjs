/**
 * Verify #engine-files-range a11y + viewport captures after Uploaded documents fix.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..', '..');
const requireRoot = createRequire(path.join(repoRoot, 'package.json'));
const axeSource = fs.readFileSync(requireRoot.resolve('axe-core/axe.min.js'), 'utf8');

const OUT = path.resolve(__dirname, '..', 'artifacts', 'screenshots', 'engine-files-range');
fs.mkdirSync(OUT, { recursive: true });

const ORIGIN = process.env.ORIGIN || 'http://127.0.0.1:3010';
const VIEWPORTS = [
  { name: '360x800', width: 360, height: 800 },
  { name: '390x844', width: 390, height: 844 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1440x900', width: 1440, height: 900 },
];

async function waitForEngine(page) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('koppie_analytics_consent', 'denied');
    } catch {
      /* ignore */
    }
  });
  await page.goto(`${ORIGIN}/projects/`, { waitUntil: 'networkidle', timeout: 90000 });

  for (let i = 0; i < 50; i++) {
    const found = await page.evaluate(() => {
      const range = document.querySelector('#engine-files-range');
      const instrument = document.querySelector('.engine-instrument');
      return Boolean(range && instrument);
    });
    if (found) {
      await page.locator('.engine-instrument').scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      return;
    }
    await page.evaluate(() => window.scrollBy(0, Math.max(500, Math.floor(window.innerHeight * 0.85))));
    await page.waitForTimeout(200);
  }
  throw new Error('engine-instrument / #engine-files-range not found after scroll');
}

const browser = await chromium.launch({ headless: true });
const results = { origin: ORIGIN, viewports: [], axe: null, keyboard: null, overflow: [] };

try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await waitForEngine(page);

    const overflowX = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        overflowX: doc.scrollWidth > doc.clientWidth + 1,
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
      };
    });
    results.overflow.push({ viewport: vp.name, ...overflowX });

    await page.locator('.engine-instrument').screenshot({
      path: path.join(OUT, `after-${vp.name}-instrument.png`),
    });
    await page.screenshot({ path: path.join(OUT, `after-${vp.name}-viewport.png`) });

    const meta = await page.evaluate(() => {
      const range = document.querySelector('#engine-files-range');
      const label = document.querySelector('label[for="engine-files-range"]');
      const output = document.querySelector('#engine-files-value');
      const hint = document.querySelector('#engine-files-hint');
      return {
        labelText: label?.textContent?.trim(),
        labelFor: label?.getAttribute('for'),
        rangeId: range?.id,
        rangeMin: range?.getAttribute('min'),
        rangeMax: range?.getAttribute('max'),
        rangeDescribedBy: range?.getAttribute('aria-describedby'),
        rangeValueText: range?.getAttribute('aria-valuetext'),
        outputText: output?.textContent?.trim(),
        outputLive: output?.getAttribute('aria-live'),
        hintText: hint?.textContent?.trim(),
        numberAriaLabel: document.querySelector('#engine-files')?.getAttribute('aria-label'),
      };
    });
    results.viewports.push({ viewport: vp.name, meta, overflowX });

    if (vp.name === '1440x900') {
      await page.addScriptTag({ content: axeSource });
      results.axe = await page.evaluate(async () => {
        // eslint-disable-next-line no-undef
        const r = await axe.run(document.querySelector('.engine-instrument'), {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
        });
        return {
          violations: r.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({ target: n.target, html: n.html.slice(0, 220) })),
          })),
        };
      });

      const before = await page.locator('#engine-files-range').inputValue();
      await page.locator('#engine-files-range').focus();
      await page.keyboard.press('ArrowRight');
      const after = await page.locator('#engine-files-range').inputValue();
      results.keyboard = {
        focused: await page.evaluate(() => document.activeElement?.id === 'engine-files-range'),
        before: Number(before),
        after: Number(after),
        changed: Number(after) === Number(before) + 1,
      };
    }

    await context.close();
  }
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(OUT, 'verify-after.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));

const labelViolations = results.axe?.violations?.filter((v) =>
  ['label-title-only', 'label', 'aria-input-field-name', 'form-field-multiple-labels'].includes(v.id),
);
if (labelViolations?.length) {
  console.error('FAIL axe label violations', labelViolations);
  process.exit(1);
}
if (!results.keyboard?.changed) {
  console.error('FAIL keyboard', results.keyboard);
  process.exit(1);
}
if (results.overflow.some((o) => o.overflowX)) {
  console.error('FAIL overflow', results.overflow);
  process.exit(1);
}
if (results.viewports.some((v) => v.meta.labelText !== 'Uploaded documents')) {
  console.error('FAIL label text', results.viewports.map((v) => v.meta.labelText));
  process.exit(1);
}
console.log('VERIFY OK');
