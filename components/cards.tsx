import Link from 'next/link';
import type { Article, Comparison, PackageOffer, Project, Service, Solution } from '@/types/content';

/**
 * Card components for hub pages and related-content blocks.
 * All cards are single-link (whole-card titles link; no nested anchors).
 */

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-card border border-line bg-canvas p-5">
      {children}
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <CardShell>
      <h3 className="text-base font-semibold text-ink">
        <Link href={`/services/${service.slug}/`} className="hover:underline">
          {service.heading}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>
    </CardShell>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <CardShell>
      <h3 className="text-base font-semibold text-ink">
        <Link href={`/solutions/${solution.slug}/`} className="hover:underline">
          {solution.heading}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{solution.industry}</p>
    </CardShell>
  );
}

export function PackageCard({ pkg }: { pkg: PackageOffer }) {
  return (
    <CardShell>
      <h3 className="text-base font-semibold text-ink">
        <Link href={`/website-packages/${pkg.slug}/`} className="hover:underline">
          {pkg.heading}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{pkg.intro}</p>
      <p className="mt-3 text-sm font-medium text-ink">
        {pkg.priceRange
          ? `Indicative R${pkg.priceRange.min.toLocaleString('en-ZA')} – R${pkg.priceRange.max.toLocaleString('en-ZA')}`
          : 'Scoped via paid discovery'}
      </p>
    </CardShell>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <CardShell>
      {project.status === 'template' && (
        <p className="mb-2 inline-block self-start rounded-card bg-surface px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
          Example template
        </p>
      )}
      <h3 className="text-base font-semibold text-ink">
        <Link href={`/projects/${project.slug}/`} className="hover:underline">
          {project.heading}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {project.projectType} · {project.industry}
      </p>
    </CardShell>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <CardShell>
      <h3 className="text-base font-semibold text-ink">
        <Link href={`/resources/${article.slug}/`} className="hover:underline">
          {article.heading}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{article.metaDescription}</p>
    </CardShell>
  );
}

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <CardShell>
      <h3 className="text-base font-semibold text-ink">
        <Link href={`/compare/${comparison.slug}/`} className="hover:underline">
          {comparison.heading}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {comparison.optionA} vs {comparison.optionB} — an honest comparison.
      </p>
    </CardShell>
  );
}

export function LinkCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <CardShell>
      <h3 className="text-base font-semibold text-ink">
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </CardShell>
  );
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
