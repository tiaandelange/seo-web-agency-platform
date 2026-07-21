import type { Comparison } from '@/types/content';

/** Decision-stage comparison pages. Fairness rule: no strawmen (see prompt 09). */
export const comparisons: Comparison[] = [
  {
    slug: 'custom-website-vs-template',
    optionA: 'Custom-built website',
    optionB: 'Template or website builder',
    title: 'Custom Website vs Template: Which Should You Choose?',
    metaDescription:
      'Custom website vs template or builder: an honest comparison of cost, speed, SEO ceiling and ownership — and the situations where each is the right call.',
    heading: 'Custom website vs template: which should you choose?',
    intro:
      'Templates and builders are not scams, and custom builds are not automatically worth it. The right answer depends on how much of your growth must come from search, how distinctive your offer is, and what a customer is worth to you. Here is the honest comparison.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    criteria: [
      { name: 'Upfront cost', aNote: 'Typically R20,000+ in SA for professional builds', bNote: 'From ~R500/month DIY or R2,000–R10,000 packaged' },
      { name: 'Time to launch', aNote: 'Weeks — research and structure take real time', bNote: 'Days — the honest headline advantage' },
      { name: 'SEO ceiling', aNote: 'Set by your market and content, not the platform', bNote: 'Constrained: shared structures, limited technical control' },
      { name: 'Performance', aNote: 'Engineered to Core Web Vitals budgets', bNote: 'Varies; builder scripts often weigh pages down' },
      { name: 'Distinctiveness', aNote: 'Structure and presentation built around your offer', bNote: 'Recognisably a theme, shared with thousands' },
      { name: 'Ownership & portability', aNote: 'You own code and content; host anywhere', bNote: 'Builder sites are rentals; leaving means rebuilding' },
      { name: 'Change flexibility', aNote: 'Anything is changeable; changes cost developer time', bNote: 'Fast within the template; walls appear at the edges' },
    ],
    whenA: [
      'Organic search is a primary growth channel in a competitive market',
      'Your customer value supports a R20,000+ investment paying back on a few wins',
      'You need functionality beyond brochureware: catalogues, quoting, integrations',
      'You want an asset you own and can build on for years',
    ],
    whenB: [
      'You need a presence this week and referrals, not search, drive your work',
      'Budget genuinely caps below ~R10,000 — a good template beats a bad custom site',
      'You are testing a venture that may pivot in six months',
      'Your industry buys entirely through relationships and directories',
    ],
    verdict:
      'Buy the template honestly or buy the custom build honestly — the regret cases are almost always mismatches. If being found on Google materially drives your growth plan, structure is where the money should go, and that is the custom path. If it does not yet, launch cheap, learn, and upgrade when the arithmetic says so. If you are unsure which side you are on, a scoping conversation costs nothing and we will tell you plainly — including when the template is the right answer.',
    supportsServiceSlugs: ['business-websites', 'seo-website-development'],
    primaryKeywordCluster: 'custom website vs template',
  },
  {
    slug: 'wordpress-vs-nextjs',
    optionA: 'WordPress',
    optionB: 'Next.js (custom build)',
    title: 'WordPress vs Next.js for Business Websites',
    metaDescription:
      'WordPress vs Next.js for business websites: a fair look at cost, editing, performance, security and SEO control — and who should genuinely choose which.',
    heading: 'WordPress vs Next.js for business websites',
    intro:
      'WordPress powers a huge share of the web for good reasons; Next.js is what we build with, also for good reasons. This comparison is written to be fair to both — including where WordPress is simply the right choice.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    criteria: [
      { name: 'Ecosystem & editing', aNote: 'Mature CMS, huge plugin ecosystem, non-technical editing built in', bNote: 'Editing workflow is designed per project; leaner but less packaged' },
      { name: 'Build cost', aNote: 'Generally cheaper — themes and plugins shortcut common needs', bNote: 'More engineering time; pays off where performance and custom features matter' },
      { name: 'Performance', aNote: 'Can be fast, but theme/plugin stacks and hosting often drag it down', bNote: 'Server-rendered, statically generated pages are fast by default' },
      { name: 'Security & maintenance', aNote: 'Constant plugin/core updates; popular target for automated attacks', bNote: 'Minimal attack surface; dependencies update on your schedule' },
      { name: 'SEO control', aNote: 'Good with disciplined setup and plugins', bNote: 'Total control: metadata, schema, sitemap and rendering are code you own' },
      { name: 'Custom functionality', aNote: 'Plugins first; genuine custom work fights the platform', bNote: 'Custom is the native mode — catalogues, quoting, portals share the stack' },
      { name: 'Finding help', aNote: 'Developers everywhere at every price', bNote: 'Smaller but strong talent pool; modern TypeScript developers' },
    ],
    whenA: [
      'Frequent self-service content editing by non-technical staff is the top priority',
      'Budget favours themes and the site is standard brochureware or a blog',
      'You already run WordPress well and it is not the bottleneck',
    ],
    whenB: [
      'Search performance and Core Web Vitals are commercial priorities',
      'The site will grow into catalogues, quoting workflows or portals',
      'You are tired of plugin-update roulette and want a lean, owned stack',
      'Page speed on mid-range mobiles matters to your buyers',
    ],
    verdict:
      'For content-editing-heavy brochure sites with tight budgets, WordPress remains a rational default. For businesses whose site must perform in search and grow into real functionality, a Next.js build removes the platform ceiling — which is why it is our standard stack. The wrong answer is pretending either side has no trade-offs; the right answer falls out of two questions: who edits, and what must this site become?',
    supportsServiceSlugs: ['custom-web-applications', 'seo-website-development'],
    primaryKeywordCluster: 'wordpress vs nextjs',
  },
  {
    slug: 'website-vs-web-application',
    optionA: 'Website',
    optionB: 'Web application',
    title: 'Website vs Web Application: What Does Your Business Need?',
    metaDescription:
      'Website vs web application explained for business owners: what each is for, what each costs, and the telltale signs your business has outgrown “just a website”.',
    heading: 'Website vs web application: what does your business need?',
    intro:
      'A website tells and sells; a web application does work. Confusing the two wastes money in both directions — paying application prices for brochureware, or bolting business processes onto a marketing site. Here is how to tell which you need, and when the answer is both.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    criteria: [
      { name: 'Core job', aNote: 'Be found, build trust, generate enquiries', bNote: 'Run a process: capture, workflow, records, roles' },
      { name: 'Users', aNote: 'The public and your prospects', bNote: 'Logged-in staff, customers or suppliers' },
      { name: 'Typical SA cost', aNote: 'R14,000–R90,000 depending on scope', bNote: 'R80,000+ with paid discovery first' },
      { name: 'Success metric', aNote: 'Enquiries, quote requests, calls', bNote: 'Hours saved, errors removed, visibility gained' },
      { name: 'SEO relevance', aNote: 'Central — the site exists to be found', bNote: 'Minimal — applications sit behind logins' },
      { name: 'Failure mode', aNote: 'Built pretty, found never', bNote: 'Built big, adopted never' },
    ],
    whenA: [
      'Your bottleneck is demand: not enough of the right enquiries',
      'Customers need to find, understand and trust you',
      'Your internal processes still fit spreadsheets without daily pain',
    ],
    whenB: [
      'Your bottleneck is operations: quoting, admin or tracking eats hours daily',
      'Information is retyped between systems or lives in one person’s head',
      'Customers or suppliers keep phoning for things they could self-serve',
    ],
    verdict:
      'Most growing businesses eventually need both, and sequence matters: demand usually comes first (the website), operations second (the application) — because the application is easier to justify once the enquiries are flowing. The efficient path is building the website on an architecture the application can later share, which is exactly how we structure ours. If you recognise both bottlenecks, a consultation will help sequence them honestly.',
    supportsServiceSlugs: ['custom-web-applications', 'admin-panel-development'],
    primaryKeywordCluster: 'website vs web application',
  },
  {
    slug: 'website-maintenance-options',
    optionA: 'Maintenance plan',
    optionB: 'Ad-hoc support',
    title: 'Website Maintenance Options Compared',
    metaDescription:
      'Website maintenance plan vs ad-hoc support vs doing nothing: what each really costs in South Africa, what breaks silently, and which option fits which site.',
    heading: 'Website maintenance options compared',
    intro:
      'There are three honest options for keeping a website healthy: a monthly plan, ad-hoc call-outs, or nothing. All three have a price — the third one just invoices you later, at the worst time. Here is the fair comparison.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    criteria: [
      { name: 'Monthly cost', aNote: 'Predictable: indicative R850–R8,000 by plan tier in SA', bNote: 'R0 until something breaks; then hourly at R650–R950+' },
      { name: 'Response when things break', aNote: 'Priority targets; provider already knows the build', bNote: 'Queue position and re-learning time billed to you' },
      { name: 'Silent failures (forms, SSL, backups)', aNote: 'Monitored — caught before customers notice', bNote: 'Discovered by a customer, eventually' },
      { name: 'Software updates', aNote: 'Tested and applied routinely', bNote: 'Deferred until forced — the riskiest pattern' },
      { name: 'Small improvements', aNote: 'Monthly change time keeps the site current', bNote: 'Minimum-charge friction means they never happen' },
      { name: 'Search performance', aNote: 'Reviewed on business-tier plans; decay gets seen', bNote: 'Unwatched' },
    ],
    whenA: [
      'The website produces enquiries or sales you would miss within days',
      'Ecommerce or applications where downtime is direct revenue loss',
      'You want one accountable party and no surprise invoices',
    ],
    whenB: [
      'A genuinely static site whose failure costs little and shows fast',
      'You have technical capacity in-house for monitoring and updates',
      'The site is scheduled for replacement within months',
    ],
    verdict:
      'Match the plan to what failure costs: if a dead form for a week costs one client, essential care already pays for itself; if the site is a seldom-visited brochure, ad-hoc is defensible and we will say so. The only indefensible option is “nothing” on a site that earns money. Our plan tiers and indicative pricing are published openly — compare them against what one silent failure would cost you.',
    supportsServiceSlugs: ['website-maintenance-and-support'],
    primaryKeywordCluster: 'website maintenance options',
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
