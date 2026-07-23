import Link from 'next/link';
import type { Article, Comparison, PackageOffer, Project, Service, Solution } from '@/types/content';

/**
 * Card components for hub pages and related-content blocks.
 * All cards are single-link (whole-card titles link; no nested anchors).
 *
 * Listing card titles are <h2> with text-card-title so hub pages never skip
 * H1 → H3 (AUDIT-STRUCTURE-THEME.md S1 / .cursorrules).
 */

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-card border border-line bg-canvas p-5 shadow-card">
      {children}
    </div>
  );
}

function CardTitle({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <h2 className="text-card-title text-ink">
      <Link href={href} className="hover:underline">
        {children}
      </Link>
    </h2>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <CardShell>
      <CardTitle href={`/services/${service.slug}/`}>{service.heading}</CardTitle>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>
    </CardShell>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <CardShell>
      <CardTitle href={`/solutions/${solution.slug}/`}>{solution.heading}</CardTitle>
      <p className="mt-2 text-sm leading-relaxed text-muted">{solution.industry}</p>
    </CardShell>
  );
}

export function PackageCard({ pkg }: { pkg: PackageOffer }) {
  return (
    <CardShell>
      <CardTitle href={`/website-packages/${pkg.slug}/`}>{pkg.heading}</CardTitle>
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
      {project.publishPermission && project.placeholder && project.status !== 'template' && (
        <p className="mb-2 inline-block self-start rounded-card bg-surface px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
          Case study
        </p>
      )}
      <CardTitle href={`/projects/${project.slug}/`}>{project.heading}</CardTitle>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {project.projectType} · {project.industry}
      </p>
    </CardShell>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <CardShell>
      <CardTitle href={`/resources/${article.slug}/`}>{article.heading}</CardTitle>
      <p className="mt-2 text-sm leading-relaxed text-muted">{article.metaDescription}</p>
    </CardShell>
  );
}

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <CardShell>
      <CardTitle href={`/compare/${comparison.slug}/`}>{comparison.heading}</CardTitle>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {comparison.optionA} vs {comparison.optionB} — an honest comparison.
      </p>
    </CardShell>
  );
}

export function LinkCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <CardShell>
      <CardTitle href={href}>{title}</CardTitle>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </CardShell>
  );
}

/** Elevated non-link card for FAQ / feature points (visual upgrade only). */
export function InfoCard({
  title,
  description,
  label,
  headingAs = 'h3',
}: {
  title?: string;
  description: string;
  label?: string;
  headingAs?: 'h2' | 'h3';
}) {
  const TitleTag = headingAs;
  return (
    <div className="flex h-full flex-col rounded-card border border-line bg-canvas p-5 shadow-card">
      {label && <p className="text-label text-cta">{label}</p>}
      {title && (
        <TitleTag className={`text-card-title text-ink ${label ? 'mt-2' : ''}`.trim()}>{title}</TitleTag>
      )}
      <p className={`text-sm leading-relaxed text-muted ${title || label ? 'mt-2' : ''}`.trim()}>
        {description}
      </p>
    </div>
  );
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
