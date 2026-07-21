import type { LegalDoc } from '@/types/content';

/**
 * Legal documents — STRUCTURED PLACEHOLDER DRAFTS ONLY.
 * These are outlines a qualified person must review and complete before launch
 * (owner input #10). Rendered with a visible placeholder notice while
 * placeholder: true.
 */
export const legalDocs: LegalDoc[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metaDescription:
      'How this website collects, uses and protects personal information under POPIA, including enquiry-form data, retention and your rights.',
    heading: 'Privacy policy',
    intro:
      'This policy explains what personal information this website collects, why, and how it is protected under the Protection of Personal Information Act (POPIA).',
    status: 'live',
    placeholder: true,
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    effectiveDate: '[EFFECTIVE DATE — set at legal review]',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          '[PLACEHOLDER: registered company name, registration number, contact details, and the Information Officer’s name and contact — required under POPIA.]',
        ],
      },
      {
        heading: 'What we collect and why',
        paragraphs: [
          'Enquiry and quote forms collect: name, email address, phone number (optional), company (optional), and your message — used solely to respond to your enquiry and prepare quotations. We do not collect more than the enquiry needs.',
          '[PLACEHOLDER: analytics/cookies section — currently NO analytics cookies are set; update this section before enabling any analytics.]',
        ],
      },
      {
        heading: 'Legal basis and consent',
        paragraphs: [
          'Form submissions require an explicit consent acknowledgement. [PLACEHOLDER: confirm lawful-processing bases wording with legal review.]',
        ],
      },
      {
        heading: 'Storage, sharing and retention',
        paragraphs: [
          '[PLACEHOLDER: name the processing providers (form delivery/email service, hosting), their locations, and the retention period for enquiry data. State that data is never sold.]',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You may request access to, correction of, or deletion of your personal information by contacting us. [PLACEHOLDER: complaint route including the Information Regulator’s contact details.]',
        ],
      },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    metaDescription:
      'The terms governing use of this website and the engagement terms that apply to quotations, projects and support services.',
    heading: 'Terms of service',
    intro:
      'These terms govern use of this website and outline the standard terms under which quotations and services are provided.',
    status: 'live',
    placeholder: true,
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    effectiveDate: '[EFFECTIVE DATE — set at legal review]',
    sections: [
      {
        heading: 'Use of this website',
        paragraphs: [
          '[PLACEHOLDER: permitted use, content ownership, no-warranty wording for informational content, indicative-pricing disclaimer: all published ranges are indicative and superseded by written quotations.]',
        ],
      },
      {
        heading: 'Quotations and engagements',
        paragraphs: [
          '[PLACEHOLDER: quotes valid for X days; work governed by written proposals/agreements; deposit and milestone terms; client obligations; IP/ownership on final payment — align with FAQ ownership promises.]',
        ],
      },
      {
        heading: 'Support services',
        paragraphs: [
          '[PLACEHOLDER: plan scope, month-to-month terms, notice period, response-target definitions, out-of-plan rates.]',
        ],
      },
      {
        heading: 'Liability and disputes',
        paragraphs: [
          '[PLACEHOLDER: limitation of liability, governing law (South Africa), dispute process — legal drafting required.]',
        ],
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    metaDescription:
      'What cookies this website uses. Currently: no analytics or marketing cookies — only what is strictly necessary for the site to function.',
    heading: 'Cookie policy',
    intro:
      'This website currently sets no analytics or marketing cookies. This page explains what that means and what will change if analytics is introduced.',
    status: 'live',
    placeholder: true,
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    effectiveDate: '[EFFECTIVE DATE — set at legal review]',
    sections: [
      {
        heading: 'Current cookie use',
        paragraphs: [
          'No analytics, advertising or tracking cookies are set by this website today. Strictly necessary technical storage may be used by the hosting platform to serve the site securely.',
        ],
      },
      {
        heading: 'If analytics is introduced',
        paragraphs: [
          '[PLACEHOLDER: before enabling Google Analytics 4, update this policy with the cookies set, their lifetimes and purposes, and implement the consent mechanism described in docs/technical/ANALYTICS-EVENTS.md.]',
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          'You can control and delete cookies through your browser settings. [PLACEHOLDER: expand at review if consent tooling is added.]',
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((d) => d.slug === slug);
}
