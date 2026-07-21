import type { MetadataRoute } from 'next';
import { getAllRoutes } from '@/lib/routes';
import { absoluteUrl } from '@/lib/seo';

/**
 * XML sitemap — generated from the central route registry (D-15).
 * Only indexable routes are included; noindex URLs are excluded by
 * construction (docs/architecture/INDEXATION-RULES.md).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRoutes()
    .filter((route) => route.inSitemap)
    .map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: route.lastModified,
    }));
}
