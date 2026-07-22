import { showcaseProjects } from '@/data/projects-showcase';

export function ProjectsHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-28">
        <div className="lg:col-span-8">
          <p className="projects-eyebrow">Selected work / 03</p>
          <h1 className="mt-4 max-w-[900px] font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
            Websites and systems built around real operations.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl md:leading-[1.6]">
            Selected lead-generation platforms and custom systems developed for technical, industrial
            and service businesses.
          </p>
          <p className="projects-trust-note mt-6 max-w-[40rem]">
            Projects are published only with client permission. Scope and results are never fabricated.
          </p>
        </div>

        <aside className="lg:col-span-3 lg:col-start-10 lg:pt-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Authorised projects
          </p>
          <p className="mt-2 font-heading text-4xl font-bold text-ink" aria-label="Two authorised projects">
            {String(showcaseProjects.length).padStart(2, '0')}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Publication and indexation follow owner permission and imagery review.
          </p>
        </aside>
      </div>
    </section>
  );
}
