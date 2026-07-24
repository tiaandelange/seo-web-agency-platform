import type { Metadata } from 'next';
import { brand, siteOrigin } from '@/config/brand';

/**
 * Metadata system — docs/seo/METADATA-STANDARDS.md.
 * Every page builds its Metadata through buildMetadata() so titles, canonicals,
 * robots and Open Graph stay consistent and validator-checkable.
 *
 * Site-wide social images come from App Router file conventions:
 * `app/opengraph-image.jpg` and `app/twitter-image.jpg`. Pass `socialImage`
 * only when a page needs a different card (file-based tags still apply as fallback).
 */

/** Documented default social card (file convention). Use for per-page overrides. */
export const DEFAULT_SOCIAL_IMAGE = {
  url: '/opengraph-image.jpg',
  alt: 'Koppie Systems websites, customer portals and custom business systems for South African businesses',
  width: 1200,
  height: 630,
} as const;

/** Preferred homepage visual for Google image selection + primaryImageOfPage. */
export const HOMEPAGE_THUMBNAIL = {
  path: '/images/seo/koppie-systems-homepage-thumbnail.jpg',
  width: 1200,
  height: 675,
  alt: 'Illustrative Koppie Systems dashboard and responsive website interface',
  caption: 'Illustrative Koppie Systems website and business system interfaces',
} as const;

/** Organization logo for schema + Google Business Profile upload. */
export const ORGANIZATION_LOGO = {
  path: '/images/brand/koppie-systems-logo-google.png',
  width: 1024,
  height: 1024,
  caption: 'Koppie Systems',
} as const;

/** Ensure a path is absolute against the site origin, with a trailing slash. */
export function absoluteUrl(path: string): string {
  const origin = siteOrigin();
  let p = path.startsWith('/') ? path : `/${path}`;
  if (!p.endsWith('/')) p = `${p}/`;
  return `${origin}${p}`;
}

/** Absolute URL for a public asset path (no forced trailing slash). */
export function absoluteAssetUrl(assetPath: string): string {
  const origin = siteOrigin();
  const p = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${origin}${p}`;
}

export interface PageMeta {
  /** Page-title part; the root layout template appends the brand name. */
  title: string;
  /** Full override of the title part (e.g. geo modifier). */
  seoTitle?: string;
  description: string;
  /** Route path, e.g. "/services/business-websites/". */
  path: string;
  /** Explicit cross-canonical path (rare; requires a decision-log entry). */
  canonicalPathOverride?: string;
  /** Defaults to true. False emits noindex,follow. */
  index?: boolean;
  ogType?: 'website' | 'article';
  ogTitle?: string;
  ogDescription?: string;
  /** Absolute URL or /public path for a page-specific social image override. */
  socialImage?: string;
  /** Accessible description for the social/OG image (not page alt text). */
  socialImageAlt?: string;
  socialImageWidth?: number;
  socialImageHeight?: number;
  /** ISO date; emitted as og modified time for article-type pages. */
  dateUpdated?: string;
}

export function buildMetadata(meta: PageMeta): Metadata {
  const canonical = absoluteUrl(meta.canonicalPathOverride ?? meta.path);
  const titlePart = meta.seoTitle ?? meta.title;
  const ogTitle = meta.ogTitle ?? `${titlePart} | ${brand.name}`;
  const ogDescription = meta.ogDescription ?? meta.description;
  const index = meta.index !== false;

  const ogImages = meta.socialImage
    ? [
        {
          url: meta.socialImage,
          ...(meta.socialImageAlt ? { alt: meta.socialImageAlt } : {}),
          ...(meta.socialImageWidth ? { width: meta.socialImageWidth } : {}),
          ...(meta.socialImageHeight ? { height: meta.socialImageHeight } : {}),
        },
      ]
    : undefined;

  const ogBase = {
    title: ogTitle,
    description: ogDescription,
    url: canonical,
    siteName: brand.name,
    locale: brand.locale,
    ...(ogImages ? { images: ogImages } : {}),
  };

  const openGraph: Metadata['openGraph'] =
    meta.ogType === 'article'
      ? {
          ...ogBase,
          type: 'article',
          ...(meta.dateUpdated ? { modifiedTime: meta.dateUpdated } : {}),
        }
      : { ...ogBase, type: 'website' };

  return {
    title: titlePart,
    description: meta.description,
    alternates: { canonical },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      ...(meta.socialImage ? { images: [meta.socialImage] } : {}),
    },
  };
}
