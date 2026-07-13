import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const rules = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8');

test('public client creation is disabled for every lead collection', () => {
  for (const collection of ['leads', 'offer_leads', 'job_applications']) {
    const block = rules.match(new RegExp(`match /${collection}/\\{documentId\\} \\{([\\s\\S]*?)\\n    \\}`))?.[1] ?? '';
    assert.match(block, /allow create: if false;/, collection);
  }
});

test('admin list access is bounded and updates are field-restricted', () => {
  assert.match(rules, /request\.query\.limit <= 100/);
  assert.match(rules, /affectedKeys\(\)[\s\S]*hasOnly\(\['status', 'updatedAt', 'expiresAt'\]\)/);
});

test('manual deletion audit records are immutable', () => {
  assert.match(rules, /match \/admin_audit_logs/);
  assert.match(rules, /allow update, delete: if false;/);
});
