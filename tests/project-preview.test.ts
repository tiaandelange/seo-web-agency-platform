import { describe, expect, it } from 'vitest';
import {
  featuredShowcaseProject,
  secondaryShowcaseProjects,
  showcaseProjects,
} from '@/data/projects-showcase';
import { projectPreviewSources, previewSourceById } from '@/data/project-preview-sources';
import {
  PREVIEW_CANVAS_WIDTH,
  previewCanvasHeight,
  previewDisplayHeightClass,
} from '@/components/projects/project-preview/preview-config';

describe('projects showcase data', () => {
  it('renders three projects with Damtech featured', () => {
    expect(showcaseProjects).toHaveLength(3);
    expect(featuredShowcaseProject.previewId).toBe('damtech');
    expect(featuredShowcaseProject.featured).toBe(true);
    expect(secondaryShowcaseProjects).toHaveLength(2);
  });

  it('maps each project to a preview id and case-study or quote href', () => {
    for (const project of showcaseProjects) {
      expect(project.previewId).toMatch(/^(damtech|proplytic|wedding)$/);
      expect(project.href.startsWith('/')).toBe(true);
    }
  });
});

describe('project preview provenance manifest', () => {
  it('records all preview ids', () => {
    expect(projectPreviewSources.map((entry) => entry.id).sort()).toEqual([
      'damtech',
      'proplytic',
      'wedding',
    ]);
  });

  it('records proplytic repository lineage', () => {
    const proplytic = previewSourceById('proplytic');
    expect(proplytic.repositoryFullName).toBe('AfriviveSA/Property-Website');
    expect(proplytic.localSourcePath).toContain('Property-Website');
  });

  it('records wedding local source path', () => {
    const wedding = previewSourceById('wedding');
    expect(wedding.localSourcePath).toContain('Wedding-site');
  });
});

describe('project preview viewports', () => {
  it('uses a 1440px desktop canvas', () => {
    expect(PREVIEW_CANVAS_WIDTH).toBe(1440);
    expect(previewCanvasHeight('damtech', true)).toBeGreaterThan(900);
    expect(previewDisplayHeightClass('proplytic')).toContain('h-[');
  });
});
