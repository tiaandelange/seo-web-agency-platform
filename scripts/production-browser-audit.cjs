/**
 * Playwright production runtime audit — Koppie Systems.
 * Does not submit forms (validation UI only). One viewport sweep per URL.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://www.koppiesystems.co.za';
const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1280x800', width: 1280, height: 800 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
  { name: '360x800', width: 360, height: 800 },
];

const PAGES = [
  '/',
  '/services/business-websites/',
  '/services/custom-web-applications/',
  '/projects/',
  '/website-packages/professional-business-website/',
  '/resources/website-cost-south-africa/',
  '/areas-we-serve/pretoria/',
  '/contact/',
  '/request-a-quote/',
  '/pricing/',
];

async function auditPage(page, url, viewport) {
  const consoleErrors = [];
  const failedRequests = [];
  const brokenImages = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(String(err)));
  page.on('requestfailed', (req) => {
    failedRequests.push(`${req.failure()?.errorText || 'failed'} ${req.url()}`);
  });

  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  const status = response ? response.status() : 0;

  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      overflow: doc.scrollWidth > doc.clientWidth + 1,
    };
  });

  const imgs = await page.$$eval('img', (nodes) =>
    nodes.map((img) => ({
      src: img.currentSrc || img.src,
      naturalWidth: img.naturalWidth,
      complete: img.complete,
      alt: img.alt || '',
    })),
  );
  for (const img of imgs) {
    if (img.complete && img.naturalWidth === 0 && img.src) {
      brokenImages.push(img.src);
    }
  }

  const hydrationHints = consoleErrors.filter((e) =>
    /hydrat|minified react error|did not match/i.test(e),
  );

  let navOk = true;
  try {
    const toggle = page.locator('[aria-expanded], button:has-text("Menu"), [data-mobile-nav]');
    if ((await toggle.count()) > 0 && viewport.width < 900) {
      await toggle.first().click({ timeout: 3000 }).catch(() => {});
    }
  } catch {
    navOk = false;
  }

  let formValidation = null;
  if (url.endsWith('/contact/') || url.endsWith('/request-a-quote/')) {
    formValidation = { attempted: true, nativeInvalid: null, notes: [] };
    const submit = page.locator('form button[type="submit"], form input[type="submit"]').first();
    if ((await submit.count()) > 0) {
      await submit.click({ timeout: 3000 }).catch(() => {
        formValidation.notes.push('submit_click_failed');
      });
      const invalid = await page.locator('input:invalid, textarea:invalid, select:invalid').count();
      formValidation.nativeInvalid = invalid;
      formValidation.notes.push(invalid > 0 ? 'native_validation_blocked_empty_submit' : 'no_invalid_fields_detected');
    } else {
      formValidation.notes.push('no_submit_control');
    }
  }

  return {
    url,
    viewport: viewport.name,
    status,
    consoleErrors,
    hydrationHints,
    failedRequests: failedRequests.filter((f) => !/favicon|chrome-extension/i.test(f)),
    brokenImages,
    horizontalOverflow: overflow.overflow,
    overflowDetail: overflow,
    navOk,
    formValidation,
  };
}

(async () => {
  const outDir = path.join('docs', 'technical', 'production-crawl-artifacts');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'KoppieProductionAudit/1.0 Playwright',
    });
    const page = await context.newPage();
    for (const p of PAGES) {
      const url = ORIGIN + p;
      process.stdout.write(`${vp.name} ${p}\n`);
      try {
        results.push(await auditPage(page, url, vp));
      } catch (e) {
        results.push({
          url,
          viewport: vp.name,
          status: 0,
          error: String(e),
          consoleErrors: [],
          hydrationHints: [],
          failedRequests: [],
          brokenImages: [],
          horizontalOverflow: null,
          navOk: false,
          formValidation: null,
        });
      }
    }
    await context.close();
  }

  await browser.close();

  const summary = {
    pages: PAGES.length,
    viewports: VIEWPORTS.length,
    checks: results.length,
    non200: results.filter((r) => r.status && r.status !== 200).length,
    withConsoleErrors: results.filter((r) => (r.consoleErrors || []).length).length,
    withHydration: results.filter((r) => (r.hydrationHints || []).length).length,
    withFailedRequests: results.filter((r) => (r.failedRequests || []).length).length,
    withBrokenImages: results.filter((r) => (r.brokenImages || []).length).length,
    withOverflow: results.filter((r) => r.horizontalOverflow).length,
    formChecks: results.filter((r) => r.formValidation).map((r) => ({
      url: r.url,
      viewport: r.viewport,
      formValidation: r.formValidation,
    })),
  };

  fs.writeFileSync(path.join(outDir, 'browser-audit-results.json'), JSON.stringify({ summary, results }, null, 2));
  fs.writeFileSync(path.join(outDir, 'browser-audit-summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
