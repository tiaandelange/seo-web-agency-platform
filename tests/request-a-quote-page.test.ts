import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import path from 'path';
import {
  PROPOSAL_PROCESS_STEPS,
  PROPOSAL_REASSURANCE_CHIPS,
} from '@/data/proposal-page-copy';

const root = path.resolve(__dirname, '..');

describe('request-a-quote page layout', () => {
  it('uses Option A split without duplicate hero, ink band or Before you submit panel', () => {
    const page = readFileSync(path.join(root, 'app/request-a-quote/page.tsx'), 'utf8');
    expect(page).toContain('proposal-quote-split');
    expect(page).toContain('ProposalQuoteIntro');
    expect(page).toContain('ProposalQuoteSupport');
    expect(page).not.toContain('PageHero');
    expect(page).not.toContain('InkBand');
    expect(page).not.toContain('ProposalExpectations');
  });

  it('renders the recommended reassurance chip trio', () => {
    expect(PROPOSAL_REASSURANCE_CHIPS).toEqual([
      'No-obligation proposal',
      'Direct communication with the person scoping the work',
      'Your information is used only to handle your enquiry',
    ]);
    const chips = readFileSync(
      path.join(root, 'components/contact/proposal-reassurance-chips.tsx'),
      'utf8',
    );
    expect(chips).toContain('PROPOSAL_REASSURANCE_CHIPS');
  });

  it('preserves prefill wiring and configurator callout signal', () => {
    const page = readFileSync(path.join(root, 'app/request-a-quote/page.tsx'), 'utf8');
    expect(page).toContain('service_interest');
    expect(page).toContain('budget_band');
    expect(page).toContain('defaultMessage');
    expect(page).toContain('Enquiry via homepage system preview');
    expect(page).toContain('QuoteForm');
  });

  it('keeps process steps and helpful-to-prepare meaning in support column', () => {
    const support = readFileSync(
      path.join(root, 'components/contact/proposal-quote-context.tsx'),
      'utf8',
    );
    expect(PROPOSAL_PROCESS_STEPS.length).toBe(4);
    expect(support).toContain('Helpful to prepare');
    expect(support).toContain('brand.hours');
    expect(support).not.toContain('Before you submit');
  });

  it('styles split layout and chips in globals.css', () => {
    const css = readFileSync(path.join(root, 'app/globals.css'), 'utf8');
    expect(css).toContain('.proposal-quote-split');
    expect(css).toContain('.proposal-reassurance-chip');
  });
});
