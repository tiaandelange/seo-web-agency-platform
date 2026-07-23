import type { Service } from '@/types/content';

/**
 * The 12 services. One page per commercial search intent —
 * see docs/seo/KEYWORD-TO-PAGE-MAP.csv before adding entries.
 */
export const services: Service[] = [
  {
    slug: 'business-websites',
    category: 'website',
    title: 'Business Website Design',
    seoTitle: 'Business Website Design South Africa',
    metaDescription:
      'Professional business websites built SEO-first: structured for Google, written for your customers and measured in enquiries. Serving South Africa.',
    heading: 'Business website design',
    intro:
      'A business website should earn its keep: show up when customers search, explain what you do clearly, and turn visits into enquiries. We build business websites with that job description — search structure first, design second.',
    summary: 'A credible, rankable foundation site for an established business.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      'Customers search for what you do and find your competitors instead.',
      'Your current site looks dated and undermines quotes you send.',
      'Nobody can update the site without phoning a developer.',
      'You have no idea whether the site produces any business at all.',
      'A cheap template site was “finished” in a week and never found again.',
    ],
    deliverables: [
      'Keyword-to-page mapping for your services before any page is built',
      'Up to ten structured pages with unique metadata and clean semantic HTML',
      'Mobile-first responsive layouts with fast Core Web Vitals',
      'Contact, phone, email and WhatsApp actions on every relevant page',
      'Google Search Console and analytics setup with conversion events',
      'XML sitemap, robots and schema markup generated from your content',
      'Content structure and guidance for every page (copy polish available)',
      'Handover documentation — you own the code, domain and content',
    ],
    exclusions: [
      'Logo and brand identity design (we can brief a designer)',
      'Ongoing SEO campaigns and link building',
      'Ecommerce and payment functionality — see ecommerce websites',
      'Bulk copywriting beyond structural guidance (quoted separately)',
    ],
    faqs: [
      {
        question: 'How long does a business website take to build?',
        answer:
          'A typical business website takes three to six weeks from kickoff, depending on how quickly content decisions are made. The keyword mapping and structure work happens in the first week, and you review real pages from the second week onward.',
        group: 'process',
      },
      {
        question: 'Can I update the website myself afterwards?',
        answer:
          'Yes. Routine text and content changes are structured so they are simple to request or make, and our support plans include monthly change time. Larger structural changes go through us so the SEO architecture stays intact.',
        group: 'support',
      },
      {
        question: 'Do you guarantee Google rankings?',
        answer:
          'No honest provider can guarantee rankings. What we do guarantee is a site built to meet the technical and content standards Google rewards: crawlable structure, one clear topic per page, fast mobile performance and measurable results in Search Console.',
        group: 'technical',
      },
    ],
    relatedServiceSlugs: ['seo-website-development', 'website-redesign', 'website-maintenance-and-support'],
    relatedPackageSlugs: ['starter-business-website', 'professional-business-website'],
    relatedSolutionSlugs: ['small-businesses', 'professional-services'],
    relatedProjectSlugs: ['damtech-website'],
    relatedArticleSlugs: ['website-cost-south-africa', 'choosing-a-website-development-company'],
    primaryKeywordCluster: 'business website design south africa',
    ctaType: 'quote',
  },
  {
    slug: 'lead-generation-websites',
    category: 'website',
    title: 'Lead Generation Website Design',
    metaDescription:
      'Lead-generation websites for contractors and service businesses: built around the searches your customers make and measured in quote requests, not visits.',
    heading: 'Lead generation website design',
    intro:
      'For a service business, the website has one job: make the phone ring. We design lead-generation websites around the searches your customers actually make, then measure success in quote requests — not traffic graphs.',
    summary: 'Enquiry-focused sites for businesses that live on quotes and call-outs.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      'Plenty of “brochure” pages, but the enquiry form never rings.',
      'Your services are lumped on one page, so none of them rank.',
      'Emergency or high-value work goes to whoever ranks first — not you.',
      'You spend on ads because the site cannot win free search traffic.',
      'No way to tell which jobs came from the website.',
    ],
    deliverables: [
      'Search-demand research for every service you offer',
      'A dedicated, conversion-structured page per service line',
      'Click-to-call, WhatsApp and short quote forms placed where intent peaks',
      'Trust structure: process, service areas and proof sections',
      'Conversion tracking for calls, WhatsApp clicks and form submissions',
      'Location targeting for the areas you genuinely serve',
      'Case-study structure ready for your completed jobs',
      'Search Console onboarding with a measurement baseline',
    ],
    exclusions: [
      'Paid-ads management (the site will be ad-ready if you choose to run them)',
      'Call-answering or CRM services',
      'Guaranteed lead volumes — we build the machine and measure it honestly',
    ],
    faqs: [
      {
        question: 'How is this different from a normal business website?',
        answer:
          'The difference is emphasis and structure. Every page is built backwards from a commercial search and forwards into an enquiry action. Service pages are separated so each can rank, conversion actions are placed at intent peaks, and measurement is wired in from day one.',
        group: 'technical',
      },
      {
        question: 'When will leads start arriving?',
        answer:
          'It depends on your market, competition and starting point, and anyone who gives you a fixed date is guessing. New sites typically take months, not days, to build search visibility; measurement starts immediately, so you can watch impressions and enquiries grow in Search Console.',
        group: 'process',
      },
    ],
    relatedServiceSlugs: ['seo-website-development', 'business-websites', 'website-maintenance-and-support'],
    relatedPackageSlugs: ['professional-business-website'],
    relatedSolutionSlugs: ['contractors', 'engineering-companies'],
    relatedProjectSlugs: ['damtech-website'],
    relatedArticleSlugs: ['what-is-an-seo-first-website'],
    primaryKeywordCluster: 'lead generation website design',
    ctaType: 'quote',
  },
  {
    slug: 'product-catalogue-websites',
    category: 'website',
    title: 'Product Catalogue Website Development',
    metaDescription:
      'Product catalogue websites for manufacturers and suppliers: structured product data, spec sheets and RFQ baskets that turn browsing into quote requests.',
    heading: 'Product catalogue website development',
    intro:
      'If you sell through quotes rather than a shopping cart, you need a catalogue website, not an online store. We build structured product catalogues that get your range found on Google and turn browsing into requests for quotation.',
    summary: 'Structured, quotable product ranges for B2B sellers — without forced ecommerce.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      'Your product range lives in PDF price lists nobody can find or search.',
      'Ecommerce platforms force cart-and-checkout flows that do not fit quoting.',
      'Every product enquiry starts with “what exactly do you need?” emails.',
      'Competitors with structured catalogues outrank you for product searches.',
      'Updating products means paying a developer for every change.',
    ],
    deliverables: [
      'Product data model designed around your range, variants and specs',
      'Category and product page templates with unique, indexable content',
      'Spec-sheet downloads and technical detail sections per product',
      'RFQ basket: visitors gather products and submit one quote request',
      'Crawl-safe search and filtering that never creates duplicate URLs',
      'Bulk product loading from your existing spreadsheets',
      'Structured data for products where genuinely applicable',
      'Admin-friendly update workflow for prices and range changes',
    ],
    exclusions: [
      'Online payments and checkout — that is an ecommerce build',
      'Live ERP or stock-system integration (scoped separately when needed)',
      'Product photography (we can specify shot lists)',
    ],
    faqs: [
      {
        question: 'Catalogue website or ecommerce — which do we need?',
        answer:
          'If your prices depend on quantities, customers or negotiation, a catalogue with RFQ workflow usually fits better than a cart. If customers can and should pay online at fixed prices, ecommerce fits. We cover the decision honestly in our catalogue-vs-ecommerce guidance and will tell you if the cheaper answer is the right one.',
        group: 'technical',
      },
      {
        question: 'How many products can the catalogue handle?',
        answer:
          'The architecture comfortably handles ranges from fifty to several thousand products. What matters more than count is data quality: consistent specs, categories and images. We help you structure the spreadsheet once, then loading and maintaining the range stays manageable.',
        group: 'technical',
      },
    ],
    relatedServiceSlugs: ['rfq-and-quotation-systems', 'ecommerce-websites', 'website-maintenance-and-support'],
    relatedPackageSlugs: ['product-catalogue-website'],
    relatedSolutionSlugs: ['manufacturers-and-suppliers', 'engineering-companies'],
    relatedProjectSlugs: ['damtech-website'],
    relatedArticleSlugs: ['website-cost-south-africa'],
    primaryKeywordCluster: 'product catalogue website south africa',
    ctaType: 'quote',
  },
  {
    slug: 'ecommerce-websites',
    category: 'website',
    title: 'Ecommerce Website Development',
    seoTitle: 'Ecommerce Website Development South Africa',
    metaDescription:
      'Ecommerce websites built for South African retailers: fast product pages that rank, local payment gateways, and a checkout your customers finish.',
    heading: 'Ecommerce website development',
    intro:
      'An online store succeeds on three things: products that get found, pages that load fast, and a checkout people finish. We build ecommerce websites for South African sellers with local payment gateways and search-first product architecture.',
    summary: 'Online stores with SA payment gateways and product pages built to rank.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      'Platform template stores all look identical and rank for nothing.',
      'High platform and plugin fees eat thin retail margins.',
      'Product pages load slowly on mobile, where your buyers are.',
      'Checkout drop-off is high and you cannot see where or why.',
      'Your store cannot handle B2B realities like account pricing.',
    ],
    deliverables: [
      'Product catalogue with SEO-structured category and product pages',
      'Cart and checkout tuned for completion on mobile',
      'South African payment gateway integration (PayFast, Yoco, Peach — chosen at scoping)',
      'Delivery options, order confirmation and status emails',
      'Unique metadata and structured data per product',
      'Search Console, analytics and ecommerce conversion events',
      'Order management workflow suited to your fulfilment process',
      'Performance budget: fast mobile loads as a hard requirement',
    ],
    exclusions: [
      'Marketplace feeds and ERP integrations (scoped separately)',
      'Product photography and copy for large ranges (quoted separately)',
      'Paid-traffic management',
    ],
    faqs: [
      {
        question: 'Which payment gateways do you support?',
        answer:
          'We integrate established South African gateways — PayFast, Yoco and Peach Payments are typical choices — selected during scoping based on your fees, settlement needs and card/EFT/instant-EFT mix. The store is built so switching gateways later is a contained change, not a rebuild.',
        group: 'technical',
      },
      {
        question: 'Why not just use Shopify or WooCommerce?',
        answer:
          'Sometimes you should, and we will say so when that is the honest answer. A custom build earns its cost when SEO performance, page speed, B2B pricing rules or unusual workflows matter more than the quickest possible start. Our comparison guidance covers the trade-offs openly.',
        group: 'cost',
      },
    ],
    relatedServiceSlugs: ['product-catalogue-websites', 'seo-website-development', 'website-maintenance-and-support'],
    relatedPackageSlugs: ['ecommerce-website'],
    relatedSolutionSlugs: ['manufacturers-and-suppliers', 'small-businesses'],
    relatedProjectSlugs: [],
    relatedArticleSlugs: ['website-cost-south-africa'],
    primaryKeywordCluster: 'ecommerce website development south africa',
    ctaType: 'quote',
  },
  {
    slug: 'custom-web-applications',
    category: 'system',
    title: 'Custom Web Application Development',
    seoTitle: 'Custom Web Application Development South Africa',
    metaDescription:
      'Custom web applications for South African businesses whose processes no off-the-shelf product fits: scoped honestly, built on a modern stack, owned by you.',
    heading: 'Custom web application development',
    intro:
      'When spreadsheets, email threads and off-the-shelf tools stop fitting how your business actually works, a custom web application closes the gap. We scope honestly, build on a modern TypeScript stack, and you own the result outright.',
    summary: 'Bespoke systems for processes no packaged product fits.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      'Your process lives in fragile spreadsheets only one person understands.',
      'Packaged software forces workarounds that create more admin than they remove.',
      'Information is retyped between quoting, job cards and invoicing.',
      'You cannot see live status without phoning someone.',
      'Previous developers delivered something nobody could maintain.',
    ],
    deliverables: [
      'Paid discovery: process mapping, data model and a written build specification',
      'Web application built with TypeScript, Next.js and a managed database',
      'User accounts, roles and permissions that mirror your organisation',
      'Screens designed around your real workflow, not generic CRUD',
      'Reporting and exports for the numbers you actually manage by',
      'Staged delivery with working software reviewed every cycle',
      'Documentation, handover and full code ownership',
      'Support plan with response targets after go-live',
    ],
    exclusions: [
      'Fixed pricing before discovery — honest custom work cannot be priced blind',
      'Native mobile apps (responsive web applications cover most needs)',
      'Rescue of unmaintained systems without an assessment first',
    ],
    faqs: [
      {
        question: 'What does a custom web application cost?',
        answer:
          'Meaningful systems typically start around R80,000, with discovery quoted separately so you get a specification and honest number before committing to the build. Anyone quoting a fixed price for unscoped custom software is guessing with your money — our indicative ranges are published on the pricing page.',
        group: 'cost',
      },
      {
        question: 'Why build custom instead of buying software?',
        answer:
          'Buy when a product matches your process closely; build when the mismatch costs you daily time, errors or customers. Discovery often reveals a hybrid: keep the accounting package, build the workflow layer that connects it to how you quote and deliver. We will recommend buying when that is the honest answer.',
        group: 'technical',
      },
    ],
    relatedServiceSlugs: ['admin-panel-development', 'rfq-and-quotation-systems', 'customer-and-supplier-portals'],
    relatedPackageSlugs: ['custom-web-system'],
    relatedSolutionSlugs: ['property-businesses', 'engineering-companies'],
    relatedProjectSlugs: ['proplytic-property-software'],
    relatedArticleSlugs: ['what-is-an-seo-first-website'],
    primaryKeywordCluster: 'custom web application development south africa',
    ctaType: 'consultation',
  },
  {
    slug: 'admin-panel-development',
    category: 'system',
    title: 'Admin Panel Development',
    metaDescription:
      'Custom admin panels that replace spreadsheet chaos: one structured system for your records, jobs and numbers, with roles, audit trails and exports.',
    heading: 'Admin panel development',
    intro:
      'Most growing businesses run on spreadsheets long after they hurt: versions multiply, formulas break, and only one person knows how it works. An admin panel replaces that with one structured system your whole team can trust.',
    summary: 'Replace spreadsheet sprawl with one structured, permissioned system.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      '“Final_v7_REAL.xlsx” is your operations system.',
      'Staff overwrite each other’s work with no history of who changed what.',
      'Reports mean an afternoon of copy-paste every month.',
      'Sensitive data sits in files anyone can forward.',
      'Onboarding new staff means explaining folklore, not process.',
    ],
    deliverables: [
      'Data model built from how your records actually relate',
      'Clean screens for capturing, finding and updating records',
      'Roles and permissions: staff see and edit only what they should',
      'Audit trail of who changed what, when',
      'One-click exports and the recurring reports you rely on',
      'Import of your existing spreadsheet data',
      'Validation rules that stop bad data at the door',
      'Training handover and admin documentation',
    ],
    exclusions: [
      'Replacing your accounting package (we integrate around it instead)',
      'Public-facing features — this is your internal engine (portals are a separate service)',
      'Unscoped “just add a quick field” sprawl — changes go through a lightweight backlog',
    ],
    faqs: [
      {
        question: 'How disruptive is moving off spreadsheets?',
        answer:
          'Less than living with them. We import your existing data, run the panel alongside the old sheets during a handover window, and train the team on real records. Most teams stop opening the spreadsheet within weeks because the system is simply faster.',
        group: 'process',
      },
      {
        question: 'Can the panel grow into something bigger later?',
        answer:
          'Yes — that is the point of building on a proper data model. Admin panels frequently grow customer portals, quotation modules or automation on the same foundation. We architect for that growth without charging you now for features you may never need.',
        group: 'technical',
      },
    ],
    relatedServiceSlugs: ['custom-web-applications', 'rfq-and-quotation-systems', 'customer-and-supplier-portals'],
    relatedPackageSlugs: ['custom-web-system'],
    relatedSolutionSlugs: ['property-businesses', 'manufacturers-and-suppliers'],
    relatedProjectSlugs: ['proplytic-property-software'],
    relatedArticleSlugs: [],
    primaryKeywordCluster: 'admin panel development',
    ctaType: 'consultation',
  },
  {
    slug: 'rfq-and-quotation-systems',
    category: 'system',
    title: 'RFQ & Quotation System Development',
    metaDescription:
      'RFQ and quotation systems for quote-driven businesses: structured intake, fast professional quotes with VAT, status tracking and follow-up built in.',
    heading: 'RFQ and quotation system development',
    intro:
      'If quoting runs your sales, quoting speed and follow-up win you work. We build RFQ and quotation systems that capture enquiries in a structured way, produce professional quotes in minutes and never let a live quote go quiet.',
    summary: 'Structured quoting: intake, professional PDFs, status and follow-up.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      'Quotes are built by hand in Word and Excel, each one slightly different.',
      'Enquiries arrive by phone, email and WhatsApp — and some just vanish.',
      'Nobody knows which quotes are still open or worth chasing.',
      'Pricing errors creep in because line items are retyped.',
      'Follow-up depends on someone remembering.',
    ],
    deliverables: [
      'Structured RFQ intake from your website, email or manual capture',
      'Quote builder with your line items, price lists, margins and VAT handling',
      'Branded PDF quotes generated in minutes, numbered and versioned',
      'Status pipeline: draft, sent, viewed, accepted, declined, expired',
      'Automatic follow-up reminders on open quotes',
      'Quote history per customer with repeat-quote shortcuts',
      'Reporting: win rates, response times, value in pipeline',
      'Integration with your catalogue website where one exists',
    ],
    exclusions: [
      'Full accounting/invoicing replacement (we integrate or hand off cleanly)',
      'Automatic pricing of unstructured, engineering-judgement quotes — the system speeds humans up, it does not replace estimation',
    ],
    faqs: [
      {
        question: 'We quote complex custom work — can a system really help?',
        answer:
          'Yes, because most of the delay is not the engineering judgement, it is the admin around it: finding the enquiry, retyping details, formatting the document, remembering to follow up. The system removes that layer and leaves the judgement to your estimator.',
        group: 'technical',
      },
      {
        question: 'Can it start from our website’s quote requests?',
        answer:
          'That is the ideal setup: your website’s RFQ forms feed straight into the intake queue with structured detail, so the first phone call already has context. If we built your catalogue site, products arrive on the RFQ pre-filled.',
        group: 'technical',
      },
    ],
    relatedServiceSlugs: ['product-catalogue-websites', 'admin-panel-development', 'custom-web-applications'],
    relatedPackageSlugs: ['custom-web-system'],
    relatedSolutionSlugs: ['manufacturers-and-suppliers', 'engineering-companies'],
    relatedProjectSlugs: ['damtech-website'],
    relatedArticleSlugs: [],
    primaryKeywordCluster: 'quotation system development',
    ctaType: 'consultation',
  },
  {
    slug: 'customer-and-supplier-portals',
    category: 'system',
    title: 'Customer & Supplier Portal Development',
    metaDescription:
      'Customer and supplier portals for B2B businesses: self-service orders, documents, statements and job status — fewer “just checking” calls, stickier clients.',
    heading: 'Customer and supplier portal development',
    intro:
      'Every “can you resend the statement?” call is a portal feature you don’t have yet. We build customer and supplier portals that let your B2B relationships serve themselves — orders, documents, statuses and history behind a secure login.',
    summary: 'Secure self-service for repeat B2B relationships.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      'Staff spend hours a week resending invoices, statements and certificates.',
      'Repeat customers phone in the same orders instead of placing them.',
      'Suppliers email documents that then live in inboxes, not systems.',
      'Clients cannot see job or order status without calling.',
      'Switching to a competitor is easy because nothing binds the relationship.',
    ],
    deliverables: [
      'Secure login portal for customers and/or suppliers',
      'Self-service documents: invoices, statements, certificates, spec sheets',
      'Repeat ordering or booking against account terms where applicable',
      'Live job/order status with notification emails',
      'Supplier onboarding and document-expiry workflows where relevant',
      'Role-based access mapped to your account structures',
      'Admin side for your team to manage everything without a developer',
      'POPIA-conscious data handling and retention design',
    ],
    exclusions: [
      'Public marketing content — portals are logged-in tools (your website handles marketing)',
      'Full ERP replacement — portals integrate with or sit alongside your systems',
    ],
    faqs: [
      {
        question: 'Will customers actually use a portal?',
        answer:
          'They will if it is faster than phoning — which is the design bar we build to. Adoption comes from launching with the two or three actions your customers repeat most (statement download, repeat order, job status) and putting the portal link in every email footer and invoice.',
        group: 'technical',
      },
      {
        question: 'Portal or admin panel — what is the difference?',
        answer:
          'The admin panel is your team’s internal engine; the portal is the secure window your customers or suppliers see. They usually share one database — many clients start with the panel and add the portal once internal data is structured.',
        group: 'technical',
      },
    ],
    relatedServiceSlugs: ['admin-panel-development', 'custom-web-applications', 'rfq-and-quotation-systems'],
    relatedPackageSlugs: ['custom-web-system'],
    relatedSolutionSlugs: ['manufacturers-and-suppliers', 'property-businesses'],
    relatedProjectSlugs: ['proplytic-property-software'],
    relatedArticleSlugs: [],
    primaryKeywordCluster: 'customer portal development',
    ctaType: 'consultation',
  },
  {
    slug: 'website-redesign',
    category: 'website',
    title: 'Website Redesign Services',
    seoTitle: 'Website Redesign Services South Africa',
    metaDescription:
      'Website redesign that protects what you have and fixes what you don’t: audit first, redirect map, rebuilt SEO architecture, measured before and after.',
    heading: 'Website redesign services',
    intro:
      'A redesign done carelessly can delete years of search equity overnight. We redesign audit-first: understand what your current site has earned, map every URL, rebuild the architecture properly and measure before and after.',
    summary: 'Audit-first rebuilds that keep your search equity and fix the rest.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      'The site is visibly dated and losing quotes to fresher competitors.',
      'It ranks for a few terms and you are scared a rebuild will lose them.',
      'Mobile performance is poor and Google’s reports keep warning you.',
      'The old build is a plugin stack nobody dares update.',
      'Content grew organically into a structure no visitor can navigate.',
    ],
    deliverables: [
      'Content and URL audit: what ranks, what earns links, what is dead weight',
      'Full redirect map — every old URL 301s to its correct new home',
      'Rebuilt information architecture from fresh keyword mapping',
      'Modern, fast, mobile-first rebuild of every retained page',
      'Metadata, schema and internal linking rebuilt on the new structure',
      'Pre-launch crawl comparison and post-launch indexation monitoring',
      'Search Console verification through the migration window',
      'Rollback plan documented before switchover',
    ],
    exclusions: [
      'Blind “reskins” that keep a broken structure under new paint',
      'Migrating spammy backlink profiles — we will flag them honestly',
      'Guarantees that every ranking survives — honest migrations minimise risk and measure it; they cannot abolish it',
    ],
    faqs: [
      {
        question: 'Will we lose our Google rankings during a redesign?',
        answer:
          'The honest answer: a properly-managed migration protects your equity with correct redirects, preserved content targeting and monitoring — but some fluctuation in the weeks around switchover is normal. What kills rankings is skipping the audit and redirect work, which is exactly what we never skip.',
        group: 'technical',
      },
      {
        question: 'Redesign or start from scratch?',
        answer:
          'If the current site has real rankings, links or content worth keeping, we migrate those assets deliberately. If it has none — which the audit shows quickly — a clean build is cheaper and faster. The audit answers this question with data before you commit either way.',
        group: 'process',
      },
    ],
    relatedServiceSlugs: ['seo-website-development', 'business-websites', 'website-maintenance-and-support'],
    relatedPackageSlugs: ['professional-business-website'],
    relatedSolutionSlugs: ['small-businesses', 'professional-services'],
    relatedProjectSlugs: [],
    relatedArticleSlugs: ['what-is-an-seo-first-website', 'choosing-a-website-development-company'],
    primaryKeywordCluster: 'website redesign south africa',
    ctaType: 'consultation',
  },
  {
    slug: 'seo-website-development',
    category: 'website',
    title: 'SEO Website Development',
    seoTitle: 'SEO Website Development South Africa',
    metaDescription:
      'SEO website development done in the right order: keyword-to-page architecture first, then technical build, schema and Search Console — method you can inspect.',
    heading: 'SEO website development',
    intro:
      'Most websites get SEO sprinkled on at the end. We build in the opposite order: research what your customers search, architect one page per intent, then build to the technical standards Google rewards. The method is documented and you can inspect it.',
    summary: 'Websites architected from search demand before a single page is designed.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      'Your previous site was designed beautiful-first and found never.',
      '“SEO packages” delivered reports, not rankings or enquiries.',
      'Pages compete with each other because nobody mapped intent.',
      'Technical problems (speed, duplication, thin pages) cap everything.',
      'You cannot tell method from magic when providers pitch SEO.',
    ],
    deliverables: [
      'Keyword and competitor research specific to your market',
      'Keyword-to-page map: one destination page per search intent',
      'Site architecture, URL structure and internal-linking plan',
      'Technical build: server-rendered pages, clean HTML, fast Core Web Vitals',
      'Unique metadata and appropriate schema markup throughout',
      'XML sitemap, robots and indexation controls',
      'Search Console setup with a 90-day indexation support window',
      'The full research and mapping documents — your asset, not our secret',
    ],
    exclusions: [
      'Link building and outreach campaigns',
      'Ranking guarantees — no honest provider offers them',
      'Ongoing content production (available as a support plan)',
    ],
    faqs: [
      {
        question: 'What exactly is an SEO-first website?',
        answer:
          'It is a website whose page list, URLs and content structure are derived from researched search demand before design begins — one page per commercial intent, technically built so Google can crawl, render and rank it. Our guide explains the method in plain language.',
        group: 'technical',
      },
      {
        question: 'Do we still need monthly SEO after the build?',
        answer:
          'The build gets the foundation right, which is where most sites fail. After that, growth comes from content added against the keyword map and from Search Console-driven improvements — available as a support plan, but never a forced subscription.',
        group: 'support',
      },
    ],
    relatedServiceSlugs: [
      'lead-generation-websites',
      'website-redesign',
      'business-websites',
      'analytics-and-conversion-tracking',
    ],
    relatedPackageSlugs: ['professional-business-website'],
    relatedSolutionSlugs: ['contractors', 'small-businesses'],
    relatedProjectSlugs: ['damtech-website'],
    relatedArticleSlugs: ['what-is-an-seo-first-website'],
    primaryKeywordCluster: 'seo website design south africa',
    ctaType: 'consultation',
  },
  {
    slug: 'analytics-and-conversion-tracking',
    category: 'website',
    title: 'Analytics & Conversion Tracking Setup',
    seoTitle: 'Conversion Tracking & GA4 Analytics Setup South Africa',
    metaDescription:
      'GA4, Google Tag Manager and conversion tracking set up properly and POPIA-compliant so you measure calls, WhatsApp and forms. Once-off R2,950. South Africa.',
    heading: 'Analytics & conversion tracking setup',
    intro:
      'Measurement done to a senior standard: not merely installing GA4, but tracking the enquiries that matter — calls, WhatsApp and form submissions — with Consent Mode v2 configured for POPIA so the numbers can be trusted. Available as a once-off setup (R2,950) for sites we did not build, and included in every Koppie website build.',
    summary: 'Once-off R2,950: GA4, Tag Manager and conversion events set up properly for POPIA.',
    status: 'live',
    dateCreated: '2026-07-23',
    dateUpdated: '2026-07-23',
    problems: [
      'Universal Analytics is gone and you still have no working GA4 property.',
      'Tracking is installed but only counts pageviews — not calls, WhatsApp or form enquiries.',
      'You cannot tell which channel actually drives the enquiries that matter.',
      'A consent banner is blocking data collection, or you are unsure whether tracking is POPIA-compliant.',
      'Someone “installed analytics” years ago and never configured events, goals or a dashboard.',
    ],
    deliverables: [
      'GA4 property configured with a clean event taxonomy',
      'Google Tag Manager container installed and documented',
      'Conversion events for calls, WhatsApp, form submissions and key page views',
      'Enhanced Conversions where appropriate',
      'Consent Mode v2 implemented for POPIA-compliant, banner-aware data',
      'Google Search Console linked and verified',
      'A Looker Studio (Google Data Studio) dashboard for the metrics that matter',
      'Testing and data-integrity QA before handover',
      'Full handover — you own the accounts, tags and configuration',
    ],
    exclusions: [
      'Ongoing reporting and optimisation (available on a support plan — see website maintenance)',
      'Paid-ads management and media buying',
      'BigQuery warehousing and custom data pipelines',
      'Historical Universal Analytics data recovery',
    ],
    faqs: [
      {
        question: 'Do I still need GA4 in 2026?',
        answer:
          'Yes, if you want trustworthy measurement. Universal Analytics stopped processing data in 2023; GA4 is Google’s current analytics platform. Without it — correctly configured with conversion events — you cannot reliably see which channels drive calls, WhatsApp clicks or form enquiries.',
        group: 'technical',
      },
      {
        question: 'Is this POPIA compliant?',
        answer:
          'We implement Consent Mode v2 so tags respect your consent banner: analytics and ads tags wait for a lawful basis before collecting personal data where required. POPIA compliance also depends on your privacy notice and banner implementation; we configure the measurement layer to work with them rather than bypass them.',
        group: 'technical',
      },
      {
        question: 'How is this different from SEO?',
        answer:
          'SEO is about being found for the searches that matter. Analytics and conversion tracking measure what happens after people arrive — which pages and channels produce enquiries. They complement each other: SEO website development builds the architecture; this service makes the outcomes measurable.',
        group: 'process',
      },
      {
        question: 'Can you set this up on a site you did not build?',
        answer:
          'Yes. The once-off R2,950 setup is designed for existing sites — including those built elsewhere — provided we can access the site or Tag Manager and create or use your Google accounts. Every new Koppie build includes this measurement setup as part of the project.',
        group: 'process',
      },
    ],
    relatedServiceSlugs: ['seo-website-development', 'website-maintenance-and-support'],
    relatedPackageSlugs: ['professional-business-website'],
    relatedSolutionSlugs: ['small-businesses', 'professional-services'],
    relatedProjectSlugs: [],
    relatedArticleSlugs: [],
    primaryKeywordCluster: 'conversion tracking setup south africa',
    ctaType: 'quote',
  },
  {
    slug: 'website-maintenance-and-support',
    category: 'recurring',
    title: 'Website Maintenance & Support',
    seoTitle: 'Website Maintenance & Support South Africa',
    metaDescription:
      'Website maintenance plans for South African businesses: hosting admin, updates, backups, monitoring and monthly change time — from basic care to ecommerce SLAs.',
    heading: 'Website maintenance and support',
    intro:
      'Websites do not stay healthy by themselves: software ages, forms silently break, and small changes pile up. Our support plans keep your site fast, secure and current — with a human who already knows your build.',
    summary: 'Care plans that keep sites fast, secure, backed up and improving.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    problems: [
      'Nobody notices the contact form broke until a customer mentions it.',
      'Software updates are ignored because “last time everything broke”.',
      'Small content changes wait weeks for a developer to respond.',
      'There is no backup you have ever actually seen restored.',
      'Search performance is unmonitored, so decay goes unseen.',
    ],
    deliverables: [
      'Hosting, domain, DNS and SSL administration',
      'Software and dependency updates, tested before deploy',
      'Automated backups with periodic restore verification',
      'Uptime and form monitoring with proactive fixes',
      'Monthly change time for content and small improvements',
      'Search Console review and plain-language monthly reporting (plan-dependent)',
      'Optional Measurement & Reporting add-on (from R950/mo): monthly conversion reporting, Looker Studio dashboard upkeep and a plain-English insight readout',
      'Priority response targets on business and ecommerce plans',
      'Quarterly improvement recommendations from real usage data',
    ],
    exclusions: [
      'Rebuilds and major features (quoted as projects)',
      'Support of third-party builds without an initial assessment',
      'Emergency work outside plans (available at the published hourly rate)',
    ],
    faqs: [
      {
        question: 'What does website maintenance cost?',
        answer:
          'Plans run from essential care for simple sites to ecommerce and application support with response SLAs — indicative monthly ranges are published on our pricing page. All plans are month-to-month with notice; support should be earned, not locked in.',
        group: 'cost',
      },
      {
        question: 'Can you take over a website someone else built?',
        answer:
          'Usually yes, after a short paid assessment that checks hosting access, software state, backups and the risks we would be inheriting. The assessment produces a stabilisation list; from there the site joins a normal plan.',
        group: 'process',
      },
      {
        question: 'Can you report on my results each month?',
        answer:
          'Yes — via the optional Measurement & Reporting add-on (from R950/mo), stackable on any support plan. It builds on the once-off Analytics & Conversion Tracking Setup: we keep GA4 and Consent Mode v2 configuration healthy, maintain the Looker Studio dashboard, and turn the numbers into a plain-English monthly readout you can act on. Month-to-month, no lock-in.',
        group: 'support',
      },
    ],
    relatedServiceSlugs: [
      'business-websites',
      'ecommerce-websites',
      'website-redesign',
      'analytics-and-conversion-tracking',
    ],
    relatedPackageSlugs: [],
    relatedSolutionSlugs: ['small-businesses'],
    relatedProjectSlugs: [],
    relatedArticleSlugs: ['website-cost-south-africa'],
    primaryKeywordCluster: 'website maintenance south africa',
    ctaType: 'quote',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return services.filter((s) => s.category === category);
}
