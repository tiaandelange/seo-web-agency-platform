/**
 * Stage selected hunks from a git diff (1-based hunk indices).
 * Usage: node stage-hunks.mjs <file> <hunk1> [hunk2 ...]
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const file = process.argv[2];
const wanted = new Set(process.argv.slice(3).map((n) => Number(n)));

if (!file || wanted.size === 0) {
  console.error('Usage: node stage-hunks.mjs <file> <1-based hunk indices...>');
  process.exit(1);
}

const diff = execSync(`git diff -- "${file}"`, { encoding: 'utf8' });
if (!diff.trim()) {
  console.error(`No diff for ${file}`);
  process.exit(1);
}

const lines = diff.split('\n');
const header = [];
let i = 0;
while (i < lines.length && !lines[i].startsWith('@@')) {
  header.push(lines[i]);
  i++;
}

const hunks = [];
while (i < lines.length) {
  if (!lines[i].startsWith('@@')) {
    i++;
    continue;
  }
  const start = i;
  i++;
  while (i < lines.length && !lines[i].startsWith('@@')) {
    i++;
  }
  hunks.push(lines.slice(start, i).join('\n'));
}

const selected = hunks
  .map((h, idx) => ({ h, idx: idx + 1 }))
  .filter(({ idx }) => wanted.has(idx))
  .map(({ h }) => h);

if (selected.length === 0) {
  console.error(`No hunks matched for ${file}. Total hunks: ${hunks.length}`);
  process.exit(1);
}

const patch = [...header, ...selected].join('\n') + '\n';
const tmp = path.join(os.tmpdir(), `stage-hunk-${Date.now()}.patch`);
fs.writeFileSync(tmp, patch, 'utf8');

try {
  execSync(`git apply --cached --whitespace=nowarn "${tmp}"`, { stdio: 'inherit' });
  console.error(`Staged ${selected.length} hunk(s) from ${file} (${[...wanted].join(', ')})`);
} finally {
  fs.unlinkSync(tmp);
}
