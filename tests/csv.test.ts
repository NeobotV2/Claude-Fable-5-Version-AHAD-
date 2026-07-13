import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSemicolonCsv, neutralizeSpreadsheetFormula } from '../src/lib/csv.ts';

test('neutralizes common spreadsheet formula prefixes including whitespace', () => {
  for (const value of ['=1+1', '+SUM(A1:A2)', '-2+3', '@cmd', '  =HYPERLINK("https://example.com")', '\t+1']) {
    assert.ok(neutralizeSpreadsheetFormula(value).startsWith("'"), value);
  }
  assert.equal(neutralizeSpreadsheetFormula('Muster GmbH'), 'Muster GmbH');
});

test('builds fixed-column semicolon CSV and escapes quotes', () => {
  const csv = buildSemicolonCsv(['Name', 'Notiz'], [['Muster', '=1+1'], ['Test', 'Er sagt "Hallo"']]);
  assert.match(csv, /"'=1\+1"/);
  assert.match(csv, /Er sagt ""Hallo""/);
  assert.equal(csv.split('\r\n').length, 3);
});
