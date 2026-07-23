import { readFileSync, writeFileSync } from 'node:fs';
import { scopeCss, stripPreviewFontFaces } from './scope-preview-css.mjs';

function convertOverrides(css) {
  return css
    .replace(/:global\(([^)]+)\)/g, '$1')
    .replace(/@import\s+url\([^)]+\)\s*;?/gi, '');
}

function buildPreviewCss(scopedCss, id) {
  const overrides = convertOverrides(
    readFileSync(
      `components/projects/project-preview/${id}/${id}-preview-overrides.module.css`,
      'utf8',
    ),
  );
  return `/* ${id} authentic preview — plain scoped CSS */\n${scopedCss}\n\n/* Preview frame overrides */\n${overrides}`;
}

const raw = readFileSync('.tmp-damtech-local.css', 'utf8');
const scoped = stripPreviewFontFaces(scopeCss(raw, 'damtechPreviewRoot'));
writeFileSync(
  'components/projects/project-preview/damtech/damtech-preview.css',
  buildPreviewCss(scoped, 'damtech'),
);
console.log(
  'damtech css',
  readFileSync('components/projects/project-preview/damtech/damtech-preview.css', 'utf8').length,
);

const proplyticPath = 'components/projects/project-preview/proplytic/proplytic-preview.css';
const proplytic = readFileSync(proplyticPath, 'utf8');
const base = proplytic.split('/* Desktop preview overrides */')[0]
  .split('/* Preview frame overrides */')[0]
  .trimEnd();
const overrides = convertOverrides(
  readFileSync(
    'components/projects/project-preview/proplytic/proplytic-preview-overrides.module.css',
    'utf8',
  ),
);
writeFileSync(proplyticPath, `${base}\n\n/* Preview frame overrides */\n${overrides}`);
console.log('proplytic overrides refreshed', readFileSync(proplyticPath, 'utf8').length);
