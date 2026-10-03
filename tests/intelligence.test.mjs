import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const taxonomy = JSON.parse(fs.readFileSync(new URL('../agency/taxonomy.json', import.meta.url)));
const desks = ['mobile-store-intelligence', 'mobile-influencer-intelligence', 'mobile-ad-intelligence', 'mobile-seo-intelligence'];
test('all intelligence desks have one classification and shared platform coverage', () => {
  for (const id of desks) {
    assert.equal(taxonomy.groups.filter(group => group.skills.includes(id)).length, 1, id);
    assert.equal(taxonomy.platforms[id], 'shared', id);
  }
});
test('public Actor routes contain verified schemas without execution authority', () => {
  const catalog = JSON.parse(fs.readFileSync(new URL('../skills/apify-mobile-research/references/actor-catalog.json', import.meta.url)));
  const channels = new Set(catalog.actors.flatMap(actor => actor.channels));
  for (const channel of ['apple-app-store','google-play','tiktok','instagram','youtube','meta-ads','tiktok-ads','google-ads','seo']) assert.ok(channels.has(channel), channel);
  assert.equal(catalog.executionEnabled, false);
  assert.ok(catalog.actors.length >= 12);
  assert.equal(new Set(catalog.actors.map(actor => actor.actor)).size, catalog.actors.length);
  for (const actor of catalog.actors) {
    assert.match(actor.actor, /^khadinakbar\/[a-z0-9-]+$/);
    assert.equal(actor.isPublic, true);
    assert.match(actor.schemaSha256, /^[a-f0-9]{64}$/);
    assert.ok(Object.keys(actor.schemaFields).length > 0);
    assert.equal(actor.executionVerified, false);
    assert.ok(Number.isFinite(Date.parse(actor.verifiedAt)));
    assert.equal(actor.storeUrl, `https://apify.com/${actor.actor}`);
  }
});
