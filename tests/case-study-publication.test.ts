import { describe, expect, it } from 'vitest';
import { getProject, isProjectIndexable, projects } from '../data/projects';
import { getAllRoutes } from '../lib/routes';
import {
  evaluateCaseStudyPublicationGate,
  isCaseStudyNarrativeReady,
} from '../lib/case-study-publication';
import { existsSync } from 'fs';
import { join } from 'path';

describe('case study publication gate', () => {
  const damtech = getProject('damtech-website')!;
  const proplytic = getProject('proplytic-property-software')!;

  it('Damtech and Proplytic pass the publication gate and are indexable', () => {
    expect(damtech.caseStudyNarrativeComplete).toBe(true);
    expect(proplytic.caseStudyNarrativeComplete).toBe(true);
    expect(isCaseStudyNarrativeReady(damtech)).toBe(true);
    expect(isCaseStudyNarrativeReady(proplytic)).toBe(true);
    expect(damtech.ownerCaseStudyIndexApproval).toBe(true);
    expect(proplytic.ownerCaseStudyIndexApproval).toBe(true);
    expect(damtech.noindex).toBe(false);
    expect(proplytic.noindex).toBe(false);
    expect(evaluateCaseStudyPublicationGate(damtech).ok).toBe(true);
    expect(evaluateCaseStudyPublicationGate(proplytic).ok).toBe(true);
    expect(isProjectIndexable(damtech)).toBe(true);
    expect(isProjectIndexable(proplytic)).toBe(true);
  });

  it('includes real case studies in the sitemap', () => {
    const routes = getAllRoutes();
    expect(routes.find((r) => r.path === '/projects/damtech-website/')?.index).toBe(true);
    expect(routes.find((r) => r.path === '/projects/proplytic-property-software/')?.index).toBe(
      true,
    );
    expect(routes.find((r) => r.path === '/projects/websites/')?.index).toBe(true);
    expect(routes.find((r) => r.path === '/projects/admin-systems/')?.index).toBe(true);
  });

  it('does not use template classification for real projects', () => {
    expect(damtech.classification).toBe('client-project');
    expect(proplytic.classification).toBe('internal-product');
    expect(damtech.classification).not.toBe('template');
    expect(proplytic.classification).not.toBe('template');
  });

  it('ships required screenshots on disk', () => {
    for (const project of [damtech, proplytic]) {
      expect(project.featuredImage?.src).toBeTruthy();
      expect(
        existsSync(join(process.cwd(), 'public', project.featuredImage!.src.replace(/^\//, ''))),
      ).toBe(true);
      expect(project.gallery.length).toBeGreaterThan(0);
      for (const image of project.gallery) {
        expect(existsSync(join(process.cwd(), 'public', image.src.replace(/^\//, '')))).toBe(true);
        expect(image.alt.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('includes required narrative sections and related services', () => {
    for (const project of [damtech, proplytic]) {
      expect(project.businessProblem.length).toBeGreaterThan(40);
      expect(project.objectives.length).toBeGreaterThan(0);
      expect(project.scope.length).toBeGreaterThan(0);
      expect(project.solutionSummary.length).toBeGreaterThan(40);
      expect(project.process.length).toBeGreaterThan(0);
      expect(project.keyFunctionality.length).toBeGreaterThan(0);
      expect(project.constraints?.length).toBeGreaterThan(0);
      expect(project.currentStatusNarrative?.length).toBeGreaterThan(40);
      expect(project.serviceSlugs.length).toBeGreaterThan(0);
      expect(project.liveUrl?.startsWith('https://')).toBe(true);
      expect(project.results.every((r) => r.verified)).toBe(true);
    }
  });

  it('templates remain non-indexable', () => {
    const templates = projects.filter((p) => p.classification === 'template');
    expect(templates.length).toBeGreaterThan(0);
    for (const project of templates) {
      expect(isProjectIndexable(project)).toBe(false);
      expect(evaluateCaseStudyPublicationGate(project).ok).toBe(false);
    }
  });
});
