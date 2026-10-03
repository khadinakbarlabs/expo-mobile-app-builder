import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function buildCatalog(taxonomy, skills) {
  const departments = new Map();
  for (const department of taxonomy.departments) {
    if (departments.has(department.id)) throw new Error(`Duplicate department: ${department.id}`);
    departments.set(department.id, department);
  }
  const source = new Map(skills.map(skill => [skill.id, skill]));
  if (source.size !== skills.length) throw new Error('Duplicate skill definition');
  const assigned = new Map();
  const groups = new Set();
  for (const group of taxonomy.groups) {
    if (!departments.has(group.department)) throw new Error(`Unknown department: ${group.department}`);
    const groupKey = `${group.department}/${group.id}`;
    if (groups.has(groupKey)) throw new Error(`Duplicate group: ${groupKey}`);
    groups.add(groupKey);
    for (const id of group.skills) {
      if (!source.has(id)) throw new Error(`Unknown skill: ${id}`);
      if (assigned.has(id)) throw new Error(`Duplicate classification: ${id}`);
      const platform = taxonomy.platforms ? taxonomy.platforms[id] : source.get(id).platform ?? 'shared';
      if (!['ios', 'android', 'shared'].includes(platform)) throw new Error(`Invalid or missing platform: ${id}`);
      assigned.set(id, { ...source.get(id), platform, department: group.department, category: group.id });
    }
  }
  const missing = skills.filter(skill => !assigned.has(skill.id));
  if (missing.length) throw new Error(`Unclassified skills: ${missing.map(skill => skill.id).join(', ')}`);
  for (const id of Object.keys(taxonomy.platforms ?? {})) if (!source.has(id)) throw new Error(`Unknown platform skill: ${id}`);
  return {
    schemaVersion: 1,
    departments: taxonomy.departments,
    categories: taxonomy.groups.map(({ skills: entries, ...group }) => ({ ...group, count: entries.length })),
    skills: [...assigned.values()].sort((a, b) => a.id.localeCompare(b.id, 'en')),
  };
}

export function readSkills(base = root) {
  const skillRoot = path.join(base, 'skills');
  return fs.readdirSync(skillRoot, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => {
    const relativePath = `skills/${entry.name}/SKILL.md`;
    const content = fs.readFileSync(path.join(base, relativePath), 'utf8');
    const descriptionLine = content.match(/^description:\s*(.+)$/m)?.[1];
    if (!descriptionLine) throw new Error(`Missing description: ${entry.name}`);
    const description = descriptionLine.replace(/^['"]|['"]$/g, '');
    return { id: entry.name, description, path: relativePath };
  });
}

export function loadCatalog(base = root) {
  return buildCatalog(JSON.parse(fs.readFileSync(path.join(base, 'agency/taxonomy.json'), 'utf8')), readSkills(base));
}

export function selectSkills(catalog, filters = {}) {
  return catalog.skills.filter(skill =>
    (!filters.department || skill.department === filters.department) &&
    (!filters.platform || skill.platform === filters.platform) &&
    (!filters.query || `${skill.id} ${skill.description}`.toLowerCase().includes(filters.query.toLowerCase())));
}
