import Link from 'next/link';
import { HomeSection } from '@/components/home/home-section';

export function ProofPreview() {
  return (
    <HomeSection
      tone="surface"
      eyebrow="Proof · Architecture sample"
      heading="This site is the first case study"
      headingLevel="functional"
      intro="No invented client counts. What you can inspect today: the keyword-to-page map, server-rendered structure and measurement wiring behind every commercial page."
    >
      <div className="mt-8 grid gap-6 border border-line bg-canvas p-6 md:grid-cols-2 md:p-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cta">Keyword → page</p>
          <ul className="mt-4 space-y-2 font-mono text-xs text-muted">
            <li className="flex justify-between gap-4 border-b border-line py-2">
              <span>business website design</span>
              <span className="text-ink">/services/business-websites/</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-line py-2">
              <span>product catalogue website</span>
              <span className="text-ink">/services/product-catalogue-websites/</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-line py-2">
              <span>seo audit south africa</span>
              <span className="text-ink">/seo-audit/</span>
            </li>
            <li className="flex justify-between gap-4 py-2">
              <span>website cost south africa</span>
              <span className="text-ink">/resources/website-cost-south-africa/</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cta">Delivery evidence</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>64 routes with explicit indexation rules — inspect view-source on any page</li>
            <li>Performance and accessibility budgets enforced in CI</li>
            <li>Authorised case studies publish only with owner permission</li>
          </ul>
          <p className="mt-6 text-sm">
            <Link href="/projects/" className="font-medium text-link hover:underline">
              Work in progress →
            </Link>
          </p>
        </div>
      </div>
    </HomeSection>
  );
}
