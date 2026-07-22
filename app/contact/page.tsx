import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { brand } from '@/config/brand';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContactForm } from '@/components/contact-form';
import { JsonLd } from '@/components/json-ld';
import { professionalServiceSchema, webPageSchema } from '@/lib/schema';
import { Container } from '@/components/layout/container';
import { ContactHero } from '@/components/contact/contact-hero';
import {
  ContactGuidanceCard,
  ContactReachCard,
} from '@/components/contact/contact-info-cards';
import { ContactRoutePanel } from '@/components/contact/contact-route-panel';

const PATH = '/contact/';
const TITLE = 'Contact Koppie Systems | Pretoria & South Africa';
const DESCRIPTION =
  'Contact Koppie Systems about website development, ecommerce, SEO or digital business systems. Based in Pretoria and serving clients across South Africa.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <>
      <Breadcrumbs path={PATH} />
      <ContactHero
        title="Contact Koppie Systems"
        intro={`${brand.name} is based in ${brand.baseCity} and works with businesses throughout South Africa. Send us a short message about what you need, and we will respond with the right questions or recommend the next step.`}
      />

      {error && (
        <Container className="pt-6">
          <p
            role="alert"
            className="max-w-2xl rounded-card border border-error/40 bg-notice p-4 text-ink"
          >
            {error === 'delivery'
              ? 'We could not send your enquiry right now. Please try again shortly, or call, WhatsApp or email us using the details below.'
              : 'We could not complete that submission. Please check the required fields and try again. If the problem continues, call, WhatsApp or email us using the details below.'}
          </p>
        </Container>
      )}

      <section className="border-b border-line py-8 md:py-10">
        <Container>
          <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-6">
              <ContactReachCard />
            </div>
            <div className="lg:col-span-6">
              <ContactGuidanceCard />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface py-10 md:py-12">
        <Container>
          <h2 className="text-section-title text-ink">Send a message</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Ask a question, request support or tell us briefly what you need.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
            <div className="lg:col-span-7">
              <div className="contact-form-card measure-narrow rounded-card border border-line bg-canvas p-5 shadow-card sm:p-8">
                <ContactForm />
              </div>
            </div>
            <div className="lg:col-span-5">
              <ContactRoutePanel />
            </div>
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          webPageSchema({
            path: PATH,
            title: TITLE,
            description: DESCRIPTION,
            pageType: 'ContactPage',
          }),
          professionalServiceSchema(),
        ]}
      />
    </>
  );
}
