import type { TeamMember } from '@/types/content';

/**
 * Team — placeholder until the founder supplies a real bio (owner input #9).
 * Entries with placeholder: true render with a visible placeholder notice.
 */
export const team: TeamMember[] = [
  {
    name: 'Founder',
    role: 'Founder & lead developer',
    bio: '[PLACEHOLDER — real founder bio required. Suggested shape: engineering background, why the business exists, the standard every project is held to. 60–120 words, first person or third person to be decided with the brand voice.]',
    placeholder: true,
  },
];
