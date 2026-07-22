import Link from 'next/link';
import { brand } from '@/config/brand';

export function ProjectsConversionCTA() {
  const discussHref =
    '/request-a-quote/?service_interest=custom-web-applications&source=projects-page&message=' +
    encodeURIComponent(
      'I would like to discuss an RFQ-to-quote or operational workflow for our business.',
    );

  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="projects-heading-functional">
            Have a process that has outgrown spreadsheets?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Koppie Systems can map the workflow, define the business rules and build the interface
            around the way your company actually operates.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/request-a-quote/?service_interest=custom-web-applications&source=projects-page"
              className="inline-flex min-h-11 items-center justify-center rounded-card bg-cta px-6 py-3 font-heading text-sm font-semibold text-cta-contrast transition-opacity hover:opacity-90"
            >
              Request a proposal
            </Link>
            <Link
              href={discussHref}
              className="inline-flex min-h-11 items-center justify-center rounded-card border border-line bg-white px-6 py-3 font-heading text-sm font-semibold text-ink transition-colors hover:bg-canvas"
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
      </div>
    </section>
  );
}
