import type { Solution } from '@/types/content';

/** Industry solution pages — see docs/architecture/PAGE-TEMPLATES.md spec 4. */
export const solutions: Solution[] = [
  {
    slug: 'contractors',
    industry: 'Contractors and trade businesses',
    title: 'Websites for Contractors',
    metaDescription:
      'Websites for South African contractors that make the phone ring: one page per service, area targeting, call and WhatsApp actions, and proof structure.',
    heading: 'Websites for contractors',
    intro:
      'Contracting work is won while someone is searching with a problem — a leak, a fault, a project going to quote. Your website either shows up with a fast way to reach you, or the job goes to whoever did. We build contractor websites for that exact moment.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    painPoints: [
      'High-value emergency and project searches go to competitors who rank.',
      'One “Services” page tries to rank for ten different trades and ranks for none.',
      'Callers cannot find a number fast on mobile — so they do not call.',
      'Word-of-mouth referrals check the website and find nothing reassuring.',
      'You cannot prove which jobs the website actually produced.',
    ],
    approach: [
      'A dedicated page per service line so each can rank on its own — the core of our lead-generation website builds.',
      'Click-to-call and WhatsApp actions positioned for a phone held in one hand on site.',
      'Area targeting for regions you genuinely serve, without doorway-page spam.',
      'Job and project proof structured as real case studies, ready to fill as you complete work.',
    ],
    recommendedServiceSlugs: ['lead-generation-websites', 'seo-website-development', 'website-maintenance-and-support'],
    relatedProjectSlugs: ['contractor-website-template'],
    faqs: [
      {
        question: 'Can the site show emergency contact details prominently?',
        answer:
          'Yes — for trades with call-out work we treat the call action as the primary conversion: sticky on mobile, visible without scrolling, and tracked so you can count the calls the site produces.',
      },
      {
        question: 'We serve three towns — do we need a page for each?',
        answer:
          'Only where you genuinely work and can say something real. We build honest area pages for your true service regions and consolidate nearby towns onto them, which Google handles well — mass-produced town pages are a penalty risk, and we do not build them.',
      },
    ],
    primaryKeywordCluster: 'websites for contractors',
  },
  {
    slug: 'engineering-companies',
    industry: 'Engineering and industrial services',
    title: 'Websites for Engineering Companies',
    metaDescription:
      'Websites for engineering and industrial companies: capability pages that satisfy technical buyers, project evidence, spec documents and RFQ-ready contact flows.',
    heading: 'Websites for engineering companies',
    intro:
      'Engineering buyers vet before they call: capabilities, standards, past projects, the people behind the work. Most engineering websites fail that inspection with three vague pages. We build sites that read like your capability statement — and get found for the services you sell.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    painPoints: [
      'Procurement and BD searches find competitors with clearer capability pages.',
      'Your real differentiators are buried in a PDF nobody downloads.',
      'Project references exist only in tender documents, invisible to Google.',
      'The site cannot host the spec sheets and datasheets buyers want.',
      'Generic web designers keep making it prettier and less credible.',
    ],
    approach: [
      'Capability architecture: one indexable page per discipline or service, written in your industry’s vocabulary — built on our business-website foundation.',
      'Project case studies structured for both credibility and search (problem, scope, standards, outcome).',
      'Document delivery done properly: spec sheets and certifications organised, downloadable and referenced from relevant pages.',
      'RFQ-ready contact flows for enquiries that start as scopes, not chit-chat — extendable into a full quotation system.',
    ],
    recommendedServiceSlugs: ['business-websites', 'rfq-and-quotation-systems', 'customer-and-supplier-portals'],
    relatedProjectSlugs: ['admin-quotation-platform-template'],
    faqs: [
      {
        question: 'Our work is niche — is there even search demand?',
        answer:
          'Niche B2B search volumes are small but extraordinarily valuable: the few monthly searches for your speciality are procurement people with budgets. Low volume also means weak competition, so a well-structured page can own the term for years.',
      },
      {
        question: 'Can you handle technical content correctly?',
        answer:
          'The founder comes from a technical background, and our process keeps you as the technical authority: you supply the engineering substance, we structure it for buyers and for Google, and nothing publishes without your review.',
      },
    ],
    primaryKeywordCluster: 'engineering company website',
  },
  {
    slug: 'manufacturers-and-suppliers',
    industry: 'Manufacturers, suppliers and distributors',
    title: 'Websites for Manufacturers & Suppliers',
    metaDescription:
      'Websites for manufacturers and suppliers: structured product catalogues, RFQ workflows and dealer information that turn product searches into quote requests.',
    heading: 'Websites for manufacturers and suppliers',
    intro:
      'Buyers search for products, not companies: the part number, the material, the spec. If your range lives in PDFs, those searches land on competitors and marketplaces. We put structured catalogues online with RFQ workflows that match how B2B buying actually works.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    painPoints: [
      'The full range exists only as a price-list PDF and tribal knowledge.',
      'Product searches land on marketplaces and rivals, not on you.',
      'Consumer-style ecommerce does not fit account pricing and quoting.',
      'Sales answers the same spec questions on the phone all day.',
      'Dealers and end-customers cannot tell who should buy where.',
    ],
    approach: [
      'A structured product catalogue where every product and category is an indexable, spec-complete page.',
      'RFQ basket flow: buyers collect items and submit one structured quote request — feeding a quotation system when you are ready.',
      'Clear dealer/direct pathways so channel relationships stay intact.',
      'Ecommerce added only where fixed-price online payment genuinely fits the range.',
    ],
    recommendedServiceSlugs: ['product-catalogue-websites', 'rfq-and-quotation-systems', 'ecommerce-websites'],
    relatedProjectSlugs: ['catalogue-rfq-website-template'],
    faqs: [
      {
        question: 'Our prices are negotiated — must we publish them?',
        answer:
          'No. A catalogue site can show full specifications with request-a-quote actions and no prices, list-price guidance, or account-holder pricing behind a login — whichever matches your channel strategy. The SEO value is in the structured product content, not the price display.',
      },
      {
        question: 'How do we keep hundreds of products up to date?',
        answer:
          'Through structure: your range is loaded from a clean spreadsheet once, then maintained through an admin workflow rather than page-by-page editing. Bulk updates — a price revision across a category, a spec change — stay bulk operations.',
      },
    ],
    primaryKeywordCluster: 'manufacturer website design',
  },
  {
    slug: 'property-businesses',
    industry: 'Property businesses',
    title: 'Websites & Systems for Property Businesses',
    metaDescription:
      'Websites and management systems for property businesses: listing sites that generate enquiries plus portals and admin tools for tenants, leases and reporting.',
    heading: 'Websites and systems for property businesses',
    intro:
      'Property businesses run on two engines: attracting the next tenant or buyer, and administering the portfolio you already have. Most tools do one badly. We build both — listing websites that generate enquiries, and the management systems behind them.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    painPoints: [
      'Listings live on the portals; your own brand earns none of the search value.',
      'Tenant admin — leases, invoices, maintenance — sprawls across spreadsheets and email.',
      'Off-the-shelf property software does not match SA processes or your fee model.',
      'Owners and investors ask for reports you assemble by hand every month.',
      'Maintenance requests arrive by WhatsApp and disappear.',
    ],
    approach: [
      'A listing website that builds your own search presence alongside the portals, with enquiry tracking per property.',
      'Property-management systems built around SA realities: leases, escalations, deposits, statements and owner reporting — as custom web applications you own.',
      'Tenant and owner portals for statements, documents and maintenance requests, cutting the admin phone traffic.',
      'Staged delivery: website first for cash flow, system modules as the portfolio grows.',
    ],
    recommendedServiceSlugs: ['custom-web-applications', 'business-websites', 'customer-and-supplier-portals'],
    relatedProjectSlugs: ['property-management-system-template'],
    faqs: [
      {
        question: 'We manage 40 units — is custom software overkill?',
        answer:
          'At that size the spreadsheet pain is real but a full custom build may not be the first step — sometimes a focused admin panel for leases and invoicing is enough, and we will say so in discovery. The point of scoping honestly is that you buy the smallest system that removes the pain.',
      },
      {
        question: 'Can tenants log in to see statements and log maintenance?',
        answer:
          'Yes — a tenant portal for statements, documents and maintenance requests is a natural second phase on the same data foundation, and it is usually the feature that visibly reduces daily admin calls.',
      },
    ],
    primaryKeywordCluster: 'property business website',
  },
  {
    slug: 'professional-services',
    industry: 'Professional services firms',
    title: 'Websites for Professional Services Firms',
    metaDescription:
      'Websites for attorneys, accountants and practices: local search visibility, service pages that answer real client questions, and credibility that converts.',
    heading: 'Websites for professional services firms',
    intro:
      'Clients choose professionals on trust — and increasingly form that trust on Google before the first call. We build websites for attorneys, accountants, architects and practices that rank for local service searches and answer the questions clients actually have.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    painPoints: [
      '“[service] near me” searches surface competitors and directories, not your firm.',
      'The website lists departments, not answers, so visitors leave unconvinced.',
      'Your genuine expertise is invisible because nobody publishes it.',
      'The site looks like every other template practice site in your field.',
      'Enquiries arrive with no context, wasting first consultations.',
    ],
    approach: [
      'Local-intent architecture: service pages structured for the searches your clients make in your city, on our business-website foundation.',
      'Question-led content structure that demonstrates expertise without legalese or jargon.',
      'Credibility architecture: professional profiles, process transparency and honest proof — no stock-photo gloss.',
      'Qualified enquiry forms that gather context ethically, so first consultations start ahead.',
    ],
    recommendedServiceSlugs: ['business-websites', 'seo-website-development', 'website-maintenance-and-support'],
    relatedProjectSlugs: [],
    faqs: [
      {
        question: 'Our profession restricts advertising — does that affect the site?',
        answer:
          'We build within your profession’s marketing rules: factual service descriptions, genuine profiles and published expertise are compliant almost everywhere, and we avoid the comparative or result-promising claims that create problems. You review everything before it publishes.',
      },
      {
        question: 'Is a blog worth our time?',
        answer:
          'Only if it answers real client questions in your voice — one substantial, genuinely useful answer per month beats weekly filler. We map the questions worth answering from search data before you write a word.',
      },
    ],
    primaryKeywordCluster: 'website for professional services',
  },
  {
    slug: 'small-businesses',
    industry: 'Small businesses',
    title: 'Websites for Small Businesses',
    metaDescription:
      'Small business websites in South Africa that punch above their weight: SEO-first structure, honest pricing, and a clear upgrade path as you grow.',
    heading: 'Websites for small businesses',
    intro:
      'A small business does not need a big website — it needs the right six pages, built properly. We give small businesses the same SEO-first architecture our larger clients get, sized and priced for where you are now, with a clear path to grow.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    painPoints: [
      'DIY builders produced something, but Google ignores it.',
      'Cheap “package” sites came with hidden hosting lock-in and no ownership.',
      'You compete against bigger firms with bigger marketing budgets.',
      'Every rand matters, and web quotes range from R2,000 to R200,000 with no explanation.',
      'You are too busy running the business to manage a web project.',
    ],
    approach: [
      'The Starter package: a compact, properly-structured site covering the pages that matter, at a published indicative price.',
      'SEO fundamentals done right from day one — the advantage bigger competitors assume small sites never have.',
      'Straightforward process that needs a few focused hours from you, not weeks of meetings.',
      'Growth path: the same architecture extends into more services, areas, catalogues or systems without rebuilding.',
    ],
    recommendedServiceSlugs: ['business-websites', 'seo-website-development', 'website-maintenance-and-support'],
    relatedProjectSlugs: ['contractor-website-template'],
    faqs: [
      {
        question: 'Why not just use Wix or a R2,000 special?',
        answer:
          'Sometimes those are rational choices, and our custom-vs-template comparison lays the trade-offs out honestly. The short version: builders and volume packages optimise for launching fast, not for being found — if organic enquiries matter to your plan, structure is where the money should go first.',
      },
      {
        question: 'What does a small business website cost?',
        answer:
          'Our Starter package carries a published indicative range on the pricing page, with a fixed quote after a short scoping call. No hidden hosting mark-ups, and you own everything — domain, content and code.',
      },
    ],
    primaryKeywordCluster: 'small business website south africa',
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
