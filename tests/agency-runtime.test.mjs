import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { loadPreparedCatalog, selectSkills } from '../scripts/agency-runtime.mjs';

const example = {
  schemaVersion: 1,
  departments: [{ id: 'design', title: 'Design', agents: ['ux-designer'], outcome: 'Useful interfaces' }],
  categories: [{ department: 'design', id: 'experience', title: 'Experience', count: 1 }],
  skills: [{ id: 'design-paywall', description: 'Design a paywall', path: 'skills/design-paywall/SKILL.md', platform: 'shared', department: 'design', category: 'experience' }],
};

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'agency-runtime-'));
  fs.mkdirSync(path.join(root, 'agency'));
  fs.writeFileSync(path.join(root, 'agency/catalog.json'), JSON.stringify(example));
  try { run(root); } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test('installed browser uses prepared metadata without taxonomy or skill-file reads', () => fixture(root => {
  fs.writeFileSync(path.join(root, 'agency/taxonomy.json'), 'not readable metadata');
  assert.deepEqual(loadPreparedCatalog(root), example);
  assert.equal(selectSkills(loadPreparedCatalog(root), { department: 'design', platform: 'shared', query: 'paywall' }).length, 1);
  assert.equal(selectSkills(loadPreparedCatalog(root), { department: 'research' }).length, 0);
}));

test('installed CLI works from a minimal package containing only its catalog and two browser helpers', () => fixture(root => {
  fs.mkdirSync(path.join(root, 'scripts'));
  for (const name of ['agency.mjs', 'agency-runtime.mjs']) fs.copyFileSync(new URL(`../scripts/${name}`, import.meta.url), path.join(root, 'scripts', name));
  const result = spawnSync(process.execPath, [path.join(root, 'scripts/agency.mjs'), '--query', 'paywall', '--json'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), example.skills);
}));

test('catalog reader rejects links at each controlled path without reading their target', () => fixture(root => {
  const file = path.join(root, 'agency/catalog.json');
  const target = path.join(root, 'outside.json');
  fs.writeFileSync(target, JSON.stringify(example));
  fs.unlinkSync(file);
  fs.symlinkSync(target, file);
  assert.throws(() => loadPreparedCatalog(root), /regular file/);
  fs.unlinkSync(file);
  fs.rmdirSync(path.join(root, 'agency'));
  fs.symlinkSync(root, path.join(root, 'agency'));
  assert.throws(() => loadPreparedCatalog(root), /regular directory/);
  fs.unlinkSync(path.join(root, 'agency'));
  fs.symlinkSync(root, path.join(root, 'linked-root'));
  assert.throws(() => loadPreparedCatalog(path.join(root, 'linked-root')), /regular directory/);
}));

test('catalog reader rejects oversized input before parsing and never echoes invalid file contents', () => fixture(root => {
  const file = path.join(root, 'agency/catalog.json');
  fs.writeFileSync(file, 'x'.repeat(256 * 1024));
  assert.throws(() => loadPreparedCatalog(root), /below 256 KiB/);
  fs.writeFileSync(file, 'PRIVATE_EXAMPLE malformed input');
  assert.throws(() => loadPreparedCatalog(root), error => error.message === 'Invalid prepared agency catalog');
}));

test('catalog reader rejects duplicate routes, traversal and inconsistent classification', () => fixture(root => {
  const file = path.join(root, 'agency/catalog.json');
  for (const candidate of [
    { ...example, skills: [...example.skills, example.skills[0]] },
    { ...example, skills: [{ ...example.skills[0], path: '../outside.json' }] },
    { ...example, categories: [{ ...example.categories[0], count: 2 }] },
    { ...example, skills: [{ ...example.skills[0], department: 'unknown' }] },
    { ...example, skills: [{ ...example.skills[0], platform: 'unknown' }] },
    { ...example, schemaVersion: 999 },
  ]) {
    fs.writeFileSync(file, JSON.stringify(candidate));
    assert.throws(() => loadPreparedCatalog(root), /Invalid prepared agency catalog/);
  }
}));
