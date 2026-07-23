import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { scopeCss } from './scope-preview-css.mjs';

const root = process.cwd();
const html = readFileSync(path.join(root, '.tmp-damtech-local.html'), 'utf8');
const cssUrls = [
  ...html.matchAll(/href="(\/_next\/static\/(?:css|chunks)\/[^"]+\.css)"/g),
].map((m) => m[1]);
const headerStart = html.indexOf('<header');
const headerEnd = html.indexOf('</header>', headerStart) + 9;
const heroIdx = html.indexOf('home-hero', headerEnd);
const heroSectionStart = html.lastIndexOf('<section', heroIdx);
const heroEnd = html.indexOf('</section>', heroSectionStart) + 10;
const header = html.slice(headerStart, headerEnd);
const hero = html.slice(heroSectionStart, heroEnd);

console.log('css', cssUrls);
console.log('header', header.length, 'hero', hero.length);

function sanitizeHtml(h, assetPrefix) {
  const heroAsset = `${assetPrefix}/western-cape-dam-lining-reservoir-damtech.webp`;
  return h
    .replace(/\sdata-cursor-ref="[^"]*"/g, '')
    .replace(/\shref="[^"]*"/g, ' href="#" tabindex="-1"')
    .replace(/\saction="[^"]*"/g, '')
    .replace(/<button/g, '<span role="presentation"')
    .replace(/<\/button>/g, '</span>')
    .replace(/srcset="[^"]*"/g, '')
    .replace(/sizes="[^"]*"/g, '')
    .replace(/src="\/_next\/image\/?\?[^"]+"/g, `src="${heroAsset}"`)
    .replace(/src="\/(?!project-previews\/)([^"]+)"/g, `src="${assetPrefix}/$1"`)
    .replace(/background-image:url\(&quot;data:image\/svg\+xml[^;]*;[^&]*&quot;\)/g, '')
    .replace(/fixed inset-x-0 top-0/g, 'absolute inset-x-0 top-0');
}

const outDir = path.join(root, 'components/projects/project-preview/damtech');
writeFileSync(
  path.join(outDir, 'damtech-source-markup.ts'),
  `// Extracted from local Damtech-Website SSR (commit a96ab2ea) on 2026-07-23
export const DAMTECH_HEADER_HTML = ${JSON.stringify(sanitizeHtml(header, '/project-previews/damtech'))};
export const DAMTECH_HERO_HTML = ${JSON.stringify(sanitizeHtml(hero, '/project-previews/damtech'))};
`,
);

if (!cssUrls[0]) throw new Error('No Damtech CSS URL found in local SSR HTML');
const cssUrl = `http://127.0.0.1:3011${cssUrls[0]}`;
const cssRes = await fetch(cssUrl);
if (!cssRes.ok) throw new Error(`Failed to fetch CSS ${cssUrl}: ${cssRes.status}`);
const css = await cssRes.text();
writeFileSync(path.join(root, '.tmp-damtech-local.css'), css);
writeFileSync(path.join(outDir, 'damtech-preview.css'), scopeCss(css, 'damtechPreviewRoot'));
console.log('wrote css', css.length);

// Append frame overrides (desktop/mobile mode) onto the scoped stylesheet.
const { readFileSync: read, writeFileSync: write } = await import('node:fs');
const overrides = read(
  path.join(outDir, 'damtech-preview-overrides.module.css'),
  'utf8',
)
  .replace(/:global\(([^)]+)\)/g, '$1')
  .replace(/@import\s+url\([^)]+\)\s*;?/gi, '');
const scoped = read(path.join(outDir, 'damtech-preview.css'), 'utf8');
write(
  path.join(outDir, 'damtech-preview.css'),
  `/* damtech authentic preview — plain scoped CSS */\n${scoped}\n\n/* Preview frame overrides */\n${overrides}`,
);

const heroSrc = path.join(
  'C:/Users/delanget/Documents/GitHub/Damtech-Website/public/images/western-cape-dam-lining-reservoir-damtech.webp',
);
const heroDest = path.join(
  root,
  'public/project-previews/damtech/western-cape-dam-lining-reservoir-damtech.webp',
);
mkdirSync(path.dirname(heroDest), { recursive: true });
if (existsSync(heroSrc)) {
  copyFileSync(heroSrc, heroDest);
  console.log('copied hero image');
} else {
  console.warn('hero image missing at', heroSrc);
}
