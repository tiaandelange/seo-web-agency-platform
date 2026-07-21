/**
 * Navigation data — consumed by site-header and site-footer.
 * Model documented in docs/architecture/NAVIGATION-MODEL.md.
 * Rules: header ≤7 links + 1 CTA; footers curated, never sitemap dumps.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const headerNav: NavLink[] = [
  { label: 'Services', href: '/services/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Packages', href: '/website-packages/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Contact', href: '/contact/' },
];

export const headerCta: NavLink = { label: 'Request a quote', href: '/request-a-quote/' };

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
      { label: 'Custom web applications', href: '/services/custom-web-applications/' },
      { label: 'Maintenance & support', href: '/services/website-maintenance-and-support/' },
      { label: 'All services', href: '/services/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Our process', href: '/process/' },
      { label: 'Projects', href: '/projects/' },
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
      { label: 'Request a quote', href: '/request-a-quote/' },
    ],
  },
];

export const footerLegal: NavLink[] = [
  { label: 'Privacy policy', href: '/legal/privacy-policy/' },
  { label: 'Terms of service', href: '/legal/terms-of-service/' },
  { label: 'Cookie policy', href: '/legal/cookie-policy/' },
];
