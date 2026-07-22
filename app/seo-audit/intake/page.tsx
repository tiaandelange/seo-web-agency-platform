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

const product = getSeoAuditProduct('priority-fix');
const PATH = product.intakePath;
const TITLE = 'SEO Audit Intake';
const DESCRIPTION =
  'Complete the SEO Audit & Priority Fix Pack intake. Provide website details and permission — never passwords or payment-card data.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  index: false,
});

export default async function SeoAuditIntakePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; eligible?: string }>;
}) {
  const { error, eligible } = await searchParams;
  const active = isSeoAuditTierActive('priority-fix');
  const checkoutReady = isSeoAuditTierCheckoutConfigured('priority-fix');

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="SEO Audit intake"
        intro={`Tell us about the website for the ${seoAuditTierPriceLabel('priority-fix')} pack. Access is granted through your platform’s permission system — not by typing passwords here.`}
      />

      {eligible === '1' && (
        <div className="mx-auto max-w-6xl px-4">
          <p className="max-w-2xl rounded-card border border-line bg-surface p-4 text-sm text-ink" role="status">
            Eligibility check passed for the Priority Fix Pack. Complete the intake below.
          </p>
        </div>
      )}

      {error && (
        <div className="mx-auto max-w-6xl px-4">
          <p role="alert" className="max-w-2xl rounded-card border border-line bg-surface p-4 text-ink">
            {error === 'inactive'
              ? 'This product is temporarily unavailable. Please request a custom proposal instead.'
              : 'We could not complete that submission. Check the required fields and try again.'}
          </p>
        </div>
      )}

      <Section>
        {active ? (
          <SeoAuditIntakeForm tier="priority-fix" showPaymentRef={checkoutReady || eligible === '1'} />
        ) : (
          <p className="max-w-2xl text-muted">
            Intake is closed while the product is inactive.{' '}
            <Link href="/request-a-quote/" className="text-link underline">
              Request a proposal
            </Link>
            .
          </p>
        )}
        <p className="mt-8 text-sm text-muted">
          <Link href={product.route} className="text-link underline">
            ← Back to the SEO Audit hub
          </Link>
        </p>
      </Section>

      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION })} />
    </>
  );
}
