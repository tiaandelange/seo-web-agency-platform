/**
 * Prompt 3.6.1 — CLS, LCP, axe, overflow integration gate.
 *   ORIGIN=http://127.0.0.1:3010 node run-integration-gate-3.6.1.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'artifacts', 'integration-gate-3.6.1');
const SHOTS = path.join(OUT, 'screenshots');
fs.mkdirSync(SHOTS, { recursive: true });

const ORIGIN = (process.env.ORIGIN || 'http://127.0.0.1:3010').replace(/\/$/, '');
const CONSENT_KEY = 'koppie_analytics_consent';
const ROUTES_AXE = ['/', '/projects/', '/request-a-quote/', '/contact/'];

async function injectAxe(page) {
  await page.addScriptTag({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js',
  });
}

async function runAxe(page) {
  return page.evaluate(async () =>
    window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag22aa'] },
    }),
  );
}

async function measureCls(context, { reducedMotion = false, dismissCookie = false } = {}) {
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: reducedMotion ? 'reduce' : 'no-preference' });
  await page.addInitScript(
    ({ key, dismiss }) => {
      if (dismiss) {
        try {
          localStorage.setItem(key, 'granted');
        } catch {
          /* ignore */
        }
      }
    },
    { key: CONSENT_KEY, dismiss: dismissCookie },
  );
  await page.goto(`${ORIGIN}/`, { waitUntil: 'load', timeout: 90000 });

  const result = await page.evaluate(async () => {
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    return new Promise((resolve) => {
      const shifts = [];
      let cls = 0;
      const obs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.hadRecentInput) continue;
          cls += entry.value;
          for (const s of entry.sources || []) {
            const node = s.node;
            let selector = node?.tagName?.toLowerCase() || 'unknown';
            if (node?.id) selector = `#${node.id}`;
            else if (node?.className) {
              const cls0 = String(node.className).trim().split(/\s+/)[0];
              if (cls0) selector = `.${cls0}`;
            }
            shifts.push({
              value: Math.round(entry.value * 10000) / 10000,
              selector,
            });
          }
        }
      });
      obs.observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => {
        obs.disconnect();
        const largest = shifts.reduce((a, b) => ((b?.value || 0) > (a?.value || 0) ? b : a), null);
        resolve({ cls: Math.round(cls * 10000) / 10000, shiftCount: shifts.length, largest, shifts });
      }, 5000);
    });
  });
  await page.close();
  return result;
}

async function measureLcp(context) {
  await context.addInitScript(
    ({ key }) => {
      try {
        localStorage.setItem(key, 'granted');
      } catch {
        /* ignore */
      }
      window.__lcp = null;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) window.__lcp = Math.round(last.startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    },
    { key: CONSENT_KEY },
  );
  const page = await context.newPage();
  const t0 = Date.now();
  await page.goto(`${ORIGIN}/`, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2000);
  const observed = Date.now() - t0;
  const perf = await page.evaluate(() => {
    const img = document.querySelector('.home-hero-mountain-image');
    const style = img ? getComputedStyle(img) : null;
    return {
      lcpMs: window.__lcp,
      lcpElement: document.querySelector('.home-hero-mountain-image') ? 'home-hero-mountain-image' : null,
      img: img
        ? {
            currentSrc: img.currentSrc,
            fetchPriority: img.getAttribute('fetchpriority'),
            loading: img.getAttribute('loading'),
            filter: style?.filter,
            opacity: style?.opacity,
          }
        : null,
    };
  });
  await page.close();
  return { ...perf, observedMs: observed };
}

async function lcpImageMeta(page, width) {
  await page.setViewportSize({ width, height: width < 768 ? 844 : 940 });
  await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.evaluate((key) => localStorage.setItem(key, 'granted'), CONSENT_KEY);
  return page.evaluate((w) => {
    const img = document.querySelector('.home-hero-mountain-image');
    const style = getComputedStyle(img);
    return {
      viewport: w,
      currentSrc: img?.currentSrc,
      sources: [...document.querySelectorAll('picture source')].map((s) => ({
        media: s.media,
        srcset: s.srcset?.slice(0, 140),
      })),
      filter: style.filter,
      opacity: style.opacity,
      fetchPriority: img?.getAttribute('fetchpriority'),
      loading: img?.getAttribute('loading'),
      naturalWidth: img?.naturalWidth,
      naturalHeight: img?.naturalHeight,
    };
  }, width);
}

const browser = await chromium.launch({ headless: true });
const report = {
  generatedAt: new Date().toISOString(),
  origin: ORIGIN,
  lcpImage: {},
  axe: [],
  cls: { mobile: [], desktop: [], reducedMotion: null, firstVisitCookie: null },
  lcp: { mobile: [], desktop: [] },
  overflow: [],
  headerHeight: null,
};

for (const w of [360, 390, 412, 430, 768, 1024, 1350, 1440]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: w < 768 ? 844 : 940 },
    isMobile: w < 768,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.evaluate((key) => localStorage.setItem(key, 'granted'), CONSENT_KEY);
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  }));
  report.overflow.push({ viewport: w, ...overflow });
  await ctx.close();
}

for (const w of [360, 390, 412, 430, 1350]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: w < 768 ? 844 : 940 },
    isMobile: w < 768,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  report.lcpImage[String(w)] = await lcpImageMeta(page, w);
  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 1350, height: 940 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.evaluate((key) => localStorage.setItem(key, 'granted'), CONSENT_KEY);
  await page.screenshot({ path: path.join(SHOTS, 'hero-after-1350x940.png'), fullPage: false });
  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.evaluate((key) => localStorage.setItem(key, 'granted'), CONSENT_KEY);
  await page.screenshot({ path: path.join(SHOTS, 'hero-after-390x844.png'), fullPage: false });
  await ctx.close();
}

for (const route of ROUTES_AXE) {
  for (const vp of [
    { w: 390, h: 844, m: true },
    { w: 1350, h: 940, m: false },
  ]) {
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      isMobile: vp.m,
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle', timeout: 90000 });
    await page.evaluate((key) => localStorage.setItem(key, 'granted'), CONSENT_KEY);
    await injectAxe(page);
    const axe = await runAxe(page);
    const serious = axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    report.axe.push({
      route,
      viewport: vp.w,
      violations: axe.violations.length,
      seriousCritical: serious.length,
      serious: serious.map((v) => ({
        id: v.id,
        help: v.help,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          html: n.html?.slice(0, 180),
          data: n.any?.[0]?.data,
        })),
      })),
    });
    await ctx.close();
  }
}

for (let i = 0; i < 3; i++) {
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, deviceScaleFactor: 1 });
  const r = await measureCls(ctx, { dismissCookie: i > 0 });
  report.cls.mobile.push({ run: i + 1, returning: i > 0, ...r });
  await ctx.close();
}

for (let i = 0; i < 3; i++) {
  const ctx = await browser.newContext({ viewport: { width: 1350, height: 940 }, deviceScaleFactor: 1 });
  const r = await measureCls(ctx, { dismissCookie: true });
  report.cls.desktop.push({ run: i + 1, ...r });
  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, deviceScaleFactor: 1 });
  report.cls.reducedMotion = await measureCls(ctx, { reducedMotion: true, dismissCookie: true });
  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.evaluate((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, CONSENT_KEY);
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForSelector('.cookie-consent-action', { timeout: 15000 }).catch(() => {});
  report.cls.firstVisitCookie = await page.evaluate(async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return new Promise((resolve) => {
      let cls = 0;
      const shifts = [];
      const obs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.hadRecentInput) continue;
          cls += entry.value;
          shifts.push({ value: Math.round(entry.value * 10000) / 10000 });
        }
      });
      obs.observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => {
        obs.disconnect();
        resolve({ cls: Math.round(cls * 10000) / 10000, shifts });
      }, 3000);
    });
  });
  await ctx.close();
}

for (const vp of [
  { w: 390, h: 844, m: true, label: 'mobile' },
  { w: 1350, h: 940, m: false, label: 'desktop' },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    isMobile: vp.m,
    deviceScaleFactor: 1,
  });
  report.lcp[vp.label].push(await measureLcp(ctx));
  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });
  report.headerHeight = await page.evaluate(() => {
    const el = document.querySelector('.site-header');
    return el ? Math.round(el.getBoundingClientRect().height * 10) / 10 : null;
  });
  await ctx.close();
}

await browser.close();

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

report.summary = {
  axeSeriousTotal: report.axe.reduce((n, r) => n + r.seriousCritical, 0),
  clsMobileMedian: median(report.cls.mobile.map((r) => r.cls)),
  clsDesktopMedian: median(report.cls.desktop.map((r) => r.cls)),
  clsMobileMax: Math.max(...report.cls.mobile.map((r) => r.cls)),
  clsDesktopMax: Math.max(...report.cls.desktop.map((r) => r.cls)),
  overflowFails: report.overflow.filter((o) => o.horizontalOverflow).length,
  lcpMobileMs: report.lcp.mobile[0]?.lcpMs,
  lcpDesktopMs: report.lcp.desktop[0]?.lcpMs,
  mobileFilterNone: Object.values(report.lcpImage).every((m) => m.filter === 'none'),
};

const jsonPath = path.join(OUT, 'integration-gate-results.json');
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.summary, null, 2));
console.log('wrote', jsonPath);
