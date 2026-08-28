/**
 * Measure rendered bounding boxes of interactive targets on critical routes.
 * Outputs machine-readable JSON + summary. Run BEFORE touch-target fixes.
 *
 *   ORIGIN=http://127.0.0.1:3010 LABEL=before node measure-target-sizes.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'artifacts', 'target-sizes');
const SHOTS = path.join(OUT, 'screenshots');
fs.mkdirSync(SHOTS, { recursive: true });

const ORIGIN = (process.env.ORIGIN || 'http://127.0.0.1:3010').replace(/\/$/, '');
const LABEL = process.env.LABEL || 'before';
const CONSENT_KEY = 'koppie_analytics_consent';

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/services/business-websites/', name: 'services' },
  { path: '/projects/', name: 'projects' },
  { path: '/pricing/', name: 'pricing' },
  { path: '/request-a-quote/', name: 'quote' },
  { path: '/contact/', name: 'contact' },
];

const VIEWPORTS = [
  { name: '360', width: 360, height: 800 },
  { name: '390', width: 390, height: 844 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 900 },
  { name: '1440', width: 1440, height: 900 },
];

const PRIORITY_CATEGORIES = new Set([
  'header-nav',
  'header-cta',
  'dropdown-child',
  'mobile-menu-toggle',
  'mobile-menu-link',
  'mobile-menu-sublink',
  'mobile-menu-cta',
  'back-to-top',
  'project-card-cta',
  'project-card-external',
  'configurator-control',
  'form-control',
  'form-consent',
  'form-submit',
  'cookie-action',
  'accordion-trigger',
  'pricing-link',
  'footer-link',
]);

function round(n) {
  return Math.round(n * 10) / 10;
}

function slug(s) {
  return String(s).replace(/[^\w.-]+/g, '_').slice(0, 80);
}

/** WCAG 2.5.8 — 24px min dimension OR sufficient spacing between undersized targets. */
function spacingViolation(a, b) {
  if (a.w >= 24 && a.h >= 24 && b.w >= 24 && b.h >= 24) return null;
  const ax = a.x + a.w / 2;
  const ay = a.y + a.h / 2;
  const bx = b.x + b.w / 2;
  const by = b.y + b.h / 2;
  const dist = Math.hypot(ax - bx, ay - by);
  const minDist = 24 + (Math.min(a.w, a.h) + Math.min(b.w, b.h)) / 2;
  if (dist < minDist - 0.5) {
    return { dist: round(dist), required: round(minDist) };
  }
  return null;
}

const MEASURE_FN = () => {
  const round = (n) => Math.round(n * 10) / 10;

  function cssPath(el) {
    if (!(el instanceof Element)) return '';
    const parts = [];
    let node = el;
    while (node && node.nodeType === 1 && parts.length < 6) {
      let part = node.tagName.toLowerCase();
      if (node.id) {
        part += `#${node.id}`;
        parts.unshift(part);
        break;
      }
      const cls = (node.className || '').toString().trim().split(/\s+/).filter(Boolean)[0];
      if (cls) part += `.${cls}`;
      parts.unshift(part);
      node = node.parentElement;
    }
    return parts.join(' > ');
  }

  function categorize(el) {
    const c = el.className?.toString() || '';
    if (el.classList.contains('site-header-link')) return 'header-nav';
    if (el.classList.contains('site-header-cta')) return 'header-cta';
    if (el.classList.contains('site-header-submenu-link')) return 'dropdown-child';
    if (el.classList.contains('mobile-nav-toggle')) return 'mobile-menu-toggle';
    if (el.classList.contains('mobile-nav-link')) return 'mobile-menu-link';
    if (el.classList.contains('mobile-nav-sublink')) return 'mobile-menu-sublink';
    if (el.classList.contains('mobile-nav-cta')) return 'mobile-menu-cta';
    if (el.classList.contains('back-to-top')) return 'back-to-top';
    if (el.closest('.project-showcase-card') && el.tagName === 'A') {
      return el.textContent?.includes('Live') ? 'project-card-external' : 'project-card-cta';
    }
    if (el.closest('.engine-controls') || el.closest('.engine-instrument')) return 'configurator-control';
    if (el.classList.contains('cookie-consent-action')) return 'cookie-action';
    if (el.type === 'checkbox' && el.closest('.form-consent-row')) return 'form-consent';
    if (el.tagName === 'SUMMARY' || el.closest('details')) {
      if (el.tagName === 'SUMMARY') return 'accordion-trigger';
    }
    if (el.closest('footer') || el.closest('.site-footer')) return 'footer-link';
    if (el.closest('[data-pricing]') || el.closest('.pricing')) return 'pricing-link';
    if (el.closest('form')) {
      if (el.tagName === 'BUTTON' || (el.tagName === 'INPUT' && el.type === 'submit')) return 'form-submit';
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) return 'form-control';
    }
    if (el.tagName === 'A' && el.closest('main p, main li')) return 'inline-prose-link';
    if (el.tagName === 'A') return 'text-link';
    if (el.tagName === 'BUTTON') return 'button-other';
    return 'other';
  }

  function isVisible(el) {
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.pointerEvents === 'none') {
      return false;
    }
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  const nodes = [
    ...document.querySelectorAll(
      'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="link"]',
    ),
  ].filter(isVisible);

  return nodes.map((el, index) => {
    let measureEl = el;
    if (el.type === 'checkbox' && el.closest('.form-consent-row')) {
      measureEl = el.closest('label.form-consent-row') || el;
    }
    const rect = measureEl.getBoundingClientRect();
    const style = getComputedStyle(measureEl);
    const category = categorize(el);
    const w = round(rect.width);
    const h = round(rect.height);
  return {
      index,
      tag: el.tagName.toLowerCase(),
      type: el.getAttribute('type') || null,
      role: el.getAttribute('role'),
      text: (el.textContent || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 72),
      href: el.getAttribute('href')?.slice(0, 120) || null,
      path: cssPath(el),
      category,
      bbox: { x: round(rect.x), y: round(rect.y), w, h },
      padding: {
        top: style.paddingTop,
        right: style.paddingRight,
        bottom: style.paddingBottom,
        left: style.paddingLeft,
      },
      lineHeight: style.lineHeight,
      fontSize: style.fontSize,
      pointer: style.cursor,
      projectStandard44Fail: w < 44 || h < 44,
      wcagMin24Fail: w < 24 || h < 24,
      priority: [
        'header-nav',
        'header-cta',
        'dropdown-child',
        'mobile-menu-toggle',
        'mobile-menu-link',
        'mobile-menu-sublink',
        'mobile-menu-cta',
        'back-to-top',
        'project-card-cta',
        'project-card-external',
        'configurator-control',
        'form-control',
        'form-consent',
        'form-submit',
        'cookie-action',
        'accordion-trigger',
        'pricing-link',
        'footer-link',
      ].includes(category),
    };
  });
};

async function preparePage(page, route, vp) {
  await page.goto(`${ORIGIN}${route.path}`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.evaluate((key) => {
    try {
      localStorage.setItem(key, 'granted');
    } catch {
      /* ignore */
    }
  }, CONSENT_KEY);

  if (route.name === 'projects') {
    await page.locator('[data-industrial-engine-host]').scrollIntoViewIfNeeded();
    await page.waitForSelector('.engine-controls', { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(400);
  }

  const isMobile = vp.width < 1024;
  if (isMobile) {
    const toggle = page.locator('.mobile-nav-toggle');
    if (await toggle.isVisible().catch(() => false)) {
      await toggle.click();
      await page.waitForSelector('.mobile-nav-panel', { state: 'visible', timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(200);
    }
  } else {
    const dropdown = page.locator('.site-header-dropdown').first();
    if (await dropdown.count()) {
      await dropdown.hover().catch(() => {});
      await page.waitForTimeout(200);
    }
  }
}

async function measureRoute(browser, route, vp, pointerMode = 'fine') {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.width < 768,
    hasTouch: vp.width < 1024 || pointerMode === 'coarse',
  });
  const page = await context.newPage();
  await page.emulateMedia({ mediaFeatures: [{ name: 'pointer', value: pointerMode }] });
  await preparePage(page, route, vp);

  const elements = await page.evaluate(MEASURE_FN);
  const priority = elements.filter((e) => PRIORITY_CATEGORIES.has(e.category));

  const layoutMetrics = await page.evaluate(() => {
    const header = document.querySelector('.site-header');
    return {
      headerHeight: header ? Math.round(header.getBoundingClientRect().height * 10) / 10 : null,
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });

  const configuratorControls =
    route.name === 'projects'
      ? elements.filter((e) => e.category === 'configurator-control')
      : [];

  const spacing = [];
  for (let i = 0; i < priority.length; i++) {
    for (let j = i + 1; j < priority.length; j++) {
      const a = priority[i].bbox;
      const b = priority[j].bbox;
      const yOverlap = !(a.y + a.h <= b.y || b.y + b.h <= a.y);
      const xOverlap = !(a.x + a.w <= b.x || b.x + b.w <= a.x);
      if (yOverlap && xOverlap) continue;
      const v = spacingViolation(a, b);
      if (v) {
        spacing.push({
          a: { path: priority[i].path, category: priority[i].category, bbox: a },
          b: { path: priority[j].path, category: priority[j].category, bbox: b },
          ...v,
        });
      }
    }
  }

  const shotKey = `${vp.name}-${route.name}`;
  if (['390', '1440'].includes(vp.name) || vp.name === '360') {
    if (route.name === 'home' || route.name === 'quote' || route.name === 'projects') {
      await page.locator('header#top, .site-header').first().screenshot({
        path: path.join(SHOTS, `${LABEL}-${shotKey}-header.png`),
      }).catch(() => {});
    }
    if (vp.width < 1024 && route.name === 'home') {
      await page.screenshot({ path: path.join(SHOTS, `${LABEL}-${vp.name}-mobile-menu.png`) });
    }
    if (route.name === 'projects') {
      await page.locator('.project-showcase-card').first().screenshot({
        path: path.join(SHOTS, `${LABEL}-${shotKey}-project-card.png`),
      }).catch(() => {});
    }
    if (route.name === 'quote') {
      await page.locator('form').first().screenshot({
        path: path.join(SHOTS, `${LABEL}-${shotKey}-form.png`),
      }).catch(() => {});
    }
  }

  await context.close();

  return {
    route: route.path,
    routeName: route.name,
    viewport: vp.name,
    width: vp.width,
    pointerMode,
    layoutMetrics,
    elementCount: elements.length,
    priorityCount: priority.length,
    projectStandard44Failures: priority.filter((e) => e.projectStandard44Fail),
    wcagMin24Failures: elements.filter((e) => e.wcagMin24Fail),
    wcagSpacingFailures: spacing,
    configuratorControls,
    elements: priority,
    allInlineProseUnder44: elements.filter(
      (e) => e.category === 'inline-prose-link' && e.projectStandard44Fail,
    ),
  };
}

async function measureCookie(browser, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.width < 768,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.evaluate((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, CONSENT_KEY);
  await page.reload({ waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForSelector('.cookie-consent-action', { timeout: 15000 });
  const elements = (await page.evaluate(MEASURE_FN)).filter((e) => e.category === 'cookie-action');
  await page.locator('.cookie-consent-sheet__surface').screenshot({
    path: path.join(SHOTS, `${LABEL}-${vp.name}-cookie-sheet.png`),
  });
  await context.close();
  return { viewport: vp.name, cookieActions: elements };
}

const COARSE_DESKTOP_VIEWPORTS = VIEWPORTS.filter((v) => v.width >= 1024);

const browser = await chromium.launch({ headless: true });
const runs = [];
for (const vp of VIEWPORTS) {
  for (const route of ROUTES) {
    runs.push(await measureRoute(browser, route, vp, 'fine'));
    if (COARSE_DESKTOP_VIEWPORTS.some((d) => d.name === vp.name)) {
      runs.push(await measureRoute(browser, route, vp, 'coarse'));
    }
  }
  if (vp.width <= 390) {
    runs.push({ kind: 'cookie-first-visit', ...(await measureCookie(browser, vp)) });
  }
}
await browser.close();

function policyAAllows44Exempt(run, e) {
  const isDesktopFine = run.width >= 1024 && (run.pointerMode || 'fine') === 'fine';
  if (!isDesktopFine) return false;
  if (['header-nav', 'inline-prose-link', 'footer-link', 'pricing-link', 'project-card-external'].includes(e.category)) {
    return !e.wcagMin24Fail;
  }
  return false;
}

function summarizePolicy(runs, policy) {
  const fails = { project44: [], wcag24: [], spacing: [], inlineDesktopOk: [] };
  for (const run of runs) {
    if (run.kind === 'cookie-first-visit') {
      for (const e of run.cookieActions || []) {
        if (e.projectStandard44Fail) fails.project44.push({ ...e, viewport: run.viewport, route: '/' });
      }
      continue;
    }
    const isDesktop = run.width >= 1024;
    for (const e of run.projectStandard44Failures || []) {
      if (policy === 'A' && policyAAllows44Exempt(run, e)) {
        fails.inlineDesktopOk.push({ viewport: run.viewport, route: run.route, pointerMode: run.pointerMode || 'fine', ...e });
        continue;
      }
      fails.project44.push({ viewport: run.viewport, route: run.route, pointerMode: run.pointerMode || 'fine', ...e });
    }
    for (const e of run.wcagMin24Failures || []) {
      if (e.priority || e.category === 'inline-prose-link') {
        fails.wcag24.push({ viewport: run.viewport, route: run.route, ...e });
      }
    }
    for (const s of run.wcagSpacingFailures || []) {
      fails.spacing.push({ viewport: run.viewport, route: run.route, ...s });
    }
  }
  return fails;
}

const report = {
  generatedAt: new Date().toISOString(),
  label: LABEL,
  origin: ORIGIN,
  policySelection: 'A_hybrid',
  thresholds: {
    projectStandard: '44×44 CSS px (binding for buttons, icon controls, form controls, mobile nav, coarse-pointer)',
    wcagAA: '24×24 CSS px minimum OR 24px spacing between undersized targets (WCAG 2.5.8)',
  },
  viewports: VIEWPORTS.map((v) => v.name),
  routes: ROUTES.map((r) => r.path),
  runs,
  summary: {
    policyA: summarizePolicy(runs, 'A'),
    policyB: summarizePolicy(runs, 'B'),
    topProject44ByCategory: {},
  },
};

const catCounts = {};
for (const run of runs) {
  if (!run.projectStandard44Failures) continue;
  for (const e of run.projectStandard44Failures) {
    const k = e.category;
    catCounts[k] = (catCounts[k] || 0) + 1;
  }
}
report.summary.topProject44ByCategory = Object.fromEntries(
  Object.entries(catCounts).sort((a, b) => b[1] - a[1]),
);

const outFile = path.join(OUT, `${LABEL}-target-size-report.json`);
fs.writeFileSync(outFile, JSON.stringify(report, null, 2));

const md = [
  `# Target size baseline (${LABEL})`,
  '',
  `Origin: ${ORIGIN}`,
  `Generated: ${report.generatedAt}`,
  '',
  '## Policy A projected failures (hybrid)',
  `- Project 44×44: **${report.summary.policyA.project44.length}** priority control measurements`,
  `- WCAG 24×24: **${report.summary.policyA.wcag24.length}**`,
  `- WCAG spacing: **${report.summary.policyA.spacing.length}** adjacent pairs`,
  `- Desktop inline links exempt (WCAG-only): **${report.summary.policyA.inlineDesktopOk.length}**`,
  '',
  '## Policy B projected failures (universal 44)',
  `- Project 44×44: **${report.summary.policyB.project44.length}**`,
  '',
  '## Top categories under 44×44 (all viewports)',
  ...Object.entries(report.summary.topProject44ByCategory).map(([k, v]) => `- ${k}: ${v}`),
  '',
  `Full JSON: \`${path.basename(outFile)}\``,
].join('\n');
fs.writeFileSync(path.join(OUT, `${LABEL}-target-size-summary.md`), md);

console.log(md);
console.log('wrote', outFile);
