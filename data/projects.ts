import type { Project, ProjectCategory } from '@/types/content';
import { contractorWebsiteTemplate } from '@/content/projects/contractor-website-template';
import { catalogueRfqWebsiteTemplate } from '@/content/projects/catalogue-rfq-website-template';
import { propertyManagementSystemTemplate } from '@/content/projects/property-management-system-template';
import { adminQuotationPlatformTemplate } from '@/content/projects/admin-quotation-platform-template';

/**
 * Project registry. Individual case studies live in content/projects/ (one file
 * each — see docs/content/CASE-STUDY-FRAMEWORK.md). Integrity rule (validator +
 * effectiveNoindex): publishPermission: false ⇒ page is noindex regardless of
 * its own noindex field (D-07).
 */
export const projects: Project[] = [
  contractorWebsiteTemplate,
  catalogueRfqWebsiteTemplate,
  propertyManagementSystemTemplate,
  adminQuotationPlatformTemplate,
];

export const projectCategories: { slug: ProjectCategory; title: string; heading: string; description: string }[] = [
  {
    slug: 'websites',
    title: 'Website Projects',
    heading: 'Website projects',
    description: 'Business, lead-generation and catalogue website builds.',
  },
  {
    slug: 'ecommerce',
    title: 'Ecommerce Projects',
    heading: 'Ecommerce projects',
    description: 'Online stores and quotable catalogue commerce.',
  },
  {
    slug: 'admin-systems',
    title: 'Admin & System Projects',
    heading: 'Admin and system projects',
    description: 'Admin panels, quotation platforms, portals and custom applications.',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.categories.includes(category));
}

/** True indexability: permission + explicit flag (D-07). */
export function isProjectIndexable(p: Project): boolean {
  return p.publishPermission && !p.noindex && !p.placeholder && p.status !== 'template';
}

/** A category page is indexable only when it lists ≥1 real (indexable) project. */
export function isProjectCategoryIndexable(category: ProjectCategory): boolean {
  return getProjectsByCategory(category).some(isProjectIndexable);
}
