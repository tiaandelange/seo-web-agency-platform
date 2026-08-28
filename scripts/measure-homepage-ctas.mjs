import { chromium } from '../audits/visual-motion-2026-08-27/scripts/node_modules/playwright/index.mjs';

const ORIGIN = process.env.ORIGIN || 'http://127.0.0.1:3006';

const viewports = [
  { label: 'desktop', width: 1440, height: 900, mobile: false },
  { label: 'mobile', width: 390, height: 844, mobile: true },
];

function bucket(type, el, text, href, cls) {
  if (type === 'SELECT' || type === 'INPUT') return 'interactive-tool';
  const c = cls || '';
  if (
    c.includes('home-hero-cta-primary') ||
    c.includes('home-enquiry-cta-primary') ||
    c.includes('bg-cta') ||
    (href && href.includes('/request-a-quote') && c.includes('font-semibold'))
  ) {
    return 'primary-action';
  }
  if (c.includes('home-action-ledger__primary')) return 'ledger-primary';
  if (c.includes('home-hero-cta-secondary') || c.includes('home-enquiry-cta-secondary')) {
    return 'secondary-action';
  }
  if (text.includes('Inspect the case study')) return 'row-action';
  if (text.endsWith('→') || text.includes(' service→') || text.includes(' service →')) {
    return 'path-action';
  }
  if (href && (href.includes('/request-a-quote') || href.includes('/seo-audit/intake'))) {
    return 'primary-action';
  }
  return 'informational-link';
}

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.mobile,
  });
  await ctx.addInitScript(() => localStorage.setItem('koppie_analytics_consent', 'granted'));
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle', timeout: 90000 });

  const data = await page.evaluate((vh) => {
    const root = document.querySelector('main') || document.body;
    const pageH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const items = [];
    const seen = new Set();

    for (const el of root.querySelectorAll('a, button, select')) {
      const rect = el.getBoundingClientRect();
      const text = (el.textContent || el.getAttribute('aria-label') || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 90);
      if (!text || rect.width < 8 || rect.height < 8) continue;
      const y = Math.round(rect.top + window.scrollY);
      const href = el.getAttribute('href') || '';
      const key = `${y}|${text}|${href}|${el.tagName}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({
        y,
        yVp: Math.round((y / vh) * 10) / 10,
        text,
        href,
        tag: el.tagName,
        cls: (el.className?.toString() || '').slice(0, 120),
      });
    }

    const headerCta = document.querySelector('header a[href*="request-a-quote"]');
    const headerY = headerCta
      ? Math.round(headerCta.getBoundingClientRect().top + window.scrollY)
      : null;

    return { pageH, vh, headerY, items: items.sort((a, b) => a.y - b.y) };
  }, vp.height);

  console.log(`\n=== ${vp.label.toUpperCase()} ${vp.width}×${vp.height} | page ${data.pageH}px (${(data.pageH / vp.height).toFixed(1)} viewports) ===`);
  console.log(`Global chrome: header "Request a Proposal" y≈${data.headerY}px (sticky)`);

  const actions = [];
  for (const it of data.items) {
    const kind = bucket(it.tag, null, it.text, it.href, it.cls);
    const row = { ...it, kind };
    if (kind !== 'informational-link' || it.text.includes('→') || it.href.includes('request-a-quote')) {
      actions.push(row);
    }
  }

  console.log('\n--- Meaningful actions & path CTAs (by vertical position) ---');
  for (const it of actions) {
    console.log(
      `y=${String(it.y).padStart(5)} (${String(it.yVp).padStart(5)}vp) [${it.kind.padEnd(18)}] ${it.text}${it.href ? ` → ${it.href}` : ''}`,
    );
  }

  console.log('\n--- All informational links (by vertical position) ---');
  for (const it of data.items) {
    const kind = bucket(it.tag, null, it.text, it.href, it.cls);
    if (kind === 'informational-link' && !it.text.includes('→')) {
      console.log(`y=${String(it.y).padStart(5)} (${String(it.yVp).padStart(5)}vp) ${it.text} → ${it.href}`);
    }
  }

  // Gap analysis: distance between primary/secondary/row/path actions
  const meaningful = data.items
    .map((it) => ({ ...it, kind: bucket(it.tag, null, it.text, it.href, it.cls) }))
    .filter((it) =>
      ['primary-action', 'secondary-action', 'row-action', 'path-action', 'ledger-primary', 'interactive-tool'].includes(
        it.kind,
      ),
    );

  console.log('\n--- Span gaps between meaningful actions ---');
  for (let i = 1; i < meaningful.length; i++) {
    const gap = meaningful[i].y - meaningful[i - 1].y;
    const gapVp = Math.round((gap / vp.height) * 10) / 10;
    if (gapVp > 3.5) {
      console.log(
        `GAP ${gapVp}vp (${gap}px): after "${meaningful[i - 1].text.slice(0, 50)}" → before "${meaningful[i].text.slice(0, 50)}"`,
      );
    }
  }

  const sections = await page.evaluate((vh) => {
    const els = [
      ...document.querySelectorAll(
        '#hero, #enquiry-system, #website-prices, #selected-work, #digital-solutions, main section[id], main > section',
      ),
    ];
    const uniq = [];
    const seen = new Set();
    for (const el of els) {
      const key = el.id || el.className?.toString().slice(0, 30);
      if (seen.has(key)) continue;
      seen.add(key);
      const rect = el.getBoundingClientRect();
      uniq.push({
        id: el.id || '(section)',
        y: Math.round(rect.top + window.scrollY),
        h: Math.round(rect.height),
        label: (el.querySelector('h1, h2, h3')?.textContent || '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 70),
      });
    }
    return uniq.filter((s) => s.h > 80).sort((a, b) => a.y - b.y);
  }, vp.height);

  const inspect = await page.evaluate((vh) =>
    [...document.querySelectorAll('a')]
      .filter((a) => a.textContent?.includes('Inspect the case study'))
      .map((a) => ({
        y: Math.round(a.getBoundingClientRect().top + window.scrollY),
        yVp: Math.round(((a.getBoundingClientRect().top + window.scrollY) / vh) * 10) / 10,
        href: a.getAttribute('href'),
      })),
  vp.height);

  console.log('\nSection landmarks:');
  for (const s of sections) {
    console.log(`  y=${String(s.y).padStart(5)} h=${String(s.h).padStart(5)} [${s.id}] ${s.label}`);
  }
  console.log('Proof row CTAs (Inspect the case study):', inspect);

  await ctx.close();
}

await browser.close();
