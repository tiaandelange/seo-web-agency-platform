import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '..');

describe('homepage contextual action ledgers', () => {
  it('inserts three mid-page ledger bands plus a closing ink band', () => {
    const page = readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
    expect(page).toContain('HomeActionLedger');
    expect(page).toContain('id="home-action-after-proof"');
    expect(page).toContain('id="home-action-after-method"');
    expect(page).toContain('id="home-action-after-pricing"');
    expect(page).toContain('id="home-action-closing"');
    expect(page).not.toContain('CtaQuote');
  });

  it('pairs proof band with proposal primary and quieter work link', () => {
    const page = readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
    expect(page).toContain('Inspect our work');
    expect(page).toContain('secondaryHref="/projects/"');
  });

  it('moves process documentation link into the method ledger', () => {
    const spine = readFileSync(path.join(root, 'components/home/methodology-spine.tsx'), 'utf8');
    const page = readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
    expect(spine).not.toContain('Full process documentation');
    expect(page).toContain('Full process documentation');
    expect(page).toContain('secondaryHref="/process/"');
  });

  it('removes duplicate copper CTA from packages focus card', () => {
    const packages = readFileSync(
      path.join(root, 'components/home/home-packages-focus.tsx'),
      'utf8',
    );
    expect(packages).not.toContain('bg-cta');
    expect(packages).toContain('/website-packages/');
  });

  it('styles ledger bands without generic CtaQuote card shell', () => {
    const css = readFileSync(path.join(root, 'app/globals.css'), 'utf8');
    const ledger = readFileSync(path.join(root, 'components/home/home-action-ledger.tsx'), 'utf8');
    expect(css).toContain('.home-action-ledger--sandstone');
    expect(css).toContain('.home-action-ledger--ink');
    expect(ledger).toContain('home-action-ledger__primary');
    expect(ledger).not.toContain('shadow-card');
  });
});
