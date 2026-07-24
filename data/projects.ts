import type { Project, ProjectCategory } from '@/types/content';
import { damtechWebsite } from '@/content/projects/damtech-website';
import { proplyticPropertySoftware } from '@/content/projects/proplytic-property-software';
import { catalogueRfqWebsiteTemplate } from '@/content/projects/catalogue-rfq-website-template';
import { adminQuotationPlatformTemplate } from '@/content/projects/admin-quotation-platform-template';
import { evaluateCaseStudyPublicationGate } from '@/lib/case-study-publication';

/**
 * Project registry. Individual case studies live in content/projects/ (one file
 * each — see docs/content/CASE-STUDY-FRAMEWORK.md). Integrity rule (validator +
 * effectiveNoindex): publishPermission: false ⇒ page is noindex regardless of
 * its own noindex field (D-07).
 *
 * Damtech + Proplytic: owner-authorised naming (2026-07-22). Screenshots,
 * narratives, and owner index approval completed 2026-07-23 (D-43).
 */
export const projects: Project[] = [
  damtechWebsite,
  proplyticPropertySoftware,
  catalogueRfqWebsiteTemplate,
  adminQuotationPlatformTemplate,
];

export const projectCategories: {
  slug: ProjectCategory;
  title: string;
  heading: string;
  description: string;
}[] = [
  {
    slug: 'websites',
    title: 'Website Projects',
    heading: 'Website projects',
    description:
      'Business, lead-generation and catalogue website builds for technical and service companies. These case studies focus on how search architecture, service pages and enquiry pathways were designed around real buyer behaviour — not template brochureware. Each published study states the problem, the page map and systems delivered, and what was deliberately left out. Projects appear here only with client permission and cleared screenshots; template or draft work stays noindex until that gate is met. If you need a similar site, start with the matching service or package page, then use a case study to see how the method looks in practice for an industrial or service operator.',
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
    description:
      'Admin panels, quotation platforms, portals and custom applications that sit behind a marketing site or replace email-and-spreadsheet operations. Studies in this category emphasise intake, status tracking, quoting and handover — the work buyers never see but that determines whether an enquiry becomes a closed job. We publish architecture and delivery notes, not invented throughput metrics. Permissioned projects only; templates remain gated until real evidence and imagery are approved. For a similar scope, pair this category with our RFQ, portal or custom application services and ask for a discovery-led quote.',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.categories.includes(category));
}

/**
 * True indexability: naming permission + explicit flags + publication gate
 * (D-07 / Prompt 5). Templates never index.
 */
export function isProjectIndexable(p: Project): boolean {
  if (!p.publishPermission) return false;
  if (p.noindex) return false;
  if (p.placeholder) return false;
  if (p.status === 'template' || p.classification === 'template') return false;
  if (!p.ownerCaseStudyIndexApproval) return false;
  return evaluateCaseStudyPublicationGate(p).ok;
}

/** A category page is indexable only when it lists ≥1 real (indexable) project. */
export function isProjectCategoryIndexable(category: ProjectCategory): boolean {
  return getProjectsByCategory(category).some(isProjectIndexable);
}
