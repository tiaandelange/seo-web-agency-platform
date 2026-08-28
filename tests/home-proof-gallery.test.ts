import { describe, expect, it } from 'vitest';
import { showcaseProjects } from '@/data/projects-showcase';

const PROOF_SLUGS = ['damtech-website', 'proplytic-property-software'] as const;

describe('homepage proof gallery', () => {
  it('registers native capture dimensions for authorised proof projects', () => {
    for (const slug of PROOF_SLUGS) {
      const project = showcaseProjects.find((p) => p.slug === slug);
      expect(project?.proofMedia).toBeDefined();
      expect(project?.proofMedia?.desktop.width).toBe(1440);
      expect(project?.proofMedia?.desktop.height).toBe(900);
      expect(project?.proofMedia?.mobile.width).toBeGreaterThan(600);
      expect(project?.proofMedia?.mobile.height).toBeGreaterThan(
        project!.proofMedia!.mobile.width,
      );
    }
  });

  it('labels live client work separately from internal product captures', () => {
    const damtech = showcaseProjects.find((p) => p.slug === 'damtech-website')!;
    const proplytic = showcaseProjects.find((p) => p.slug === 'proplytic-property-software')!;
    expect(damtech.statusLabel).toBe('Live project');
    expect(proplytic.statusLabel).toBe('Internal product');
    expect(damtech.proofMedia?.desktop.caption.toLowerCase()).toContain('live client');
    expect(proplytic.proofMedia?.desktop.caption.toLowerCase()).toContain('internal product');
  });

  it('links proof rows to indexable case studies', () => {
    for (const slug of PROOF_SLUGS) {
      const project = showcaseProjects.find((p) => p.slug === slug);
      expect(project?.href).toBe(`/projects/${slug}/`);
    }
  });
});
