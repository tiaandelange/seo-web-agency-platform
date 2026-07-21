/**
 * Trust signals — verifiable process/technology facts ONLY.
 * No fabricated reviews, client counts, awards or logos (rule 12, D-10).
 * Testimonials join this component only once genuine + permissioned.
 */
const SIGNALS: { title: string; detail: string }[] = [
  {
    title: 'Engineering-led delivery',
    detail: 'The person who scopes your project builds it — no account-manager relay, no outsourcing chain.',
  },
  {
    title: 'SEO decides the architecture',
    detail: 'Every page exists because a researched search intent justifies it. You receive the keyword-to-page map as part of the build.',
  },
  {
    title: 'Modern, owned stack',
    detail: 'Server-rendered Next.js and TypeScript — no page-builder themes, no plugin sprawl, no hostage hosting. You own the code.',
  },
  {
    title: 'Measured in enquiries',
    detail: 'Search Console and conversion tracking are set up at launch, so progress is visible in real data, not promises.',
  },
];

export function TrustSignals() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SIGNALS.map((signal) => (
        <div key={signal.title} className="rounded-card border border-line bg-canvas p-5">
          <h3 className="text-base font-semibold text-ink">{signal.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{signal.detail}</p>
        </div>
      ))}
    </div>
  );
}
