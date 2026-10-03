import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('documented shortcut router accepts only known IDs and ignores external destinations', () => {
  const skill = fs.readFileSync(new URL('../skills/add-android-quick-actions/SKILL.md', import.meta.url), 'utf8');
  const example = skill.match(/```javascript\n([\s\S]*?)```/);
  assert.ok(example, 'standalone route resolver example required');
  const resolveShortcut = new Function(`${example[1]}; return resolveShortcut;`)();
  assert.equal(resolveShortcut({id: 'new-habit', params: {screen: 'https://attacker.invalid'}}), '/new');
  assert.equal(resolveShortcut({id: 'today'}), '/today');
  for (const input of [null, undefined, {}, {id: '__proto__'}, {id: 'constructor'}, {id: '/admin'}, {id: 'unknown', params: {screen: '/today'}}]) {
    assert.equal(resolveShortcut(input), null);
  }
});
