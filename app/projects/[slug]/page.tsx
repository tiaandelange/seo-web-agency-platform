import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section, BulletList } from '@/components/section';
import { RelatedContent, type RelatedItem } from '@/components/related-content';
import { PlaceholderNotice } from '@/components/placeholder-notice';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { ProjectScreenshot } from '@/components/projects/project-screenshot';
import { projectSchemaFor, webPageSchema } from '@/lib/schema';
import {
  projects,
  projectCategories,
  getProject,
  getProjectsByCategory,
  isProjectIndexable,
  isProjectCategoryIndexable,
} from '@/data/projects';
import { getShowcaseBySlug } from '@/data/projects-showcase';
import { getService } from '@/data/services';
import { getSolution } from '@/data/solutions';
import { getArticle } from '@/data/articles';
import type { ProjectCategory } from '@/types/content';
import { CardGrid, ProjectCard } from '@/components/cards';

/**
 * Shared namespace under /projects/: category listings (websites, ecommerce,
 * admin-systems) and individual case studies. Slug collisions are prevented by
 * the validator (docs/architecture/TAXONOMY.md).
 */

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return [
    ...projectCategories.map((c) => ({ slug: c.slug as string })),
    ...projects.map((p) => ({ slug: p.slug })),
  ];
}

export const dynamicParams = false;

function findCategory(slug: string) {
  return projectCategories.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);
  if (category) {
    return buildMetadata({
      title: category.title,
      description: `${category.description} Case studies publish here as client work completes.`,
      path: `/projects/${category.slug}/`,
      index: isProjectCategoryIndexable(category.slug),
    });
  }
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    seoTitle: project.seoTitle,
    description: project.metaDescription,
    path: `/projects/${project.slug}/`,
    index: isProjectIndexable(project),
    ogType: 'article',
    dateUpdated: project.dateUpdated,
  });
}

export default async function ProjectOrCategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  const category = findCategory(slug);
  if (category) {
    const path = `/projects/${category.slug}/`;
    const items = getProjectsByCategory(category.slug as ProjectCategory);
    return (
      <>
        <Breadcrumbs path={path} />
        <PageHeader heading={category.heading} intro={category.description} />
        <Section>
          {items.length > 0 ? (
            <CardGrid>
              {items.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </CardGrid>
          ) : (
            <p className="max-w-3xl text-muted">Case studies in this category publish as work completes.</p>
          )}
        </Section>
        <CtaQuote />
        <JsonLd
          data={webPageSchema({
            path,
            title: category.title,
            description: category.description,
            pageType: 'CollectionPage',
          })}
        />
      </>
    );
  }

  const project = getProject(slug);
  if (!project) notFound();

  const path = `/projects/${project.slug}/`;
  const verifiedResults = project.results.filter((r) => r.verified);
  const relatedServices = project.serviceSlugs.map(getService).filter((s) => s !== undefined);
  const solution = project.solutionSlug ? getSolution(project.solutionSlug) : undefined;
  const showcase = getShowcaseBySlug(project.slug);
  const desktopShot = project.featuredImage;
  const mobileShot = project.gallery[0];

  const related: RelatedItem[] = [
    ...relatedServices.map((s) => ({ title: s.heading, href: `/services/${s.slug}/`, kind: 'Service used' })),
    ...(solution ? [{ title: solution.heading, href: `/solutions/${solution.slug}/`, kind: 'Industry' }] : []),
    ...project.relatedProjectSlugs
      .map(getProject)
      .filter((p) => p !== undefined)
      .map((p) => ({ title: p.heading, href: `/projects/${p.slug}/`, kind: 'Project' })),
    ...project.relatedArticleSlugs
      .map(getArticle)
      .filter((a) => a !== undefined)
      .map((a) => ({ title: a.heading, href: `/resources/${a.slug}/`, kind: 'Guide' })),
  ];

  return (
    <>
      <Breadcrumbs path={path} />
      <PageHeader heading={project.heading} intro={project.intro} updated={project.dateUpdated} />
      {project.status === 'template' && (
        <PlaceholderNotice>
          This is an example case-study structure, not a real project. It is excluded from search
          engines and exists to show how completed work will be documented.
        </PlaceholderNotice>
      )}

      {desktopShot && (
        <Section heading="Interface evidence" tone="surface">
          <div className="mx-auto max-w-5xl space-y-8">
            <ProjectScreenshot
              desktopSrc={desktopShot.src}
              mobileSrc={mobileShot?.src ?? showcase?.mobileSrc}
              alt={desktopShot.alt}
              focalPosition={showcase?.focalPosition ?? 'center top'}
              priority
              variant="detail"
              caption="Desktop homepage capture from the live project."
            />
            {mobileShot && (
              <div className="mx-auto max-w-sm">
                <ProjectScreenshot
                  desktopSrc={mobileShot.src}
                  alt={mobileShot.alt}
                  focalPosition="center top"
                  variant="detail"
                  caption="Mobile viewport capture."
                />
              </div>
            )}
          </div>
        </Section>
      )}

      <Section heading="Project summary" tone={desktopShot ? undefined : 'surface'}>
        <dl className="grid max-w-4xl gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="font-semibold text-ink">Client</dt>
            <dd className="mt-1 text-muted">{project.clientDescriptor}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Industry</dt>
            <dd className="mt-1 text-muted">{project.industry}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Project type</dt>
            <dd className="mt-1 text-muted">{project.projectType}</dd>
          </div>
          {project.location && (
            <div>
              <dt className="font-semibold text-ink">Location</dt>
              <dd className="mt-1 text-muted">{project.location}</dd>
            </div>
          )}
          <div>
            <dt className="font-semibold text-ink">Technology</dt>
            <dd className="mt-1 text-muted">{project.stack.join(', ')}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Status</dt>
            <dd className="mt-1 text-muted">{project.projectStatus}</dd>
          </div>
        </dl>
      </Section>

      <Section heading="The business problem">
        <p className="max-w-3xl leading-relaxed text-muted">{project.businessProblem}</p>
      </Section>

      <Section heading="Objectives" tone="surface">
        <BulletList items={project.objectives} />
      </Section>

      <Section heading="Scope">
        <BulletList items={project.scope} />
      </Section>

      <Section heading="The solution" tone="surface">
        <p className="max-w-3xl leading-relaxed text-muted">{project.solutionSummary}</p>
      </Section>

      <Section heading="Implementation process">
        <BulletList items={project.process} />
      </Section>

      <Section heading="Key functionality" tone="surface">
        <BulletList items={project.keyFunctionality} />
      </Section>

      {project.seoWork.length > 0 && (
        <Section heading="SEO work performed">
          <BulletList items={project.seoWork} />
        </Section>
      )}

      {verifiedResults.length > 0 && (
        <Section heading="Verified results" tone="surface">
          <dl className="grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedResults.map((r) => (
              <div key={r.metric} className="rounded-card border border-line bg-canvas p-5">
                <dt className="text-sm font-semibold text-muted">{r.metric}</dt>
                <dd className="mt-1 text-xl font-bold text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {project.testimonial && project.testimonial.permissionConfirmed && (
        <Section heading="Client testimonial">
          <blockquote className="max-w-3xl border-l-4 border-accent pl-4 text-lg leading-relaxed text-muted">
            “{project.testimonial.quote}”
            <footer className="mt-2 text-sm font-medium text-ink">
              — {project.testimonial.author}
              {project.testimonial.company ? `, ${project.testimonial.company}` : ''}
            </footer>
          </blockquote>
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="surface">
          <RelatedContent heading="Services and related pages" items={related.slice(0, 6)} />
        </Section>
      )}

      <CtaQuote heading="Have a similar project in mind?" />
      <JsonLd data={projectSchemaFor(project)} />
    </>
  );
}
