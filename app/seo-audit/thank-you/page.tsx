import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import {
  SEO_AUDIT_PATH,
  SEO_AUDIT_THANK_YOU_PATH,
  seoAuditPriceLabel,
} from '@/config/seo-audit-product';

const PATH = SEO_AUDIT_THANK_YOU_PATH;
const TITLE = 'SEO Audit Request Received';
const DESCRIPTION =
  'Your SEO Audit & Priority Fix Pack intake was received. We will confirm next steps and access requirements.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  index: false,
});

export default function SeoAuditThankYouPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Request received"
        intro={`Thank you. Your ${seoAuditPriceLabel()} SEO Audit intake is with us. We will reply with confirmation, payment instructions if still needed, and how to grant access — without asking for passwords in email.`}
      />
      <Section>
        <p className="max-w-3xl leading-relaxed text-muted">
          Turnaround starts after payment (or confirmed booking), eligibility confirmation and receipt
          of required access. Meanwhile you can review{' '}
          <Link href="/services/seo-website-development/" className="text-link underline">
            SEO website development
          </Link>{' '}
          if a larger rebuild may be a better fit.
        </p>
        <p className="mt-6">
          <Link href={SEO_AUDIT_PATH} className="font-medium text-link hover:underline">
            ← Back to the product page
          </Link>
        </p>
      </Section>
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION })} />
    </>
  );
}
