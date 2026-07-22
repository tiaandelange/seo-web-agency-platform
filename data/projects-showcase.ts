import type { ProjectPreviewId } from '@/data/project-preview-sources';

export type ProjectCardData = {
  slug: string;
  shortTitle: string;
  title: string;
  category: string;
  industry: string;
  summary: string;
  status: 'published' | 'authorised' | 'case-study-in-progress';
  statusLabel: string;
  scope: string[];
  ctaLabel: string;
  href: string;
  previewId: ProjectPreviewId;
  featured?: boolean;
  externalSiteUrl?: string;
};

export const showcaseProjects: ProjectCardData[] = [
  {
    slug: 'damtech-website',
    shortTitle: 'Damtech',
    title: 'Damtech: dam lining and water-storage website',
    category: 'Lead-generation website and operational system',
    industry: 'Construction / water infrastructure',
    summary:
      'A search-led digital platform structured around specialist water-storage services, enquiry capture and quotation workflows.',
    status: 'case-study-in-progress',
    statusLabel: 'Authorised · Case study in preparation',
    scope: [
      'SEO-led service architecture',
      'Quote and contact enquiry flows',
      'Project showcase by region and application',
      'Service pages for linings, reservoirs and waterproofing',
    ],
    ctaLabel: 'View Damtech project',
    href: '/projects/damtech-website/',
    previewId: 'damtech',
    featured: true,
    externalSiteUrl: 'https://dam-tech.co.za/',
  },
  {
    slug: 'proplytic-property-software',
    shortTitle: 'Proplytic',
    title: 'Proplytic: property portfolio software',
    category: 'Custom web application',
    industry: 'Property / PropTech',
    summary:
      'A structured web application designed to organise property portfolio information inside a controlled operational interface.',
    status: 'case-study-in-progress',
    statusLabel: 'Authorised · Screenshots pending',
    scope: [
      'Custom application architecture',
      'Portfolio dashboard and property records',
      'Rental admin and operational interface',
      'Investor-ready PDF export workflows',
    ],
    ctaLabel: 'View Proplytic project',
    href: '/projects/proplytic-property-software/',
    previewId: 'proplytic',
    externalSiteUrl: 'https://proplytic.co.za/',
  },
  {
    slug: 'wedding-website-portfolio',
    shortTitle: 'Wedding website',
    title: 'Responsive wedding information and RSVP website',
    category: 'Custom event website',
    industry: 'Events / hospitality',
    summary:
      'A responsive event website with ceremony information, guest guidance and a controlled RSVP flow — built as static-first frontend.',
    status: 'case-study-in-progress',
    statusLabel: 'Portfolio preview · publication pending',
    scope: [
      'Responsive static-first layout',
      'Ceremony and reception information architecture',
      'Guest-facing RSVP interface (demonstration)',
      'Decorative motion with reduced-motion support',
    ],
    ctaLabel: 'Discuss an event website',
    href: '/request-a-quote/?service_interest=business-websites&source=wedding-portfolio',
    previewId: 'wedding',
  },
];

export const featuredShowcaseProject = showcaseProjects.find((p) => p.featured)!;
export const secondaryShowcaseProjects = showcaseProjects.filter((p) => !p.featured);
