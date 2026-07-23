import type { Metadata } from 'next';
import { brand, siteOrigin } from '@/config/brand';

/**
 * Metadata system — docs/seo/METADATA-STANDARDS.md.
 * Every page builds its Metadata through buildMetadata() so titles, canonicals,
 * robots and Open Graph stay consistent and validator-checkable.
 */

/** Ensure a path is absolute against the site origin, with a trailing slash. */
export function absoluteUrl(path: string): string {
  const origin = siteOrigin();
  let p = path.startsWith('/') ? path : `/${path}`;
  if (!p.endsWith('/')) p = `${p}/`;
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
  /** Absolute URL or /public path for the social image. */
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
    ...(ogImages
      ? {
          twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description: ogDescription,
            images: [meta.socialImage as string],
          },
        }
      : {}),
  };
}
