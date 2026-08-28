import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import path from 'path';
import { featuredShowcaseProject } from '@/data/projects-showcase';

const root = path.resolve(__dirname, '..');

describe('projects proof journey layout', () => {
  it('features Damtech screenshot in the projects hero aside', () => {
    const hero = readFileSync(path.join(root, 'components/projects/projects-hero.tsx'), 'utf8');
    expect(hero).toContain('asideLayout="proof"');
    expect(hero).toContain('featuredShowcaseProject.desktopSrc');
    expect(hero).toContain('priority');
    expect(featuredShowcaseProject.slug).toBe('damtech-website');
    expect(featuredShowcaseProject.proofMedia).toBeDefined();
  });

  it('moves publication policy into a compact ledger below the hero', () => {
    const page = readFileSync(path.join(root, 'app/projects/page.tsx'), 'utf8');
    const ledger = readFileSync(
      path.join(root, 'components/projects/projects-publication-ledger.tsx'),
      'utf8',
    );
    expect(page).toContain('ProjectsPublicationLedger');
    expect(page).not.toContain('What you will find here');
    expect(ledger).toContain('owner permission');
    expect(ledger).toContain('traffic figures, rankings or');
    expect(ledger).toContain('testimonials');
    expect(ledger).toContain('measurement');
    expect(ledger).toContain('wiring and the process pages');
  });

  it('uses split proof frames in the Damtech case-study hero', () => {
    const casePage = readFileSync(path.join(root, 'app/projects/[slug]/page.tsx'), 'utf8');
    const caseHero = readFileSync(path.join(root, 'components/projects/case-study-hero.tsx'), 'utf8');
    expect(casePage).toContain('CaseStudyHero');
    expect(casePage).toContain('heroProofReady');
    expect(caseHero).toContain('CaseStudyHeroProof');
    expect(caseHero).toContain('asideLayout="proof"');
    expect(caseHero).toContain('trailingMeta');
    expect(caseHero).toContain('case study on this page is primary');
  });

  it('avoids duplicate hero media on the featured projects card', () => {
    const selected = readFileSync(path.join(root, 'components/projects/selected-projects.tsx'), 'utf8');
    expect(selected).toContain('omitMedia');
  });
});
