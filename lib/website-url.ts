/** Accept bare domains; reject clearly invalid strings. Empty is valid (optional field). */
export function normalizeWebsiteUrl(raw: string): { ok: true; value: string } | { ok: false } {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, value: '' };

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withProtocol);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return { ok: false };
    if (!parsed.hostname.includes('.')) return { ok: false };
    return { ok: true, value: parsed.toString().slice(0, 500) };
  } catch {
    return { ok: false };
  }
}
