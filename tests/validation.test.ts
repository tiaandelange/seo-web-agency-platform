import { describe, expect, it } from 'vitest';
import { runAllValidations } from '../lib/validate';

describe('sitewide SEO validation', () => {
  const report = runAllValidations();

  it('has no validation errors', () => {
    expect(report.errors).toEqual([]);
  });

  it('reports warnings without failing the build (visibility only)', () => {
    // Warnings are allowed; log them so they stay visible in test output.
    for (const warning of report.warnings) {
      console.warn(warning);
    }
    expect(Array.isArray(report.warnings)).toBe(true);
  });
});
