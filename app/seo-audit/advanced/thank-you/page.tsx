import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { getSeoAuditProduct, seoAuditTierPriceLabel } from '@/config/seo-audit-product';

const product = getSeoAuditProduct('advanced');
const PATH = product.thankYouPath;
const TITLE = 'Advanced SEO Audit Request Received';
const DESCRIPTION =
  'Your Advanced SEO Audit intake was received. We will confirm next steps and access requirements.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  index: false,
});

export default function AdvancedSeoAuditThankYouPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Request received"
        intro={`Thank you. Your ${seoAuditTierPriceLabel('advanced')} intake is with us. We will confirm payment (if needed) and how to grant Search Console and platform access — without asking for passwords in email.`}
      />
      <Section>
        <p className="max-w-3xl leading-relaxed text-muted">
          Turnaround starts after payment, eligibility confirmation and receipt of required access.
          Meanwhile review{' '}
          <Link href="/services/seo-website-development/" className="text-link underline">
            SEO website development
          </Link>{' '}
          if a rebuild may be a better fit after the roadmap.
        </p>
        <p className="mt-6">
          <Link href={product.route} className="font-medium text-link hover:underline">
            ← Back to the advanced product page
          </Link>
        </p>
      </Section>
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION })} />
    </>
  );
}
