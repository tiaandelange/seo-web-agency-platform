import type { TeamMember } from '@/types/content';
import { getApprovedAuthor, getAuthor } from '@/data/authors';
import { brand } from '@/config/brand';

/**
 * Team — mirrors the central author record. ECSA registration category is not
 * published until verified wording is supplied.
 */
const founder = getAuthor('tiaan-de-lange');

export const team: TeamMember[] = [
  {
    name: founder?.name ?? 'Tiaan de Lange',
    role: founder?.role ?? 'Founder',
    bio:
      founder?.shortBio ??
      'Koppie Systems was founded by Tiaan de Lange, a mechanical engineer and technical project professional building SEO-first websites and practical digital systems.',
    placeholder: !brand.verification.founderBioApproved || !getApprovedAuthor('tiaan-de-lange'),
  },
];

export const founderExtendedBio =
  founder?.longBio ??
  'Tiaan de Lange holds a Bachelor of Engineering degree in Mechanical Engineering and has professional experience in mechanical design, technical specifications, quality control, infrastructure projects and engineering project coordination.';
