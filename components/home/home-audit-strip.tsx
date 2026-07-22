import Link from 'next/link';
import { seoAuditTierPriceLabel } from '@/config/seo-audit-product';
import { HomeSection } from '@/components/home/home-section';

export function HomeAuditStrip() {
  return (
    <HomeSection
      heading="Fixed-price SEO audits"
      headingLevel="functional"
      intro="Start with a clear picture of what your website needs — without a monthly retainer."
    >
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="border border-line bg-surface p-5 md:p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-cta">Small sites</p>
          <h3 className="mt-2 text-lg font-bold text-ink">SEO Audit &amp; Priority Fix Pack</h3>
          <p className="mt-1 text-sm font-medium text-ink">{seoAuditTierPriceLabel('priority-fix')}</p>
          <p className="mt-3 text-sm text-muted">Up to 10 pages · selected fixes · 30-day plan</p>
          <Link href="/seo-audit/" className="mt-4 inline-block text-sm font-semibold text-link hover:underline">
            View audits →
          </Link>
        </div>
        <div className="border border-line bg-surface p-5 md:p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-cta">Larger sites</p>
          <h3 className="mt-2 text-lg font-bold text-ink">Advanced SEO Audit</h3>
          <p className="mt-1 text-sm font-medium text-ink">{seoAuditTierPriceLabel('advanced')}</p>
          <p className="mt-3 text-sm text-muted">Up to 250 URLs · architecture review · 90-day roadmap</p>
          <Link
            href="/seo-audit/advanced/"
            className="mt-4 inline-block text-sm font-semibold text-link hover:underline"
          >
            Advanced detail →
          </Link>
        </div>
      </div>
    </HomeSection>
  );
}
