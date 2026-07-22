import type { ReactNode } from 'react';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading, type HeadingVariant } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';

export type PageHeroVariant = 'standard' | 'editorial' | 'inverse';

const variantShell: Record<PageHeroVariant, string> = {
  standard: 'border-b border-line bg-canvas',
  editorial: 'border-b border-line bg-canvas',
  inverse: 'band-ink border-b border-white/10',
};

const titleVariant: Record<PageHeroVariant, HeadingVariant> = {
  standard: 'pageTitle',
  editorial: 'editorialDisplay',
  inverse: 'pageTitle',
};

const paddingClass: Record<PageHeroVariant, string> = {
  standard: 'pb-8 pt-8 md:pb-10 md:pt-10',
  editorial: 'py-14 md:py-20',
  inverse: 'py-14 md:py-20',
};

export function PageHero({
  eyebrow,
  title,
  description,
  variant = 'standard',
  aside,
  meta,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: PageHeroVariant;
  aside?: ReactNode;
  meta?: ReactNode;
}) {
  const titleColor = variant === 'inverse' ? 'text-accent-contrast' : '';
  const leadColor = variant === 'inverse' ? 'text-sandstone' : '';

  return (
    <header className={variantShell[variant]}>
      <Container
        className={`grid grid-cols-1 gap-10 ${paddingClass[variant]} ${
          aside ? 'lg:grid-cols-12' : ''
        }`}
      >
        <div className={aside ? 'lg:col-span-8' : 'measure-narrow'}>
          {eyebrow && <Eyebrow className={variant === 'inverse' ? 'text-sandstone' : ''}>{eyebrow}</Eyebrow>}
          <Heading
            as="h1"
            variant={titleVariant[variant]}
            className={`${eyebrow ? 'mt-3' : ''} ${titleColor}`.trim()}
          >
            {title}
          </Heading>
          {description && (
            <Lead className={`mt-4 ${leadColor}`.trim()}>{description}</Lead>
          )}
          {meta && <div className="mt-4">{meta}</div>}
        </div>
        {aside && <aside className="lg:col-span-3 lg:col-start-10 lg:pt-1">{aside}</aside>}
      </Container>
    </header>
  );
}
