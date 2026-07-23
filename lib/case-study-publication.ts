import type { Project } from '@/types/content';

export type CaseStudyGateResult = {
  ok: boolean;
  blockers: string[];
};

/**
 * Explicit case-study publication gate (Prompt 5). Indexation requires this
 * plus `ownerCaseStudyIndexApproval` and `!noindex` via `isProjectIndexable`.
 */
export function evaluateCaseStudyPublicationGate(project: Project): CaseStudyGateResult {
  const blockers: string[] = [];

  if (project.placeholder) blockers.push('marked placeholder');
  if (project.classification === 'template' || project.status === 'template') {
    blockers.push('template classification');
  }
  if (!project.publishPermission) blockers.push('publishPermission false');
  if (!project.featuredImage?.src) blockers.push('missing featured screenshot');
  if (!project.featuredImage?.alt?.trim()) blockers.push('featured image missing alt');
  if (project.gallery.length === 0) blockers.push('missing gallery screenshot');
  if (!project.businessProblem.trim()) blockers.push('missing business problem');
  if (project.objectives.length === 0) blockers.push('missing objectives');
  if (project.scope.length === 0) blockers.push('missing scope');
  if (!project.solutionSummary.trim()) blockers.push('missing solution summary');
  if (project.process.length === 0) blockers.push('missing process');
  if (project.keyFunctionality.length === 0) blockers.push('missing key functionality');
  if (project.stack.length === 0) blockers.push('missing stack');
  if (project.serviceSlugs.length === 0) blockers.push('missing related services');
  if (!project.currentStatusNarrative?.trim()) blockers.push('missing current status narrative');
  if (!project.caseStudyNarrativeComplete) blockers.push('caseStudyNarrativeComplete false');
  if (!project.ownerCaseStudyIndexApproval) {
    blockers.push('ownerCaseStudyIndexApproval false');
  }
  if (project.noindex) blockers.push('noindex still true');

  return { ok: blockers.length === 0, blockers };
}

/** Narrative readiness for internal review (does not imply indexable). */
export function isCaseStudyNarrativeReady(project: Project): boolean {
  const { blockers } = evaluateCaseStudyPublicationGate({
    ...project,
    // Ignore index-specific flags when checking narrative completeness only.
    noindex: false,
    ownerCaseStudyIndexApproval: true,
  });
  return blockers.length === 0;
}
