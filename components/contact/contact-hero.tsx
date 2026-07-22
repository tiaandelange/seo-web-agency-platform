import { brand } from '@/config/brand';
import { Container } from '@/components/layout/container';
import { Lead } from '@/components/typography/lead';

export function ContactHero({ title, intro }: { title: string; intro: string }) {
  return (
    <header className="contact-hero relative overflow-hidden border-b border-line bg-surface">
      <div className="contact-hero-motif pointer-events-none absolute inset-y-0 right-0 w-1/2 max-w-lg" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 400 280" fill="none" preserveAspectRatio="xMaxYMin meet">
          <path d="M40 40 L360 20" stroke="currentColor" strokeWidth="1" className="text-line" />
          <path d="M80 90 L380 55" stroke="currentColor" strokeWidth="1" className="text-muted" />
          <path d="M20 150 L340 110" stroke="currentColor" strokeWidth="1" className="text-line" />
          <path d="M100 210 L390 160" stroke="currentColor" strokeWidth="1" className="text-muted" />
          <path d="M50 250 L300 230" stroke="currentColor" strokeWidth="1" className="text-line" />
        </svg>
      </div>
      <Container className="relative py-8 md:py-10">
        <p className="text-label flex items-center gap-3 text-cta">
          <span className="inline-block h-px w-7 bg-cta" aria-hidden="true" />
          {brand.baseCity.toUpperCase()}-BASED · SERVING SOUTH AFRICA
        </p>
        <h1 className="text-page-title mt-3 max-w-2xl text-ink">{title}</h1>
        <Lead className="mt-4 max-w-2xl">{intro}</Lead>
      </Container>
    </header>
  );
}
