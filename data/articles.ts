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
      'What websites really cost in South Africa, what moves the price, and how to buy well. Written with published figures and dated sources — the guides we wish every buyer read before requesting quotes.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
  },
  {
    slug: 'seo-guides',
    category: 'seo-guides',
    title: 'SEO Guides',
    metaDescription:
      'Plain-language SEO guides for South African business owners: how search visibility actually works, what to invest in, and what to ignore.',
    heading: 'SEO guides',
    intro:
      'Search engine optimisation explained for business owners, not marketers: what Google rewards, what it ignores, and where your money and effort actually move the needle.',
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
    seoTitle: 'How Much Does a Website Cost in South Africa? (2026)',
    metaDescription:
      'Website costs in South Africa in 2026: real market ranges from R2,000 templates to R160,000+ ecommerce builds, what moves the price, and how to budget sensibly.',
    heading: 'How much does a website cost in South Africa?',
    intro:
      'Quotes for “a website” in South Africa range from under R2,000 to well over R200,000 — and both ends can be rational. This guide explains the market’s real 2026 price bands, what actually moves the price, and how to decide where your business should sit.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    supportsServiceSlugs: ['business-websites'],
    relatedArticleSlugs: ['choosing-a-website-development-company', 'what-is-an-seo-first-website'],
    body: [
      {
        heading: 'The short answer: 2026 market ranges',
        paragraphs: [
          'Publicly published South African pricing in 2026 clusters into recognisable bands. Entry-level template and package sites advertise from roughly R2,000 to R10,000. Standard five-page small-business sites mostly land between about R5,500 and R15,000 — one 2026 agency survey puts the average near R6,250. Professionally architected business websites with proper SEO structure typically run R20,000 to R60,000. Product catalogues, ecommerce and custom builds range from around R45,000 to R160,000 and beyond, depending on scope.',
          'Hourly rates tell the same story: published South African rates span roughly R250 to R1,500 per hour, with most established providers billing R450 to R950. A R3,000 website and a R60,000 website are not the same product at different mark-ups — they are different amounts of skilled time applied to different problems.',
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
        heading: 'Budgeting sensibly: a practical rule',
        paragraphs: [
          'Work backwards from the value of a customer. If an average new client is worth R5,000 and a properly structured site brings a handful per month once established, the arithmetic on a R30,000 build is short. If your site is a business card for referral traffic only, spending R60,000 is theatre — a well-made starter site is the rational buy.',
          'Whatever the budget, insist on: ownership of your domain, content and code; itemised inclusions and exclusions; published or clearly-explained pricing logic; and measurement (Search Console at minimum) wired in from launch. Our own indicative ranges are published on the pricing page, and a fixed quote follows a scoping conversation — the same standard this guide asks you to hold anyone to.',
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
    title: 'How to Choose a Website Development Company in South Africa',
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
    relatedArticleSlugs: ['website-cost-south-africa', 'choosing-a-website-development-company'],
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
