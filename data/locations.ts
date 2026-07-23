import type { LocationArea } from '@/types/content';

/**
 * Location pages — genuinely served areas only (rule 11, D-08).
 * cape-town is planned and not generated until real service evidence exists.
 * Each page's copy is written individually; no city-swapped boilerplate.
 *
 * Indexation gate (Trust P0): live + not noindex + not placeholder + meaningful
 * local substance. Pretoria clears the gate as the operating base. Johannesburg
 * remains reachable but noindex until stronger non-office local proof exists.
 */
export const locations: LocationArea[] = [
  {
    slug: 'pretoria',
    city: 'Pretoria',
    province: 'Gauteng',
    title: 'Website Design & Development in Pretoria',
    metaDescription:
      'Pretoria-based website design and development: SEO-first business websites, catalogues and custom systems — in-person meetings across Pretoria and Centurion.',
    heading: 'Website design and development in Pretoria',
    intro:
      'Koppie Systems is based in Pretoria. This is the one page on the site where “local” means operating from the same city: scoping sessions in Menlyn or Centurion, on-site content walkthroughs when a catalogue or system needs them, and a developer in the same time zone as your deadlines. We build SEO-first websites and practical digital systems for technical, industrial and service businesses across Gauteng and South Africa.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-23',
    placeholder: false,
    serviceSlugs: [
      'business-websites',
      'lead-generation-websites',
      'product-catalogue-websites',
      'ecommerce-websites',
      'custom-web-applications',
      'website-redesign',
      'seo-website-development',
      'website-maintenance-and-support',
    ],
    consolidatedAreas: ['Centurion', 'Midstream', 'Menlyn', 'Silver Lakes', 'Moot', 'Montana'],
    localFaqs: [
      {
        question: 'Do you meet clients in person in Pretoria?',
        answer:
          'Yes — kickoff and scoping meetings in person across Pretoria and Centurion are standard, and for catalogue or systems projects a walkthrough at your premises is often the most productive hour of the whole project. Day-to-day collaboration then runs over email, calls and WhatsApp.',
      },
      {
        question: 'Do you cover Centurion and surrounding areas?',
        answer:
          'Yes. Centurion, Midstream and the greater Pretoria area are all served from here — this page covers them deliberately rather than pretending each suburb needs its own page.',
      },
      {
        question: 'Is there a public office address?',
        answer:
          'No public street address is published. Work happens through scheduled meetings, remote collaboration and on-site visits by arrangement — not a walk-in showroom.',
      },
    ],
    projectSlugs: ['damtech-website', 'proplytic-property-software'],
    primaryKeywordCluster: 'website design pretoria',
  },
  {
    slug: 'johannesburg',
    city: 'Johannesburg',
    province: 'Gauteng',
    title: 'Website Design & Development for Johannesburg Businesses',
    metaDescription:
      'Website design for Johannesburg businesses from Pretoria: SEO-first sites and systems, remote delivery, on-site by arrangement — no Johannesburg office.',
    heading: 'Website design and development for Johannesburg businesses',
    intro:
      'Koppie Systems does not operate a Johannesburg office. We serve Johannesburg businesses from our Pretoria base across Gauteng: mostly remote collaboration, with on-site meetings in Joburg, Sandton or Midrand when a kickoff or systems walkthrough genuinely helps. Being N1-close means “on-site” is a drive, not a flight — without implying a local branch that does not exist.',
    status: 'live',
    noindex: true,
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-23',
    placeholder: false,
    serviceSlugs: [
      'business-websites',
      'lead-generation-websites',
      'product-catalogue-websites',
      'ecommerce-websites',
      'custom-web-applications',
      'website-redesign',
      'seo-website-development',
      'website-maintenance-and-support',
    ],
    consolidatedAreas: ['Sandton', 'Midrand', 'Randburg', 'Roodepoort', 'East Rand'],
    localFaqs: [
      {
        question: 'Do you have an office in Johannesburg?',
        answer:
          'No. Koppie Systems is Pretoria-based. Johannesburg clients are served remotely from Gauteng, with in-person meetings arranged when they add clear value.',
      },
      {
        question: 'Can you meet on-site in Johannesburg?',
        answer:
          'Yes, by arrangement — most Johannesburg projects can include an in-person kickoff or site walkthrough where it helps, with the rest of the project running remotely.',
      },
      {
        question: 'Does remote delivery slow anything down?',
        answer:
          'No — the build process is structured around documented decisions and scheduled reviews rather than meeting volume. Johannesburg clients get the same response targets as Pretoria clients.',
      },
    ],
    projectSlugs: [],
    primaryKeywordCluster: 'website design johannesburg',
  },
  {
    slug: 'cape-town',
    city: 'Cape Town',
    province: 'Western Cape',
    title: 'Website Design & Development in Cape Town',
    metaDescription:
      'Website design and development for Cape Town businesses — planned page, publishing once genuine Western Cape service evidence exists.',
    heading: 'Website design and development in Cape Town',
    intro: 'Planned page — publishes when genuine Cape Town service evidence exists (D-08).',
    status: 'planned',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    placeholder: true,
    serviceSlugs: [],
    consolidatedAreas: [],
    localFaqs: [],
    projectSlugs: [],
    primaryKeywordCluster: 'website design cape town',
  },
];

export function getLocation(slug: string): LocationArea | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLiveLocations(): LocationArea[] {
  return locations.filter((l) => l.status === 'live');
}

/**
 * Location indexability gate: live, not noindex, not placeholder, and enough
 * local substance (unique FAQs + consolidated areas + services).
 */
export function isLocationIndexable(location: LocationArea): boolean {
  if (location.status !== 'live') return false;
  if (location.noindex) return false;
  if (location.placeholder) return false;
  if (location.serviceSlugs.length === 0) return false;
  if (location.localFaqs.length < 2) return false;
  if (location.consolidatedAreas.length === 0) return false;
  return true;
}
