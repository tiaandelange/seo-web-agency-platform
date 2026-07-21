import type { LocationArea } from '@/types/content';

/**
 * Location pages — genuinely served areas only (rule 11, D-08).
 * cape-town is planned and not generated until real service evidence exists.
 * Each page's copy is written individually; no city-swapped boilerplate.
 */
export const locations: LocationArea[] = [
  {
    slug: 'pretoria',
    city: 'Pretoria',
    province: 'Gauteng',
    title: 'Website Design & Development in Pretoria',
    metaDescription:
      'Pretoria-based website design and development: SEO-first business websites, catalogues and custom systems, with in-person meetings across Pretoria and Centurion.',
    heading: 'Website design and development in Pretoria',
    intro:
      'We are based in Pretoria, which makes this the one page on this site where “local” means exactly that: scoping sessions over coffee in Menlyn or Centurion, on-site content walkthroughs at your premises, and a developer in the same time zone as your deadlines.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    placeholder: true,
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
    ],
    projectSlugs: [],
    primaryKeywordCluster: 'website design pretoria',
  },
  {
    slug: 'johannesburg',
    city: 'Johannesburg',
    province: 'Gauteng',
    title: 'Website Design & Development in Johannesburg',
    metaDescription:
      'Website design and development for Johannesburg businesses: SEO-first builds, catalogues and systems delivered remotely with on-site meetings by arrangement.',
    heading: 'Website design and development in Johannesburg',
    intro:
      'Johannesburg businesses work with us the way most of our clients do: efficiently and mostly remotely, with on-site meetings across Joburg, Sandton and Midrand arranged where a project genuinely benefits — typically kickoff and catalogue or systems walkthroughs. Being N1-close in Pretoria means “on-site” is an hour away, not a flight.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    placeholder: true,
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
        question: 'Can you meet on-site in Johannesburg?',
        answer:
          'Yes, by arrangement — most Johannesburg projects include an in-person kickoff or site walkthrough where it adds real value, with the rest of the project running remotely. For quoting-system and catalogue projects, seeing your actual workflow at your premises is usually worth the trip.',
      },
      {
        question: 'Does remote delivery slow anything down?',
        answer:
          'No — the build process is structured around documented decisions and scheduled reviews rather than meeting volume. Johannesburg clients get the same response targets as Pretoria clients; the M1 is only involved when a whiteboard genuinely beats a video call.',
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
