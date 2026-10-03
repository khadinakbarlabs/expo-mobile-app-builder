#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { loadCatalog, root } from './agency-catalog.mjs';

const catalog = loadCatalog();
const json = `${JSON.stringify(catalog, null, 2)}\n`;
const lines = ['# Agency skill catalog', '', 'Every workflow has one department and subcategory. Platform tags describe the primary scope; shared workflows still require an iOS/Android parity decision.', '', 'Generated from `agency/taxonomy.json`; regenerate with `node scripts/build-agency-catalog.mjs`.', ''];
for (const department of catalog.departments) {
  lines.push(`## ${department.title}`, '', department.outcome, '', `Specialists: ${department.agents.map(agent => `\`${agent}\``).join(', ')}.`, '', '| Subcategory | Workflow | Platform |', '| --- | --- | --- |');
  for (const skill of catalog.skills.filter(item => item.department === department.id)) {
    const link = `[${skill.id}]` + `(../${skill.path})`;
    lines.push(`| ${skill.category} | ${link} | ${skill.platform} |`);
  }
  lines.push('');
}
const markdown = `${lines.join('\n')}\n`;
const outputs = [['agency/catalog.json', json], ['docs/SKILL-CATALOG.md', markdown]];
if (process.argv.includes('--check')) {
  for (const [file, content] of outputs) if (!fs.existsSync(path.join(root, file)) || fs.readFileSync(path.join(root, file), 'utf8') !== content) throw new Error(`Stale generated catalog: ${file}`);
  console.log(`PASS catalog: ${catalog.skills.length} workflows, ${catalog.departments.length} departments, complete classification.`);
} else {
  for (const [file, content] of outputs) fs.writeFileSync(path.join(root, file), content);
  console.log(`Built catalog: ${catalog.skills.length} workflows across ${catalog.departments.length} departments.`);
}
