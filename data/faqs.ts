import type { Faq } from '@/types/content';

/**
 * Sitewide FAQ page content (/faq/). Page-specific FAQs live on their own pages;
 * questions here are cross-cutting. A question that graduates to an article gets
 * removed here (no duplication — see PAGE-TEMPLATES.md spec 17).
 */
export const faqs: Faq[] = [
  {
    group: 'cost',
    question: 'How much does a website cost?',
    answer:
      'Our published indicative ranges: starter business websites R14,000–R25,000, professional lead-generation sites R28,000–R60,000, product catalogues R45,000–R90,000, ecommerce R70,000–R160,000, and custom systems from R80,000 with paid discovery first. Every project gets a fixed itemised quote after scoping — the ranges exist so you can budget before we talk. All figures are indicative and confirmed in your quote.',
  },
  {
    group: 'cost',
    question: 'What are your payment terms?',
    answer:
      'Typically a deposit to schedule the project, a milestone payment at structure/draft approval, and the balance at launch — set out exactly in your quote. Support plans bill monthly. We do not launch sites that are not paid for, and we do not hold your domain hostage; ownership terms are written into every agreement.',
  },
  {
    group: 'cost',
    question: 'Are there hidden or ongoing costs?',
    answer:
      'The unavoidable ongoing costs are your domain (roughly R100–R200 per year for a .co.za) and hosting, which for most business sites is modest. Support plans are optional and published. Anything project-specific — premium integrations, large content loads — appears itemised in the quote, never as a surprise afterwards.',
  },
  {
    group: 'process',
    question: 'How long does a website project take?',
    answer:
      'Starter sites typically take two to four weeks; professional lead-generation builds four to seven; catalogues and ecommerce five to ten depending on product data; custom systems run in stages after discovery. The honest variable in every timeline is content decisions — we structure the process so yours are few and focused.',
  },
  {
    group: 'process',
    question: 'What do you need from me during the project?',
    answer:
      'A scoping conversation, accurate service or product information, timely decisions at two or three review points, and any existing brand assets. Plan for a few focused hours across the project, front-loaded. We handle structure, build, SEO and coordination.',
  },
  {
    group: 'process',
    question: 'Do you write the content?',
    answer:
      'We always structure it — page purpose, headings, what each section must say — because structure is where search performance lives. Full copywriting is available as an add-on; many clients draft within our structure and we edit. Product ranges are loaded from your spreadsheets.',
  },
  {
    group: 'technical',
    question: 'Will my website work on phones?',
    answer:
      'Yes — mobile is the primary design target, not an afterthought, because that is where most South African browsing happens. Layouts are responsive, tap targets are sized for thumbs, and performance budgets are set against mid-range phones on mobile data.',
  },
  {
    group: 'technical',
    question: 'Do you guarantee first-page Google rankings?',
    answer:
      'No, and you should walk away from anyone who does — Google’s results are not any provider’s to sell. What we deliver is a site built to the technical and content standards Google rewards, measurement in Search Console so progress is visible, and honest reporting of what the data shows.',
  },
  {
    group: 'technical',
    question: 'Who owns the website, domain and content?',
    answer:
      'You do — outright. The domain is registered in your name, the content is yours, and the code is handed over with documentation. If we ever part ways, you take everything with you. We consider anything less a structural red flag in this industry.',
  },
  {
    group: 'support',
    question: 'What happens after launch?',
    answer:
      'Launch includes Search Console setup, indexation submission and a handover walkthrough. From there, most clients take a support plan — hosting administration, updates, backups, monitoring and monthly change time — while some self-manage. Plans are month-to-month; support should be earned, not locked in.',
  },
  {
    group: 'support',
    question: 'Can you take over an existing website?',
    answer:
      'Usually, after a short paid assessment of the hosting, software state and risks we would inherit. The assessment produces a stabilisation list and an honest recommendation — sometimes “maintain it”, sometimes “this is a rebuild wearing a maintenance request”.',
  },
  {
    group: 'support',
    question: 'Where are you based and where do you work?',
    answer:
      'We are based in Pretoria and work with clients across South Africa. In-person meetings are standard around Pretoria and Centurion and arranged as needed in Johannesburg; everywhere else, delivery is fully remote with the same process and response targets.',
  },
];
