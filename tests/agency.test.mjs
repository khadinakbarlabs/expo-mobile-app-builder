import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCatalog, selectSkills } from '../scripts/agency-catalog.mjs';

const fixture = {
  departments: [{ id: 'design', title: 'Design', agents: ['ux-designer'] }],
  groups: [{ department: 'design', id: 'experience', title: 'Experience', skills: ['design-paywall'] }],
};
const skills = [{ id: 'design-paywall', description: 'Design a paywall', platform: 'ios' }];

test('catalog fails if a real skill is missing from the taxonomy', () => {
  assert.throws(() => buildCatalog(fixture, [...skills, { id: 'new-skill' }]), /Unclassified/);
});
test('catalog rejects duplicate ownership and stale skill routes', () => {
  assert.throws(() => buildCatalog({ ...fixture, groups: [...fixture.groups, fixture.groups[0]] }, skills), /Duplicate/);
  assert.throws(() => buildCatalog(fixture, []), /Unknown skill/);
});
test('catalog rejects unknown departments and duplicate definitions', () => {
  assert.throws(() => buildCatalog({ ...fixture, departments: [] }, skills), /Unknown department/);
  assert.throws(() => buildCatalog({ ...fixture, departments: [fixture.departments[0], fixture.departments[0]] }, skills), /Duplicate department/);
});
test('filters return the exact platform and department match', () => {
  const catalog = buildCatalog(fixture, skills);
  assert.equal(selectSkills(catalog, { department: 'design', platform: 'ios', query: 'paywall' }).length, 1);
  assert.equal(selectSkills(catalog, { department: 'research' }).length, 0);
  assert.equal(selectSkills(catalog, { platform: 'android' }).length, 0);
});
test('explicit platform contracts reject missing or stale routes', () => {
  assert.throws(() => buildCatalog({ ...fixture, platforms: {} }, skills), /missing platform/);
  assert.throws(() => buildCatalog({ ...fixture, platforms: { 'design-paywall': 'ios', stale: 'android' } }, skills), /Unknown platform skill/);
  const catalog = buildCatalog({ ...fixture, platforms: { 'design-paywall': 'shared' } }, skills);
  assert.equal(catalog.skills[0].platform, 'shared');
});
