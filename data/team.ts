import type { TeamMember } from '@/types/content';
import { brand } from '@/config/brand';

/**
 * Team — draft founder profile pending final owner approval
 * (brand.verification.founderBioApproved). ECSA category is not published
 * until verified wording is supplied.
 */
export const team: TeamMember[] = [
  {
    name: 'Tiaan de Lange',
    role: 'Founder',
    bio:
      'Koppie Systems was founded by Tiaan de Lange, a mechanical engineer and technical project professional with experience in engineering design, infrastructure projects, business-process development and modern website and web-system development. His engineering background shapes Koppie Systems’ structured approach: understand the business problem, define the information and process architecture, and build the website or system around measurable commercial requirements.',
    // Remains flagged until owner explicitly approves public bio (and ECSA wording).
    placeholder: !brand.verification.founderBioApproved,
  },
];

export const founderExtendedBio =
  'Tiaan de Lange holds a Bachelor of Engineering degree in Mechanical Engineering and has professional experience in mechanical design, technical specifications, quality control, infrastructure projects and engineering project coordination. Alongside this work, he has developed SEO-centred websites, quotation workflows, administrative platforms and property-management software. Koppie Systems applies the same disciplined approach to digital work: clear requirements, logical architecture, traceable decisions, practical implementation and rigorous validation.';
