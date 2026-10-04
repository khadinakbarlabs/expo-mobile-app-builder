import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const maximumBytes = 256 * 1024;
const identifier = /^[a-z0-9][a-z0-9-]{0,99}$/;
const isIdentifier = value => typeof value === 'string' && identifier.test(value);
const isText = value => typeof value === 'string' && value.length > 0 && value.length <= 2000 && !/[\x00-\x1f\x7f]/.test(value);

function requireEntry(file, directory) {
  let info;
  try { info = fs.lstatSync(file); }
  catch { throw new Error('Prepared catalog is missing; reinstall the verified package'); }
  if (info.isSymbolicLink() || !(directory ? info.isDirectory() : info.isFile())) {
    throw new Error(`Prepared catalog requires a regular ${directory ? 'directory' : 'file'}`);
  }
}

function validCatalog(catalog) {
  if (!catalog || catalog.schemaVersion !== 1 || !Array.isArray(catalog.departments) || !Array.isArray(catalog.categories) || !Array.isArray(catalog.skills)) return false;
  if (!catalog.departments.length || !catalog.skills.length || [catalog.departments, catalog.categories, catalog.skills].some(list => list.length > 512)) return false;
  const departments = new Set();
  for (const item of catalog.departments) {
    if (!item || !isIdentifier(item.id) || departments.has(item.id) || !isText(item.title) || !isText(item.outcome) || !Array.isArray(item.agents) || !item.agents.length || item.agents.some(agent => !isIdentifier(agent)) || new Set(item.agents).size !== item.agents.length) return false;
    departments.add(item.id);
  }
  const categories = new Map();
  for (const item of catalog.categories) {
    if (!item || !departments.has(item.department) || !isIdentifier(item.id) || !isText(item.title) || !Number.isSafeInteger(item.count) || item.count < 0 || item.count > 512) return false;
    const key = `${item.department}/${item.id}`;
    if (categories.has(key)) return false;
    categories.set(key, { expected: item.count, actual: 0 });
  }
  const skills = new Set();
  for (const item of catalog.skills) {
    if (!item || !isIdentifier(item.id) || skills.has(item.id) || !isText(item.description) || item.path !== `skills/${item.id}/SKILL.md` || !['ios', 'android', 'shared'].includes(item.platform)) return false;
    const category = categories.get(`${item.department}/${item.category}`);
    if (!category) return false;
    category.actual++;
    skills.add(item.id);
  }
  return [...categories.values()].every(item => item.actual === item.expected);
}

// Read one bounded metadata file. Skill routes are displayed, never opened here.
export function loadPreparedCatalog(base = root) {
  const directory = path.resolve(base);
  requireEntry(directory, true);
  requireEntry(path.join(directory, 'agency'), true);
  const file = path.join(directory, 'agency/catalog.json');
  requireEntry(file, false);
  let descriptor;
  let bytes;
  try {
    descriptor = fs.openSync(file, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0));
    const info = fs.fstatSync(descriptor);
    if (!info.isFile()) throw new Error('Prepared catalog requires a regular file');
    if (info.size >= maximumBytes) throw new Error('Prepared catalog must be below 256 KiB');
    const buffer = Buffer.alloc(maximumBytes);
    let length = 0;
    while (length < maximumBytes) {
      const read = fs.readSync(descriptor, buffer, length, maximumBytes - length, null);
      if (!read) break;
      length += read;
    }
    if (length >= maximumBytes) throw new Error('Prepared catalog must be below 256 KiB');
    bytes = buffer.subarray(0, length);
  } catch (error) {
    if (error.code) throw new Error('Unable to read prepared agency catalog');
    throw error;
  } finally {
    if (descriptor !== undefined) fs.closeSync(descriptor);
  }
  try {
    const catalog = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    if (!validCatalog(catalog)) throw new Error();
    return catalog;
  } catch { throw new Error('Invalid prepared agency catalog'); }
}

export function selectSkills(catalog, filters = {}) {
  return catalog.skills.filter(skill =>
    (!filters.department || skill.department === filters.department) &&
    (!filters.platform || skill.platform === filters.platform) &&
    (!filters.query || `${skill.id} ${skill.description}`.toLowerCase().includes(filters.query.toLowerCase())));
}
