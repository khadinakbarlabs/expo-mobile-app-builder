#!/usr/bin/env node
import { loadCatalog, selectSkills } from './agency-catalog.mjs';

const args = process.argv.slice(2);
const filters = {};
let json = false;
try {
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === '--json') { json = true; continue; }
    if (argument === '--help') {
      console.log('Browse the agency: node scripts/agency.mjs [--department research|strategy|design|engineering|quality|launch|growth|operations] [--platform ios|android|shared] [--query text] [--json]');
      process.exit(0);
    }
    if (!['--department', '--platform', '--query'].includes(argument) || !args[index + 1] || args[index + 1].startsWith('--')) {
      throw new Error(`Invalid argument: ${argument}. Use --help.`);
    }
    filters[argument.slice(2)] = args[++index];
  }
  const catalog = loadCatalog();
  if (filters.department && !catalog.departments.some(item => item.id === filters.department)) throw new Error('Unknown department. Use --help.');
  if (filters.platform && !['ios', 'android', 'shared'].includes(filters.platform)) throw new Error('Unknown platform. Use --help.');
  const skills = selectSkills(catalog, filters);
  if (json) console.log(JSON.stringify(skills, null, 2));
  else {
    for (const department of catalog.departments) {
      const entries = skills.filter(skill => skill.department === department.id);
      if (!entries.length) continue;
      console.log(`\n${department.title} (${entries.length}) · ${department.agents.join(', ')}`);
      for (const skill of entries) console.log(`  ${skill.category.padEnd(24)} ${skill.id} [${skill.platform}]`);
    }
    console.log(`\n${skills.length} matching workflows. This command only reads the local package.`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
