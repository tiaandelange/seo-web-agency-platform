import { chromium } from '../audits/visual-motion-2026-08-27/scripts/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';
import path from 'path';

const ORIGIN = process.env.ORIGIN || 'http://127.0.0.1:3008';
const OUT = path.resolve('audits/quote-page-after-2026-08-28');

const viewports = [
  { label: '360x800', width: 360, height: 800, mobile: true },
  { label: '390x844', width: 390, height: 844, mobile: true },
  { label: '768x1024', width: 768, height: 1024, mobile: false },
  { label: '1440x900', width: 1440, height: 900, mobile: false },
];

const prefilledPath =
  '/request-a-quote/?service_interest=website-redesign&budget_band=R20%E2%80%AF000%E2%80%93R40%E2%80%AF000&message=Enquiry+via+homepage+system+preview.+Business+type%3A+contractor.+Primary+need%3A+lead-gen.+Website+status%3A+outdated.+Recommended+shape%3A+Redesign+with+search+architecture.+Indicative+project+cost%3A+R22%E2%80%AF000%E2%80%93R45%E2%80%AF000+%28indicative%29.';

const states = [
  { label: 'default', path: '/request-a-quote/' },
  { label: 'prefilled', path: prefilledPath },
  { label: 'validation-error', path: '/request-a-quote/?error=validation' },
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.mobile,
  });
  await ctx.addInitScript(() => localStorage.setItem('koppie_analytics_consent', 'granted'));
  const page = await ctx.newPage();

  for (const st of states) {
    await page.goto(`${ORIGIN}${st.path}`, { waitUntil: 'networkidle', timeout: 90000 });
    const metrics = await page.evaluate(() => {
      const name = document.querySelector('#name_quote');
      const form = document.querySelector('.proposal-form');
      const hero = document.getElementById('hero');
      const inkBand = document.querySelector('.band-ink');
      const beforeAside = [...document.querySelectorAll('aside')].find((a) =>
        a.textContent?.includes('Before you submit'),
      );
      const y = (el) => (el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null);
      const h = (el) => (el ? Math.round(el.getBoundingClientRect().height) : null);
      const service = document.querySelector('#service_interest');
      const message = document.querySelector('#message_quote');
      return {
        pageH: document.documentElement.scrollHeight,
        overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        heroY: y(hero),
        heroH: h(hero),
        inkBandY: y(inkBand),
        inkBandH: h(inkBand),
        beforeAsideY: y(beforeAside),
        formY: y(form),
        nameY: y(name),
        nameIn700: y(name) !== null && y(name) <= 700,
        formIn900: y(form) !== null && y(form) <= 900,
        serviceValue: service?.value ?? null,
        messagePreview: (message?.value ?? '').slice(0, 90),
        budgetValue: document.querySelector('#budget_band')?.value ?? null,
      };
    });

    await page.screenshot({
      path: path.join(OUT, `${vp.label}-${st.label}.png`),
      fullPage: false,
    });

    console.log(JSON.stringify({ viewport: vp.label, state: st.label, ...metrics }));
  }

  await ctx.close();
}

await browser.close();
console.log(`Screenshots saved to ${OUT}`);
