export function normalizeTarget(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (/^(https?:|mailto:|tel:)/i.test(t)) return t;
  if (/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(t)) return `mailto:${t}`;
  if (/^[+]?[\d][\d\s().-]{6,}$/.test(t)) return `tel:${t.replace(/[^\d+]/g, "")}`;
  if (/^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(t)) return `https://${t}`;
  return t;
}
