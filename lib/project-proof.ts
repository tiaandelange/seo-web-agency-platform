import type { Project } from '@/types/content';
import type { RelatedItem } from '@/components/related-content';
import { getProject } from '@/data/projects';

/** Related-content `kind` from classification — never “Project” for templates. */
export function relatedItemKindForProject(project: Project): string {
  switch (project.classification) {
    case 'client-project':
      return 'Project';
    case 'internal-product':
      return 'Internal product';
    case 'personal-project':
      return 'Personal project';
    case 'illustrative-demo':
      return 'Illustrative workflow demo';
    case 'template':
      return 'Template example';
    default: {
      const _exhaustive: never = project.classification;
      return _exhaustive;
    }
  }
}

/**
 * True when a project may be presented as commercial proof (not a template /
 * placeholder illustration posing as a completed client engagement).
 */
export function isPublicProofProject(project: Project): boolean {
  if (project.classification === 'template') return false;
  if (project.placeholder) return false;
  if (project.evidenceLevel === 'none') return false;
  return true;
}

/**
 * Build related-project cards. Templates and placeholders are skipped — never
 * labelled as “Project”. When nothing truthful remains, optionally fall back to
 * the Work hub so the section does not vanish awkwardly.
 */
export function relatedProjectItems(
  slugs: string[],
  options: { fallbackToWork?: boolean } = {},
): RelatedItem[] {
  const items: RelatedItem[] = [];
  let skippedNonProof = false;

  for (const slug of slugs) {
    const project = getProject(slug);
    if (!project) continue;
    if (!isPublicProofProject(project)) {
      skippedNonProof = true;
      continue;
    }
    items.push({
      title: project.heading,
      href: `/projects/${project.slug}/`,
      kind: relatedItemKindForProject(project),
    });
  }

  if (items.length === 0 && (skippedNonProof || options.fallbackToWork)) {
    items.push({
      title: 'Selected work and project examples',
      href: '/projects/',
      kind: 'Work',
    });
  }

  return items;
}

/** Client-facing language is only allowed for genuine client projects. */
export function allowsClientLanguage(project: Project): boolean {
  return project.classification === 'client-project';
}
