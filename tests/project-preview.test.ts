import { describe, expect, it } from 'vitest';
import {
  featuredShowcaseProject,
  secondaryShowcaseProjects,
  showcaseProjects,
} from '@/data/projects-showcase';
import { projectPreviewSources, previewSourceById } from '@/data/project-preview-sources';
import {
  PREVIEW_CANVAS_WIDTH,
  PREVIEW_DESKTOP_SIZE,
  PREVIEW_MOBILE_SIZE,
  previewDesktopSize,
  previewMobileSize,
} from '@/components/projects/project-preview/preview-config';
import {
  PREVIEW_MOBILE_BREAKPOINT,
  resolvePreviewMode,
} from '@/components/projects/project-preview/use-preview-scale';

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

  it('records local source folders and commit SHAs', () => {
    expect(previewSourceById('damtech').localSourceFolder).toBe('Damtech-Website');
    expect(previewSourceById('damtech').sourceCommit).toMatch(/^[a-f0-9]{40}$/);
    expect(previewSourceById('proplytic').localSourceFolder).toBe('PropertyGuy');
    expect(previewSourceById('proplytic').sourceCommit).toMatch(/^[a-f0-9]{40}$/);
    expect(previewSourceById('wedding').localSourceFolder).toBe('Wedding_site');
    expect(previewSourceById('wedding').sourceCommit).toMatch(/^[a-f0-9]{40}$/);
  });

  it('does not embed absolute Windows paths in provenance', () => {
    const serialized = JSON.stringify(projectPreviewSources);
    expect(serialized).not.toMatch(/C:\\\\Users/);
    expect(serialized).not.toMatch(/C:\/Users/);
  });
});

describe('project preview viewports', () => {
  it('uses fixed desktop and mobile reference canvases', () => {
    expect(PREVIEW_CANVAS_WIDTH).toBe(1440);
    expect(previewDesktopSize('damtech').width).toBe(1440);
    expect(previewDesktopSize('damtech').height).toBeGreaterThan(800);
    expect(previewMobileSize('proplytic').width).toBe(390);
    expect(PREVIEW_DESKTOP_SIZE.wedding.height).toBe(960);
    expect(PREVIEW_MOBILE_SIZE.wedding.width).toBe(390);
  });

  it('switches preview mode from container width', () => {
    expect(resolvePreviewMode(PREVIEW_MOBILE_BREAKPOINT - 1)).toBe('mobile');
    expect(resolvePreviewMode(PREVIEW_MOBILE_BREAKPOINT)).toBe('desktop');
    expect(resolvePreviewMode(1200)).toBe('desktop');
  });
});
