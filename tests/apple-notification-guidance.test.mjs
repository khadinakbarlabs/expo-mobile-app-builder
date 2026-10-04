import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const guide = fs.readFileSync(new URL('../skills/app-store-server-notifications/SKILL.md', import.meta.url), 'utf8');
const source = guide.match(/```ts\n([\s\S]*?)export async function POST/)?.[1]?.replace(/^import .*;\n/m, '');
function configure(identity) {
  assert.ok(source, 'the guide must include the actual verifier configuration');
  const calls = [];
  const context = {
    // Support the old example too, so invalid numeric configuration is a behavioral regression.
    process: { env: { APP_BUNDLE_ID: identity?.bundleId, APP_APPLE_ID: identity?.appAppleId } },
    getAppStoreNotificationIdentity: () => identity,
    loadTrustedAppleRootCAs: () => ['trusted-root-fixture'],
    Environment: { PRODUCTION: 'Production' },
    SignedDataVerifier: function (...args) { calls.push(args); },
  };
  vm.runInNewContext(source, context);
  return calls;
}

test('Apple notification guide rejects invalid production app identity before constructing a verifier', () => {
  for (const identity of [undefined, null, {}]) assert.throws(() => configure(identity), /App Store notification configuration/);
  for (const appAppleId of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, '', '123']) {
    assert.throws(() => configure({ bundleId: 'com.example.app', appAppleId }), /App Store notification configuration/);
  }
  for (const bundleId of ['', ' ', ' com.example.app', 'com.example.app ']) {
    assert.throws(() => configure({ bundleId, appAppleId: 123 }), /App Store notification configuration/);
  }
});

test('Apple notification guide passes explicit public identity to the signature verifier', () => {
  assert.doesNotMatch(guide, /process\.env\.|Deno\.env\.get/);
  const calls = configure({ bundleId: 'com.example.app', appAppleId: 123 });
  assert.equal(calls.length, 1);
  assert.equal(calls[0][1], true, 'certificate revocation checks stay enabled');
  assert.equal(calls[0][2], 'Production');
  assert.equal(calls[0][3], 'com.example.app');
  assert.equal(calls[0][4], 123);
});
