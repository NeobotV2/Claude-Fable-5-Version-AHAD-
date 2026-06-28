/**
 * Serialisiert ein JSON-LD-Objekt sicher fuer die Einbettung in ein
 * <script type="application/ld+json">-Tag.
 *
 * JSON.stringify allein escaped weder "<" noch die Sequenz "</script>".
 * Stuende ein solcher String im Schema (heute fliesst kein Nutzer-Input hinein,
 * aber als Haertung gegen kuenftige Aenderungen), koennte er aus dem Script-Tag
 * ausbrechen (XSS). Wir kodieren die kritischen Zeichen als Unicode-Escapes:
 * Fuer jeden JSON-Parser bleibt der Wert identisch, im HTML-Kontext ist er
 * jedoch harmlos. U+2028/U+2029 werden zusaetzlich escaped.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, String.raw`\u003c`)
    .replace(/>/g, String.raw`\u003e`)
    .replace(/&/g, String.raw`\u0026`)
    .replace(/\u2028/g, String.raw`\u2028`)
    .replace(/\u2029/g, String.raw`\u2029`);
}
