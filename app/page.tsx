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

const HOME_TITLE = 'SEO-First Websites & Digital Systems';
const HOME_DESCRIPTION =
  'Koppie Systems builds SEO-first websites, ecommerce platforms and practical digital systems for technical and service businesses across South Africa.';

export const metadata: Metadata = {
  ...buildMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: '/',
  }),
  title: { absolute: `${HOME_TITLE} | ${brand.name}` },
};

/** Launch-first services (homepage lead). Expansion systems introduced below. */
const FEATURED_SERVICE_SLUGS = [
  'business-websites',
  'lead-generation-websites',
  'product-catalogue-websites',
  'ecommerce-websites',
  'website-maintenance-and-support',
];

const EXPANSION_SERVICE_SLUGS = [
  'custom-web-applications',
  'admin-panel-development',
  'rfq-and-quotation-systems',
  'customer-and-supplier-portals',
];

export default function HomePage() {
  const featuredServices = services.filter((s) => FEATURED_SERVICE_SLUGS.includes(s.slug));
  const expansionServices = services.filter((s) => EXPANSION_SERVICE_SLUGS.includes(s.slug));

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-accent-contrast">
        <div className="pointer-events-none absolute inset-0 contour-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-14 lg:grid-cols-2 lg:items-center lg:pb-20 lg:pt-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sandstone">
              SEO-first websites &amp; digital systems
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
              Websites and systems built to generate enquiries
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-sandstone">
              {brand.name} develops high-performance websites, portals and workflow tools for
              technical, industrial and service businesses throughout South Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/request-a-quote/"
                className="rounded-card bg-cta px-6 py-3 font-semibold text-cta-contrast hover:opacity-90"
              >
                Request a Proposal
              </Link>
              <Link
                href="/projects/"
                className="rounded-card border border-sandstone/40 px-6 py-3 font-semibold text-accent-contrast hover:bg-white/5"
              >
                View Our Work
              </Link>
            </div>
            <p className="mt-6 text-sm text-sandstone/90">
              {brand.tagline} Based in {brand.baseCity}, delivering nationwide.
            </p>
          </div>
          <div className="rounded-card border border-white/10 bg-white/5 p-5 shadow-elevated backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-sandstone">Practical stack</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-accent-contrast/90">
              <li>SEO-first websites structured around real search demand</li>
              <li>Lead-generation forms, RFQ workflows and enquiry tracking</li>
              <li>Product catalogues presented for technical buyers</li>
              <li>Portals, admin panels and quotation systems when the website needs to grow</li>
            </ul>
          </div>
        </div>
      </section>

      <Section heading="What we build">
        <p className="mb-6 max-w-3xl leading-relaxed text-muted">
          Clear scope for the services that win work first — websites designed to be found and to
          convert visits into enquiries, with maintenance that keeps them useful after launch.
        </p>
        <CardGrid>
          {featuredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </CardGrid>
        <p className="mt-6">
          <Link href="/services/" className="font-medium text-link hover:underline">
            View all services →
          </Link>
        </p>
      </Section>

      <Section heading="Systems that support the work" tone="surface">
        <p className="mb-6 max-w-3xl leading-relaxed text-muted">
          Once the website is generating enquiries, the same partner can build the portals, admin
          panels and quotation tools that reduce repetitive administration.
        </p>
        <CardGrid>
          {expansionServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </CardGrid>
      </Section>

      <Section heading="Who we build for">
        <CardGrid>
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </CardGrid>
      </Section>

      <Section heading="Why SEO-first" tone="surface">
        <p className="mb-6 max-w-3xl leading-relaxed text-muted">
          Most websites are designed first and “optimised” never. We work in the opposite order:
          research what your customers search, give every commercial intent its own page, then
          build to the technical standards search engines reward. The method is documented — and
          you get the research with your build.
        </p>
        <TrustSignals />
      </Section>

      <Section heading="How a project runs">
        <ProcessSteps steps={PROCESS_STEPS.slice(0, 4)} />
        <p className="mt-6">
          <Link href="/process/" className="font-medium text-link hover:underline">
            See the full process →
          </Link>
        </p>
      </Section>

      <Section heading="Packages" tone="surface">
        <CardGrid>
          {packages.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </CardGrid>
        <p className="mt-6">
          <Link href="/website-packages/" className="font-medium text-link hover:underline">
            All packages and indicative pricing →
          </Link>
        </p>
      </Section>

      <Section heading="A new company, run on senior standards">
        <p className="max-w-3xl leading-relaxed text-muted">
          We are a new company and we say so plainly — you will find no invented client counts or
          purchased reviews here. What you get instead: structured discovery, design, development,
          testing and review; a documented method you can inspect on every page of this site; and
          measurement wired in from day one. As projects complete with permission, real case
          studies will appear{' '}
          <Link href="/projects/" className="text-link underline">
            in our work section
          </Link>
          .
        </p>
      </Section>

      <Section heading="Common questions" tone="surface">
        <FaqList items={faqs.slice(0, 3)} />
        <p className="mt-6">
          <Link href="/faq/" className="font-medium text-link hover:underline">
            More questions and answers →
          </Link>
        </p>
      </Section>

      <CtaQuote
        heading="Ready to talk about your project?"
        body="Tell us what you need and get a straight answer — clear scope, indicative pricing and a fixed quote after one scoping conversation."
        ctaLabel="Request a Proposal"
      />
      <JsonLd
        data={[
          professionalServiceSchema(),
          webPageSchema({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION }),
        ]}
      />
    </>
  );
}
