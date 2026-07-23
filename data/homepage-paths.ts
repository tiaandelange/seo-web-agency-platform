/**
 * Three commercial capability paths for the homepage (Prompt 6).
 * Weighted — not eleven equal service cards.
 */

export type CapabilityPath = {
  id: string;
  label: string;
  problem: string;
  functionality: string;
  suitableFor: string;
  proofLabel: string;
  proofHref: string;
  ctaLabel: string;
  ctaHref: string;
  /** Visual weight: primary paths get more prominence */
  weight: 'primary' | 'secondary';
};

export const HOMEPAGE_CAPABILITY_PATHS: CapabilityPath[] = [
  {
    id: 'business-websites',
    label: 'Business websites',
    problem: 'Customers search for what you do and never find a site that earns their trust or enquiry.',
    functionality: 'Service and area pages, enquiry forms, measurement and SEO structure.',
    suitableFor: 'Contractors, practices and service firms that live on quotes and call-outs.',
    proofLabel: 'Damtech — live project',
    proofHref: '/projects/damtech-website/',
    ctaLabel: 'Business website service',
    ctaHref: '/services/business-websites/',
    weight: 'primary',
  },
  {
    id: 'commerce-catalogue',
    label: 'Ecommerce & product catalogues',
    problem: 'Your range lives in PDFs or a template store that neither ranks nor matches how buyers purchase.',
    functionality: 'Catalogue or checkout, RFQ baskets, SA payments and product SEO — chosen to fit the commercial model.',
    suitableFor: 'Manufacturers, distributors and sellers deciding between quote and cart.',
    proofLabel: 'Compare commerce models',
    proofHref: '/services/ecommerce-websites/#commerce-models',
    ctaLabel: 'Ecommerce service',
    ctaHref: '/services/ecommerce-websites/',
    weight: 'primary',
  },
  {
    id: 'portals-systems',
    label: 'Portals & custom systems',
    problem: 'Spreadsheets and email threads are running operations that need roles, records and status.',
    functionality: 'Admin panels, RFQ/quotation tools, customer portals and authenticated workflows.',
    suitableFor: 'Quote-driven and multi-user operations that outgrew shared files.',
    proofLabel: 'Proplytic — internal product',
    proofHref: '/projects/proplytic-property-software/',
    ctaLabel: 'Custom systems service',
    ctaHref: '/services/custom-web-applications/',
    weight: 'primary',
  },
];
