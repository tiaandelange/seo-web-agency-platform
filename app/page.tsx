import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/config/brand';
import { buildMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/json-ld';
import { professionalServiceSchema, webPageSchema } from '@/lib/schema';
import { Section } from '@/components/section';
import { CardGrid, ServiceCard, SolutionCard, PackageCard } from '@/components/cards';
import { TrustSignals } from '@/components/trust-signals';
import { ProcessSteps, PROCESS_STEPS } from '@/components/process-steps';
import { FaqList } from '@/components/faq-list';
import { CtaQuote } from '@/components/cta-quote';
import { services } from '@/data/services';
import { solutions } from '@/data/solutions';
import { packages } from '@/data/packages';
import { faqs } from '@/data/faqs';

const HOME_TITLE = 'SEO-First Website Development Company in South Africa';
const HOME_DESCRIPTION =
  'South African web development company building SEO-first business websites, catalogues, ecommerce and the admin, quotation and portal systems behind them.';

export const metadata: Metadata = {
  ...buildMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: '/',
  }),
  title: { absolute: `${HOME_TITLE} | ${brand.name}` },
};

const FEATURED_SERVICE_SLUGS = [
  'business-websites',
  'lead-generation-websites',
  'product-catalogue-websites',
  'ecommerce-websites',
  'custom-web-applications',
  'website-maintenance-and-support',
];

export default function HomePage() {
  const featuredServices = services.filter((s) => FEATURED_SERVICE_SLUGS.includes(s.slug));

  return (
    <>
      {/* Above the fold: H1, differentiation sentence, primary CTA. */}
      <div className="mx-auto max-w-6xl px-4 pb-4 pt-14">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Websites built to be found — and the systems that run behind them
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {brand.name} builds SEO-first websites and lead-generation systems for South African
          businesses — plus the admin panels, quotation workflows and portals that turn a website
          into an operation. Built by an engineer. Structured for Google. Measured in enquiries.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link
            href="/request-a-quote/"
            className="rounded-card bg-accent px-6 py-3 font-semibold text-accent-contrast hover:opacity-90"
          >
            Request a quote
          </Link>
          <Link
            href="/website-packages/"
            className="rounded-card border border-line px-6 py-3 font-semibold text-ink hover:bg-surface"
          >
            See packages &amp; pricing
          </Link>
        </div>
      </div>

      <Section heading="What we build">
        <CardGrid>
          {featuredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </CardGrid>
        <p className="mt-6">
          <Link href="/services/" className="font-medium text-accent hover:underline">
            View all services →
          </Link>
        </p>
      </Section>

      <Section heading="Who we build for" tone="surface">
        <CardGrid>
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </CardGrid>
      </Section>

      <Section heading="Why SEO-first">
        <p className="mb-6 max-w-3xl leading-relaxed text-muted">
          Most websites are designed first and “optimised” never. We work in the opposite order:
          research what your customers search, give every commercial intent its own page, then
          build to the technical standards Google rewards. The method is documented — and you get
          the research with your build.
        </p>
        <TrustSignals />
      </Section>

      <Section heading="How a project runs" tone="surface">
        <ProcessSteps steps={PROCESS_STEPS.slice(0, 4)} />
        <p className="mt-6">
          <Link href="/process/" className="font-medium text-accent hover:underline">
            See the full process →
          </Link>
        </p>
      </Section>

      <Section heading="Packages">
        <CardGrid>
          {packages.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </CardGrid>
        <p className="mt-6">
          <Link href="/website-packages/" className="font-medium text-accent hover:underline">
            All packages and indicative pricing →
          </Link>
        </p>
      </Section>

      <Section heading="A new studio, run on senior standards" tone="surface">
        <p className="max-w-3xl leading-relaxed text-muted">
          We are a new company and we say so plainly — you will find no invented client counts or
          purchased reviews here. What you get instead: the founder personally building your
          project on a modern stack, a documented method you can inspect on every page of this
          site, and measurement wired in from day one so the results speak for themselves. As
          projects complete, real case studies will appear{' '}
          <Link href="/projects/" className="text-accent underline">
            in our projects section
          </Link>
          .
        </p>
      </Section>

      <Section heading="Common questions">
        <FaqList items={faqs.slice(0, 3)} />
        <p className="mt-6">
          <Link href="/faq/" className="font-medium text-accent hover:underline">
            More questions and answers →
          </Link>
        </p>
      </Section>

      <CtaQuote />
      <JsonLd
        data={[
          professionalServiceSchema(),
          webPageSchema({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION }),
        ]}
      />
    </>
  );
}
