import Link from 'next/link';
import { brand } from '@/config/brand';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';

export function ProjectsConversionCTA() {
  const discussHref =
    '/request-a-quote/?service_interest=custom-web-applications&source=projects-page&message=' +
    encodeURIComponent(
      'I would like to discuss an RFQ-to-quote or operational workflow for our business.',
    );

  return (
    <section className="border-t border-line bg-surface">
      <Container className="py-14 md:py-20">
        <div className="max-w-2xl">
          <Heading as="h2" variant="subsectionTitle">
            Have a process that has outgrown spreadsheets?
          </Heading>
          <Lead className="mt-4">
            Koppie Systems can map the workflow, define the business rules and build the interface
            around the way your company actually operates.
          </Lead>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/request-a-quote/?service_interest=custom-web-applications&source=projects-page"
              className="inline-flex min-h-11 items-center justify-center rounded-card bg-cta px-6 py-3 font-heading text-sm font-semibold text-cta-contrast transition-opacity hover:opacity-90"
            >
              Request a proposal
            </Link>
            <Link
              href={discussHref}
              className="inline-flex min-h-11 items-center justify-center rounded-card border border-line bg-canvas px-6 py-3 font-heading text-sm font-semibold text-ink transition-colors hover:bg-surface"
            >
              Discuss the workflow
            </Link>
            {brand.contact.whatsapp ? (
              <a
                href={`https://wa.me/${brand.contact.whatsapp}`}
                className="min-h-11 py-3 font-medium text-link hover:underline"
              >
                WhatsApp
              </a>
            ) : (
              <Link href="/contact/" className="min-h-11 py-3 font-medium text-link hover:underline">
                Contact
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
