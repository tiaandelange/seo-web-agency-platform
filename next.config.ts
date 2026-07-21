import type { NextConfig } from 'next';
import { redirects as redirectRegister } from './data/redirects';

/**
 * - trailingSlash: canonical URL form sitewide (docs/seo/CANONICALISATION-POLICY.md, D-04).
 * - redirects: single source of truth in data/redirects.ts, mirrored in
 *   docs/seo/REDIRECT-REGISTER.csv (docs/seo/CRAWL-AND-INDEXATION-POLICY.md).
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return redirectRegister.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: r.permanent,
    }));
  },
};

export default nextConfig;
