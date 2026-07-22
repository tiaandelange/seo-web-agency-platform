import Link from 'next/link';
import { brand } from '@/config/brand';

export function HomeHero() {
  return (
    <section className="band-ink relative overflow-hidden pb-28 pt-14 md:pb-36 md:pt-16">
      <div className="pointer-events-none absolute inset-0 contour-grid opacity-40" aria-hidden="true" />
      <div className="home-container relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="home-eyebrow text-sandstone">SEO-first websites &amp; digital systems</p>
            <h1 className="text-display-marketing mt-5 max-w-2xl">
              Websites and systems built to generate enquiries
            </h1>
            <p className="text-lead mt-6 max-w-prose text-sandstone">
              {brand.name} develops high-performance websites, portals and workflow tools for
              technical, industrial and service businesses throughout South Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/request-a-quote/"
                className="rounded-sm bg-cta px-6 py-3 font-semibold text-cta-contrast hover:opacity-90"
              >
                Request a Proposal
              </Link>
              <Link
                href="/projects/"
                className="rounded-sm border border-sandstone/40 px-6 py-3 font-semibold text-accent-contrast hover:bg-white/5"
              >
                View Our Work
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-micro text-cta">System 01 · Commercial acquisition</p>
            <p className="mt-3 text-2xl font-semibold leading-snug text-accent-contrast sm:text-3xl">
              From search demand
              <span className="block text-sandstone">to signed quotation.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sandstone/90">
              {brand.tagline} Based in {brand.baseCity}, delivering nationwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
