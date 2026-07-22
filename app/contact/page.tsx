import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { brand, publicEmail } from '@/config/brand';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { ContactForm } from '@/components/contact-form';
import { JsonLd } from '@/components/json-ld';
import { professionalServiceSchema, webPageSchema } from '@/lib/schema';

const PATH = '/contact/';
const TITLE = 'Contact Us';
const DESCRIPTION =
  'Contact Koppie Systems — a Pretoria-based website and digital-systems studio serving businesses throughout South Africa. Send a short message and we aim to respond within one business day.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const email = publicEmail();
  const hasContact = Boolean(brand.contact.phone || email || brand.contact.whatsapp);

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Contact us"
        intro={`Based in ${brand.baseCity} and serving businesses throughout South Africa. A short message is enough — tell us roughly what you need and we will come back with the right questions. We aim to respond within one business day.`}
      />

      {error && (
        <div className="mx-auto max-w-6xl px-4">
          <p role="alert" className="max-w-2xl rounded-card border border-line bg-surface p-4 text-ink">
            Something was missing from the form — please check the required fields and try again.
          </p>
        </div>
      )}

      <Section heading="Ways to reach us">
        <ul className="max-w-2xl space-y-3 text-muted">
          {brand.contact.phone && (
            <li>
              Phone:{' '}
              <a href={`tel:${brand.contact.phone}`} className="text-link underline">
                {brand.contact.phone}
              </a>
            </li>
          )}
          {email && (
            <li>
              Email:{' '}
              <a href={`mailto:${email}`} className="text-link underline">
                {email}
              </a>
            </li>
          )}
          {brand.contact.whatsapp && (
            <li>
              WhatsApp:{' '}
              <a href={`https://wa.me/${brand.contact.whatsapp}`} className="text-link underline">
                message us directly
              </a>
            </li>
          )}
          {!hasContact && (
            <li>
              Direct telephone and email channels are being finalised — use the form below or{' '}
              <Link href="/request-a-quote/" className="text-link underline">
                request a proposal
              </Link>
              . Public contact details will appear here once verified.
            </li>
          )}
          {brand.hours && <li>Hours: {brand.hours}</li>}
          <li>
            Based in {brand.baseCity}; serving {brand.serviceAreas.join(', ')} —{' '}
            <Link href="/areas-we-serve/" className="text-link underline">
              areas we serve
            </Link>
            .
          </li>
        </ul>
      </Section>

      <Section heading="Send a message" tone="surface">
        <ContactForm />
      </Section>

      <Section heading="Ready for a scoped proposal?">
        <p className="max-w-3xl leading-relaxed text-muted">
          If you already know roughly what you need, the{' '}
          <Link href="/request-a-quote/" className="text-link underline">
            proposal request form
          </Link>{' '}
          asks the right scoping questions and gets you a faster, more useful first reply.
        </p>
      </Section>

      <JsonLd
        data={[
          webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'ContactPage' }),
          professionalServiceSchema(),
        ]}
      />
    </>
  );
}
