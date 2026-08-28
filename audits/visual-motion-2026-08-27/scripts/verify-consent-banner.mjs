/**
 * Verify cookie consent sheet — POPIA behaviour, layout, analytics gating, axe.
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

const OUT = path.resolve(__dirname, '..', 'artifacts', 'screenshots', 'consent-banner-after');
fs.mkdirSync(OUT, { recursive: true });

const ORIGIN = (process.env.ORIGIN || 'http://127.0.0.1:3010').replace(/\/$/, '');
const CONSENT_KEY = 'koppie_analytics_consent';
const GA_HOST = /google-analytics\.com|googletagmanager\.com|region1\.google-analytics\.com/;

const VIEWPORTS = [
  { name: '360x800', width: 360, height: 800 },
  { name: '390x844', width: 390, height: 844 },
  { name: '430x932', width: 430, height: 932 },
];

const SAFE_AREA = { top: 47, bottom: 34, left: 0, right: 0 };

async function applySafeArea(page) {
  const client = await page.context().newCDPSession(page);
  try {
    await client.send('Emulation.setSafeAreaInsetsOverride', {
      top: SAFE_AREA.top,
      bottom: SAFE_AREA.bottom,
      left: SAFE_AREA.left,
      right: SAFE_AREA.right,
    });
  } catch {
    /* older Chromium */
  }
}

function trackGa(page) {
  const hits = [];
  page.on('request', (req) => {
    if (GA_HOST.test(req.url())) hits.push(req.url());
  });
  return hits;
}

async function freshVisit(context) {
  const page = await context.newPage();
  await applySafeArea(page);
  const gaHits = trackGa(page);
  await page.goto(`${ORIGIN}/`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.evaluate((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, CONSENT_KEY);
  await page.reload({ waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForSelector('.cookie-consent-sheet', { timeout: 15000 });
  await page.waitForTimeout(400);
  return { page, gaHits };
}

async function measure(page) {
  return page.evaluate(() => {
    const bar = document.querySelector('.cookie-consent-sheet__surface');
    const primary = document.querySelector('.home-hero-cta-primary');
    const secondary = document.querySelector('.home-hero-cta-secondary');
    const backToTop = document.querySelector('.back-to-top');
    const doc = document.documentElement;
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
    };
    const overlaps = (a, b) => {
      if (!a || !b) return false;
      return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
    };
    const accept = bar?.querySelector('button:nth-of-type(1)');
    const reject = bar?.querySelector('button:nth-of-type(2)');
    const acceptStyle = accept ? getComputedStyle(accept) : null;
    const rejectStyle = reject ? getComputedStyle(reject) : null;
    const barRect = rect(bar);
    const bttRect = rect(backToTop);
    return {
      overflowX: doc.scrollWidth > doc.clientWidth + 1,
      barRect,
      acceptMinH: acceptStyle?.minHeight,
      rejectMinH: rejectStyle?.minHeight,
      acceptBg: acceptStyle?.backgroundColor,
      rejectBg: rejectStyle?.backgroundColor,
      acceptOrder: accept?.textContent?.trim(),
      rejectOrder: reject?.textContent?.trim(),
      policyVisible: Boolean(bar?.querySelector('a[href*="cookie-policy"]')),
      primaryVisible: primary ? rect(primary).bottom > 0 && rect(primary).top < innerHeight : false,
      secondaryVisible: secondary ? rect(secondary).bottom > 0 && rect(secondary).top < innerHeight : false,
      backToTopOverlapsBar: overlaps(barRect, bttRect),
      scrollPaddingBottom: getComputedStyle(document.body).scrollPaddingBottom,
      ariaModal: document.querySelector('.cookie-consent-bar')?.getAttribute('aria-modal'),
      role: document.querySelector('.cookie-consent-bar')?.getAttribute('role'),
    };
  });
}

const browser = await chromium.launch({ headless: true });
const report = { origin: ORIGIN, viewports: [], states: {}, axe: null, ga: {} };

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });

  const { page: initial, gaHits: gaInitial } = await freshVisit(context);
  const initialMetrics = await measure(initial);
  await initial.screenshot({ path: path.join(OUT, `${vp.name}-initial.png`) });
  await initial.locator('.cookie-consent-sheet__surface').screenshot({
    path: path.join(OUT, `${vp.name}-sheet.png`),
  });
  report.viewports.push({ viewport: vp.name, initial: initialMetrics, gaBeforeConsent: gaInitial.length });
  await initial.close();

  if (vp.name === '390x844') {
    const { page: acceptPage, gaHits: gaAcceptWait } = await freshVisit(context);
    await acceptPage.waitForTimeout(800);
    report.ga.beforeAccept = gaAcceptWait.length;
    await acceptPage.getByRole('button', { name: 'Accept' }).click();
    await acceptPage.waitForTimeout(800);
    report.ga.afterAccept = gaAcceptWait.length;
    report.states.acceptBannerGone = !(await acceptPage.$('.cookie-consent-sheet'));
    await acceptPage.screenshot({ path: path.join(OUT, `${vp.name}-after-accept.png`) });
    await acceptPage.close();

    const { page: rejectPage, gaHits: gaReject } = await freshVisit(context);
    await rejectPage.waitForTimeout(800);
    report.ga.beforeReject = gaReject.length;
    await rejectPage.getByRole('button', { name: 'Reject' }).click();
    await rejectPage.waitForTimeout(800);
    report.ga.afterReject = gaReject.length;
    report.states.rejectBannerGone = !(await rejectPage.$('.cookie-consent-sheet'));
    report.states.rejectStored = await rejectPage.evaluate(
      (key) => localStorage.getItem(key),
      CONSENT_KEY,
    );
    await rejectPage.screenshot({ path: path.join(OUT, `${vp.name}-after-reject.png`) });
    await rejectPage.close();

    const returnPage = await context.newPage();
    await applySafeArea(returnPage);
    await returnPage.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });
    report.states.returningVisitorBanner = Boolean(await returnPage.$('.cookie-consent-sheet'));
    await returnPage.screenshot({ path: path.join(OUT, `${vp.name}-returning-denied.png`) });
    await returnPage.addScriptTag({ content: axeSource });
    report.axe = await returnPage.evaluate(async () => {
      const target = document.querySelector('#hero') || document.body;
      // eslint-disable-next-line no-undef
      const r = await axe.run(target, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      });
      return { violations: r.violations.map((v) => ({ id: v.id, impact: v.impact })) };
    });
    await returnPage.close();
  }

  await context.close();
}

await browser.close();
fs.writeFileSync(path.join(OUT, 'verify.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

const fail = [];
for (const v of report.viewports) {
  if (v.initial.overflowX) fail.push(`${v.viewport} overflow`);
  if (!v.initial.primaryVisible || !v.initial.secondaryVisible) fail.push(`${v.viewport} hero CTAs obscured`);
  if (v.initial.backToTopOverlapsBar) fail.push(`${v.viewport} back-to-top overlaps sheet`);
  if (v.initial.acceptOrder !== 'Accept' || v.initial.rejectOrder !== 'Reject') fail.push(`${v.viewport} button order`);
  if (v.initial.acceptBg !== v.initial.rejectBg) fail.push(`${v.viewport} unequal button weight`);
  if (parseFloat(v.initial.acceptMinH) < 44 || parseFloat(v.initial.rejectMinH) < 44) fail.push(`${v.viewport} touch target`);
  if (v.gaBeforeConsent > 0) fail.push(`${v.viewport} GA before consent`);
}
if (report.ga.beforeAccept > 0) fail.push('GA before accept');
if (report.ga.afterReject > report.ga.beforeReject) fail.push('GA after reject');
if (!report.states.acceptBannerGone || !report.states.rejectBannerGone) fail.push('banner not dismissed');
if (report.states.rejectStored !== 'denied') fail.push('reject not stored');
if (report.states.returningVisitorBanner) fail.push('returning visitor still sees banner');
if (report.axe?.violations?.length) fail.push('axe violations');

if (fail.length) {
  console.error('FAIL', fail);
  process.exit(1);
}
console.log('VERIFY OK');
