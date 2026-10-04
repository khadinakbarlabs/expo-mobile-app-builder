#!/usr/bin/env node
// Publisher-only host discovery check; does not start an LLM session.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export function compareInventory(output, expected) {
  const inventory = {};
  for (const kind of ['skills', 'agents']) {
    const label = kind[0].toUpperCase() + kind.slice(1);
    const match = output.match(new RegExp(`^\\s*${label} \\((\\d+)\\)[ \\t]*(.*)$`, 'm'));
    if (!match) throw new Error(`Missing Claude inventory output: ${kind}`);
    const names = match[2].trim() ? match[2].trim().split(/,\s*/) : [];
    if (Number(match[1]) !== names.length || new Set(names).size !== names.length) throw new Error(`Invalid Claude ${kind} count`);
    const missing = expected[kind].filter(name => !names.includes(name));
    const unexpected = names.filter(name => !expected[kind].includes(name));
    if (missing.length || unexpected.length) throw new Error(`Claude ${kind} mismatch; missing: ${missing.join(', ') || 'none'}; unexpected: ${unexpected.join(', ') || 'none'}`);
    inventory[kind] = names.sort();
  }
  return inventory;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (!process.argv[2]) throw new Error('Pass the exact staged native plugin directory');
    const root = path.resolve(process.argv[2]);
    const manifest = JSON.parse(fs.readFileSync(path.join(root, '.claude-plugin/plugin.json'), 'utf8'));
    const catalog = JSON.parse(fs.readFileSync(path.join(root, 'agency/catalog.json'), 'utf8'));
    const expected = {
      skills: catalog.skills.map(skill => skill.id),
      agents: [...new Set(catalog.departments.flatMap(department => department.agents))],
    };
    const output = execFileSync('npx', ['--yes', '@anthropic-ai/claude-code@2.1.287', '--plugin-dir', root, 'plugin', 'details', `${manifest.name}@inline`], {encoding: 'utf8', timeout: 60000, maxBuffer: 2 * 1024 * 1024});
    const inventory = compareInventory(output, expected);
    console.log(JSON.stringify({status: 'host-inventory-passed', name: manifest.name, version: manifest.version, claudeVersion: '2.1.287', inventory, portalApprovalVerified: false}, null, 2));
  } catch (error) {
    console.error(`Claude inventory failed: ${error.message}`);
    process.exitCode = 1;
  }
}
