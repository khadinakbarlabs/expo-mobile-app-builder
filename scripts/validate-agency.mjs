#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { loadCatalog, root } from './agency-catalog.mjs';

const catalog = loadCatalog();
const roles = new Set(catalog.departments.flatMap(department => department.agents));
const agentFiles = fs.readdirSync(path.join(root, 'agents')).filter(file => file.endsWith('.md'));
for (const id of roles) {
  const file = path.join(root, 'agents', `${id}.md`);
  if (!fs.existsSync(file)) throw new Error(`Missing specialist: ${id}`);
  const content = fs.readFileSync(file, 'utf8');
  const name = content.match(/^name:\s*["']?([^"'\r\n]+)/m)?.[1]?.trim();
  if (name !== id || !/^description:\s*\S/m.test(content)) throw new Error(`Invalid specialist frontmatter: ${id}`);
}
if (agentFiles.length !== roles.size) throw new Error('Unclassified specialist file');
const manifest = JSON.parse(fs.readFileSync(path.join(root, '.claude-plugin/plugin.json'), 'utf8'));
const expected = [...roles].sort().map(id => `./agents/${id}.md`);
if (JSON.stringify([...manifest.agents ?? []].sort()) !== JSON.stringify(expected)) throw new Error('Claude agent routes differ from department registry');
for (const skill of ['mobile-app-agency', 'apify-mobile-research', 'mobile-design-references', 'mobile-store-asset-production', 'engineering-workflow-guard']) {
  if (!catalog.skills.some(entry => entry.id === skill)) throw new Error(`Missing agency workflow: ${skill}`);
}
console.log(`PASS agency: ${roles.size} specialists, ${catalog.departments.length} departments, ${catalog.skills.length} classified workflows.`);
