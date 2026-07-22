import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { scopeCss, stripPreviewFontFaces } from './scope-preview-css.mjs';

const root = process.cwd();

async function download(url, outPath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed ${url}: ${response.status}`);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, Buffer.from(await response.arrayBuffer()));
}

async function fetchDamtechCssUrls() {
  const html = await (await fetch('https://www.dam-tech.co.za/')).text();
  const chunkCss = [...html.matchAll(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/g)].map((m) => m[1]);
  const legacyCss = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+\.css)"/g)].map((m) => m[1]);
  return [...new Set([...chunkCss, ...legacyCss])];
}

async function fetchProplyticCss() {
  const html = await (await fetch('https://www.proplytic.co.za/')).text();
  const urls = [...new Set([...html.matchAll(/href="(\/assets\/[^"]+\.css)"/g)].map((m) => m[1]))];
  if (urls.length === 0) {
    throw new Error('No Proplytic CSS bundles found');
  }
  const chunks = await Promise.all(
    urls.map(async (u) => (await fetch(`https://www.proplytic.co.za${u}`)).text()),
  );
  return chunks.join('\n');
}

function fixDamtechMarkup() {
  const markupPath = path.join(root, 'components/projects/project-preview/damtech/damtech-source-markup.ts');
  let markup = readFileSync(markupPath, 'utf8');
  markup = markup.replace(
    /src=\\"[^\\"]*western-cape-dam-lining-reservoir-damtech[^\\"]*\\"/,
    'src=\\"/project-previews/damtech/western-cape-dam-lining-reservoir-damtech.webp\\"',
  );
  markup = markup.replace(/ srcset=\\"[^\\"]*\\"/gi, '');
  writeFileSync(markupPath, markup);
}

function convertOverrides(css) {
  return css
    .replace(/:global\(([^)]+)\)/g, '$1')
    // Never keep remote @import — mid-file @import is invalid CSS and caused
    // Next.js Runtime Error "[object Event]" when preview stylesheets loaded.
    .replace(/@import\s+url\([^)]+\)\s*;?/gi, '');
}

function buildPreviewCss(scopedCss, id) {
  const overridesPath = path.join(
    root,
    `components/projects/project-preview/${id}/${id}-preview-overrides.module.css`,
  );
  let overrides = '';
  try {
    overrides = convertOverrides(readFileSync(overridesPath, 'utf8'));
  } catch {
    // optional overrides file
  }
  return `/* ${id} authentic preview — plain scoped CSS */\n${scopedCss}\n\n/* Desktop preview overrides */\n${overrides}`;
}

async function main() {
  const damtechUrls = await fetchDamtechCssUrls();
  if (damtechUrls.length === 0) throw new Error('No Damtech CSS bundles found');

  const damtechCssChunks = await Promise.all(
    damtechUrls.map(async (u) => (await fetch(`https://www.dam-tech.co.za${u}`)).text()),
  );
  const damtechCss = damtechCssChunks.join('\n');

  writeFileSync(
    path.join(root, 'components/projects/project-preview/damtech/damtech-preview.css'),
    buildPreviewCss(stripPreviewFontFaces(scopeCss(damtechCss, 'damtechPreviewRoot')), 'damtech'),
  );

  const proplyticCss = await fetchProplyticCss();
  writeFileSync(
    path.join(root, 'components/projects/project-preview/proplytic/proplytic-preview.css'),
    buildPreviewCss(stripPreviewFontFaces(scopeCss(proplyticCss, 'proplyticPreviewRoot')), 'proplytic'),
  );

  fixDamtechMarkup();

  const heroMatch = readFileSync(
    path.join(root, 'components/projects/project-preview/damtech/damtech-source-markup.ts'),
    'utf8',
  ).match(/western-cape-dam-lining-reservoir-damtech(?:\.[a-z0-9]+)?(?=\.webp|")/);
  if (heroMatch) {
    const base = heroMatch[0].includes('.') ? heroMatch[0] : `${heroMatch[0]}.1jkmd7twhqawk`;
    const out = path.join(root, 'public/project-previews/damtech/western-cape-dam-lining-reservoir-damtech.webp');
    try {
      await download(`https://www.dam-tech.co.za/_next/static/media/${base}.webp`, out);
    } catch {
      // keep existing asset when live media hash changes
    }
  }

  console.log(`Regenerated preview CSS (${damtechUrls.length} Damtech bundles).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
