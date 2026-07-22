import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { SeoAuditIntakeForm } from '@/components/seo-audit-intake-form';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import {
  getSeoAuditProduct,
  isSeoAuditTierActive,
  isSeoAuditTierCheckoutConfigured,
  seoAuditTierPriceLabel,
} from '@/config/seo-audit-product';

const product = getSeoAuditProduct('advanced');
const PATH = product.intakePath;
const TITLE = 'Advanced SEO Audit Intake';
const DESCRIPTION =
  'Complete the Advanced SEO Audit intake. Provide website and Search Console access details — never passwords or payment-card data.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  index: false,
});

export default async function AdvancedSeoAuditIntakePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; eligible?: string }>;
}) {
  const { error, eligible } = await searchParams;
  const active = isSeoAuditTierActive('advanced');
  const checkoutReady = isSeoAuditTierCheckoutConfigured('advanced');

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Advanced SEO Audit intake"
        intro={`Tell us about the website for the ${seoAuditTierPriceLabel('advanced')} pack. Search Console access is required.`}
      />

      {eligible === '1' && (
        <div className="mx-auto max-w-6xl px-4">
          <p className="max-w-2xl rounded-card border border-line bg-surface p-4 text-sm text-ink" role="status">
            Eligibility check passed for the advanced pack. Complete the intake below.
          </p>
        </div>
      )}

      {error && (
        <div className="mx-auto max-w-6xl px-4">
          <p role="alert" className="max-w-2xl rounded-card border border-line bg-surface p-4 text-ink">
            {error === 'inactive'
              ? 'This product is temporarily unavailable.'
              : 'We could not complete that submission. Check the required fields (including Search Console access) and try again.'}
          </p>
        </div>
      )}

      <Section>
        {active ? (
          <SeoAuditIntakeForm tier="advanced" showPaymentRef={checkoutReady || eligible === '1'} />
        ) : (
          <p className="max-w-2xl text-muted">
            Intake is closed.{' '}
            <Link href="/request-a-quote/?type=custom-seo-audit" className="text-link underline">
              Request a custom proposal
            </Link>
            .
          </p>
        )}
        <p className="mt-8 text-sm text-muted">
          <Link href={product.route} className="text-link underline">
            ← Back to the advanced product page
          </Link>
        </p>
      </Section>

      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION })} />
    </>
  );
}
