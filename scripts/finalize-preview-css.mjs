import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();

import { scopeCss } from './scope-preview-css.mjs';

function writeScopedCss(fromPath, toPath, rootClass) {
  const raw = JSON.parse(readFileSync(fromPath, 'utf8')).result.value;
  writeFileSync(toPath, scopeCss(raw, rootClass));
}

mkdirSync(path.join(root, 'components/projects/project-preview/damtech'), { recursive: true });
mkdirSync(path.join(root, 'components/projects/project-preview/proplytic'), { recursive: true });

writeScopedCss(
  path.join(process.env.USERPROFILE ?? '', '.cursor/browser-logs/cdp-response-Runtime.evaluate-2026-07-22T09-09-59-036Z.json'),
  path.join(root, 'components/projects/project-preview/damtech/damtech-preview.css'),
  'damtechPreviewRoot',
);

const proplyticIndex = readFileSync(path.join(root, '.tmp-proplytic-index.css'), 'utf8');
const proplyticHero = readFileSync(path.join(root, '.tmp-proplytic-hero.css'), 'utf8');
writeFileSync(
  path.join(root, 'components/projects/project-preview/proplytic/proplytic-preview.css'),
  scopeCss(`${proplyticIndex}\n${proplyticHero}`, 'proplyticPreviewRoot'),
);

function fixDamtechMarkup() {
  const markupPath = path.join(root, 'components/projects/project-preview/damtech/damtech-source-markup.ts');
  let markup = readFileSync(markupPath, 'utf8');
  markup = markup.replace(
    /src=\\"[^\\"]*western-cape-dam-lining-reservoir-damtech[^\\"]*\\"/,
    'src=\\"/project-previews/damtech/western-cape-dam-lining-reservoir-damtech.webp\\"',
  );
  writeFileSync(markupPath, markup);
}

fixDamtechMarkup();

console.log('Scoped preview CSS written.');
