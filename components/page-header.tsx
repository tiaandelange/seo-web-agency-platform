/**
 * Page header — enforces exactly one H1 per page via PageHero standard variant.
 * (docs/architecture/PAGE-TEMPLATES.md baseline).
 */
import { PageHero } from '@/components/layout/page-hero';

export function PageHeader({
  heading,
  intro,
  updated,
  eyebrow,
}: {
  heading: string;
  intro?: string;
  updated?: string;
  eyebrow?: string;
}) {
  return (
    <PageHero
      variant="standard"
      eyebrow={eyebrow}
      title={heading}
      description={intro}
      meta={
        updated ? (
          <p className="text-sm text-muted">
            Updated{' '}
            {new Date(updated).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long' })}
          </p>
        ) : undefined
      }
    />
  );
}
