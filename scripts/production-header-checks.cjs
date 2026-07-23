const https = require('https');
const fs = require('fs');

function head(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'GET', headers: { 'User-Agent': 'KoppieProductionAudit/1.0' } }, (res) => {
      resolve({ status: res.statusCode, headers: res.headers, location: res.headers.location || '' });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  const checks = [
    'https://koppiesystems.com/',
    'https://www.koppiesystems.com/',
    'https://www.koppiesystems.co.za/',
  ];
  const out = {};
  for (const u of checks) {
    try {
      out[u] = await head(u);
    } catch (e) {
      out[u] = { error: String(e) };
    }
  }
  fs.writeFileSync('docs/technical/production-crawl-artifacts/header-checks.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
})();
