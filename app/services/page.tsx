import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { InkBand } from '@/components/layout/ink-band';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { itemListSchema, webPageSchema } from '@/lib/schema';
import { services } from '@/data/services';
import { SystemMapHook } from '@/components/services/system-map-hook';
import { CapabilityArchitecture } from '@/components/services/capability-architecture';

const PATH = '/services/';
const TITLE = 'Websites, Ecommerce and Business Systems';
const DESCRIPTION =
  'Koppie Systems builds connected websites, ecommerce and operational systems for South African businesses: acquire customers, run operations, and scale with support.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHero
        variant="editorial"
        motif
        eyebrow="Services"
        title="Websites, ecommerce and business systems"
        description="Three connected capabilities: attract the right customers, run your operations more effectively, and build infrastructure that can grow with the business."
        aside={
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="text-label text-cta">Capability map</p>
            <p className="mt-2 text-sm text-muted">
              {services.length} live services across websites, systems and recurring care.
            </p>
          </div>
        }
      />

      <SystemMapHook />
      <CapabilityArchitecture />

      <InkBand motif>
        <p className="max-w-2xl text-lg leading-relaxed text-sandstone">
          One scoping conversation is usually enough to tell you whether you need a website, a
          system, or both — and what not to build.
        </p>
      </InkBand>

      <CtaQuote
        heading="Not sure which path fits?"
        body="One scoping conversation is usually enough to tell you whether you need a website, a system, or both — and what not to build."
      />
      <JsonLd
        data={[
          webPageSchema({
            path: PATH,
            title: TITLE,
            description: DESCRIPTION,
            pageType: 'CollectionPage',
          }),
          itemListSchema(services.map((s) => ({ name: s.heading, path: `/services/${s.slug}/` }))),
        ]}
      />
    </>
  );
}
