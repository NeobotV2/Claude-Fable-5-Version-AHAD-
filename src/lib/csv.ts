/** Neutralize values that spreadsheet programs could interpret as formulas. */
export function neutralizeSpreadsheetFormula(value: unknown): string {
  const rendered = Array.isArray(value) ? value.join(', ') : String(value ?? '');
  const clean = rendered.replace(/\0/g, '');
  return /(^|[\r\n])[\s]*[=+\-@]/u.test(clean) ? `'${clean}` : clean;
}

export function buildSemicolonCsv(columns: readonly string[], rows: readonly (readonly unknown[])[]): string {
  const cell = (value: unknown) => `"${neutralizeSpreadsheetFormula(value).replace(/"/g, '""')}"`;
  return [columns.map(cell).join(';'), ...rows.map((row) => columns.map((_, index) => cell(row[index])).join(';'))].join('\r\n');
}
