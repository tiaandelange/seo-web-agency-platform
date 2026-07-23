import type { ElementType, ReactNode } from 'react';

export type HeadingVariant =
  | 'marketingDisplay'
  | 'editorialDisplay'
  | 'pageTitle'
  | 'sectionTitle'
  | 'sectionTitleArticle'
  | 'subsectionTitle'
  | 'cardTitle';

const variantClass: Record<HeadingVariant, string> = {
  marketingDisplay: 'text-display-marketing',
  editorialDisplay: 'text-display-editorial',
  pageTitle: 'text-page-title',
  sectionTitle: 'text-section-title',
  sectionTitleArticle: 'text-section-title-article',
  subsectionTitle: 'text-subsection-title',
  cardTitle: 'text-card-title',
};

/**
 * Visual heading role separate from semantic level (h1–h3).
 */
export function Heading({
  as: Tag = 'h2',
  variant,
  children,
  className = '',
}: {
  as?: ElementType;
  variant: HeadingVariant;
  children: ReactNode;
  className?: string;
}) {
  return <Tag className={`${variantClass[variant]} ${className}`.trim()}>{children}</Tag>;
}
