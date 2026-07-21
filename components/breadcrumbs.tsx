import Link from 'next/link';
import { getBreadcrumbs } from '@/lib/routes';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

/**
 * Visible breadcrumb trail + BreadcrumbList JSON-LD from one source
 * (docs/architecture/BREADCRUMB-MODEL.md). Rendered above the H1 on every
 * page except home.
 */
export function Breadcrumbs({ path }: { path: string }) {
  const crumbs = getBreadcrumbs(path);
  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6">
      <ol className="breadcrumbs flex flex-wrap items-center text-sm text-muted">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="hover:text-ink">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </nav>
  );
}
