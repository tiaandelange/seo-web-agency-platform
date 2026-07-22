import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const source = readFileSync('C:/Users/Tiaan/GitHub/Wedding-site/styles.css', 'utf8');
const blocks = source.split(/(?=\n\.[a-zA-Z_@]|@keyframes|@media)/);
const keep = blocks.filter((block) =>
  /site-header|\.nav|\.hero|\.btn|\.container|\.flourish|scrollhint|reveal|\.nowrap/.test(block),
);

function scopeWeddingCss(css) {
  return css
    .replace(/:root\{/g, '.weddingPreviewRoot {')
    .replace(/body \{/g, '.weddingPreviewRoot {')
    .replace(/url\("images\/hero\.jpg"\)/g, 'url(/project-previews/wedding/hero.jpg)')
    .replace(/(^|\n)(\.[a-zA-Z_][\w-]*)(\s*\{)/g, '$1.weddingPreviewRoot :global($2)$3');
}

const header = `@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300,400,600&family=Inter:opsz,wght@14..32,300,400,500,600&family=Allura&display=swap");

.weddingPreviewRoot {
  font-family: var(--sans);
  color: var(--ink);
  background: var(--bg);
  --serif: "Fraunces", ui-serif, "Times New Roman", serif;
  --sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  --script: "Allura", ui-serif, "Times New Roman", serif;
  --bg: #fbf7f1;
  --ink: #2a2623;
  --muted: rgba(42, 38, 35, 0.72);
  --faint: rgba(42, 38, 35, 0.5);
  --line: rgba(54, 45, 38, 0.14);
  --accent: #8e6e5a;
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease2: cubic-bezier(0.16, 1, 0.3, 1);
  --container: 1120px;
  --ring: 0 0 0 1px rgba(54, 45, 38, 0.13), 0 0 0 6px rgba(179, 110, 76, 0.08);
  position: relative;
  min-height: 100%;
  overflow: hidden;
}

.weddingPreviewRoot :global(.is-loaded) :global(.reveal-on-load),
.weddingPreviewRoot :global(.is-loaded) :global(.reveal-split .split__inner) {
  opacity: 1;
  transform: translateY(0);
}
`;

writeFileSync(
  path.join('components/projects/project-preview/wedding/wedding-preview.module.css'),
  `${header}\n${scopeWeddingCss(keep.join(''))}`,
);

console.log('Wedding preview CSS generated.');
