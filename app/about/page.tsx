import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { brand } from '@/config/brand';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { TrustSignals } from '@/components/trust-signals';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { founderExtendedBio } from '@/data/team';
import { getApprovedAuthor } from '@/data/authors';

const PATH = '/about/';
const TITLE = 'About Us';
const DESCRIPTION =
  'About Koppie Systems — a Pretoria-based studio building SEO-first websites and practical digital systems for technical, industrial and service businesses.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function AboutPage() {
  const founder = getApprovedAuthor('tiaan-de-lange');
  if (!founder) {
    throw new Error('About page requires an approved founder author (tiaan-de-lange).');
  }

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading={`About ${brand.name}`}
        intro={`${brand.positioning} Based in ${brand.baseCity}, we work with businesses throughout South Africa through structured discovery, design, development, testing and review.`}
      />

      <Section heading="Why this business exists">
        <p className="max-w-3xl leading-relaxed text-muted">
          The local market splits into template sellers competing on price and agencies competing
          on gloss. Between them sits an underserved buyer: the contractor, engineer, manufacturer
          or practice owner who needs the phone to ring and the admin to shrink. {brand.name}{' '}
          exists for that buyer. We build search-first websites, and the quotation tools, admin
          panels and portals those websites grow into. One partner, both layers, everything owned
          by you.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{brand.brandPromise}</p>
      </Section>

      <Section heading="How we're different" tone="surface">
        <TrustSignals />
      </Section>

      <Section heading="Who runs the work">
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold text-ink">
            {founder.name} — {founder.role}
          </h3>
          <p className="mt-2 leading-relaxed text-muted">{founder.shortBio}</p>
          {founderExtendedBio && (
            <p className="mt-4 leading-relaxed text-muted">{founderExtendedBio}</p>
          )}
          <p className="mt-4 leading-relaxed text-muted">
            Projects are approached as engineering problems: requirements first, information and
            process architecture next, then implementation with validation. ECSA registration
            category is not claimed on this site until verified wording is approved.
          </p>
        </div>
      </Section>

      <Section heading="South African service context" tone="surface">
        <p className="max-w-3xl leading-relaxed text-muted">
          {brand.name} operates from {brand.baseCity}, {brand.province}, and works with clients
          across {brand.serviceAreas.filter((a) => a !== brand.baseCity).join(', ')}. There is no
          published walk-in office address. Collaboration is scheduled meetings, remote delivery
          and on-site visits where they add value.
        </p>
      </Section>

      <Section heading="What to look at next">
        <p className="max-w-3xl leading-relaxed text-muted">
          The most useful pages for judging us: the{' '}
          <Link href="/process/" className="text-link underline">
            process page
          </Link>{' '}
          (how projects actually run),{' '}
          <Link href="/pricing/" className="text-link underline">
            pricing
          </Link>{' '}
          (indicative ranges published openly), and{' '}
          <Link href="/projects/" className="text-link underline">
            work
          </Link>{' '}
          (live and internal projects with truthful labels — case studies stay noindex until
          narratives clear the publication gate).
        </p>
      </Section>

      <CtaQuote
        heading="Talk to the person who would build it"
        ctaLabel="Request a Proposal"
      />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'AboutPage' })} />
    </>
  );
}
