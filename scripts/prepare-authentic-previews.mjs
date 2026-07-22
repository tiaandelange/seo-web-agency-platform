import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { scopeCss } from './scope-preview-css.mjs';

const root = process.cwd();

function extractDamtech() {
  const html = readFileSync(path.join(root, '.tmp-damtech.html'), 'utf8');
  const cssUrls = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+\.css)"/g)].map((m) => m[1]);
  const headerStart = html.indexOf('<header class="site-header');
  const headerEnd = html.indexOf('</header>', headerStart) + 9;
  const heroIdx = html.indexOf('home-hero', headerEnd);
  const heroSectionStart = html.lastIndexOf('<section', heroIdx);
  const heroEnd = html.indexOf('</section>', heroSectionStart) + 10;
  return {
    cssUrls: [...new Set(cssUrls)],
    header: html.slice(headerStart, headerEnd),
    hero: html.slice(heroSectionStart, heroEnd),
  };
}

function extractProplytic() {
  const raw = readFileSync(
    path.join(
      process.env.USERPROFILE ?? '',
      '.cursor/browser-logs/cdp-response-Runtime.evaluate-2026-07-22T09-08-58-352Z.json',
    ),
    'utf8',
  );
  const parsed = JSON.parse(JSON.parse(raw).result.value);
  return { header: parsed.header, hero: parsed.hero };
}

function sanitizeHtml(html, assetPrefix) {
  return html
    .replace(/\sdata-cursor-ref="[^"]*"/g, '')
    .replace(/\shref="[^"]*"/g, ' href="#" tabindex="-1"')
    .replace(/\saction="[^"]*"/g, '')
    .replace(/<button/g, '<span role="presentation"')
    .replace(/<\/button>/g, '</span>')
    .replace(/src="\/([^"]+)"/g, `src="${assetPrefix}/$1"`)
    .replace(/fixed inset-x-0 top-0/g, 'absolute inset-x-0 top-0');
}

async function download(url, outPath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed ${url}: ${response.status}`);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, Buffer.from(await response.arrayBuffer()));
}

async function main() {
  const damtech = extractDamtech();
  const proplytic = extractProplytic();

  const outDir = path.join(root, 'components/projects/project-preview');
  mkdirSync(outDir, { recursive: true });

  writeFileSync(
    path.join(outDir, 'damtech/damtech-source-markup.ts'),
    `// Extracted from https://www.dam-tech.co.za/ on 2026-07-22 (SSR homepage HTML)\nexport const DAMTECH_HEADER_HTML = ${JSON.stringify(sanitizeHtml(damtech.header, '/project-previews/damtech'))};\nexport const DAMTECH_HERO_HTML = ${JSON.stringify(sanitizeHtml(damtech.hero, '/project-previews/damtech'))};\n`,
  );

  writeFileSync(
    path.join(outDir, 'proplytic/proplytic-source-markup.ts'),
    `// Extracted from https://www.proplytic.co.za/ production homepage on 2026-07-22\nexport const PROPLYTIC_HEADER_HTML = ${JSON.stringify(sanitizeHtml(proplytic.header, '/project-previews/proplytic'))};\nexport const PROPLYTIC_HERO_HTML = ${JSON.stringify(sanitizeHtml(proplytic.hero, '/project-previews/proplytic'))};\n`,
  );

  const damtechCssUrl = `https://www.dam-tech.co.za${damtech.cssUrls[0]}`;
  await download(damtechCssUrl, path.join(root, '.tmp-damtech.css'));
  writeFileSync(
    path.join(outDir, 'damtech/damtech-preview.css'),
    scopeCss(readFileSync(path.join(root, '.tmp-damtech.css'), 'utf8'), 'damtechPreviewRoot'),
  );

  const proplyticIndexCss = readFileSync(path.join(root, '.tmp-proplytic-index.css'), 'utf8');
  const proplyticHeroCss = readFileSync(path.join(root, '.tmp-proplytic-hero.css'), 'utf8');
  writeFileSync(
    path.join(outDir, 'proplytic/proplytic-preview.css'),
    scopeCss(`${proplyticIndexCss}\n${proplyticHeroCss}`, 'proplyticPreviewRoot'),
  );

  const heroImgMatch = damtech.hero.match(/western-cape-dam-lining-reservoir-damtech[^"]+/);
  if (heroImgMatch) {
    await download(
      `https://www.dam-tech.co.za/_next/static/media/${heroImgMatch[0]}.webp`,
      path.join(root, 'public/project-previews/damtech/western-cape-dam-lining-reservoir-damtech.webp'),
    );
  }

  await download(
    'https://www.proplytic.co.za/proplytic_logo_600x200_nobg_light.png',
    path.join(root, 'public/project-previews/proplytic/proplytic_logo_600x200_nobg_light.png'),
  );
  await download(
    'https://www.proplytic.co.za/proplytic_logo_600x200_nobg.png',
    path.join(root, 'public/project-previews/proplytic/proplytic_logo_600x200_nobg.png'),
  );

  console.log('Generated authentic preview source files.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
