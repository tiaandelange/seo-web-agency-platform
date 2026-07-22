import { brand, siteOrigin, publicEmail } from '@/config/brand';
import { absoluteUrl } from '@/lib/seo';
import type { Article, Comparison, Faq, LocationArea, Project, Service } from '@/types/content';
import type { Crumb } from '@/lib/routes';

/**
 * JSON-LD builders — docs/seo/STRUCTURED-DATA-MAP.md.
 * Policy: schema mirrors visible content; absolute URLs; one Organization node;
 * no Review/AggregateRating/Offer-prices until genuine (D-10, D-11).
 */

export type SchemaObject = Record<string, unknown>;

const CONTEXT = 'https://schema.org';

export function organizationId(): string {
  return `${siteOrigin()}/#organization`;
}

export function websiteId(): string {
  return `${siteOrigin()}/#website`;
}

export function organizationSchema(): SchemaObject {
  const email = publicEmail();
  return {
    '@context': CONTEXT,
    '@type': 'Organization',
    '@id': organizationId(),
    name: brand.name,
    url: `${siteOrigin()}/`,
    description: brand.description,
    ...(brand.social.length > 0 ? { sameAs: brand.social } : {}),
    ...(email ? { email } : {}),
    ...(brand.contact.phone ? { telephone: brand.contact.phone } : {}),
  };
}

export function websiteSchema(): SchemaObject {
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': websiteId(),
    url: `${siteOrigin()}/`,
    name: brand.name,
    publisher: { '@id': organizationId() },
  };
}

/**
 * ProfessionalService (a LocalBusiness subtype) for the service-area business.
 * Address is emitted only when a real address is configured (A-03).
 */
export function professionalServiceSchema(areaServed?: string[]): SchemaObject {
  return {
    '@context': CONTEXT,
    '@type': 'ProfessionalService',
    '@id': `${siteOrigin()}/#business`,
    name: brand.name,
    url: `${siteOrigin()}/`,
    description: brand.description,
    areaServed: (areaServed ?? brand.serviceAreas).map((name) => ({ '@type': 'Place', name })),
    ...(brand.contact.phone ? { telephone: brand.contact.phone } : {}),
    ...(brand.contact.email ? { email: brand.contact.email } : {}),
    ...(brand.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: brand.address.streetAddress,
            addressLocality: brand.address.addressLocality,
            addressRegion: brand.address.addressRegion,
            postalCode: brand.address.postalCode,
            addressCountry: brand.address.addressCountry,
          },
        }
      : {}),
  };
}

export function webPageSchema(input: {
  path: string;
  title: string;
  description: string;
  pageType?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';
  dateModified?: string;
}): SchemaObject {
  return {
    '@context': CONTEXT,
    '@type': input.pageType ?? 'WebPage',
    url: absoluteUrl(input.path),
    name: input.title,
    description: input.description,
    isPartOf: { '@id': websiteId() },
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  };
}

/** BreadcrumbList — final item carries no `item` URL per Google guidance. */
export function breadcrumbSchema(crumbs: Crumb[]): SchemaObject {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      ...(i < crumbs.length - 1 ? { item: absoluteUrl(crumb.path) } : {}),
    })),
  };
}

export function serviceSchema(service: Service): SchemaObject {
  return {
    '@context': CONTEXT,
    '@type': 'Service',
    name: service.heading,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}/`),
    serviceType: service.title,
    provider: { '@id': organizationId() },
    areaServed: brand.serviceAreas.map((name) => ({ '@type': 'Place', name })),
  };
}

export function articleSchema(input: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}): SchemaObject {
  return {
    '@context': CONTEXT,
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    mainEntityOfPage: absoluteUrl(input.path),
    author: { '@id': organizationId() },
    publisher: { '@id': organizationId() },
  };
}

export function articleSchemaFor(article: Article): SchemaObject {
  return articleSchema({
    path: `/resources/${article.slug}/`,
    headline: article.heading,
    description: article.metaDescription,
    datePublished: article.dateCreated,
    dateModified: article.dateUpdated,
  });
}

export function comparisonSchemaFor(comparison: Comparison): SchemaObject {
  return articleSchema({
    path: `/compare/${comparison.slug}/`,
    headline: comparison.heading,
    description: comparison.metaDescription,
    datePublished: comparison.dateCreated,
    dateModified: comparison.dateUpdated,
  });
}

export function projectSchemaFor(project: Project): SchemaObject {
  return articleSchema({
    path: `/projects/${project.slug}/`,
    headline: project.heading,
    description: project.metaDescription,
    datePublished: project.dateCreated,
    dateModified: project.dateUpdated,
  });
}

/** FAQPage — used ONLY on /faq/ (D-09). */
export function faqPageSchema(items: Faq[], path: string): SchemaObject {
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    url: absoluteUrl(path),
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function itemListSchema(items: { name: string; path: string }[]): SchemaObject {
  return {
    '@context': CONTEXT,
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function locationServiceSchema(location: LocationArea): SchemaObject {
  return professionalServiceSchema([location.city, ...location.consolidatedAreas]);
}
