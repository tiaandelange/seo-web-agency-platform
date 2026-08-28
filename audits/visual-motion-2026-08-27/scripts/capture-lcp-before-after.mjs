/**
 * Capture live (before) and local (after) homepage hero shots for Prompt 3.2.1.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'artifacts', 'screenshots', 'lcp-3.2.1');
fs.mkdirSync(OUT, { recursive: true });

const LIVE = 'https://www.koppiesystems.co.za';
const LOCAL = process.env.ORIGIN || 'http://127.0.0.1:3010';

const VIEWS = [
  { name: '390x844', width: 390, height: 844 },
  { name: '1350x940', width: 1350, height: 940 },
];

async function shoot(browser, origin, prefix) {
  for (const vp of VIEWS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      try {
        localStorage.setItem('koppie_analytics_consent', 'denied');
      } catch {
        /* ignore */
      }
    });
    await page.goto(`${origin}/`, { waitUntil: 'networkidle', timeout: 90000 });
    await page.waitForSelector('.home-hero');
    await page.waitForTimeout(600);
    await page.locator('#hero').screenshot({ path: path.join(OUT, `${prefix}-hero-${vp.name}.png`) });
    await page.screenshot({ path: path.join(OUT, `${prefix}-viewport-${vp.name}.png`) });
    await context.close();
  }
}

const browser = await chromium.launch({ headless: true });
await shoot(browser, LIVE, 'before');
await shoot(browser, LOCAL, 'after');
await browser.close();
console.log('wrote before/after hero shots to', OUT);
