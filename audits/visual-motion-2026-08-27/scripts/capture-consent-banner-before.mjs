/**
 * Capture first-visit homepage + consent banner before redesign.
 * Viewports: 360×800, 390×844, 430×932 with emulated safe-area insets.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'artifacts', 'screenshots', 'consent-banner-before');
fs.mkdirSync(OUT, { recursive: true });

const ORIGIN = (process.env.ORIGIN || 'https://www.koppiesystems.co.za').replace(/\/$/, '');
const CONSENT_KEY = 'koppie_analytics_consent';

const VIEWPORTS = [
  { name: '360x800', width: 360, height: 800 },
  { name: '390x844', width: 390, height: 844 },
  { name: '430x932', width: 430, height: 932 },
];

/** Typical iPhone home-indicator + status bar emulation for env(safe-area-inset-*). */
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
    // Older Chromium — continue without override (env() may read 0).
  }
}

async function captureViewport(browser, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await applySafeArea(page);

  await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });

  // True first visit — no prior consent choice stored.
  await page.evaluate((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, CONSENT_KEY);
  await page.reload({ waitUntil: 'networkidle', timeout: 90000 });

  await page.waitForSelector('.cookie-consent-bar', { timeout: 15000 });
  await page.waitForTimeout(400);

  const metrics = await page.evaluate(() => {
    const bar = document.querySelector('.cookie-consent-bar');
    const hero = document.querySelector('#hero');
    const primary = document.querySelector('.home-hero-cta-primary');
    const secondary = document.querySelector('.home-hero-cta-secondary');
    const backToTop = document.querySelector('.back-to-top');
    const doc = document.documentElement;

    function rect(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    }

    function visible(el) {
      const r = rect(el);
      if (!r) return false;
      const vh = window.innerHeight;
      return r.bottom > 0 && r.top < vh && r.height > 0;
    }

    const barRect = rect(bar);
    const barStyle = bar ? getComputedStyle(bar) : null;
    const accept = bar?.querySelector('button:nth-of-type(1)');
    const reject = bar?.querySelector('button:nth-of-type(2)');
    const acceptStyle = accept ? getComputedStyle(accept) : null;
    const rejectStyle = reject ? getComputedStyle(reject) : null;

    return {
      overflowX: doc.scrollWidth > doc.clientWidth + 1,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      safeAreaBottom: getComputedStyle(document.documentElement).getPropertyValue('padding-bottom'),
      barPresent: Boolean(bar),
      barRect,
      barBorderTop: barStyle?.borderTopWidth,
      barBg: barStyle?.backgroundColor,
      accept: {
        text: accept?.textContent?.trim(),
        rect: rect(accept),
        minHeight: acceptStyle?.minHeight,
        bg: acceptStyle?.backgroundColor,
      },
      reject: {
        text: reject?.textContent?.trim(),
        rect: rect(reject),
        minHeight: rejectStyle?.minHeight,
        bg: rejectStyle?.backgroundColor,
      },
      policyLink: bar?.querySelector('a[href*="cookie-policy"]')?.textContent?.trim(),
      heroVisible: visible(hero),
      primaryCta: { visible: visible(primary), rect: rect(primary) },
      secondaryCta: { visible: visible(secondary), rect: rect(secondary) },
      backToTop: { present: Boolean(backToTop), rect: rect(backToTop), visible: visible(backToTop) },
      bodyPaddingBottom: getComputedStyle(document.body).paddingBottom,
    };
  });

  await page.screenshot({ path: path.join(OUT, `${vp.name}-viewport.png`), fullPage: false });
  await page.locator('#hero').screenshot({ path: path.join(OUT, `${vp.name}-hero.png`) });
  await page.locator('.cookie-consent-bar').screenshot({
    path: path.join(OUT, `${vp.name}-consent-bar.png`),
  });

  await context.close();
  return { viewport: vp.name, origin: ORIGIN, metrics };
}

const browser = await chromium.launch({ headless: true });
const results = [];
for (const vp of VIEWPORTS) {
  results.push(await captureViewport(browser, vp));
}
await browser.close();

const summary = {
  capturedAt: new Date().toISOString(),
  origin: ORIGIN,
  safeAreaEmulation: SAFE_AREA,
  results,
};
fs.writeFileSync(path.join(OUT, 'capture-metrics.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
