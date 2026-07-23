import Link from 'next/link';
import type { Service } from '@/types/content';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Section, BulletList } from '@/components/section';
import { FaqList } from '@/components/faq-list';
import { RelatedContent, type RelatedItem } from '@/components/related-content';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { serviceSchema, webPageSchema } from '@/lib/schema';
import { getPackage } from '@/data/packages';
import { getSolution } from '@/data/solutions';
import { relatedProjectItems } from '@/lib/project-proof';
import { getArticle } from '@/data/articles';
import { Container } from '@/components/layout/container';
import { TechLabel } from '@/components/systems/tech-label';
import { BrokenToFixedMap } from '@/components/systems/broken-to-fixed-map';
import { ArchitectureStrip } from '@/components/systems/architecture-strip';
import { CustomSystemsHeroDemo } from '@/components/services/custom-systems-hero-demo';
import { WorkflowBuilder } from '@/components/services/workflow-builder';
import { DeliverableLayers } from '@/components/services/deliverable-layers';
import { ServiceProofBlock } from '@/components/services/service-proof-block';
import { Lead } from '@/components/typography/lead';

export function CustomSystemsServiceView({ service }: { service: Service }) {
  const path = `/services/${service.slug}/`;

  const related: RelatedItem[] = [
    ...service.relatedSolutionSlugs
      .map(getSolution)
      .filter((s) => s !== undefined)
      .map((s) => ({ title: s.heading, href: `/solutions/${s.slug}/`, kind: 'Industry' })),
    ...relatedProjectItems(service.relatedProjectSlugs),
    ...service.relatedArticleSlugs
      .map(getArticle)
      .filter((a) => a !== undefined)
      .map((a) => ({ title: a.heading, href: `/resources/${a.slug}/`, kind: 'Guide' })),
  ];

  const relatedPackages = service.relatedPackageSlugs
    .map(getPackage)
    .filter((p) => p !== undefined);

  return (
    <>
      <Breadcrumbs path={path} />

      <header className="border-b border-line bg-canvas">
        <Container className="grid gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <TechLabel>System service / 01</TechLabel>
            <h1 className="text-page-title mt-3 text-ink">{service.heading}</h1>
            <Lead className="mt-4">{service.intro}</Lead>
            <ul className="mt-6 space-y-2 text-sm text-ink">
              <li className="flex gap-2">
                <span className="text-cta" aria-hidden>
                  →
                </span>
                Replace disconnected spreadsheets and repeated data capture.
              </li>
              <li className="flex gap-2">
                <span className="text-cta" aria-hidden>
                  →
                </span>
                Give authorised users one structured view of live operational status.
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request-a-quote/?type=custom-system&service_interest=custom-web-applications"
                className="inline-flex min-h-11 items-center rounded-sm bg-cta px-5 text-sm font-semibold text-cta-contrast hover:opacity-90"
              >
                Book a consultation
              </Link>
              <a
                href="#map-workflow"
                className="inline-flex min-h-11 items-center rounded-sm border border-line px-5 text-sm font-semibold text-ink hover:border-muted"
              >
                Map your workflow
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <CustomSystemsHeroDemo />
          </div>
        </Container>
      </header>

      <section className="border-b border-line" aria-labelledby="fragmented-process">
        <Container className="py-14 md:py-20">
          <h2 id="fragmented-process" className="text-section-title text-ink">
            Replace the fragmented process
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Most custom builds start here: tools that almost work, connected by people copying data
            between them.
          </p>
          <div className="mt-10">
            <BrokenToFixedMap />
          </div>
          <section className="measure-narrow mt-12" aria-labelledby="current-process-problems">
            <h3 id="current-process-problems" className="text-subsection-title text-ink">
              Common symptoms
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-link">
              {service.problems.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </section>

      <ServiceProofBlock serviceSlug={service.slug} />

      <section
        id="map-workflow"
        className="border-b border-line bg-surface"
        aria-labelledby="map-workflow-heading"
      >
        <Container className="py-14 md:py-20">
          <h2 id="map-workflow-heading" className="text-section-title text-ink">
            Map your current workflow
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Select the stages you already run. We highlight combinations that commonly create
            friction — then send that map with your enquiry.
          </p>
          <div className="mt-8 max-w-3xl">
            <WorkflowBuilder />
          </div>
        </Container>
      </section>

      <section className="border-b border-line" aria-labelledby="app-architecture">
        <Container className="py-14 md:py-20">
          <h2 id="app-architecture" className="text-section-title text-ink">
            The application architecture
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            One system stack explained in plain language — technical terms next to what they mean
            for your team.
          </p>
          <div className="mt-10">
            <ArchitectureStrip />
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface" aria-labelledby="what-included">
        <Container className="py-14 md:py-20">
          <h2 id="what-included" className="text-section-title text-ink">
            What is included
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            The same deliverables as our service scope — grouped by how the engagement progresses.
          </p>
          <div className="mt-10">
            <DeliverableLayers />
          </div>
        </Container>
      </section>

      <Section heading="What's not included" measure="narrow">
        <p className="mb-4 leading-relaxed text-muted">
          Clear exclusions protect your budget and our working relationship — anything below can
          be scoped separately when you need it:
        </p>
        <BulletList items={service.exclusions} />
      </Section>

      <Section heading="Pricing and packages" tone="surface" measure="narrow">
        <p className="leading-relaxed text-muted">
          {relatedPackages.length > 0 ? (
            <>
              This service is available as{' '}
              {relatedPackages.map((pkg, i) => (
                <span key={pkg.slug}>
                  {i > 0 && ' and '}
                  <Link href={`/website-packages/${pkg.slug}/`} className="text-accent underline">
                    {pkg.heading}
                  </Link>
                </span>
              ))}
              {', '}with indicative ranges published openly on our{' '}
            </>
          ) : (
            <>Indicative ranges for this service are published openly on our </>
          )}
          <Link href="/pricing/" className="text-accent underline">
            pricing page
          </Link>
          . Custom work is quoted after discovery — not guessed from a contact form.
        </p>
      </Section>

      {service.faqs.length > 0 && (
        <Section heading="Frequently asked questions" measure="narrow">
          <FaqList items={service.faqs} />
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="surface">
          <RelatedContent heading="Related pages" items={related.slice(0, 5)} />
        </Section>
      )}

      <CtaQuote
        heading="Talk it through with the person who would build it"
        ctaLabel="Book a consultation"
        ctaHref="/request-a-quote/?type=custom-system&service_interest=custom-web-applications"
      />
      <JsonLd
        data={[
          webPageSchema({
            path,
            title: service.seoTitle ?? service.title,
            description: service.metaDescription,
            dateModified: service.dateUpdated,
          }),
          serviceSchema(service),
        ]}
      />
    </>
  );
}
