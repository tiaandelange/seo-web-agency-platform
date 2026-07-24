import { afterEach, describe, expect, it, vi } from 'vitest';
import { absoluteUrl, buildMetadata, DEFAULT_SOCIAL_IMAGE } from '../lib/seo';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { getAllRoutes } from '../lib/routes';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('absoluteUrl', () => {
  it('normalises paths to trailing-slash absolute URLs', () => {
    expect(absoluteUrl('/services/')).toMatch(/\/services\/$/);
    expect(absoluteUrl('services')).toMatch(/\/services\/$/);
    expect(absoluteUrl('/')).toMatch(/^https?:\/\/[^/]+\/$/);
  });
});

describe('buildMetadata', () => {
  it('emits self-canonical, robots index and open graph defaults', () => {
    const meta = buildMetadata({
      title: 'Test Page',
      description: 'A test description for metadata building checks.',
      path: '/services/',
    });
    expect(meta.title).toBe('Test Page');
    expect(String(meta.alternates?.canonical)).toMatch(/\/services\/$/);
    expect(meta.robots).toEqual({ index: true, follow: true });
    const og = meta.openGraph as Record<string, unknown>;
    expect(String(og.url)).toMatch(/\/services\/$/);
  });

  it('emits noindex,follow when index is false', () => {
    const meta = buildMetadata({
      title: 'Hidden',
      description: 'Noindex page description for testing.',
      path: '/request-a-quote/thank-you/',
      index: false,
    });
    expect(meta.robots).toEqual({ index: false, follow: true });
  });

  it('prefers seoTitle overrides', () => {
    const meta = buildMetadata({
      title: 'Ecommerce Website Development',
      seoTitle: 'Ecommerce Website Development South Africa',
      description: 'Override test description with sufficient length.',
      path: '/services/ecommerce-websites/',
    });
    expect(meta.title).toBe('Ecommerce Website Development South Africa');
  });

  it('emits the site-wide default Open Graph image when none is provided', () => {
    const meta = buildMetadata({
      title: 'Test Page',
      description: 'A test description for metadata building checks.',
      path: '/services/',
    });
    const og = meta.openGraph as {
      images?: Array<{ url: string; alt?: string; width?: number; height?: number }>;
    };
    expect(og.images?.[0]).toEqual({
      url: DEFAULT_SOCIAL_IMAGE.url,
      alt: DEFAULT_SOCIAL_IMAGE.alt,
      width: DEFAULT_SOCIAL_IMAGE.width,
      height: DEFAULT_SOCIAL_IMAGE.height,
    });
    expect(meta.twitter).toMatchObject({
      card: 'summary_large_image',
      images: [DEFAULT_SOCIAL_IMAGE.url],
    });
  });

  it('emits Open Graph image metadata with alt and dimensions when provided', () => {
    const alt =
      'Koppie Systems — SEO-first websites, ecommerce platforms and custom business systems in South Africa';
    const meta = buildMetadata({
      title: 'SEO-First Websites & Digital Systems',
      description:
        'Koppie Systems builds SEO-first websites, ecommerce platforms and practical digital systems for technical and service businesses across South Africa.',
      path: '/',
      ogDescription: alt,
      socialImage: DEFAULT_SOCIAL_IMAGE.url,
      socialImageAlt: alt,
      socialImageWidth: 1200,
      socialImageHeight: 630,
    });
    const og = meta.openGraph as {
      description?: string;
      images?: Array<{ url: string; alt?: string; width?: number; height?: number }>;
    };
    expect(og.description).toBe(alt);
    expect(og.images?.[0]).toEqual({
      url: DEFAULT_SOCIAL_IMAGE.url,
      alt,
      width: 1200,
      height: 630,
    });
    expect(meta.twitter).toMatchObject({
      card: 'summary_large_image',
      description: alt,
      images: [DEFAULT_SOCIAL_IMAGE.url],
    });
  });
});

describe('sitemap generation', () => {
  it('includes exactly the indexable routes with absolute URLs', () => {
    const entries = sitemap();
    const indexable = getAllRoutes().filter((r) => r.inSitemap);
    expect(entries.length).toBe(indexable.length);
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https?:\/\//);
      expect(entry.url.endsWith('/')).toBe(true);
    }
    // Noindex URLs must never appear. (Scoped to /projects/ template case
    // studies: /compare/custom-website-vs-template/ is a legitimately
    // indexable comparison page whose slug also ends in "-template".)
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.includes('/thank-you/'))).toBe(false);
    expect(urls.some((u) => u.includes('/projects/') && u.endsWith('-template/'))).toBe(false);
  });
});

describe('robots generation', () => {
  it('disallows everything outside production (staging protection)', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_ENV', 'staging');
    const result = robots();
    expect(result.rules).toEqual({ userAgent: '*', disallow: '/' });
    expect(result.sitemap).toBeUndefined();
  });

  it('allows crawling with sitemap in production, blocking /api/', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_ENV', 'production');
    const result = robots();
    expect(result.rules).toEqual({ userAgent: '*', allow: '/', disallow: ['/api/'] });
    expect(String(result.sitemap)).toMatch(/sitemap\.xml$/);
  });
});
