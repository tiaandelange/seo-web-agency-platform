/**
 * Capture portfolio screenshots → public/images/work/*.webp
 * Damtech + Proplytic from live sites; wedding from local Wedding_site.
 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'images', 'work');
const tmpDir = path.join(root, 'docs', 'technical', 'production-crawl-artifacts', 'screenshot-raw');

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

async function loadSharp() {
  try {
    return require('sharp');
  } catch {
    // Next bundles sharp under its tree in some installs
    const nested = path.join(root, 'node_modules', 'next', 'node_modules', 'sharp');
    return require(nested);
  }
}

function startStaticServer(dir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = path.join(dir, urlPath === '/' ? 'index.html' : urlPath);
      if (!filePath.startsWith(dir)) {
        res.writeHead(403);
        res.end();
        return;
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('not found');
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const types = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'application/javascript',
          '.webp': 'image/webp',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.svg': 'image/svg+xml',
        };
        res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, origin: `http://127.0.0.1:${port}` });
    });
  });
}

async function capture(page, url, viewport, outPng) {
  await page.setViewportSize(viewport);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(1200);
  // Hide cookie/consent banners that commonly pollute screenshots
  await page.evaluate(() => {
    const selectors = [
      '[id*="cookie" i]',
      '[class*="cookie" i]',
      '[id*="consent" i]',
      '[class*="consent" i]',
      '#onetrust-banner-sdk',
      '.cc-window',
    ];
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        el.style.setProperty('display', 'none', 'important');
      });
    }
  }).catch(() => {});
  await page.screenshot({ path: outPng, fullPage: false, type: 'png' });
}

async function toWebp(sharp, inputPng, outputWebp) {
  await sharp(inputPng)
    .webp({ quality: 82, effort: 5 })
    .toFile(outputWebp);
  // strip via rebuild — sharp webp output has minimal metadata by default
  const meta = await sharp(outputWebp).metadata();
  return meta;
}

(async () => {
  const sharp = await loadSharp();
  const weddingDir = path.join('C:/Users/delanget/Documents/GitHub/Wedding_site');
  const { server, origin: weddingOrigin } = await startStaticServer(weddingDir);

  const jobs = [
    {
      id: 'damtech',
      url: 'https://www.dam-tech.co.za/',
      desktop: { width: 1440, height: 900 },
      mobile: { width: 390, height: 844 },
    },
    {
      id: 'proplytic',
      url: 'https://www.proplytic.co.za/',
      desktop: { width: 1440, height: 900 },
      mobile: { width: 390, height: 844 },
    },
    {
      id: 'wedding',
      url: `${weddingOrigin}/`,
      desktop: { width: 1440, height: 900 },
      mobile: { width: 390, height: 844 },
    },
  ];

  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const job of jobs) {
      const context = await browser.newContext({
        userAgent: 'KoppieScreenshotCapture/1.0',
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();

      for (const mode of ['desktop', 'mobile']) {
        const vp = job[mode];
        const png = path.join(tmpDir, `${job.id}-${mode}.png`);
        const webp = path.join(outDir, `${job.id}-${mode}.webp`);
        console.log(`Capturing ${job.id} ${mode}…`);
        await capture(page, job.url, vp, png);
        const meta = await toWebp(sharp, png, webp);
        const stat = fs.statSync(webp);
        results.push({
          id: job.id,
          mode,
          file: path.relative(root, webp).replace(/\\/g, '/'),
          width: meta.width,
          height: meta.height,
          bytes: stat.size,
        });
        console.log(`  → ${webp} (${meta.width}x${meta.height}, ${stat.size} bytes)`);
      }
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  fs.writeFileSync(
    path.join(tmpDir, 'capture-manifest.json'),
    JSON.stringify({ capturedAt: new Date().toISOString(), results }, null, 2),
  );
  console.log('Done.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
