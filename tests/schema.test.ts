import { describe, expect, it } from 'vitest';
import {
  organizationSchema,
  websiteSchema,
  professionalServiceSchema,
  breadcrumbSchema,
  serviceSchema,
  faqPageSchema,
  articleSchemaFor,
  webPageSchema,
} from '../lib/schema';
import { services } from '../data/services';
import { articles } from '../data/articles';
import { getBreadcrumbs } from '../lib/routes';

const ABSOLUTE = /^https?:\/\//;

describe('structured data builders', () => {
  it('builds a single Organization node with @id, logo ImageObject and no fabricated fields', () => {
    const org = organizationSchema();
    expect(org['@type']).toBe('Organization');
    expect(String(org['@id'])).toMatch(ABSOLUTE);
    expect(org.name).toBeTruthy();
    const logo = org.logo as Record<string, unknown>;
    expect(logo['@type']).toBe('ImageObject');
    expect(String(logo.url)).toMatch(/\/images\/brand\/koppie-systems-logo-google\.png$/);
    // Anti-fabrication (D-10): no reviews/ratings ever on the org node.
    expect(org).not.toHaveProperty('aggregateRating');
    expect(org).not.toHaveProperty('review');
  });

  it('links WebSite to the Organization with preferred site name signals', () => {
    const site = websiteSchema();
    expect(site['@type']).toBe('WebSite');
    expect(site.name).toBeTruthy();
    expect(site.alternateName).toBeTruthy();
    expect(site.inLanguage).toBe('en-ZA');
    expect(site.publisher).toEqual(expect.objectContaining({ '@id': expect.stringMatching(ABSOLUTE) }));
  });

  it('omits address while the business has none configured (A-03)', () => {
    const business = professionalServiceSchema();
    expect(business['@type']).toBe('ProfessionalService');
    expect(business).not.toHaveProperty('address');
    expect(Array.isArray(business.areaServed)).toBe(true);
  });

  it('builds BreadcrumbList with sequential positions and no item on the last crumb', () => {
    const crumbs = getBreadcrumbs('/services/business-websites/');
    const schema = breadcrumbSchema(crumbs);
    const items = schema.itemListElement as Array<Record<string, unknown>>;
    expect(items.length).toBe(3);
    items.forEach((item, i) => {
      expect(item.position).toBe(i + 1);
      if (i < items.length - 1) {
        expect(String(item.item)).toMatch(ABSOLUTE);
      } else {
        expect(item).not.toHaveProperty('item');
      }
    });
  });

  it('builds Service schema with provider reference and absolute URL', () => {
    const schema = serviceSchema(services[0]);
    expect(schema['@type']).toBe('Service');
    expect(String(schema.url)).toMatch(ABSOLUTE);
    expect(schema.provider).toEqual(expect.objectContaining({ '@id': expect.stringMatching(ABSOLUTE) }));
    // No Offer/pricing until confirmed (D-11).
    expect(schema).not.toHaveProperty('offers');
  });

  it('builds Article schema with Person author matching the approved byline', () => {
    const schema = articleSchemaFor(articles[0]);
    expect(schema['@type']).toBe('Article');
    expect(schema.datePublished).toBeTruthy();
    expect(schema.dateModified).toBeTruthy();
    expect(String(schema.mainEntityOfPage)).toMatch(ABSOLUTE);
    expect(schema.author).toEqual(
      expect.objectContaining({
        '@type': 'Person',
        name: 'Tiaan de Lange',
      }),
    );
  });

  it('mirrors visible Q&A pairs in FAQPage schema', () => {
    const faqs = [{ question: 'Q1?', answer: 'A1.' }];
    const schema = faqPageSchema(faqs, '/faq/');
    const mainEntity = schema.mainEntity as Array<Record<string, unknown>>;
    expect(mainEntity.length).toBe(1);
    expect(mainEntity[0].name).toBe('Q1?');
  });

  it('emits primaryImageOfPage on homepage WebPage when provided', () => {
    const schema = webPageSchema({
      path: '/',
      title: 'Home',
      description: 'Home description for schema tests with enough length.',
      primaryImage: {
        path: '/images/seo/koppie-systems-homepage-thumbnail.jpg',
        width: 1200,
        height: 675,
        caption: 'Illustrative Koppie Systems website and business system interfaces',
      },
    });
    const image = schema.primaryImageOfPage as Record<string, unknown>;
    expect(image['@type']).toBe('ImageObject');
    expect(String(image.url)).toMatch(/\/images\/seo\/koppie-systems-homepage-thumbnail\.jpg$/);
    expect(image.width).toBe(1200);
    expect(image.height).toBe(675);
    expect(schema.about).toEqual(expect.objectContaining({ '@id': expect.stringMatching(/#organization$/) }));
  });
});
