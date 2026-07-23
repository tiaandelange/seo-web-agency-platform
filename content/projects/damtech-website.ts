import type { Project } from '@/types/content';

/**
 * Damtech lead-generation website — owner-authorised publication (2026-07-22).
 * Live site: https://dam-tech.co.za
 *
 * Screenshots captured 2026-07-23 from the live homepage. Indexation stays
 * noindex until the case-study narrative clears the remaining publication gate.
 * No testimonials or unverified metrics (D-07 / D-10).
 */
export const damtechWebsite: Project = {
  slug: 'damtech-website',
  title: 'Damtech Website — Dam Lining & Water Storage Lead Generation',
  metaDescription:
    'How Koppie Systems structured Damtech’s South African dam-lining and water-storage website for service clarity, quote requests and nationwide reach.',
  heading: 'Damtech: dam lining and water-storage website',
  intro:
    'Damtech needed a clear, enquiry-ready website for HDPE and PVC dam linings, steel reservoirs and waterproofing — serving farms, mines, estates and commercial sites across South Africa. The live site is dam-tech.co.za.',
  status: 'live',
  noindex: true,
  placeholder: false,
  dateCreated: '2026-07-22',
  dateUpdated: '2026-07-23',
  clientDescriptor: 'Damtech',
  industry: 'Construction / water infrastructure',
  location: 'South Africa (nationwide service)',
  projectType: 'Lead-generation website',
  categories: ['websites'],
  serviceSlugs: ['lead-generation-websites', 'seo-website-development', 'business-websites'],
  solutionSlug: 'contractors',
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  businessProblem:
    'A specialist dam-lining and water-storage contractor needed visitors to understand the offer quickly — linings, reservoirs, waterproofing and maintenance — and to request a quote or call without wading through unstructured pages.',
  objectives: [
    'Present core services with clear pathways to quote and phone contact',
    'Show completed project evidence by region and application type',
    'Support nationwide service messaging without inventing local offices',
  ],
  scope: [
    'Service architecture for dam linings, steel reservoirs, waterproofing and maintenance',
    'Project showcase structure with location and application context',
    'Quote and contact flows with direct telephone call-to-action',
    'Warranty and commitment messaging aligned to supplier and workmanship terms stated on the live site',
  ],
  solutionSummary:
    'A lead-generation website organised around Damtech’s real services and project proof, with quote and call actions positioned for buyers researching linings, tanks and waterproofing online.',
  process: [
    'Discovery of services, geographies and proof assets',
    'Information architecture for services, projects and contact',
    'Build and content load against the live offer',
    'Launch of dam-tech.co.za',
  ],
  keyFunctionality: [
    'Service pages for linings, reservoirs, waterproofing and maintenance',
    'Project examples with location and application labels',
    'Quote request and telephone contact pathways',
  ],
  seoWork: [
    'Service-led page structure matching commercial search intents',
    'Clear headings and descriptive copy for technical buyers',
    'Internal links between services, projects and contact',
  ],
  results: [],
  dates: {},
  projectStatus: 'completed',
  publishPermission: true,
  featuredImage: {
    src: '/images/work/damtech-desktop.webp',
    alt: 'Desktop screenshot of the Damtech homepage showing dam-lining and water-storage services with a quote call to action',
    width: 1440,
    height: 900,
  },
  gallery: [
    {
      src: '/images/work/damtech-mobile.webp',
      alt: 'Mobile screenshot of the Damtech homepage hero and primary navigation',
      width: 390,
      height: 844,
    },
  ],
  relatedProjectSlugs: ['proplytic-property-software'],
  relatedArticleSlugs: ['what-is-an-seo-first-website'],
};
