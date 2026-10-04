import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const guide = fs.readFileSync(new URL('../skills/add-supabase-auth/SKILL.md', import.meta.url), 'utf8');
const callbackSource = guide.match(/```js\n(\/\/ lib\/auth-callback\.js[\s\S]*?)```/)?.[1];
const loadCallback = async () => {
  assert.ok(callbackSource, 'guide must include the actual callback implementation');
  return import(`data:text/javascript;base64,${Buffer.from(callbackSource).toString('base64')}`);
};

test('Supabase guidance uses explicit public app configuration and PKCE', () => {
  assert.doesNotMatch(guide, /process\.env\.|Deno\.env\.get/);
  assert.match(guide, /flowType: 'pkce'/);
  assert.match(guide, /sb_publishable_/);
  assert.match(guide, /service.role/i);
});
test('successful sign-in removes the callback route so navigation reaches the app', () => {
  assert.match(guide, /<Stack\.Protected guard=\{!session\}>\s*<Stack\.Screen name="\(auth\)"\s*\/>\s*<Stack\.Screen name="auth\/callback"\s*\/>\s*<\/Stack\.Protected>/);
});
test('PKCE callback exchanges a validated app code for a session', async () => {
  const { createAuthCallbackHandler } = await loadCallback();
  const calls = [];
  const handle = createAuthCallbackHandler({auth: {exchangeCodeForSession: async code => {
    calls.push(code); return {data: {session: {}}, error: null};
  }}}, 'yourapp://auth/callback');
  assert.equal(await handle('yourapp://auth/callback?code=test-code'), 'signed-in');
  assert.deepEqual(calls, ['test-code']);
});
test('callback ignores unrelated, malformed and lookalike destinations without exchanging', async () => {
  const { createAuthCallbackHandler } = await loadCallback();
  let calls = 0;
  const handle = createAuthCallbackHandler({auth: {exchangeCodeForSession: async () => { calls++; }}}, 'yourapp://auth/callback');
  for (const url of ['invalid', 'https://auth/callback?code=x', 'yourapp://evil/callback?code=x', 'yourapp://auth/callback/extra?code=x', 'yourapp://user@auth/callback?code=x', 'yourapp://auth:123/callback?code=x']) {
    assert.equal(await handle(url), 'ignored');
  }
  assert.equal(calls, 0);
});
test('callback rejects missing, duplicate, fragment and error payloads without exchanging', async () => {
  const { createAuthCallbackHandler } = await loadCallback();
  let calls = 0;
  const handle = createAuthCallbackHandler({auth: {exchangeCodeForSession: async () => { calls++; }}}, 'yourapp://auth/callback');
  for (const suffix of ['', '?code=', '?code=a&code=b', '?code=x#error=unsafe', '?error=access_denied&code=x']) {
    await assert.rejects(handle('yourapp://auth/callback' + suffix), /Sign-in could not be completed/);
  }
  assert.equal(calls, 0);
});
test('callback deduplicates concurrent deliveries and permits retry after failure', async () => {
  const { createAuthCallbackHandler } = await loadCallback();
  let calls = 0;
  const handle = createAuthCallbackHandler({auth: {exchangeCodeForSession: async () => {
    calls++; if (calls === 1) throw new Error('provider-private-details');
    return {data: {session: {}}, error: null};
  }}}, 'yourapp://auth/callback');
  await assert.rejects(handle('yourapp://auth/callback?code=test-code'), error => error.message === 'Sign-in could not be completed. Request a new link.');
  const result = await Promise.all([handle('yourapp://auth/callback?code=test-code'), handle('yourapp://auth/callback?code=test-code')]);
  assert.deepEqual(result, ['signed-in', 'signed-in']);
  assert.equal(calls, 2);
});
test('callback reports a provider error or absent session without leaking details', async () => {
  const { createAuthCallbackHandler } = await loadCallback();
  for (const reply of [{data: {session: null}, error: null}, {data: null, error: {message: 'private-details'}}]) {
    const handle = createAuthCallbackHandler({auth: {exchangeCodeForSession: async () => reply}}, 'yourapp://auth/callback');
    await assert.rejects(handle('yourapp://auth/callback?code=x'), error => error.message === 'Sign-in could not be completed. Request a new link.');
  }
});
