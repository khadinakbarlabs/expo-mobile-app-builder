import test from 'node:test';
import assert from 'node:assert/strict';
import { compareInventory } from '../scripts/verify-claude-inventory.mjs';

test('host inventory fails when declared agents are silently omitted', () => {
  const expected = {skills: ['one'], agents: ['designer']};
  assert.throws(() => compareInventory('  Skills (1)  one\n  Agents (0)\n', expected), /agents.*designer/);
  assert.deepEqual(compareInventory('  Skills (1)  one\n  Agents (1)  designer\n', expected), expected);
});
test('host inventory rejects wrong counts, unknown components and missing output', () => {
  const expected = {skills: ['one'], agents: ['designer']};
  assert.throws(() => compareInventory('  Skills (2)  one\n  Agents (1)  designer\n', expected), /count/);
  assert.throws(() => compareInventory('  Skills (1)  other\n  Agents (1)  designer\n', expected), /skills/);
  assert.throws(() => compareInventory('Validation passed', expected), /Missing/);
});
