import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { brand } from '@/config/brand';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { ContactForm } from '@/components/contact-form';
import { JsonLd } from '@/components/json-ld';
import { professionalServiceSchema, webPageSchema } from '@/lib/schema';

const PATH = '/contact/';
const TITLE = 'Contact Us';
const DESCRIPTION =
  'Contact a Pretoria-based web development studio serving all of South Africa — phone, email, WhatsApp or a short form, answered within one business day.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const hasContact = brand.contact.phone || brand.contact.email || brand.contact.whatsapp;

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Contact us"
        intro="A short message is enough — tell us roughly what you need and we will come back with the right questions. We aim to respond within one business day."
      />

      {error && (
        <div className="mx-auto max-w-6xl px-4">
          <p role="alert" className="max-w-2xl rounded-card border border-line bg-surface p-4 text-ink">
            Something was missing from the form — please check the required fields and try again.
            If it keeps failing, email or phone us directly instead.
          </p>
        </div>
      )}

      <Section heading="Ways to reach us">
        <ul className="max-w-2xl space-y-3 text-muted">
          {brand.contact.phone && (
            <li>
              Phone:{' '}
              <a href={`tel:${brand.contact.phone}`} className="text-accent underline">
                {brand.contact.phone}
              </a>
            </li>
          )}
          {brand.contact.email && (
            <li>
              Email:{' '}
              <a href={`mailto:${brand.contact.email}`} className="text-accent underline">
                {brand.contact.email}
              </a>
            </li>
          )}
          {brand.contact.whatsapp && (
            <li>
              WhatsApp:{' '}
              <a href={`https://wa.me/${brand.contact.whatsapp}`} className="text-accent underline">
                message us directly
              </a>
            </li>
          )}
          {!hasContact && (
            <li>
              Direct contact details are being finalised — the form below reaches us reliably in
              the meantime.
            </li>
          )}
          <li>Hours: {brand.hours}</li>
          <li>
            Based in Pretoria; serving {brand.serviceAreas.slice(0, 3).join(', ')} and clients
            across South Africa —{' '}
            <Link href="/areas-we-serve/" className="text-accent underline">
              see areas we serve
            </Link>
            .
          </li>
        </ul>
      </Section>

      <Section heading="Send a message" tone="surface">
        <ContactForm />
      </Section>

      <Section heading="Ready for numbers instead?">
        <p className="max-w-3xl leading-relaxed text-muted">
          If you already know roughly what you need, the{' '}
          <Link href="/request-a-quote/" className="text-accent underline">
            quote request form
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
