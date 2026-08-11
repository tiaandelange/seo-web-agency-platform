import type { Article, ResourceCategory, ResourceCategoryInfo } from '@/types/content';

/**
 * Resource categories. `ecommerce-guides` and `business-systems` are planned
 * (D-18) and not generated while empty.
 */
export const resourceCategories: ResourceCategoryInfo[] = [
  {
    slug: 'website-cost-guides',
    category: 'website-cost-guides',
    title: 'Website Cost Guides',
    metaDescription:
      'Honest guides to website costs and buying decisions in South Africa: what things cost, why prices differ, and how to choose a provider without regret.',
    heading: 'Website cost guides',
    intro:
      'What websites really cost in South Africa, what moves the price, and how to buy well. Written with published figures and dated sources — the guides we wish every buyer read before requesting quotes. Use these pages to separate template pricing from custom builds, understand why two quotes for “a website” can differ by an order of magnitude, and decide which package or service conversation is worth your time. We keep figures labelled indicative where they are ranges, and we do not invent “average agency” statistics without a citation. When you are ready to move from research to a scoped number, the pricing and package pages sit one click away — the quote after discovery remains the binding figure.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
  },
  {
    slug: 'seo-guides',
    category: 'seo-guides',
    title: 'SEO Guides for SA Businesses',
    metaDescription:
      'Plain-language SEO guides for South African business owners: how search visibility actually works, what to invest in, and what to ignore.',
    heading: 'SEO guides',
    intro:
      'Search engine optimisation explained for business owners, not marketers: what Google rewards, what it ignores, and where your money and effort actually move the needle. These guides cover SEO-first website structure, common myths, and how to judge whether you need content, technical fixes, or a proper rebuild. We avoid ranking guarantees and fabricated traffic claims — visibility work is evidence-led and often slow. Pair a guide with our SEO audit products when you want a once-off diagnosis, or with SEO website development when the site itself is the constraint. New articles publish when they meet the same sourcing standard as the rest of this library.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
  },
  {
    slug: 'ecommerce-guides',
    category: 'ecommerce-guides',
    title: 'Ecommerce Guides',
    metaDescription:
      'Guides to selling online in South Africa: platforms, payment gateways, costs and conversion. Opening soon.',
    heading: 'Ecommerce guides',
    intro: 'Guides to selling online in South Africa. First guides publishing soon.',
    status: 'planned',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
  },
  {
    slug: 'business-systems',
    category: 'business-systems',
    title: 'Business Systems Guides',
    metaDescription:
      'Guides to admin panels, quotation systems, portals and automation for growing businesses. Opening soon.',
    heading: 'Business systems guides',
    intro: 'Guides to systemising a growing business. First guides publishing soon.',
    status: 'planned',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
  },
];

export const articles: Article[] = [
  {
    slug: 'website-cost-south-africa',
    category: 'website-cost-guides',
    title: 'How Much Does a Website Cost in South Africa?',
    seoTitle: 'Website Cost in South Africa (2026)',
    metaDescription:
      'Website costs in South Africa in 2026: market bands from R2,000 templates to R160,000+ builds, what moves price, and our indicative ranges from R4,500.',
    heading: 'How much does a website cost in South Africa?',
    intro:
      'Quotes for “a website” in South Africa range from under R2,000 to well over R200,000 — and both ends can be rational. This guide explains the market’s real 2026 price bands, what actually moves the price, and how to decide where your business should sit.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-08-11',
    supportsServiceSlugs: ['business-websites'],
    relatedArticleSlugs: [
      'choosing-a-website-development-company',
      'what-is-an-seo-first-website',
      'seo-cost-south-africa',
    ],
    authorSlug: 'tiaan-de-lange',
    body: [
      {
        heading: 'The short answer: 2026 market ranges',
        paragraphs: [
          'Publicly published South African pricing in 2026 clusters into recognisable bands. Entry-level template and package sites advertise from roughly R2,000 to R10,000. Standard five-page small-business sites mostly land between about R5,500 and R15,000 — one 2026 agency survey puts the average near R6,250. Professionally architected business websites with proper SEO structure typically run R20,000 to R60,000. Product catalogues, ecommerce and custom builds range from around R45,000 to R160,000 and beyond, depending on scope.',
          'Hourly rates tell the same story: published South African rates span roughly R250 to R1,500 per hour, with most established providers billing R450 to R950. A R3,000 website and a R60,000 website are not the same product at different mark-ups — they are different amounts of skilled time applied to different problems.',
        ],
      },
      {
        heading: 'What you typically get at each market band',
        paragraphs: [
          'R2,000–R10,000: a fast, standardised launch — often a shared template, thin unique content and little search architecture. Fine for a temporary brochure; weak if Google enquiries are the growth plan.',
          'R12,000–R25,000: a competent small-business site with a clearer page list, basic SEO hygiene and ownership that does not trap you. Still not a full multi-service lead-generation system.',
          'R25,000–R60,000: professional SEO-structured builds — unique pages per commercial intent, conversion pathways and measurement. This is where most established service businesses that depend on search should budget.',
          'R45,000–R160,000+: catalogues, ecommerce and custom workflows. Price is driven by data readiness, payments, RFQ rules and integrations more than “page count”. Above that sits paid-discovery custom software, not a brochure with extras.',
        ],
      },
      {
        heading: 'What actually moves the price',
        paragraphs: [
          'Five factors explain most of the spread. First, research and architecture: whether anyone maps what your customers search for before deciding the page list — this is the cheapest work to skip and the most expensive to skip. Second, page count and uniqueness: ten genuinely distinct, written pages cost more than ten variations of one template. Third, functionality: forms and maps are trivial; catalogues, payments, quoting workflows and logins are engineering. Fourth, content: who writes, structures and loads it. Fifth, the builder’s economics: a volume seller recovering three hours per site prices differently from a practice spending eighty.',
        ],
      },
      {
        heading: 'Why the cheap end usually costs more later',
        paragraphs: [
          'The R2,000–R10,000 band is honest about what it is: a fast, standardised launch. The trouble starts when a business whose growth depends on being found buys one and waits. Template builds tend to ship with duplicated structures, thin content and no search architecture — so the site exists, but Google has no reason to choose it. The common second purchase, a rebuilt-properly site a year later, makes the cheap site the most expensive line on the invoice.',
          'The reverse mistake also exists: paying R80,000 for functionality a R25,000 site would have delivered because nobody scoped honestly. The defence in both directions is the same — insist on seeing the reasoning behind the page list and the price.',
        ],
      },
      {
        heading: 'Koppie Systems published indicative ranges',
        paragraphs: [
          'Our published ladder (indicative until quoted) sits inside the professional market, above the template floor: one-page sites R4,500–R8,500; starter business websites R9,500–R18,000; professional lead-generation sites R22,000–R45,000; product catalogues R35,000–R70,000; ecommerce R45,000–R110,000; custom systems from R65,000 with paid discovery. Fixed once-off SEO audits start at R2,950. Full tables and what moves each band live on the pricing page.',
          'We use ranges because honest fixed prices need scope. Scoping converts your page list and features into a fixed itemised quote — that quote is the binding number.',
        ],
      },
      {
        heading: 'Website cost vs SEO cost',
        paragraphs: [
          'Buyers often blur “website price” with “SEO price”. The build is a one-off architecture decision; monthly SEO is ongoing content and technical work. If you are comparing retainers and audits rather than build packages, read the SEO cost guide — it covers once-off audits, monthly Search Care and what growth retainers typically cost in South Africa.',
        ],
      },
      {
        heading: 'Budgeting sensibly: a practical rule',
        paragraphs: [
          'Work backwards from the value of a customer. If an average new client is worth R5,000 and a properly structured site brings a handful per month once established, the arithmetic on a R30,000-class build is short. If your site is a business card for referral traffic only, spending at the top of the professional band is theatre — a well-made starter site is the rational buy.',
          'Whatever the budget, insist on: ownership of your domain, content and code; itemised inclusions and exclusions; published or clearly-explained pricing logic; and measurement (Search Console at minimum) wired in from launch. Our own indicative ranges are published on the pricing page, and a fixed quote follows a scoping conversation — the same standard this guide asks you to hold anyone to.',
        ],
      },
      {
        heading: 'Questions to ask before you pay a deposit',
        paragraphs: [
          'Who decides the page list — and can you see the keyword-to-page reasoning? What is excluded in writing? Who owns the domain, hosting login and code at handover? How will you measure enquiries (calls, WhatsApp, forms) after launch? What happens if Google Search Console shows indexation problems in the first 90 days?',
          'If those answers are vague, the quote number is not the risk — the missing process is.',
        ],
      },
    ],
    sources: [
      { label: 'SME Rocket — Website Design Prices in South Africa (2026 agency survey)', url: 'https://www.smerocket.co.za/website-design-prices-in-south-africa/' },
      { label: 'Gridweb — Website Design Costs in South Africa (2026)', url: 'https://gridweb.co.za/website-design-costs-south-africa/' },
      { label: 'New Perspective Studio — Cost of Creating a Website in South Africa', url: 'https://www.newperspectivestudio.co.za/wp/what-is-the-cost-of-creating-a-website-in-south-africa/' },
      { label: 'Black Snow Group — Website Design Costs in South Africa (2026)', url: 'https://blacksnowgroup.co.za/website-design-costs-in-south-africa-2026/' },
    ],
  },
  {
    slug: 'choosing-a-website-development-company',
    category: 'website-cost-guides',
    title: 'How to Choose a Website Developer in SA',
    metaDescription:
      'How to choose a website development company in South Africa: the questions that expose method, the red flags that predict regret, and a simple shortlist test.',
    heading: 'How to choose a website development company in South Africa',
    intro:
      'Every provider shows you their best three sites and says the right words about “SEO-friendly” and “mobile-first”. This guide gives you the questions that separate method from marketing, the red flags that reliably predict regret, and a simple shortlist test.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    supportsServiceSlugs: ['business-websites'],
    relatedArticleSlugs: ['website-cost-south-africa', 'what-is-an-seo-first-website'],
    authorSlug: 'tiaan-de-lange',
    body: [
      {
        heading: 'Ask about method, not portfolios',
        paragraphs: [
          'Portfolios show taste; method predicts your outcome. Ask: “How will you decide which pages my site needs?” A serious answer involves researching what your customers search for and mapping one page per intent — and the provider should be able to show you what that mapping document looks like. Ask: “How will we measure whether it worked?” The answer should involve Search Console and defined conversion actions, not “analytics installed”.',
          'Then ask the uncomfortable one: “What won’t be included?” Providers with real scope discipline answer instantly, because written exclusions protect both sides. Vague inclusiveness — “everything you need!” — is where surprise invoices are born.',
        ],
      },
      {
        heading: 'Red flags that reliably predict regret',
        paragraphs: [
          'Guaranteed rankings or “page one in 90 days” — nobody controls Google, and providers who pretend to are telling you how they handle truth. Hosting you cannot leave: if the domain or site is registered in their name, you are renting your own business asset. Prices with no visible logic. Sites they built that you cannot view-source without finding a sea of identical template markup. And silence about measurement — a provider uninterested in results expects not to be judged on them.',
        ],
      },
      {
        heading: 'The shortlist test: one hour, three providers',
        paragraphs: [
          'Send the same brief to three shortlisted providers and compare three things. Specificity: who asked real questions about your customers and services versus who quoted from the brochure? Reasoning: whose proposal explains why those pages and that price? Ownership: who states plainly that domain, content and code are yours? You will usually find the answer obvious by the second proposal.',
          'Whoever you choose, put the essentials in writing before paying: deliverables and exclusions, ownership, timelines with your obligations, and what launch includes (Search Console setup, redirects if migrating). A provider who welcomes that conversation is a provider planning to still like you in a year.',
        ],
      },
    ],
    sources: [],
  },
  {
    slug: 'what-is-an-seo-first-website',
    category: 'seo-guides',
    title: 'What Is an SEO-First Website?',
    metaDescription:
      'What an SEO-first website means: architecture from search demand, one page per intent, technical standards Google rewards — and what it deliberately is not.',
    heading: 'What is an SEO-first website?',
    intro:
      '“SEO-friendly” has been marketed into meaninglessness. An SEO-first website is something specific: a site whose page list, structure and technical build are derived from researched search demand before design begins. Here is what that means in practice — and what it does not promise.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    supportsServiceSlugs: ['seo-website-development'],
    relatedArticleSlugs: [
      'website-cost-south-africa',
      'choosing-a-website-development-company',
      'seo-cost-south-africa',
    ],
    authorSlug: 'tiaan-de-lange',
    body: [
      {
        heading: 'The order of operations is the whole idea',
        paragraphs: [
          'Most websites are built design-first: pick a template, fill the usual pages, sprinkle keywords at the end. SEO-first inverts the sequence. First, research: what do your customers actually type when they need what you sell — which services, which questions, which places? Second, architecture: one dedicated page per meaningful search intent, organised so related pages support each other, with nothing thin and nothing duplicated. Only then, build and design.',
          'The difference shows up structurally. A design-first plumber site has “Services” as one page; an SEO-first one has geyser repairs, leak detection and bathroom installations as separate pages — because those are separate searches with separate buyers.',
        ],
      },
      {
        heading: 'The technical floor',
        paragraphs: [
          'Architecture only pays if Google can crawl, render and trust the site. The technical floor includes: server-rendered pages whose content is visible in the HTML source; fast mobile performance within Core Web Vitals thresholds; clean semantic structure with one H1 and logical headings; unique titles and descriptions; correct canonical URLs; an accurate XML sitemap; and structured data that mirrors what is visibly on the page. None of this is exotic — it is discipline, applied before launch rather than patched after.',
        ],
      },
      {
        heading: 'What SEO-first deliberately does not promise',
        paragraphs: [
          'It does not promise rankings — no honest provider can, because Google’s results are not anyone’s to sell. It does not replace content: the architecture defines where authority can grow; publishing real answers and real project evidence grows it. And it does not make paid advertising obsolete — it changes ads from life support into a choice.',
          'What it does promise is a foundation without the usual self-inflicted ceilings: no pages competing with each other, no invisible content, no structural reasons for Google to prefer a competitor of equal merit. If you are evaluating providers, our SEO website development service page shows exactly what that method includes — and the research documents come with the build.',
        ],
      },
    ],
    sources: [],
  },
  {
    slug: 'seo-cost-south-africa',
    category: 'seo-guides',
    title: 'What Does SEO Cost in South Africa (2026)?',
    seoTitle: 'SEO Cost South Africa (2026)',
    metaDescription:
      'What SEO costs in South Africa in 2026: once-off audits, monthly retainers and honest Koppie prices — including Search Care at R3,950/mo. No ranking guarantees.',
    heading: 'What does SEO cost in South Africa in 2026?',
    intro:
      '“What does SEO cost?” is really three questions: once-off diagnosis, monthly care, or a full growth retainer. This guide sets out published 2026 South African market bands, what each model buys, and Koppie Systems’ fixed prices — without ranking promises.',
    status: 'live',
    dateCreated: '2026-08-11',
    dateUpdated: '2026-08-11',
    supportsServiceSlugs: [
      'search-care',
      'analytics-and-conversion-tracking',
      'seo-website-development',
    ],
    relatedArticleSlugs: ['what-is-an-seo-first-website', 'website-cost-south-africa'],
    authorSlug: 'tiaan-de-lange',
    body: [
      {
        heading: 'The short answer: 2026 SA SEO price bands',
        paragraphs: [
          'Published South African figures in 2026 typically split three ways. Once-off SEO audits for small service sites often start around R3,500–R8,500; deeper technical or ecommerce audits commonly run R8,500–R35,000 and can exceed that for large or enterprise sites. Entry or local monthly SEO packages often advertise R3,000–R8,000 per month. Serious small-business and mid-market growth retainers more often sit between about R8,000 and R30,000 per month, with competitive or national programmes higher still.',
          'Those bands describe different scopes. A R4,000 monthly package is usually light maintenance, local listings and thin reporting. A R20,000 retainer typically buys strategy, content production and link or digital-PR work. Treating both as “SEO” is how buyers overpay for activity that does not match the job.',
        ],
      },
      {
        heading: 'Once-off audit vs monthly care vs growth retainer',
        paragraphs: [
          'An audit answers: what is broken or missing, and what should be fixed first. It is a diagnosis with a limited implementation allowance — useful when you need a decision, a handoff to an in-house person, or a scoped rebuild conversation. Monthly Search Care sits in the middle: ongoing monitoring, reporting and a capped set of technical or on-page fixes. A full growth retainer funds continuous content and authority work over many months.',
          'Growth retainers are rational when enquiry value is high and you will fund content long enough for compounding to matter. They are wasteful when the site itself is the bottleneck — wrong pages, thin duplication, broken tracking — or when the brief is “keep Search Console clean and fix the next batch of issues” rather than “publish and promote every month”.',
        ],
      },
      {
        heading: 'What moves the price',
        paragraphs: [
          'Site size and platform complexity (a ten-page brochure site is not a 250-URL catalogue). Whether ecommerce, multilingual or multi-location rules apply. How much content must be written versus edited. Competitive intensity in your category. And whether you are buying diagnosis, capped care or an ongoing content and authority programme.',
          'Anyone quoting a single number without looking at the crawl, Search Console and commercial page list is guessing. Insist on eligibility limits, inclusions, exclusions and what happens when the monthly hours run out.',
        ],
      },
      {
        heading: 'Koppie Systems published SEO prices',
        paragraphs: [
          'We publish fixed once-off and monthly prices so you can budget before a call. SEO Audit & Priority Fix Pack: R2,950 once-off (small sites, capped fixes). Advanced SEO Audit & Implementation Roadmap: R8,500 once-off (larger or catalogue/ecommerce sites within the published limits). Analytics & Conversion Tracking Setup: R2,950 once-off. Measurement & Reporting: R1,250 per month (dashboard and conversion readout). Search Care: R3,950 per month (capped technical and on-page fixes plus reporting).',
          'We do not sell ranking guarantees, content mills or link-building campaigns. Build and package indicative ranges for websites sit on the pricing page; the website cost guide covers the broader market for builds.',
        ],
      },
      {
        heading: 'Website build vs SEO bolt-on',
        paragraphs: [
          'If customers cannot find a clear page for what they search, monthly SEO on a broken architecture is expensive theatre. SEO-first website development and redesign fix the page map first. If the architecture is sound and you need ongoing hygiene, Search Care or Measurement & Reporting is the honest next step. If you need a market map of website prices rather than SEO prices, use the website cost guide.',
        ],
      },
      {
        heading: 'How to budget sensibly',
        paragraphs: [
          'Work backwards from enquiry value and realistic timeline. SEO compounds slowly; expect months, not a two-week miracle. Prefer scoped deliverables you can inspect (crawl summaries, fixed lists, Search Console screenshots, before-and-after titles) over vague “optimisation hours”. And refuse ranking guarantees — they are a reliability signal about the seller, not about Google.',
        ],
      },
      {
        heading: 'Sources',
        paragraphs: [
          'Market bands summarised from published 2026 South African agency guides (including Algorithm Agency, Growth Pulse Media, Symaxx Digital, Honey Whale, BaseCloud, Juicy Designs, SEO Strategist and Seed & Scale ranges for audits and retainers). Accessed August 2026. Market prices change — treat third-party bands as directional. Koppie figures are our published prices as of August 2026.',
        ],
      },
    ],
    sources: [
      {
        label: 'Algorithm Agency — How Much Does SEO Cost in South Africa? 2026',
        url: 'https://www.algorithm.agency/guides/how-much-does-seo-cost-in-south-africa',
      },
      {
        label: 'Growth Pulse Media — SEO Pricing South Africa 2026',
        url: 'https://www.growthpulsemedia.co.za/seo-pricing-south-africa/',
      },
      {
        label: 'Juicy Designs — SEO Audit South Africa',
        url: 'https://www.juicydesigns.co.za/services/seo-audit/',
      },
      {
        label: 'SEO Strategist — Technical SEO Audit Pricing',
        url: 'https://seostrategist.co.za/seo-pricing/technical-seo-audit-cost/',
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ResourceCategory): Article[] {
  return articles.filter((a) => a.category === category && a.status === 'live');
}

export function getLiveResourceCategories(): ResourceCategoryInfo[] {
  return resourceCategories.filter(
    (c) => c.status === 'live' && getArticlesByCategory(c.category).length > 0
  );
}

export function getResourceCategory(slug: string): ResourceCategoryInfo | undefined {
  return resourceCategories.find((c) => c.slug === slug);
}
