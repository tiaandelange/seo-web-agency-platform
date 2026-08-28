/**
 * Homepage-only Lighthouse (Prompt 3.2.1 verify): 3 mobile + 3 corrected desktop.
 * Reuses the same form-factor / screen settings as lighthouse.mjs.
 *
 *   ORIGIN=http://127.0.0.1:3010 LABEL=local-lcp node lighthouse-home-lcp.mjs
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'artifacts', 'lighthouse');
const TMP = path.resolve(__dirname, '..', 'artifacts', 'tmp');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
process.env.TEMP = TMP;
process.env.TMP = TMP;
process.env.TMPDIR = TMP;

const ORIGIN = (process.env.ORIGIN || 'http://127.0.0.1:3010').replace(/\/$/, '');
const LABEL = (process.env.LABEL || 'local-lcp').replace(/[^\w.-]+/g, '-');
const DESKTOP = { width: 1350, height: 940, deviceScaleFactor: 1 };
const MOBILE = { width: 412, height: 823, deviceScaleFactor: 1.75 };
const PASSES = 3;

function chromeUserDataDir(formFactor, pass) {
  return path.join(TMP, `chrome-${LABEL}-${formFactor}-p${pass}-${Date.now()}`);
}

function buildArgs(url, formFactor, outBase, pass) {
  const isDesktop = formFactor === 'desktop';
  const screen = isDesktop ? DESKTOP : MOBILE;
  return [
    'lighthouse',
    url,
    '--quiet',
    `--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage --user-data-dir=${chromeUserDataDir(formFactor, pass)}`,
    `--output-path=${outBase}`,
    '--output=json',
    '--output=html',
    `--form-factor=${formFactor}`,
    `--screenEmulation.mobile=${isDesktop ? 'false' : 'true'}`,
    `--screenEmulation.width=${screen.width}`,
    `--screenEmulation.height=${screen.height}`,
    `--screenEmulation.deviceScaleFactor=${screen.deviceScaleFactor}`,
    '--screenEmulation.disabled=false',
    '--only-categories=performance,accessibility,best-practices,seo',
  ];
}

function runCli(args) {
  return new Promise((resolve) => {
    const child = spawn('npx', ['--yes', ...args], { stdio: 'inherit', shell: true });
    child.on('exit', (code, signal) => resolve({ code: code ?? 1, signal }));
  });
}

function median(nums) {
  const vals = nums.filter((n) => typeof n === 'number' && Number.isFinite(n)).sort((a, b) => a - b);
  if (!vals.length) return null;
  const mid = Math.floor(vals.length / 2);
  return vals.length % 2 ? vals[mid] : (vals[mid - 1] + vals[mid]) / 2;
}

function extract(report, meta) {
  const cats = report.categories || {};
  const a = report.audits || {};
  const bd = a['lcp-breakdown-insight'];
  const parts = {};
  for (const it of bd?.details?.items?.find((i) => i.type === 'table')?.items || []) {
    parts[it.subpart] = Math.round(it.duration);
  }
  const node = bd?.details?.items?.find((i) => i.type === 'node');
  const checklist = a['lcp-discovery-insight']?.details?.items?.find((i) => i.type === 'checklist')?.items;
  return {
    ...meta,
    performance: cats.performance?.score ?? null,
    accessibility: cats.accessibility?.score ?? null,
    lcp: a['largest-contentful-paint']?.numericValue ?? null,
    cls: a['cumulative-layout-shift']?.numericValue ?? null,
    tbt: a['total-blocking-time']?.numericValue ?? null,
    totalByteWeight: a['total-byte-weight']?.numericValue ?? null,
    formFactor: report.configSettings?.formFactor,
    screen: report.configSettings?.screenEmulation,
    lcpSelector: node?.selector ?? null,
    lcpParts: parts,
    discovery: checklist
      ? {
          fetchPriorityHigh: checklist.priorityHinted?.value,
          discoverable: checklist.requestDiscoverable?.value,
          notLazy: checklist.eagerlyLoaded?.value,
        }
      : null,
    fetchpriorityAttr: (node?.snippet || '').includes('fetchpriority="high"'),
  };
}

const passes = [];
for (const form of ['mobile', 'desktop']) {
  for (let pass = 1; pass <= PASSES; pass++) {
    const outBase = path.join(OUT, `${LABEL}_____${form}__pass${pass}`);
    const url = `${ORIGIN}/`;
    console.log(`\nLighthouse ${form} pass ${pass}/${PASSES} ${url}`);
    await runCli(buildArgs(url, form, outBase, pass));
    const file = `${outBase}.report.json`;
    if (!fs.existsSync(file)) {
      console.error('Missing report', file);
      process.exit(1);
    }
    const report = JSON.parse(fs.readFileSync(file, 'utf8'));
    const emu = report.configSettings?.screenEmulation;
    if (form === 'desktop' && (emu?.mobile !== false || emu?.width !== 1350 || emu?.height !== 940)) {
      console.error('Bad desktop emulation', emu);
      process.exit(1);
    }
    const row = extract(report, { form, pass, file: path.basename(file) });
    passes.push(row);
    console.log(
      `  perf=${row.performance} lcp=${Math.round(row.lcp)}ms cls=${row.cls} fetchP=${row.discovery?.fetchPriorityHigh} attr=${row.fetchpriorityAttr}`,
    );
  }
}

function agg(form) {
  const rows = passes.filter((p) => p.form === form);
  return {
    form,
    performance: median(rows.map((r) => r.performance)),
    lcp: median(rows.map((r) => r.lcp)),
    cls: median(rows.map((r) => r.cls)),
    tbt: median(rows.map((r) => r.tbt)),
    totalByteWeight: median(rows.map((r) => r.totalByteWeight)),
    fetchPriorityHighAll: rows.every((r) => r.discovery?.fetchPriorityHigh === true),
    passes: rows,
  };
}

const summary = {
  generatedAt: new Date().toISOString(),
  origin: ORIGIN,
  label: LABEL,
  liveBaseline: {
    mobile: { performance: 0.87, lcp: 3840, cls: 0, tbt: 39, bytes: 561000 },
    desktop: { performance: 0.64, lcp: 3580, cls: 0.0006, tbt: 116, bytes: 723000 },
  },
  mobile: agg('mobile'),
  desktop: agg('desktop'),
};

const outFile = path.join(OUT, `${LABEL}-home-lcp-summary.json`);
fs.writeFileSync(outFile, JSON.stringify(summary, null, 2));
console.log('\n=== MEDIANS ===');
console.log(JSON.stringify({ mobile: summary.mobile, desktop: summary.desktop }, null, 2));
console.log('wrote', outFile);

const mImp = (summary.liveBaseline.mobile.lcp - summary.mobile.lcp) / summary.liveBaseline.mobile.lcp;
const dImp = (summary.liveBaseline.desktop.lcp - summary.desktop.lcp) / summary.liveBaseline.desktop.lcp;
console.log(`mobile LCP improvement vs live baseline: ${(mImp * 100).toFixed(1)}%`);
console.log(`desktop LCP improvement vs live baseline: ${(dImp * 100).toFixed(1)}%`);
