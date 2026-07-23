export type ProjectCardData = {
  slug: string;
  shortTitle: string;
  title: string;
  category: string;
  industry: string;
  summary: string;
  status: 'live' | 'selected' | 'personal' | 'limited';
  /** Public-facing status chip — commercially suitable, truthful. */
  statusLabel: string;
  scope: string[];
  ctaLabel: string;
  href: string;
  featured?: boolean;
  externalSiteUrl?: string;
  desktopSrc: string;
  mobileSrc: string;
  imageAlt: string;
  /** CSS object-position for desktop crop */
  focalPosition?: string;
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
    status: 'live',
    statusLabel: 'Live project',
    scope: [
      'SEO-led service architecture',
      'Quote and contact enquiry flows',
      'Project showcase by region and application',
      'Service pages for linings, reservoirs and waterproofing',
    ],
    ctaLabel: 'View Damtech project',
    href: '/projects/damtech-website/',
    featured: true,
    externalSiteUrl: 'https://dam-tech.co.za/',
    desktopSrc: '/images/work/damtech-desktop.webp',
    mobileSrc: '/images/work/damtech-mobile.webp',
    imageAlt:
      'Desktop screenshot of the Damtech homepage showing dam-lining and water-storage services with a quote call to action',
    focalPosition: 'center top',
  },
  {
    slug: 'proplytic-property-software',
    shortTitle: 'Proplytic',
    title: 'Proplytic: property portfolio software',
    category: 'Custom web application',
    industry: 'Property / PropTech',
    summary:
      'A structured web application designed to organise property portfolio information inside a controlled operational interface.',
    status: 'live',
    statusLabel: 'Live project',
    scope: [
      'Custom application architecture',
      'Portfolio dashboard and property records',
      'Rental admin and operational interface',
      'Investor-ready PDF export workflows',
    ],
    ctaLabel: 'View Proplytic project',
    href: '/projects/proplytic-property-software/',
    externalSiteUrl: 'https://proplytic.co.za/',
    desktopSrc: '/images/work/proplytic-desktop.webp',
    mobileSrc: '/images/work/proplytic-mobile.webp',
    imageAlt:
      'Desktop screenshot of the Proplytic marketing homepage with portfolio software positioning and product interface preview',
    focalPosition: 'center top',
  },
  {
    slug: 'wedding-website-portfolio',
    shortTitle: 'Wedding website',
    title: 'Responsive wedding information and RSVP website',
    category: 'Custom event website',
    industry: 'Events / hospitality',
    summary:
      'A responsive event website with ceremony information, guest guidance and a controlled RSVP flow — built as static-first frontend.',
    status: 'personal',
    statusLabel: 'Personal event website',
    scope: [
      'Responsive static-first layout',
      'Ceremony and reception information architecture',
      'Guest-facing RSVP interface (demonstration)',
      'Decorative motion with reduced-motion support',
    ],
    ctaLabel: 'Discuss an event website',
    href: '/request-a-quote/?service_interest=business-websites&source=wedding-portfolio',
    desktopSrc: '/images/work/wedding-desktop.webp',
    mobileSrc: '/images/work/wedding-mobile.webp',
    imageAlt:
      'Desktop screenshot of a wedding information website hero with couple names, ceremony details and navigation',
    focalPosition: 'center top',
  },
];

export const featuredShowcaseProject = showcaseProjects.find((p) => p.featured)!;
export const secondaryShowcaseProjects = showcaseProjects.filter((p) => !p.featured);

export function getShowcaseBySlug(slug: string): ProjectCardData | undefined {
  return showcaseProjects.find((p) => p.slug === slug);
}
