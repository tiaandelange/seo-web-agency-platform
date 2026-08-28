import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'artifacts', 'lighthouse');
const files = [
  'live_____mobile__pass1.report.json',
  'live_____mobile__pass2.report.json',
  'live_____mobile__pass3.report.json',
  'live_____desktop__pass1.report.json',
  'live_____desktop__pass2.report.json',
  'live_____desktop__pass3.report.json',
];

const table = [];
for (const f of files) {
  const r = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const a = r.audits;
  const bd = a['lcp-breakdown-insight'];
  const parts = {};
  for (const it of bd.details.items.find((i) => i.type === 'table')?.items || []) {
    parts[it.subpart] = Math.round(it.duration);
  }
  const node = bd.details.items.find((i) => i.type === 'node');
  const disc = a['lcp-discovery-insight'];
  const checklist = disc?.details?.items?.find((i) => i.type === 'checklist')?.items;
  const snip = node?.snippet || '';
  const attr = (name) => {
    const m = snip.match(new RegExp(`${name}="([^"]*)"`, 'i'));
    return m ? m[1] : null;
  };
  const net = a['network-requests']?.details?.items || [];
  const imgReqs = net
    .filter((n) => /hero-mobile|koppie-systems-website-development-hero|images%2Fhero|hero\.webp/i.test(n.url || ''))
    .map((n) => ({
      url: n.url.replace('https://www.koppiesystems.co.za', '').slice(0, 140),
      transferSize: n.transferSize,
      resourceSize: n.resourceSize,
      mime: n.mimeType,
      priority: n.priority,
      rendererStart: n.rendererStartTime != null ? Math.round(n.rendererStartTime) : null,
      networkEnd: n.networkEndTime != null ? Math.round(n.networkEndTime) : null,
    }));

  const preloadAudit = a['preload-lcp-image'] || a['prioritize-lcp-image'];

  table.push({
    pass: f.replace('live_____', '').replace('.report.json', ''),
    form: r.configSettings.formFactor,
    lcpMs: Math.round(a['largest-contentful-paint'].numericValue),
    cls: a['cumulative-layout-shift']?.numericValue,
    tbt: Math.round(a['total-blocking-time']?.numericValue || 0),
    selector: node?.selector,
    box: node?.boundingRect,
    parts,
    discovery: checklist
      ? {
          fetchPriorityHigh: checklist.priorityHinted?.value,
          discoverable: checklist.requestDiscoverable?.value,
          notLazy: checklist.eagerlyLoaded?.value,
        }
      : null,
    imgAttrs: {
      decoding: attr('decoding'),
      sizes: attr('sizes'),
      fetchpriority: attr('fetchpriority'),
      loading: attr('loading'),
      width: attr('width'),
      height: attr('height'),
      src: attr('src')?.slice(0, 100),
    },
    imgReqs,
    docTTFB: Math.round(a['server-response-time']?.numericValue || 0),
    rbi: (a['render-blocking-insight']?.details?.items || a['render-blocking-resources']?.details?.items || [])
      .slice(0, 5)
      .map((i) => ({
        url: String(i.url || i.source || '').replace('https://www.koppiesystems.co.za', '').slice(0, 90),
        wastedMs: i.wastedMs ?? i.wastedMs,
      })),
    preloadInsight: preloadAudit
      ? { id: preloadAudit.id, score: preloadAudit.score, items: preloadAudit.details?.items?.slice?.(0, 3) }
      : null,
  });
}

const out = path.join(dir, 'lcp-homepage-evidence.json');
fs.writeFileSync(out, JSON.stringify(table, null, 2));
console.log(JSON.stringify(table, null, 2));
console.log('wrote', out);
