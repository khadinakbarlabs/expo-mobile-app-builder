import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { inspectPlugin, unpinnedLaunchers, caseCollisions } from '../skills/prepare-anthropic-plugin/scripts/check-plugin.mjs';
import { inspectMedia } from '../scripts/validate-anthropic-media.mjs';

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'plugin-review-'));
  fs.mkdirSync(path.join(root, '.claude-plugin'));
  fs.writeFileSync(path.join(root, '.claude-plugin/plugin.json'), JSON.stringify({name: 'example-builder', version: '1.0.0', description: 'Example', displayName: 'Example Builder', author: {name: 'Example'}, license: 'MIT', icon: './icon.png', documentationUrl: 'https://example.org/docs', supportUrl: 'https://example.org/support', privacyPolicyUrl: 'https://example.org/privacy', termsOfServiceUrl: 'https://example.org/terms'}));
  fs.writeFileSync(path.join(root, 'README.md'), ('Example product guidance with documented local behavior and user controls. ').repeat(8));
  fs.writeFileSync(path.join(root, 'LICENSE'), 'MIT');
  fs.copyFileSync(new URL('../assets/mobile-app-builder-icon-v5-1024.png', import.meta.url), path.join(root, 'icon.png'));
  try { run(root); } finally { fs.rmSync(root, {recursive: true}); }
}

test('valid candidate reports local checks without claiming portal approval', () => fixture(root => {
  const report = inspectPlugin(root);
  assert.deepEqual(report.errors, []);
  assert.equal(report.status, 'local-checks-passed');
  assert.equal(report.portalValidated, false);
}));
test('installed structural helper never reads image bytes', () => fixture(root => {
  const original = fs.readFileSync;
  fs.readFileSync = (file, ...args) => {
    assert.notEqual(path.extname(String(file)), '.png', 'media belongs to release validation');
    return original(file, ...args);
  };
  try {
    const report = inspectPlugin(root);
    assert.deepEqual(report.errors, []);
    assert.equal(report.mediaValidated, false);
  } finally { fs.readFileSync = original; }
}));
test('source-only media validation rejects corrupt and non-square icons', () => fixture(root => {
  assert.deepEqual(inspectMedia(root), []);
  const icon = path.join(root, 'icon.png');
  const bytes = fs.readFileSync(icon);
  bytes.writeUInt32BE(128, 16);
  fs.writeFileSync(icon, bytes);
  assert.match(inspectMedia(root).join('\n'), /square PNG/);
  fs.writeFileSync(icon, 'invalid image');
  assert.match(inspectMedia(root).join('\n'), /invalid or incomplete image/);
}));
test('AI streaming guidance delegates provider access without ambient credential reads', () => {
  const skill = fs.readFileSync(new URL('../skills/add-openai-streaming-rn/SKILL.md', import.meta.url), 'utf8');
  assert.doesNotMatch(skill, /Deno\.env\.get|process\.env\./);
  assert.match(skill, /streamFromAppProvider/);
  assert.match(skill, /enforceUserQuotaAtomically/);
});
test('rejects symlinks, system files and cross-platform filename collisions', () => fixture(root => {
  fs.symlinkSync(path.join(root, 'README.md'), path.join(root, 'linked.md'));
  fs.writeFileSync(path.join(root, '.DS_Store'), 'x');
  fs.writeFileSync(path.join(root, 'con.md'), 'x');
  const errors = inspectPlugin(root).errors.join('\n');
  assert.match(errors, /Symbolic link/);
  assert.match(errors, /system file/);
  assert.match(caseCollisions(['README.md', 'readme.md']).join('\n'), /case collision/);
  assert.match(errors, /Windows filename/);
}));
test('rejects escaping icon paths and credential-bearing URLs', () => fixture(root => {
  const file = path.join(root, '.claude-plugin/plugin.json');
  const manifest = JSON.parse(fs.readFileSync(file));
  manifest.icon = '../icon.png';
  manifest.supportUrl = 'https://user:password@example.org/support';
  fs.writeFileSync(file, JSON.stringify(manifest));
  assert.match(inspectPlugin(root).errors.join('\n'), /icon.*contained/);
  assert.match(inspectPlugin(root).errors.join('\n'), /supportUrl.*HTTPS/);
}));
test('enforces directory file limits and prevents binary/LFS packaging', () => fixture(root => {
  fs.writeFileSync(path.join(root, 'large.md'), 'x'.repeat(256 * 1024));
  fs.writeFileSync(path.join(root, 'program.bin'), Buffer.from([0, 1, 2]));
  fs.writeFileSync(path.join(root, 'pointer.txt'), 'version https://git-lfs.github.com/spec/v1\noid sha256:abc');
  for (let i = 0; i < 510; i++) fs.writeFileSync(path.join(root, `file-${i}.txt`), 'text');
  const errors = inspectPlugin(root).errors.join('\n');
  assert.match(errors, /512/);
  assert.match(errors, /256 KiB/);
  assert.match(errors, /Unsupported binary/);
  assert.match(errors, /LFS pointer/);
}));
test('flags unpinned downloads, but accepts exact pins and local no-install tools', () => {
  assert.equal(unpinnedLaunchers('npx --yes @sentry/wizard@8.0.0 -i reactNative').length, 0);
  assert.equal(unpinnedLaunchers('npm exec --no -- expo install expo-camera').length, 0);
  assert.equal(unpinnedLaunchers('npx expo install\nnpx create-expo-app@latest demo\nuvx tool\npnpm dlx tool@^1.0.0').length, 4);
  assert.equal(unpinnedLaunchers('npx tool@1.2.3 && npx other@latest').length, 1);
  assert.equal(unpinnedLaunchers('npx "tool@latest"').length, 1);
  assert.equal(unpinnedLaunchers('npx --package=other@latest tool@1.2.3').length, 1);
  assert.equal(unpinnedLaunchers('npx --package=tool@1.2.3 tool').length, 0);
});
