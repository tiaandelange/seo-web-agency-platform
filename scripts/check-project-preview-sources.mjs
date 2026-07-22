#!/usr/bin/env node
/**
 * Development-only provenance check for adapted project previews.
 * Never runs in production builds or in the browser.
 */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'data', 'project-preview-sources.ts');
const manifestSource = readFileSync(manifestPath, 'utf8');

const entries = [...manifestSource.matchAll(/id: '(damtech|proplytic|wedding)'[\s\S]*?sourceCommit: '([^']+)'[\s\S]*?repositoryFullName: ([^,\n]+)/g)].map(
  (match) => ({
    id: match[1],
    sourceCommit: match[2],
    repositoryFullName: match[3].trim(),
  }),
);

function remoteHead(repositoryFullName) {
  if (!repositoryFullName || repositoryFullName === 'null') return null;
  const result = spawnSync('git', ['ls-remote', `https://github.com/${repositoryFullName}.git`, 'HEAD'], {
    encoding: 'utf8',
  });
  if (result.status !== 0) return null;
  const line = result.stdout.trim().split('\n')[0];
  return line ? line.split('\t')[0] : null;
}

console.log('Project preview source check');
console.log('============================');

for (const entry of entries) {
  const repo =
    entry.repositoryFullName === 'null' ? null : entry.repositoryFullName.replace(/['"]/g, '');
  if (!repo) {
    console.log(`${entry.id}: repository unavailable — manual source verification required`);
    continue;
  }

  const head = remoteHead(repo);
  if (!head) {
    console.log(`${entry.id}: repository unavailable (${repo})`);
    continue;
  }

  if (entry.sourceCommit === 'unverified') {
    console.log(`${entry.id}: source updated — imported commit not recorded (${head.slice(0, 7)})`);
    continue;
  }

  if (head.startsWith(entry.sourceCommit) || entry.sourceCommit.startsWith(head)) {
    console.log(`${entry.id}: unchanged (${entry.sourceCommit.slice(0, 7)})`);
  } else {
    console.log(
      `${entry.id}: source updated — imported ${entry.sourceCommit.slice(0, 7)}, remote ${head.slice(0, 7)}`,
    );
  }
}
