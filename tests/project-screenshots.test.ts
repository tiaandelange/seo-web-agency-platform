import { describe, expect, it } from 'vitest';
import { existsSync } from 'fs';
import path from 'path';
import {
  featuredShowcaseProject,
  showcaseProjects,
  secondaryShowcaseProjects,
} from '@/data/projects-showcase';
import { PROJECT_SHOT_ASPECT } from '@/components/projects/project-screenshot';
import { getProject } from '@/data/projects';

const root = path.resolve(__dirname, '..');

describe('project showcase screenshots', () => {
  it('features Damtech and lists three selected projects', () => {
    expect(featuredShowcaseProject.slug).toBe('damtech-website');
    expect(featuredShowcaseProject.desktopSrc).toContain('damtech-desktop');
    expect(showcaseProjects).toHaveLength(3);
    expect(secondaryShowcaseProjects).toHaveLength(2);
  });

  it('uses truthful public status labels without pending wording', () => {
    for (const project of showcaseProjects) {
      expect(project.statusLabel.toLowerCase()).not.toMatch(/pending|in preparation/);
      expect(project.statusLabel.length).toBeGreaterThan(3);
    }
    expect(showcaseProjects.map((p) => p.statusLabel)).toEqual([
      'Live project',
      'Live project',
      'Personal event website',
    ]);
  });

  it('ships desktop and mobile webp assets for every showcase project', () => {
    for (const project of showcaseProjects) {
      expect(project.desktopSrc.endsWith('.webp')).toBe(true);
      expect(project.mobileSrc.endsWith('.webp')).toBe(true);
      expect(existsSync(path.join(root, 'public', project.desktopSrc.replace(/^\//, '')))).toBe(true);
      expect(existsSync(path.join(root, 'public', project.mobileSrc.replace(/^\//, '')))).toBe(true);
    }
  });

  it('keeps a consistent 16:9 screenshot frame', () => {
    expect(PROJECT_SHOT_ASPECT.width / PROJECT_SHOT_ASPECT.height).toBeCloseTo(16 / 9, 5);
  });

  it('attaches screenshot evidence on Damtech and Proplytic case studies', () => {
    for (const slug of ['damtech-website', 'proplytic-property-software']) {
      const project = getProject(slug);
      expect(project?.featuredImage?.src).toMatch(/\/images\/work\//);
      expect(project?.featuredImage?.alt.length).toBeGreaterThan(20);
      expect(project?.gallery[0]?.src).toMatch(/\/images\/work\//);
      expect(project?.placeholder).toBe(false);
      expect(project?.noindex).toBe(true);
    }
  });
});
