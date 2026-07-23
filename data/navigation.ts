/**
 * Navigation data — consumed by site-header and site-footer.
 * Model documented in docs/architecture/NAVIGATION-MODEL.md.
 * Labels follow Koppie Systems brand (docs/brand/KOPPIE-SYSTEMS-BRAND-IDENTITY.md).
 * URLs are unchanged from the approved route architecture.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** Header item — optional `children` render as a CSS dropdown (crawlable anchors). */
export interface NavItem {
  label: string;
  href: string;
  children?: NavLink[];
}

export const headerNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Ecommerce', href: '/services/ecommerce-websites/' },
      { label: 'Portals & Systems', href: '/services/custom-web-applications/' },
      { label: 'SEO', href: '/services/seo-website-development/' },
      {
        label: 'Analytics & Conversion Tracking',
        href: '/services/analytics-and-conversion-tracking/',
      },
    ],
  },
  { label: 'Industries', href: '/solutions/' },
  { label: 'Work', href: '/projects/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Contact', href: '/contact/' },
];

export const headerCta: NavLink = { label: 'Request a Proposal', href: '/request-a-quote/' };

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Services',
    links: [
      { label: 'Business websites', href: '/services/business-websites/' },
      { label: 'Lead generation websites', href: '/services/lead-generation-websites/' },
      { label: 'Product catalogue websites', href: '/services/product-catalogue-websites/' },
      { label: 'Ecommerce websites', href: '/services/ecommerce-websites/' },
      { label: 'Portals & custom systems', href: '/services/custom-web-applications/' },
      { label: 'Maintenance & support', href: '/services/website-maintenance-and-support/' },
      {
        label: 'Analytics & conversion tracking',
        href: '/services/analytics-and-conversion-tracking/',
      },
      { label: 'All services', href: '/services/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Our process', href: '/process/' },
      { label: 'Work', href: '/projects/' },
      { label: 'Pricing', href: '/pricing/' },
      { label: 'FAQ', href: '/faq/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Guides & resources', href: '/resources/' },
      { label: 'Website cost guide', href: '/resources/website-cost-south-africa/' },
      { label: 'Comparisons', href: '/compare/' },
      { label: 'Areas we serve', href: '/areas-we-serve/' },
      { label: 'Request a proposal', href: '/request-a-quote/' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Contractors & trade', href: '/solutions/contractors/' },
      { label: 'Engineering & industrial', href: '/solutions/engineering-companies/' },
      { label: 'Manufacturers & suppliers', href: '/solutions/manufacturers-and-suppliers/' },
      { label: 'Property businesses', href: '/solutions/property-businesses/' },
      { label: 'Professional services', href: '/solutions/professional-services/' },
      { label: 'Small businesses', href: '/solutions/small-businesses/' },
      { label: 'All industries', href: '/solutions/' },
    ],
  },
];

export const footerLegal: NavLink[] = [
  { label: 'Privacy policy', href: '/legal/privacy-policy/' },
  { label: 'Terms of service', href: '/legal/terms-of-service/' },
  { label: 'Cookie policy', href: '/legal/cookie-policy/' },
];
