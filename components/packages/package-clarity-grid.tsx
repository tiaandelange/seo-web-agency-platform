import type { PackageClarity } from '@/data/package-clarity';

const ROWS: Array<{ key: keyof PackageClarity; label: string }> = [
  { key: 'suitableCustomer', label: 'Suitable customer' },
  { key: 'includedPages', label: 'Included pages' },
  { key: 'contentResponsibility', label: 'Content responsibility' },
  { key: 'forms', label: 'Forms' },
  { key: 'seoScope', label: 'SEO scope' },
  { key: 'revisions', label: 'Revisions' },
  { key: 'hosting', label: 'Hosting' },
  { key: 'support', label: 'Support' },
  { key: 'deliveryRange', label: 'Delivery range' },
  { key: 'exclusionsSummary', label: 'Exclusions' },
  { key: 'priceDrivers', label: 'Price drivers' },
];

export function PackageClarityGrid({ clarity }: { clarity: PackageClarity }) {
  return (
    <dl className="package-clarity divide-y divide-line border border-line bg-canvas">
      {ROWS.map((row) => (
        <div
          key={row.key}
          className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(10rem,14rem)_1fr] sm:gap-6 sm:px-5"
        >
          <dt className="text-sm font-semibold text-ink">{row.label}</dt>
          <dd className="text-sm leading-relaxed text-muted">{clarity[row.key]}</dd>
        </div>
      ))}
    </dl>
  );
}
