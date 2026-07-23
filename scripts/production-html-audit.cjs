const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const outDir = path.join('docs', 'technical', 'production-crawl-artifacts');
fs.mkdirSync(outDir, { recursive: true });

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: { 'User-Agent': 'KoppieProductionAudit/1.0' },
      timeout: 30000,
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks).toString('utf8'),
          finalUrl: url,
        });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function countMatches(html, re) {
  const m = html.match(re);
  return m ? m.length : 0;
}

function extract(html, re) {
  const m = html.match(re);
  return m ? (m[1] || m[0]).trim() : '';
}

function csvEscape(v) {
  const s = String(v ?? '');
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

(async () => {
  const sitemapXml = fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8');
  const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const prodUrls = locs.map((loc) => {
    const u = new URL(loc);
    return 'https://www.koppiesystems.co.za' + u.pathname;
  });

  // Representative extras for 404 path guesses / thank-you
  const extras = [
    'https://www.koppiesystems.co.za/robots.txt',
    'https://www.koppiesystems.co.za/sitemap.xml',
  ];

  const rows = [];
  const titleMap = new Map();
  const descMap = new Map();
  const jsonLdSamples = {};

  for (const url of prodUrls) {
    let status = 0;
    let title = '';
    let description = '';
    let canonical = '';
    let robots = '';
    let h1Count = 0;
    let ogUrl = '';
    let errors = [];
    let indexable = false;
    let body = '';
    try {
      const res = await fetchText(url);
      status = res.status;
      body = res.body;
      title = extract(body, /<title[^>]*>([^<]*)<\/title>/i);
      description = extract(body, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
        || extract(body, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
      canonical = extract(body, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
        || extract(body, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
      robots = extract(body, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)
        || extract(body, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["']/i);
      ogUrl = extract(body, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']*)["']/i)
        || extract(body, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:url["']/i);
      h1Count = countMatches(body, /<h1\b/gi);

      const titleCount = countMatches(body, /<title\b/gi);
      const descCount = countMatches(body, /name=["']description["']/gi);
      const canonicalCount = countMatches(body, /rel=["']canonical["']/gi);

      if (status !== 200) errors.push('non_200');
      if (titleCount !== 1) errors.push('title_count_' + titleCount);
      if (descCount !== 1) errors.push('description_count_' + descCount);
      if (canonicalCount !== 1) errors.push('canonical_count_' + canonicalCount);
      if (!title) errors.push('missing_title');
      if (!description) errors.push('missing_description');
      if (!canonical) errors.push('missing_canonical');
      if (!ogUrl) errors.push('missing_og_url');
      if (canonical && canonical !== url) errors.push('canonical_not_self');
      if (canonical && !canonical.startsWith('https://www.koppiesystems.co.za')) errors.push('canonical_host_wrong');
      if (ogUrl && !ogUrl.startsWith('https://www.koppiesystems.co.za')) errors.push('og_url_host_wrong');
      if (/localhost/i.test(body)) errors.push('localhost_in_html');
      if (/vercel\.app/i.test(body)) errors.push('preview_domain_in_html');
      if (/staging/i.test(body) && /banner|preview|do not index/i.test(body)) errors.push('staging_banner');
      if (h1Count !== 1) errors.push('h1_count_' + h1Count);
      const mainCopy = body.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (mainCopy.length < 200) errors.push('thin_or_missing_main_copy');

      const robotsLower = robots.toLowerCase();
      const permitsIndex = robots ? !robotsLower.includes('noindex') : true;
      indexable = status === 200 && permitsIndex && !errors.includes('canonical_host_wrong');

      if (title) {
        if (!titleMap.has(title)) titleMap.set(title, []);
        titleMap.get(title).push(url);
      }
      if (description) {
        if (!descMap.has(description)) descMap.set(description, []);
        descMap.get(description).push(url);
      }

      // JSON-LD sample collection for representative types
      const ldBlocks = [...body.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
      if (ldBlocks.length) {
        const key = url.replace('https://www.koppiesystems.co.za', '') || '/';
        if (['/', '/services/business-websites/', '/solutions/', '/packages/', '/projects/', '/resources/', '/areas-served/pretoria/', '/contact/'].includes(key)
          || key.startsWith('/solutions/') && !jsonLdSamples.solution
          || key.startsWith('/packages/') && !jsonLdSamples.package
          || key.startsWith('/projects/') && key.split('/').filter(Boolean).length === 2 && !jsonLdSamples.project
          || key.startsWith('/resources/') && key.split('/').filter(Boolean).length === 2 && !jsonLdSamples.resource
        ) {
          // store later by type below
        }
        try {
          const parsed = ldBlocks.map((b) => JSON.parse(b));
          fs.writeFileSync(path.join(outDir, 'jsonld-' + key.replace(/\//g, '_').replace(/^_/, 'home') + '.json'), JSON.stringify(parsed, null, 2));
        } catch (e) {
          errors.push('jsonld_parse_error');
        }
      }
    } catch (e) {
      errors.push('fetch_error:' + e.message);
    }

    rows.push({
      url, status, title, description, canonical, robots, h1_count: h1Count, indexable, og_url: ogUrl, error: errors.join('|')
    });
    process.stdout.write('.');
  }

  // duplicate titles/descriptions
  for (const [t, urls] of titleMap) {
    if (urls.length > 1) {
      for (const row of rows) {
        if (urls.includes(row.url)) row.error = [row.error, 'duplicate_title'].filter(Boolean).join('|');
      }
    }
  }
  for (const [d, urls] of descMap) {
    if (urls.length > 1) {
      for (const row of rows) {
        if (urls.includes(row.url)) row.error = [row.error, 'duplicate_description'].filter(Boolean).join('|');
      }
    }
  }

  const header = ['url','status','title','description','canonical','robots','h1_count','indexable','error'];
  const csv = [header.join(',')].concat(rows.map(r => header.map(h => csvEscape(r[h])).join(','))).join('\n');
  fs.writeFileSync(path.join(outDir, 'production-html-audit.csv'), csv);

  const summary = {
    total: rows.length,
    status200: rows.filter(r => r.status === 200).length,
    withErrors: rows.filter(r => r.error).length,
    indexableTrue: rows.filter(r => r.indexable).length,
    localhostCanonical: rows.filter(r => /localhost/i.test(r.canonical)).length,
    wwwCanonical: rows.filter(r => /^https:\/\/www\.koppiesystems\.co\.za/.test(r.canonical)).length,
    noindex: rows.filter(r => /noindex/i.test(r.robots)).length,
    errorCounts: {},
  };
  for (const r of rows) {
    for (const e of (r.error || '').split('|').filter(Boolean)) {
      summary.errorCounts[e] = (summary.errorCounts[e] || 0) + 1;
    }
  }
  fs.writeFileSync(path.join(outDir, 'production-html-summary.json'), JSON.stringify(summary, null, 2));
  console.log('\n' + JSON.stringify(summary, null, 2));
  console.log('CSV:', path.join(outDir, 'production-html-audit.csv'));
})().catch((e) => { console.error(e); process.exit(1); });
