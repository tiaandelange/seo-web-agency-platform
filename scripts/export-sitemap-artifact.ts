/**
 * One-shot: refresh docs/technical/production-crawl-artifacts/sitemap.xml
 * from the live route registry (same source as app/sitemap.ts).
 */
import fs from 'node:fs';
import path from 'node:path';
import sitemap from '../app/sitemap';

const OUT = path.join(
  process.cwd(),
  'docs/technical/production-crawl-artifacts/sitemap.xml',
);

const productionOrigin = 'https://www.koppiesystems.co.za';

function toLastmod(value: string | Date | undefined): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

const entries = sitemap()
  .map((entry) => {
    const url = String(entry.url).replace(/^https?:\/\/[^/]+/, productionOrigin);
    return { url, lastModified: toLastmod(entry.lastModified) };
  })
  .sort((a, b) => a.url.localeCompare(b.url));

const body = entries
  .map(
    (e) =>
      `<url>\n<loc>${e.url}</loc>\n<lastmod>${e.lastModified}</lastmod>\n</url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(OUT, xml, 'utf8');
console.log(`Wrote ${entries.length} URLs to ${OUT}`);
