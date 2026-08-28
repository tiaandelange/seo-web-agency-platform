/**
 * Supplementary verification for Prompt 3.6: axe, LCP attrs, header height, reduced motion.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'artifacts', 'target-sizes');
const ORIGIN = (process.env.ORIGIN || 'http://127.0.0.1:3010').replace(/\/$/, '');
const CONSENT_KEY = 'koppie_analytics_consent';

const ROUTES = ['/', '/projects/', '/request-a-quote/', '/contact/'];

async function injectAxe(page) {
  await page.addScriptTag({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js',
  });
}

async function runAxe(page) {
  return page.evaluate(async () => {
    // @ts-expect-error axe injected
    return window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag22aa'] },
    });
  });
}

const browser = await chromium.launch({ headless: true });
const results = {
  generatedAt: new Date().toISOString(),
  origin: ORIGIN,
  axe: [],
  lcp: null,
  headerHeights: [],
  reducedMotion: null,
  cookieBackToTopSeparation: null,
};

const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });
await page.evaluate((key) => localStorage.setItem(key, 'granted'), CONSENT_KEY);

results.lcp = await page.evaluate(() => {
  const img = document.querySelector('.home-hero-mountain-image');
  if (!img) return { found: false };
  const style = getComputedStyle(img);
  return {
    found: true,
    fetchPriority: img.getAttribute('fetchpriority') || img.fetchPriority,
    loading: img.getAttribute('loading'),
    filter: style.filter,
    hasRuntimeFilter: style.filter && style.filter !== 'none',
  };
});

for (const route of ROUTES) {
  await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle', timeout: 90000 });
  await injectAxe(page);
  const axe = await runAxe(page);
  const serious = axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  results.axe.push({
    route,
    violations: axe.violations.length,
    seriousCritical: serious.length,
    seriousIds: serious.map((v) => v.id),
  });
}

for (const vp of [
  { name: '1024', width: 1024, height: 900 },
  { name: '1440', width: 1440, height: 900 },
]) {
  await page.setViewportSize(vp);
  await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });
  const h = await page.evaluate(() => {
    const el = document.querySelector('.site-header');
    return el ? Math.round(el.getBoundingClientRect().height * 10) / 10 : null;
  });
  results.headerHeights.push({ viewport: vp.name, heightPx: h });
}

await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto(`${ORIGIN}/projects/`, { waitUntil: 'networkidle', timeout: 90000 });
results.reducedMotion = await page.evaluate(() => {
  const dash = getComputedStyle(document.querySelector('.engine-connector-active') || document.body);
  const pulse = document.querySelector('.engine-node-pulse');
  const pulseAnim = pulse ? getComputedStyle(pulse).animationName : 'none';
  return {
    prefersReducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    enginePulseAnimation: pulseAnim,
  };
});

await page.emulateMedia({ reducedMotion: 'no-preference' });
await page.evaluate((key) => localStorage.removeItem(key), CONSENT_KEY);
await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });
await page.reload({ waitUntil: 'networkidle', timeout: 90000 });
await page.waitForSelector('.cookie-consent-action', { timeout: 15000 });
results.cookieBackToTopSeparation = await page.evaluate(() => {
  const cookie = document.querySelector('.cookie-consent-sheet__surface');
  const btt = document.querySelector('.back-to-top');
  if (!cookie || !btt) return { ok: false, reason: 'missing elements' };
  const c = cookie.getBoundingClientRect();
  const b = btt.getBoundingClientRect();
  const overlap = !(c.top >= b.bottom || b.top >= c.bottom || c.left >= b.right || b.left >= c.right);
  return { ok: !overlap, cookieBottom: c.bottom, backToTopTop: b.top, gap: b.top - c.bottom };
});

await browser.close();

const outFile = path.join(OUT, 'verify-prompt-3.6.json');
fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
console.log('wrote', outFile);
