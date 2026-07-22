import type { LegalDoc } from '@/types/content';
import { brand, publicEmail, vatStatusLabel } from '@/config/brand';

/**
 * Legal documents — operational drafts for private preview.
 * Not attorney-reviewed. Review status tracked in docs (not as visitor-facing
 * [PLACEHOLDER] brackets). Set placeholder:false so pages do not show the
 * alarming PlaceholderNotice; legal review remains a launch gate.
 */

const contactLine = [
  brand.contact.phone ? `Telephone: ${brand.contact.phone}` : null,
  publicEmail() ? `Email: ${publicEmail()}` : `Enquiries: via the website contact and quote forms`,
  `Lead delivery (ops): configured server-side to the monitored mailbox (see privacy — processors)`,
]
  .filter(Boolean)
  .join('. ');

export const legalDocs: LegalDoc[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metaDescription:
      'How Koppie Systems collects, uses and protects personal information under POPIA, including enquiry-form data, retention and your rights.',
    heading: 'Privacy policy',
    intro:
      'This policy explains what personal information this website collects, why, and how it is protected under the Protection of Personal Information Act (POPIA).',
    status: 'live',
    placeholder: false,
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-22',
    effectiveDate: '2026-07-22',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          `${brand.name} (proposed legal name ${brand.legalName}) is a Pretoria-based website-development and digital-systems studio. Company registration number will be published when CIPC registration is confirmed. ${vatStatusLabel()}.`,
          `We are based in ${brand.baseCity} and work with businesses throughout South Africa and on selected international engagements. We do not publish a street address. ${contactLine}.`,
          'Until a dedicated POPIA Information Officer is appointed and published, privacy requests may be sent through the website contact form or the telephone number above.',
        ],
      },
      {
        heading: 'What we collect and why',
        paragraphs: [
          'Enquiry and quote forms collect: name, email address, phone number (optional), company (optional), service interest, budget band, timeline and your message. We use this solely to respond to your enquiry, prepare quotations and (where relevant) follow up on project discussions. We do not collect more than the enquiry needs.',
          'No analytics or marketing cookies are set on this website today. If Google Analytics 4 or similar tools are enabled later, this policy and the cookie policy will be updated before activation, and a consent mechanism will be described.',
        ],
      },
      {
        heading: 'Legal basis and consent',
        paragraphs: [
          'Form submissions require an explicit consent acknowledgement linking to this policy. We process enquiry data to take steps at your request before entering a contract, and where necessary for our legitimate interests in responding to business enquiries — always subject to your POPIA rights.',
        ],
      },
      {
        heading: 'Storage, sharing and retention',
        paragraphs: [
          'This website is hosted on Vercel. Enquiry forms are processed by a server action on that host and delivered to our monitored lead mailbox via a configured provider (Resend and/or a webhook automation). Delivery credentials are stored only in server environment variables.',
          'We do not sell personal information. Providers act as operators/processors for delivery and hosting. Some processing may occur outside South Africa (for example US-based hosting or email infrastructure); we use reputable providers with appropriate security practices.',
          'Enquiry records are retained only as long as needed to handle the enquiry and any resulting engagement, then deleted or archived under ordinary business record rules. Exact retention periods will be confirmed at legal review.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You may request access to, correction of, or deletion of your personal information, or object to certain processing, by contacting us via the website form or telephone.',
          'You may also lodge a complaint with the Information Regulator (South Africa): https://inforegulator.org.za/ — JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001; complaints email as published on the Regulator’s site.',
        ],
      },
      {
        heading: 'Security limitations',
        paragraphs: [
          'We take reasonable technical and organisational measures to protect enquiry data in transit and at rest on our processors. No method of transmission or storage is perfectly secure; please avoid sending passwords or payment-card details through the enquiry forms.',
        ],
      },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    metaDescription:
      'Terms governing use of the Koppie Systems website and the engagement terms that apply to quotations, projects and support services.',
    heading: 'Terms of service',
    intro:
      'These terms govern use of this website and outline the standard terms under which quotations and services are provided. A written proposal or agreement for a specific project takes precedence over this page for that engagement.',
    status: 'live',
    placeholder: false,
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-22',
    effectiveDate: '2026-07-22',
    sections: [
      {
        heading: 'Use of this website',
        paragraphs: [
          `Content on this website is owned by ${brand.name} or its licensors and is provided for general information. You may not scrape, republish or misuse the site in a way that harms its integrity or security.`,
          'Published pricing ranges are indicative only and are superseded by a written quotation. We do not warrant that informational content is complete for your specific circumstances.',
        ],
      },
      {
        heading: 'Quotations and engagements',
        paragraphs: [
          'Quotations are typically valid for 30 days unless stated otherwise. Work starts only after written acceptance (email is sufficient) and receipt of any required deposit.',
          'Standard payment structure is a deposit to schedule the project, a milestone payment at structure or draft approval, and the balance at launch — exact percentages appear in your quote. We do not launch sites with unpaid balances.',
          'Scope is defined in the proposal. Change requests outside that scope are quoted separately before work proceeds. Delays caused by late client content, feedback or access may shift timelines without fault on our side.',
          'You are responsible for the accuracy of materials you supply. On final payment for a website or application build, you own the deliverables produced for you under the proposal, excluding third-party components, fonts, stock assets and our pre-existing tools or frameworks, which remain under their respective licences.',
        ],
      },
      {
        heading: 'Hosting, third-party software and warranties',
        paragraphs: [
          'Domain registration, DNS and hosting accounts should sit in your name where practical. Third-party services (payment gateways, email, analytics, SaaS APIs) are governed by their own terms; we are not those providers.',
          'We warrant that deliverables will substantially match the agreed scope at handover. Except as required by law, we exclude implied warranties beyond that. Maintenance and support are separate optional services.',
        ],
      },
      {
        heading: 'Support services',
        paragraphs: [
          'Care plans are month-to-month unless a longer term is agreed in writing. Cancellation typically requires one calendar month’s notice. Response targets and inclusions are defined in the plan description; out-of-plan work is quoted or billed at the rates stated in the plan.',
        ],
      },
      {
        heading: 'Liability and disputes',
        paragraphs: [
          'To the extent permitted by South African law, our aggregate liability arising from a project is limited to the fees paid for that project in the three months preceding the claim. We are not liable for indirect or consequential loss, including lost profits or lost data, except where liability cannot be excluded.',
          'These terms are governed by the laws of the Republic of South Africa. Disputes should first be raised in writing for good-faith resolution before formal proceedings.',
        ],
      },
      {
        heading: 'Legal review status',
        paragraphs: [
          'These terms are an operational draft for private preview. They have not been signed off by a qualified attorney. Material engagements should rely on the written proposal for that project until legal review is complete.',
        ],
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    metaDescription:
      'What cookies the Koppie Systems website uses. Currently: no analytics or marketing cookies — only what is strictly necessary for the site to function.',
    heading: 'Cookie policy',
    intro:
      'This website currently sets no analytics or marketing cookies. This page explains what that means and what will change if analytics is introduced.',
    status: 'live',
    placeholder: false,
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-22',
    effectiveDate: '2026-07-22',
    sections: [
      {
        heading: 'Current cookie use',
        paragraphs: [
          'No analytics, advertising or tracking cookies are set by this website today. Strictly necessary technical storage may be used by the hosting platform (Vercel) to serve the site securely.',
        ],
      },
      {
        heading: 'If analytics is introduced',
        paragraphs: [
          'Before enabling Google Analytics 4 or similar tools, we will update this policy with the cookies set, their lifetimes and purposes, update the privacy policy, and implement the consent approach described in our internal analytics documentation.',
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          'You can control and delete cookies through your browser settings. Because we do not set optional cookies today, no separate cookie banner is shown.',
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((d) => d.slug === slug);
}
