import type { MetadataRoute } from 'next';
import { isProductionSite } from '@/config/brand';
import { absoluteUrl } from '@/lib/seo';

/**
 * robots.txt — environment-gated (docs/seo/CRAWL-AND-INDEXATION-POLICY.md):
 * production allows crawling (except /api/); every other environment
 * disallows everything so staging can never be indexed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite()) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: absoluteUrl('/sitemap.xml').replace(/\/$/, ''),
  };
}
