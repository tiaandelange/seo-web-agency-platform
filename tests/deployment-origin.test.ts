import { afterEach, describe, expect, it, vi } from 'vitest';
import { validateDeploymentOrigin } from '../lib/validate';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('validateDeploymentOrigin', () => {
  it('passes on local default (no Vercel production, no SITE_ENV=production)', () => {
    const report = { errors: [] as string[], warnings: [] as string[] };
    validateDeploymentOrigin(report);
    expect(report.errors.filter((e) => e.startsWith('[origin]'))).toEqual([]);
  });

  it('fails when SITE_ENV=production but SITE_URL is localhost', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000');
    const report = { errors: [] as string[], warnings: [] as string[] };
    validateDeploymentOrigin(report);
    expect(report.errors.some((e) => e.includes('NEXT_PUBLIC_SITE_URL=https://www.koppiesystems.co.za'))).toBe(true);
  });

  it('fails when Vercel Production lacks production site env', () => {
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_ENV', 'preview');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.vercel.app');
    const report = { errors: [] as string[], warnings: [] as string[] };
    validateDeploymentOrigin(report);
    expect(report.errors.some((e) => e.includes('NEXT_PUBLIC_SITE_ENV=production'))).toBe(true);
  });

  it('passes when Vercel Production has correct origin', () => {
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.koppiesystems.co.za');
    const report = { errors: [] as string[], warnings: [] as string[] };
    validateDeploymentOrigin(report);
    expect(report.errors.filter((e) => e.startsWith('[origin]'))).toEqual([]);
  });
});
