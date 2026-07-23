/**
 * Build horizontal + mono logo variants from the Figma symbol master.
 * Also syncs app/icon.svg + app/apple-icon.svg. No PNG outputs.
 * Run: node scripts/build-logo-variants.cjs
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const brandDir = path.join(root, 'public', 'brand');
const appDir = path.join(root, 'app');
const symbolPath = path.join(brandDir, 'koppie-logo-symbol.svg');
const symbol = fs.readFileSync(symbolPath, 'utf8');

function stripChrome(svg) {
  return svg
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/\srole="img"/i, '')
    .replace(/\saria-label="[^"]*"/i, '')
    .replace(/\swidth="400"/i, '')
    .replace(/\sheight="400"/i, '');
}

const inner = stripChrome(symbol)
  .replace(/^<svg[^>]*>/i, '')
  .replace(/<\/svg>\s*$/i, '')
  .trim();

const horizontal = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" fill="none" role="img" aria-label="Koppie Systems">
  <title>Koppie Systems</title>
  <svg x="0" y="0" width="64" height="64" viewBox="0 0 400 400" aria-hidden="true">
${inner}
  </svg>
  <g font-family="Manrope, Inter, Segoe UI, Helvetica, Arial, sans-serif">
    <text x="76" y="30" fill="#14242B" font-size="22" font-weight="700" letter-spacing="-0.02em">Koppie</text>
    <text x="76" y="48" fill="#1E6F6D" font-size="11" font-weight="600" letter-spacing="0.16em">SYSTEMS</text>
  </g>
</svg>
`;

function monoSymbol(kind) {
  const field = kind === 'white' ? '#FFFFFF' : '#14242B';
  const cut = kind === 'white' ? '#14242B' : '#FFFFFF';
  const metal = kind === 'white' ? '#FFFFFF' : '#14242B';
  let out = symbol;
  out = out.replace(/fill="url\(#ks-mark-paint[0-9]+\)"/g, `fill="${metal}"`);
  out = out.replace(/fill="#D78359"/g, `fill="${metal}"`);
  out = out.replace(/fill="#A25838"/g, `fill="${metal}"`);
  out = out.replace(/fill="#14242B"/g, `fill="${cut}"`);
  out = out.replace(
    /<circle cx="200" cy="200" r="200" fill="[^"]+"\/>/,
    `<circle cx="200" cy="200" r="200" fill="${field}"/>`,
  );
  out = out.replace(/<defs>[\s\S]*?<\/defs>/, '');
  out = out.replace(/<!--[\s\S]*?-->/, `<!-- Monochrome ${kind} variant from Figma master. -->`);
  out = out.replace('<title>Koppie Systems</title>', `<title>Koppie Systems (${kind})</title>`);
  return out;
}

function monoHorizontal(kind) {
  const text = kind === 'white' ? '#FFFFFF' : '#14242B';
  const systems = kind === 'white' ? '#E8DFC9' : '#1E6F6D';
  const mark = monoSymbol(kind)
    .replace(/^<svg[^>]*>/i, '')
    .replace(/<\/svg>\s*$/i, '')
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/\srole="img"/i, '')
    .replace(/\saria-label="[^"]*"/i, '')
    .replace(/\swidth="400"/i, '')
    .replace(/\sheight="400"/i, '')
    .trim();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" fill="none" role="img" aria-label="Koppie Systems">
  <title>Koppie Systems (${kind})</title>
  <svg x="0" y="0" width="64" height="64" viewBox="0 0 400 400" aria-hidden="true">
${mark}
  </svg>
  <g font-family="Manrope, Inter, Segoe UI, Helvetica, Arial, sans-serif">
    <text x="76" y="30" fill="${text}" font-size="22" font-weight="700" letter-spacing="-0.02em">Koppie</text>
    <text x="76" y="48" fill="${systems}" font-size="11" font-weight="600" letter-spacing="0.16em">SYSTEMS</text>
  </g>
</svg>
`;
}

const favicon = symbol.replace(
  /<!--[\s\S]*?-->/,
  '<!-- App favicon / apple icon. Figma mark, field theme ink #14242B. -->',
);

function buildNoBgSymbol(source) {
  const cutouts = [];
  let art = source
    .replace(/<circle\b[^>]*\/?>\s*/i, '')
    .replace(/<!--[\s\S]*?-->\s*/, '')
    .replace(/<path d="([^"]+)" fill="#14242B"\s*\/>/g, (_, d) => {
      cutouts.push(d);
      return '';
    })
    .replace(/ks-mark-paint/g, 'ks-nobg-paint');

  const defsMatch = art.match(/<defs>[\s\S]*?<\/defs>/);
  const defs = defsMatch ? defsMatch[0] : '';
  art = art.replace(/<defs>[\s\S]*?<\/defs>\s*/, '');

  const inner = art
    .replace(/^<svg[^>]*>/i, '')
    .replace(/<\/svg>\s*$/i, '')
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .trim();

  const maskPaths = cutouts.map((d) => `    <path d="${d}" fill="#000"/>`).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none" role="img" aria-label="Koppie Systems">
  <title>Koppie Systems</title>
  <!-- Transparent mark: circular field removed; former navy cutouts are holes. -->
  <defs>
    <mask id="ks-nobg-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">
      <rect width="400" height="400" fill="#fff"/>
${maskPaths}
    </mask>
${defs.replace(/^<defs>/, '').replace(/<\/defs>$/, '')}
  </defs>
  <g mask="url(#ks-nobg-mask)">
${inner}
  </g>
</svg>
`;
}

fs.writeFileSync(path.join(brandDir, 'koppie-logo-horizontal.svg'), horizontal);
fs.writeFileSync(path.join(brandDir, 'koppie-logo-white.svg'), monoHorizontal('white'));
fs.writeFileSync(path.join(brandDir, 'koppie-logo-dark.svg'), monoHorizontal('dark'));
fs.writeFileSync(path.join(brandDir, 'koppie-logo-symbol-nobg.svg'), buildNoBgSymbol(symbol));
fs.writeFileSync(path.join(brandDir, 'favicon.svg'), favicon);
fs.writeFileSync(path.join(appDir, 'icon.svg'), favicon);
fs.writeFileSync(path.join(appDir, 'apple-icon.svg'), favicon);

console.log('Wrote horizontal, white, dark, nobg, favicon, app/icon.svg, app/apple-icon.svg');
