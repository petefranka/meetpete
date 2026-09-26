import {
  actionItemSchema,
  aiAnswerRowSchema,
  aiSeoResultSchema,
  beforeAfterItemSchema,
  chatMessageSchema,
  exampleReportSchema,
  faqSchema,
  navItemSchema,
  processStepSchema,
  quickWinSchema,
  serviceSchema,
  testimonialSchema,
  type ActionItem,
  type AiAnswerRow,
  type QuickWin,
  type Service,
} from '../models';

export const contactEmail = 'hello@meetpete.com';

export const navItems = navItemSchema.array().parse([
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'How it works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faqs', label: 'FAQ' },
]);

/* ---------------------------------- Hero ---------------------------------- */

export const heroTicks = ['Free 30-min call', 'No jargon', 'Cancel any time'];

/* ------------------------------ Before / after ----------------------------- */

export const beforeAfter = beforeAfterItemSchema.array().parse([
  { before: "A website you're embarrassed to share", after: 'A site that wins you work' },
  { before: 'Missing enquiries after hours', after: 'Your site answers and books 24/7' },
  { before: 'Invisible when customers ask ChatGPT', after: 'Recommended by name' },
  { before: 'Paying for ads just to be seen', after: 'Found without paying per click' },
]);

/* ------------------------------- Pain points ------------------------------- */

export const painStatements: string[] = [
  'Our website is a bit… embarrassing',
  "I've no idea if ChatGPT knows we exist",
  'Enquiries go quiet after 5pm',
  'Everyone says SEO is changing because of AI',
  "I can't update my own site",
  'Where do I even start?',
];

export const painVerdicts: string[] = [
  "Lucky you. Still, a free chat can't hurt.",
  "Just the one? That's a quick win waiting to happen.",
  'A couple. Very normal, and very fixable.',
  "You're in good company. Most businesses tick about this many.",
  'Right, we should definitely talk.',
  "You're overdue a hand. Let's get you sorted.",
  "Full house. You're exactly who this is for.",
];

/* --------------------------------- Services -------------------------------- */

export const chatDemo = chatMessageSchema.array().parse([
  { text: 'Hi, do you do boiler services on Saturdays?', from: 'customer' },
  { text: "We do! It's £85. I've got 9am or 11am this Saturday, which suits?", from: 'assistant' },
  { text: '11am please', from: 'customer' },
]);

export const chatBooked = 'Booked into your calendar';

export const aiQuestion = 'Who does good boiler servicing near Leeds?';

export const aiAnswer = {
  highlight: 'Smith & Sons Heating',
  rest: 'is a well-reviewed local option. They offer Saturday appointments and online booking.',
};

export const services: Service[] = serviceSchema.array().parse([
  {
    id: 'ai-powered-websites',
    num: '01',
    tab: 'AI websites',
    tier: 'Live in 3–4 weeks',
    title: 'AI-powered websites',
    body: "A website that looks the part and works around the clock. It answers questions, quotes prices and takes bookings while you're busy on the job.",
    demo: 'chat',
    features: [
      'Designed around your customers',
      'Built-in AI assistant for enquiries and bookings',
      'Fast, mobile-first and easy to update',
      'Ready for Google and AI search from day one',
    ],
    footer: 'Every enquiry answered, day or night',
  },
  {
    id: 'ai-seo',
    num: '02',
    tab: 'AI-SEO',
    tier: 'ChatGPT · Claude · Perplexity · Gemini',
    title: 'AI-SEO',
    body: 'When people ask AI tools for a business like yours, you should be the answer. Your site, listings and reviews get set up so AI finds, trusts and recommends you.',
    demo: 'ai',
    features: [
      'AI visibility audit across the big four',
      'Structured data and content AI can read',
      'Google Business and listings tidied up',
      'Monthly report on where you show up',
    ],
    footer: 'Show up where customers now search',
  },
]);

/* --------------------------------- Process --------------------------------- */

export const processSteps = processStepSchema.array().parse([
  {
    id: 'discovery',
    title: 'Discovery',
    when: 'Week one',
    summary:
      "A free chat and a full scan of your current site and listings. You'll see exactly how customers and AI tools find you today, and where you're missing out.",
    you: 'Tell us about your customers and what makes you different.',
    us: 'Scan your site, listings and AI visibility.',
    col: 1,
    span: 1,
  },
  {
    id: 'plan',
    title: 'Plan',
    when: 'Week two',
    summary:
      'A clear, plain-English plan: the pages, the questions customers ask AI, the costs. You sign off every page and every word before anything is built.',
    you: 'Read the plan and sign off the pages.',
    us: 'Write the plan, the page structure and the costs.',
    col: 2,
    span: 1,
  },
  {
    id: 'build',
    title: 'Build',
    when: 'Weeks three to four',
    summary:
      'Your website gets built, your assistant trained and your AI-SEO set up. You see it taking shape at every stage and give feedback as it goes.',
    you: 'Carry on as normal and give feedback as it takes shape.',
    us: 'Build the site, train the assistant, set up AI-SEO.',
    col: 3,
    span: 2,
  },
  {
    id: 'launch-grow',
    title: 'Launch & grow',
    when: 'Week four, then ongoing',
    summary:
      'You go live, and your visibility gets tracked across Google and AI tools. Monthly reports show where you show up, with fresh content to climb higher.',
    you: 'Share your new site and watch the enquiries.',
    us: 'Track your visibility and keep it climbing.',
    col: 4,
    span: 2,
  },
]);

export const processWeeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Ongoing'];

/* ------------------------------- Quote mixer ------------------------------- */

export const mixNeeds = [
  'AI-powered website',
  'AI assistant',
  'AI-SEO set-up',
  'Monthly content',
  'Listings and reviews',
  'Hosting and care',
];

export const mixSizes = ['Just me', '2–10 people', '10+ people'];

/* ------------------------------- Testimonials ------------------------------ */

export const testimonials = testimonialSchema.array().parse([
  { quote: 'They rebuilt our site in three weeks. Enquiries have doubled and the assistant books half of them.', name: 'Sarah', business: 'Salon owner' },
  { quote: 'Asked ChatGPT for a plumber in our area and it named us. Still buzzing about that.', name: 'Dave', business: 'Plumber' },
  { quote: "Finally a website I'm proud to send people to, and I can update the menu myself.", name: 'Priya', business: 'Café owner' },
  { quote: "The site answers questions at midnight so I don't have to.", name: 'Mark', business: 'Physio clinic' },
  { quote: 'No jargon, no nonsense. He explained AI-SEO in five minutes flat.', name: 'Jo', business: 'Roofer' },
  { quote: "Best money I've spent on the business this year, and I'm tight.", name: 'Tom', business: 'Garage owner' },
  { quote: 'He explained everything like a mate would. Zero judgement for asking daft questions.', name: 'Leanne', business: 'Florist' },
  { quote: 'We show up in Perplexity and Gemini now. Our old agency never even mentioned it.', name: 'Raj', business: 'Electrician' },
]);

/* ----------------------------------- FAQ ----------------------------------- */

export const faqs = faqSchema.array().parse([
  {
    question: "I'm rubbish with tech. Is this for me?",
    answer: "Especially you. Everything gets built and set up for you, and you're shown how to make simple updates yourself.",
  },
  {
    question: 'What kind of businesses do you work with?',
    answer: 'Small businesses and founders: trades, salons, clinics, shops, cafés and agencies. If customers search for what you do, this is for you.',
  },
  {
    question: "What's AI-SEO?",
    answer: 'Getting your business recommended when people ask AI tools like ChatGPT, Gemini or Perplexity for help. Your site, listings and reviews get set up so those tools understand what you do and trust you enough to suggest you.',
  },
  {
    question: 'Is AI-SEO different from normal SEO?',
    answer: 'It builds on it. Google still matters, and everything done here helps there too. The difference is structuring your site so AI assistants can read it, quote it and recommend you.',
  },
  {
    question: "What makes a website 'AI-powered'?",
    answer: "It has a built-in assistant that answers questions, quotes prices and takes bookings around the clock, trained on your business. It's also built from the ground up to be read by AI search tools.",
  },
  {
    question: 'Can I keep my current website?',
    answer: "Yes. Vanilla adds AI-SEO to the site you already have. If your site is holding you back, you'll be told straight.",
  },
  {
    question: 'How long does a new website take?',
    answer: 'Usually three to four weeks from the first call to going live.',
  },
  {
    question: 'Will I own my website?',
    answer: 'Yes. Everything that gets built is yours, including the domain and all the content.',
  },
  {
    question: 'Can I cancel my plan?',
    answer: "Any time, with 30 days' notice. Everything that's been built stays yours.",
  },
]);

/* --------------------------------- Contact --------------------------------- */

// Sample October 2026 calendar from the prototype. This is NOT live availability:
// the Confirm link opens an email enquiry instead of reserving a slot.
export const sampleMonthLabel = 'October 2026';

export const sampleAvailableDays = [
  5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30,
];

export const sampleSlots = ['9:30am', '10:00am', '11:30am', '1:00pm', '2:30pm', '4:00pm'];

/* ------------------------------- AI SEO page ------------------------------- */

export const aiSeoExampleDomain = 'bloomfloristry.co.uk';

export const aiSeoHeroTicks = ['7 SEO areas · 20 AI answers', 'Plain English results', 'Prioritised action plan'];

export const exampleReport = exampleReportSchema.parse({
  domain: aiSeoExampleDomain,
  score: 62,
  verdict: "AI can see you, but it's squinting.",
  areas: [
    { label: 'Technical SEO', score: 38 },
    { label: 'Content (E-E-A-T)', score: 55 },
    { label: 'AI search (GEO)', score: 71 },
    { label: 'Local SEO', score: 100 },
  ],
});

export const aiSeoChecks: string[] = [
  'Crawling your pages',
  'Technical SEO',
  'Content quality (E-E-A-T)',
  'Schema markup',
  'AI search readiness (GEO)',
  'Local SEO',
  'E-commerce',
  'International',
];

export const aiSeoAssistantNote = 'Asking ChatGPT, Claude, Perplexity and Gemini';

export const aiSeoResult = aiSeoResultSchema.parse({
  domain: aiSeoExampleDomain,
  meta: '10 pages in 42s',
  score: 59,
  verdict: "You're findable, but competitors are ahead.",
  issueSummary: '13 issues found. 3 quick fixes could take you to 78/100.',
  areas: [
    { label: 'Technical SEO', question: 'Can search engines crawl you?', score: 92 },
    { label: 'Content (E-E-A-T)', question: 'Is it helpful and trustworthy?', score: 53 },
    { label: 'Schema markup', question: 'Is it labelled for machines?', score: 26 },
    { label: 'AI search (GEO)', question: 'Will AI recommend you?', score: 26 },
    { label: 'Local SEO', question: 'Do you show up nearby?', score: 71 },
    { label: 'E-commerce', question: 'Can shoppers find your products?', score: 49 },
    { label: 'International', question: 'Not detected on your site', score: null },
  ],
  competitorNote: "You're 9 points behind the local average.",
  competitors: [
    { name: 'You', score: 59, you: true },
    { name: 'Competitor A', score: 81, you: false },
    { name: 'Competitor B', score: 74, you: false },
    { name: 'Competitor C', score: 48, you: false },
  ],
});

export const aiAssistants = ['ChatGPT', 'Claude', 'Perplexity', 'Gemini'];

export const aiAnswerRows: AiAnswerRow[] = aiAnswerRowSchema.array().parse([
  { prompt: 'Best florist in Leeds', ranks: [2, null, 4, null] },
  { prompt: 'Where can I get wedding flowers in Leeds?', ranks: [null, null, 1, null] },
  { prompt: 'Same-day flower delivery in Leeds', ranks: [null, null, 4, 1] },
  { prompt: 'Who does funeral flowers near Headingley?', ranks: [null, 1, null, 1] },
  { prompt: 'What is Bloom Floristry like?', ranks: [2, 3, 1, null] },
]);

export const quickWins: QuickWin[] = quickWinSchema.array().parse([
  { points: 8, headline: "You're hiding from AI assistants", fix: 'Allow the main AI crawlers in your robots.txt file.' },
  { points: 7, headline: 'Search engines have to guess what you do', fix: 'Add a LocalBusiness block to your homepage.' },
  { points: 4, headline: 'Products have no structured data', fix: 'Add Product schema to each product page.' },
]);

export const actionPlan: ActionItem[] = actionItemSchema.array().parse([
  {
    priority: 'Critical',
    headline: "You're hiding from AI assistants",
    cat: 'AI search (GEO)',
    tech: 'robots.txt · AI crawlers',
    mean: 'Your robots.txt tells the main AI crawlers to stay out, so they skip your site entirely.',
    why: "If an AI can't visit your site, it can't recommend you. The mention goes to whoever it can read.",
    fix: 'Allow the main AI crawlers in your robots.txt file.',
    code: 'User-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /',
    test: 'Visit bloomfloristry.co.uk/robots.txt and check GPTBot, ClaudeBot and PerplexityBot are not under a "Disallow: /" rule.',
    srcName: 'Google: introduction to robots.txt',
  },
  {
    priority: 'Critical',
    headline: 'Search engines have to guess what you do',
    cat: 'Schema markup',
    tech: 'LocalBusiness schema',
    mean: "There's no structured data, so your address, hours and services are guesswork.",
    why: `Structured data is a label machines read instantly. It's how assistants answer "what time does it open?"`,
    fix: 'Add a LocalBusiness block to your homepage.',
    code: '<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness",\n  "name": "Your Business",\n  "telephone": "+44 113 000 0000",\n  "openingHours": "Mo-Fr 09:00-17:00"\n}\n</script>',
    test: "Paste your homepage into Google's Rich Results Test. A LocalBusiness item should appear with no errors.",
    srcName: 'Google: LocalBusiness structured data',
  },
  {
    priority: 'High',
    headline: 'Products have no structured data',
    cat: 'E-commerce',
    tech: 'Product schema',
    mean: 'None of your product pages have Product schema.',
    why: 'Product schema lets Google and AI shopping tools show your price and stock directly.',
    fix: 'Add Product schema to each product page.',
    code: '<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  "name": "Seasonal bouquet",\n  "offers": { "@type": "Offer", "price": "45.00", "priceCurrency": "GBP", "availability": "https://schema.org/InStock" }\n}\n</script>',
    test: 'Run a product page through the Rich Results Test. A Product item should appear with price and availability.',
    srcName: 'Google: Product structured data',
  },
  {
    priority: 'High',
    headline: 'Titles are missing or all the same',
    cat: 'Content (E-E-A-T)',
    tech: 'Titles & meta descriptions',
    mean: 'Every page uses the same title, and none have descriptions.',
    why: 'Titles are the headline in search results and the first thing AI reads about a page.',
    srcName: 'Google: title links',
  },
  {
    priority: 'High',
    headline: "AI can't find answers to common questions",
    cat: 'AI search (GEO)',
    tech: 'Answer-ready content',
    mean: "There's no FAQ, and key facts like prices and service areas aren't stated anywhere.",
    why: 'AI assistants quote short, direct answers. If yours are missing, they quote someone else.',
    srcName: 'Google: AI features and your website',
  },
  {
    priority: 'High',
    headline: 'No llms.txt file',
    cat: 'AI search (GEO)',
    tech: 'llms.txt',
    mean: "There's no llms.txt file on your site.",
    why: "llms.txt is an emerging standard that gives AI tools a short summary of your site. It's quick to add.",
    srcName: 'llms.txt proposal',
  },
  {
    priority: 'Medium',
    headline: 'Some text is buried in code',
    cat: 'AI search (GEO)',
    tech: 'JavaScript rendering',
    mean: 'Only 9% of each page is readable text. The rest is code.',
    why: "Most AI crawlers don't run JavaScript. If your words only appear after it runs, AI never sees them.",
    srcName: 'Google: JavaScript SEO basics',
  },
  {
    priority: 'Medium',
    headline: 'Pages are a bit slow on mobile',
    cat: 'Technical SEO',
    tech: 'Core Web Vitals',
    mean: 'Your main content takes 3.4s on mobile. Google recommends under 2.5s.',
    why: 'Slow pages rank lower and lose visitors before they see what you do.',
    srcName: 'Google: Core Web Vitals',
  },
  {
    priority: 'Medium',
    headline: 'Your expertise is hard to spot',
    cat: 'Content (E-E-A-T)',
    tech: 'E-E-A-T signals',
    mean: 'You have an about page, but no names, qualifications or years of experience.',
    why: 'Google and AI tools favour businesses that show real experience and expertise. Anonymous sites get passed over.',
    srcName: 'Google: creating helpful content',
  },
  {
    priority: 'Medium',
    headline: 'Your details differ across listings',
    cat: 'Local SEO',
    tech: 'NAP consistency',
    mean: 'Your phone number on Yell differs from the one on your site.',
    why: 'Mismatched details make search engines and AI unsure which is right, so they show you less.',
    srcName: 'Google: improve your local ranking',
  },
  {
    priority: 'Low',
    headline: 'Some pages are a bit thin',
    cat: 'Content (E-E-A-T)',
    tech: 'Average word count',
    mean: 'Your pages average 310 words, and four are under 150.',
    why: 'Search engines and AI recommend businesses they can describe. A few words per page gives them nothing to say.',
    srcName: 'Google: creating helpful content',
  },
  {
    priority: 'Low',
    headline: 'Structured data has warnings',
    cat: 'Schema markup',
    tech: 'Schema validation',
    mean: 'Two schema blocks are missing recommended fields like image and priceRange.',
    why: "Broken structured data is the same as none. Machines skip what they can't parse.",
    srcName: 'Google: structured data guidelines',
  },
  {
    priority: 'Low',
    headline: 'Service areas are only mentioned in passing',
    cat: 'Local SEO',
    tech: 'Local landing pages',
    mean: 'You list towns in the footer, but have no pages for them.',
    why: "People search with a place name. Without it on your site, you won't show up for those searches.",
    srcName: 'Google: SEO starter guide',
  },
  {
    priority: 'Passing',
    headline: 'No pages are hidden',
    cat: 'Technical SEO',
    tech: 'Meta robots tags',
    mean: 'None of your pages tell search engines to look away.',
    why: 'A noindex tag is a "do not show" sign. It\'s usually left over from when the site was being built.',
    test: 'View the source of each key page and search for "noindex". It should not appear.',
    srcName: 'Google: block indexing with noindex',
  },
  {
    priority: 'Passing',
    headline: 'Search engines have a roadmap',
    cat: 'Technical SEO',
    tech: 'sitemap.xml',
    mean: 'Your sitemap lists every page, so nothing gets missed.',
    why: "Pages that can't be found don't rank. Services and prices pages are often the ones missed.",
    test: 'Open bloomfloristry.co.uk/sitemap.xml. Every page you want found should be listed. Then submit it in Google Search Console.',
    srcName: 'Google: sitemaps overview',
  },
  {
    priority: 'Passing',
    headline: 'Works well on phones',
    cat: 'Technical SEO',
    tech: 'Mobile-friendliness',
    mean: 'Text is readable and buttons are easy to tap on mobile.',
    why: 'Google ranks the mobile version of your site, and most local searches happen on phones.',
    test: 'Open bloomfloristry.co.uk on your phone. You should be able to read and tap everything without zooming.',
    srcName: 'Google: mobile-first indexing',
  },
  {
    priority: 'Passing',
    headline: 'Your site is secure',
    cat: 'Technical SEO',
    tech: 'HTTPS & security',
    mean: 'Every page loads over HTTPS.',
    why: 'Browsers warn visitors away from insecure sites, and search engines trust them less.',
    test: 'Load http://bloomfloristry.co.uk. It should redirect to https:// with a padlock and no mixed-content warnings.',
    srcName: 'Google: page experience',
  },
  {
    priority: 'Passing',
    headline: 'Strong, recent reviews',
    cat: 'Local SEO',
    tech: 'Google reviews',
    mean: '84 reviews averaging 4.8, with new ones every week.',
    why: 'Reviews are a strong local ranking signal, and AI tools lean on them when deciding who to recommend.',
    test: 'Check your Google Business Profile. Aim for a new review every week and a reply on every one.',
    srcName: 'Google: improve your local ranking',
  },
  {
    priority: 'Passing',
    headline: 'Each page has one clear address',
    cat: 'Technical SEO',
    tech: 'Canonical tags',
    mean: 'Every page declares a canonical URL.',
    why: 'When the same page lives at several addresses, search engines split its ranking between them.',
    test: 'View source on each page and check for one rel="canonical" tag pointing to the https version.',
    srcName: 'Google: consolidate duplicate URLs',
  },
  {
    priority: 'Passing',
    headline: 'Pages are well organised',
    cat: 'Content (E-E-A-T)',
    tech: 'Heading structure',
    mean: 'Each page has one clear main heading and sensible subheadings.',
    why: 'Headings are how search engines and AI work out what each part of a page is about.',
    test: 'Use a heading-checker browser extension. Each page should show one H1 and logical H2s.',
    srcName: 'Google: SEO starter guide',
  },
  {
    priority: 'Passing',
    headline: 'Products are well described',
    cat: 'E-commerce',
    tech: 'Product descriptions',
    mean: 'Product pages average 180 words with sizes, materials and delivery info.',
    why: "Thin product pages rarely rank, and AI tools can't recommend what they can't describe.",
    test: 'Pick five products at random. Each should answer the questions a customer asks before buying.',
    srcName: 'Google: creating helpful content',
  },
]);

export const proPrice = 39;

export const proFeatures = [
  'Scan up to 50 pages, as often as you like',
  'Compare your score with competitors',
  'Track 50 customer prompts every week',
  'Step-by-step fixes with copy-paste code',
  'Monthly rescans and change alerts',
  'Branded PDF report to share',
];

export const doneForYouFeatures = [
  'Every fix on your action plan, done for you',
  'AI-SEO set up and tracked monthly',
  'A new AI-powered website, if yours is holding you back',
  'One person from start to finish',
];
