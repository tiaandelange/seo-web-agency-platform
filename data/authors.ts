import type { Author } from '@/types/content';
import { brand } from '@/config/brand';

/**
 * Approved public authors. Unapproved records must not render on live pages
 * or in Article schema (Trust P0 / D-07).
 */
export const authors: Author[] = [
  {
    slug: 'tiaan-de-lange',
    name: 'Tiaan de Lange',
    role: 'Founder',
    shortBio:
      'Mechanical engineer and technical project professional who founded Koppie Systems to build SEO-first websites and practical digital systems for technical, industrial and service businesses.',
    longBio:
      'Tiaan de Lange holds a Bachelor of Engineering degree in Mechanical Engineering and has professional experience in mechanical design, technical specifications, quality control, infrastructure projects and engineering project coordination. Alongside this work, he has developed SEO-centred websites, quotation workflows, administrative platforms and property-management software. Koppie Systems applies the same disciplined approach to digital work: clear requirements, logical architecture, traceable decisions, practical implementation and rigorous validation.',
    expertise: [
      'SEO-first website architecture',
      'Custom web applications',
      'Quotation and admin workflows',
      'Technical and industrial business systems',
    ],
    sameAs: [],
    approved: brand.verification.founderBioApproved,
    schemaType: 'Person',
  },
];

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

/** Returns an author only when approved for public use. */
export function getApprovedAuthor(slug: string): Author | undefined {
  const author = getAuthor(slug);
  return author?.approved ? author : undefined;
}
