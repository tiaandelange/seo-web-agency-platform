import type { RedirectRule } from '@/types/content';

/**
 * Redirect register — single source of truth, consumed by next.config.ts.
 * Every entry MUST be mirrored (with date + reason) in docs/seo/REDIRECT-REGISTER.csv.
 * Rules: 301s point at final destinations only (no chains); internal links are
 * re-pointed at the new URL in the same change (docs/seo/CRAWL-AND-INDEXATION-POLICY.md).
 */
export const redirects: RedirectRule[] = [];
