/**
 * Trust signals — verifiable process/technology facts ONLY.
 * No fabricated reviews, client counts, awards or logos (rule 12, D-10).
 * Aligned to Koppie messaging pillars: visibility, conversion, operations, reliability.
 */
const SIGNALS: { title: string; detail: string }[] = [
  {
    title: 'Visibility first',
    detail:
      'Search demand decides the architecture. Every commercial page exists because a researched intent justifies it — and you receive that map with the build.',
  },
  {
    title: 'Built to convert',
    detail:
      'Clear calls to action, RFQ-ready forms and quotation pathways — so traffic becomes qualified enquiries, not just visits.',
  },
  {
    title: 'Systems when you need them',
    detail:
      'The same partner can extend the website into portals, admin panels and workflow tools that reduce repetitive administration.',
  },
  {
    title: 'Owned and maintainable',
    detail:
      'Server-rendered Next.js, performance budgets and ongoing support options. You own the code, content, domain and analytics — no hostage hosting.',
  },
];

export function TrustSignals() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SIGNALS.map((signal) => (
        <div key={signal.title} className="rounded-card border border-line bg-canvas p-5 shadow-card">
          <h3 className="text-base font-semibold text-ink">{signal.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{signal.detail}</p>
        </div>
      ))}
    </div>
  );
}
