import { describe, expect, it } from 'vitest';
import { normalizeWebsiteUrl } from '../lib/website-url';

describe('normalizeWebsiteUrl', () => {
  it('allows empty optional values', () => {
    expect(normalizeWebsiteUrl('')).toEqual({ ok: true, value: '' });
  });

  it('normalises bare domains to https', () => {
    const result = normalizeWebsiteUrl('example.co.za');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('https://example.co.za/');
  });

  it('rejects clearly invalid values', () => {
    expect(normalizeWebsiteUrl('not a url')).toEqual({ ok: false });
  });
});
