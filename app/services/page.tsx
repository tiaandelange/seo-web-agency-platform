import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { CardGrid, ServiceCard } from '@/components/cards';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { itemListSchema, webPageSchema } from '@/lib/schema';
import { getServicesByCategory, services } from '@/data/services';

const PATH = '/services/';
const TITLE = 'Web Development Services';
const DESCRIPTION =
  'Web development services for South African businesses: SEO-first websites, catalogues and ecommerce, custom admin and quotation systems, and ongoing support.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function ServicesPage() {
  const websiteServices = getServicesByCategory('website');
  const systemServices = getServicesByCategory('system');
  const recurringServices = getServicesByCategory('recurring');

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Web development services"
        intro="Three connected tiers: websites that win you customers, custom systems that run your operations, and support that keeps everything fast and healthy. Every service below has one clear job — pick the problem, not the jargon."
      />

      <Section heading="Website services">
        <CardGrid>
          {websiteServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </CardGrid>
      </Section>

      <Section heading="Custom systems" tone="surface">
        <CardGrid>
          {systemServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </CardGrid>
      </Section>

      <Section heading="Ongoing support">
        <CardGrid>
          {recurringServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </CardGrid>
      </Section>

      <Section heading="Not sure which you need?" tone="surface">
        <p className="max-w-3xl leading-relaxed text-muted">
          Two honest shortcuts: our{' '}
          <Link href="/compare/website-vs-web-application/" className="text-accent underline">
            website vs web application comparison
          </Link>{' '}
          settles the most common confusion, and the{' '}
          <Link href="/website-packages/" className="text-accent underline">
            packages page
          </Link>{' '}
          shows what defined scopes cost. Or skip the reading — one scoping conversation and we
          will tell you plainly what fits.
        </p>
      </Section>

      <CtaQuote />
      <JsonLd
        data={[
          webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'CollectionPage' }),
          itemListSchema(services.map((s) => ({ name: s.heading, path: `/services/${s.slug}/` }))),
        ]}
      />
    </>
  );
}
