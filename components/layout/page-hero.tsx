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

export type PageHeroAsideLayout = 'stat' | 'proof';

export function PageHero({
  eyebrow,
  title,
  description,
  variant = 'standard',
  aside,
  asideLayout = 'stat',
  meta,
  trailingMeta,
  motif = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: PageHeroVariant;
  aside?: ReactNode;
  /** `proof` widens the aside column for authorised screenshot compositions. */
  asideLayout?: PageHeroAsideLayout;
  meta?: ReactNode;
  /** Renders after the aside in DOM — use for metadata/actions below proof on mobile. */
  trailingMeta?: ReactNode;
  /** Apply the site-wide .contour-grid texture behind the hero. */
  motif?: boolean;
}) {
  const titleColor = variant === 'inverse' ? 'text-accent-contrast' : '';
  const leadColor = variant === 'inverse' ? 'text-sandstone' : '';
  const proofAside = aside && asideLayout === 'proof';
  const primarySpan = proofAside ? 'lg:col-span-7' : aside ? 'lg:col-span-8' : '';
  const asideSpan = proofAside
    ? 'lg:col-span-5 lg:col-start-8 lg:row-span-2'
    : 'lg:col-span-3 lg:col-start-10 lg:pt-1';

  return (
    <header id="hero" className={`${variantShell[variant]} relative overflow-hidden`}>
      {motif && (
        <div
          className="contour-grid pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
        />
      )}
      <Container
        className={`relative grid grid-cols-1 gap-10 ${paddingClass[variant]} ${
          aside ? 'lg:grid-cols-12' : ''
        }`}
      >
        <div className={`${primarySpan || ''} ${aside ? '' : 'measure-narrow'}`.trim()}>
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
          {meta && !trailingMeta && <div className="mt-4">{meta}</div>}
        </div>
        {aside && <aside className={asideSpan}>{aside}</aside>}
        {trailingMeta && (
          <div className={`${proofAside ? 'lg:col-span-7' : ''} mt-0`.trim()}>{trailingMeta}</div>
        )}
      </Container>
    </header>
  );
}
