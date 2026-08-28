import { Container } from '@/components/layout/container';

/**
 * Compact publication policy — full permission and honesty copy, lower visual priority.
 */
export function ProjectsPublicationLedger() {
  return (
    <aside
      aria-labelledby="projects-publication-policy"
      className="border-b border-line bg-notice"
    >
      <Container className="py-6 md:py-8">
        <div className="projects-publication-ledger rounded-card border border-line bg-canvas p-5 md:p-6">
          <p id="projects-publication-policy" className="text-label text-muted">
            Publication policy
          </p>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
            <p>
              Case studies on this site are published only with owner permission and reviewed
              screenshots. We do not invent client counts, traffic figures, rankings or
              testimonials. When a project is still a template or awaiting imagery clearance, it
              stays noindex and out of the sitemap until the publication checklist is complete.
            </p>
            <p>
              Browse by category for website builds, admin systems and related work, or open an
              individual study for the problem, architecture, delivery notes and links to the live
              service or package that matches that shape of work. If you are evaluating us for a
              similar brief, use the case study to see how we structure search pages, enquiry flows
              and operational tools — then request a proposal with your own constraints attached.
            </p>
            <p>
              New authorised projects appear here as they clear permission and review. Until then,
              the method is visible on this site itself: route map, metadata standards, measurement
              wiring and the process pages that document how we deliver.
            </p>
          </div>
        </div>
      </Container>
    </aside>
  );
}
