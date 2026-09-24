export const contactEmail = 'hello@meetpete.com';

export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'How it works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
  { id: 'faqs', label: 'FAQ' },
];

export interface BeforeAfterItem {
  before: string;
  after: string;
}

export const beforeAfter: BeforeAfterItem[] = [
  { before: 'Answering the same enquiry again', after: 'Your assistant replies instantly' },
  { before: 'Chasing invoices on a Sunday', after: 'Reminders go out on their own' },
  { before: 'Writing posts at 10pm', after: "A week's posts before lunch" },
  { before: 'Missing calls while on a job', after: 'Bookings land in your calendar' },
];

export const painStatements: string[] = [
  'Everyone says we should be using AI',
  "I tried ChatGPT once. Didn't get it.",
  "I'm answering the same questions all day",
  "I don't have time to learn another thing",
  'Is it even safe to use?',
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

export type DemoKind =
  | 'audit'
  | 'chat'
  | 'flow'
  | 'content'
  | 'inbox'
  | 'code'
  | 'ai'
  | 'log';

export interface Service {
  id: string;
  title: string;
  tier: string;
  body: string;
  saves: string;
  demo: DemoKind;
}

export const services: Service[] = [
  {
    id: 'ai-health-check',
    title: 'AI Health Check',
    tier: 'Every flavour',
    body: 'Find out exactly which jobs AI can take off your hands, with a plain-English plan instead of a lecture.',
    saves: 'Usually finds 5–10 hours a week',
    demo: 'audit',
  },
  {
    id: 'your-ai-sidekick',
    title: 'Your AI Sidekick',
    tier: 'Every flavour',
    body: 'A friendly assistant on your website or WhatsApp that answers questions, quotes prices and takes bookings, trained on your business.',
    saves: 'Answers enquiries 24/7',
    demo: 'chat',
  },
  {
    id: 'admin-on-autopilot',
    title: 'Admin on Autopilot',
    tier: 'Raspberry and up',
    body: 'Invoices, follow-ups, reminders, data entry. The copy-paste jobs you hate, running quietly in the background.',
    saves: 'No more Sunday admin',
    demo: 'flow',
  },
  {
    id: 'content-on-tap',
    title: 'Content on Tap',
    tier: 'Raspberry and up',
    body: 'Social posts, emails and offers that sound like you, not a robot. Done in minutes instead of evenings.',
    saves: "A week's posts before lunch",
    demo: 'content',
  },
  {
    id: 'never-miss-inbox',
    title: 'Never-Miss Inbox',
    tier: 'Mint',
    body: 'Never miss an enquiry again. Instant replies, and a smart hand-off to you when a human is needed.',
    saves: 'Every message answered',
    demo: 'inbox',
  },
  {
    id: 'vibe-code-rescue',
    title: 'Vibe-Code Rescue',
    tier: 'Project',
    body: "Built an app with AI tools and it's held together with sticky tape? It gets cleaned up, secured, tested and taken to market properly.",
    saves: 'From messy prototype to launch-ready',
    demo: 'code',
  },
  {
    id: 'get-found-by-ai',
    title: 'Get Found by AI',
    tier: 'Raspberry and up',
    body: 'When people ask ChatGPT, Gemini or Perplexity for a business like yours, you should be the answer. Your site and listings get set up so AI tools find and recommend you.',
    saves: 'Show up where customers now search',
    demo: 'ai',
  },
  {
    id: 'always-on-support',
    title: 'Always-On Support',
    tier: 'Every flavour',
    body: "AI moves fast. Your tools stay tuned up, new ones get added when they're worth it, and help is a message away.",
    saves: 'Reply within one working day',
    demo: 'log',
  },
];

export interface AuditBar {
  label: string;
  hours: string;
  width: string;
}

export const auditBars: AuditBar[] = [
  { label: 'Email replies', hours: '3h', width: '100%' },
  { label: 'Quotes', hours: '2h', width: '66%' },
  { label: 'Invoices', hours: '1.5h', width: '50%' },
  { label: 'Social posts', hours: '1h', width: '33%' },
];

export interface ChatMessage {
  text: string;
  from: 'customer' | 'assistant';
}

export const chatDemo: ChatMessage[] = [
  { text: 'Hi, do you do boiler services on Saturdays?', from: 'customer' },
  { text: "We do! It's £85. I've got 9am or 11am this Saturday, which suits?", from: 'assistant' },
  { text: '11am please', from: 'customer' },
];

export interface FlowStep {
  key: string;
  text: string;
}

export const flowSteps: FlowStep[] = [
  { key: 'When', text: 'Invoice is 7 days overdue' },
  { key: 'Then', text: 'Friendly reminder emailed' },
  { key: 'If paid', text: 'Marked in your accounts' },
  { key: 'Done', text: 'Nothing needed from you' },
];

export const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => ({
  day,
  active: [0, 2, 4].includes(i),
}));

export interface InboxRow {
  who: string;
  text: string;
  status: string;
  highlight: boolean;
}

export const inboxRows: InboxRow[] = [
  { who: 'Claire M.', text: 'Do you have parking nearby?', status: 'Replied', highlight: false },
  { who: 'Ahmed K.', text: 'Can I move my Friday booking?', status: 'Rebooked', highlight: false },
  { who: 'Lucy P.', text: "My order hasn't arrived", status: 'Sent to you', highlight: true },
  { who: 'Ben T.', text: 'Are you open bank holiday?', status: 'Replied', highlight: false },
];

export interface CodeRow {
  text: string;
  status: string;
}

export const codeRows: CodeRow[] = [
  { text: 'API keys exposed in the browser', status: 'Fixed' },
  { text: 'No login or user accounts', status: 'Added' },
  { text: 'Breaks on mobile', status: 'Fixed' },
  { text: 'No payments', status: 'Stripe live' },
  { text: 'Hosted on a free trial', status: 'Launched' },
];

export const contentPost =
  "Autumn menu's here 🍂 Pumpkin soup, sourdough, and the return of the sticky toffee. Come say hi.";

export const aiQuestion = 'Who does good boiler servicing near Leeds?';

export const aiAnswer = {
  highlight: 'Smith & Sons Heating',
  rest: 'is a well-reviewed local option. They offer Saturday appointments and online booking.',
};

export const aiClosing = 'That could be your business.';

export interface LogRow {
  month: string;
  text: string;
  fresh: boolean;
}

export const logRows: LogRow[] = [
  { month: 'Sep', text: 'Added bookings to your chatbot', fresh: true },
  { month: 'Aug', text: 'Review replies switched on', fresh: false },
  { month: 'Jul', text: 'Invoice reminders tuned up', fresh: false },
  { month: 'Jun', text: 'Monthly check-in: 3 new ideas', fresh: false },
];

export interface ProcessStep {
  id: string;
  title: string;
  when: string;
  label: string;
  time: string;
  summaryA: string;
  summaryB: string;
  you: string;
  pete: string;
  row: number;
  col: number;
  span: number;
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    title: 'Discovery',
    when: 'Week one',
    label: 'DISCOVERY',
    time: 'WEEK 1',
    summaryA: 'A free chat, then time with you and your team to see how the work really gets done.',
    summaryB: "You'll finally see where the hours disappear, and which jobs never needed a human.",
    you: 'Share how your business runs and open the doors for a day or two.',
    pete: 'Listen, ask questions and map where your hours go.',
    row: 1,
    col: 1,
    span: 1,
  },
  {
    id: 'plan',
    title: 'Plan',
    when: 'Week two',
    label: 'PLAN',
    time: 'WEEK 2',
    summaryA: 'You get a clear, plain-English plan: the quick wins, the tools, the costs and the hours saved.',
    summaryB: "You decide what happens next. No five hours a week found? You don't pay.",
    you: 'Read the plan and decide what we do first.',
    pete: 'Write a clear plan with costs and time saved.',
    row: 2,
    col: 2,
    span: 1,
  },
  {
    id: 'implement',
    title: 'Implement',
    when: 'Weeks three to four',
    label: 'IMPLEMENT',
    time: 'WEEKS 3–4',
    summaryA: 'Assistants and automations go live inside the tools you already use.',
    summaryB: 'You see it working at every stage. You carry on running your business.',
    you: 'Carry on as normal and give feedback as it goes live.',
    pete: 'Build and connect everything inside your tools.',
    row: 3,
    col: 3,
    span: 2,
  },
  {
    id: 'upskill',
    title: 'Upskill',
    when: 'Week four, then ongoing',
    label: 'UPSKILL',
    time: 'WEEK 4 ONWARDS',
    summaryA: "You and your team get trained until it's all second nature.",
    summaryB: 'Everything stays yours, and it keeps getting sharper as AI moves on.',
    you: 'Learn the ropes and ask anything.',
    pete: 'Train your team and keep it all tuned up.',
    row: 4,
    col: 4,
    span: 2,
  },
];

export const processWeeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Ongoing'];

export interface Plan {
  id: string;
  name: string;
  hero?: boolean;
  monthly: number;
  desc: string;
  items: string[];
}

export const plans: Plan[] = [
  {
    id: 'vanilla',
    name: 'Vanilla',
    monthly: 150,
    desc: 'Your first AI win, set up properly and looked after.',
    items: [
      'AI Health Check included',
      '1 AI Sidekick for your website or WhatsApp',
      'Set up inside the tools you already use',
      'Google and AI search basics covered',
      '1-hour team training session',
      'Email support, 2-day reply',
    ],
  },
  {
    id: 'raspberry',
    name: 'Raspberry',
    hero: true,
    monthly: 300,
    desc: 'AI working across the jobs that eat your week.',
    items: [
      'AI Health Check plus a 90-day roadmap',
      'Up to 3 AI Sidekicks or automations',
      'Admin on Autopilot: invoices and follow-ups',
      'Content on Tap: weekly posts in your voice',
      'Get Found by AI: show up in ChatGPT and co.',
      'Monthly strategy call',
      'Next-day reply on anything',
    ],
  },
  {
    id: 'mint',
    name: 'Mint',
    monthly: 600,
    desc: 'Your whole business running smarter, with an AI expert on the team.',
    items: [
      'Unlimited automations across the business',
      'Never-Miss Inbox with hand-off to you',
      'Monthly content calendar and email campaigns',
      'Full Get Found by AI set-up and tracking',
      'Bookings, quotes and CRM connected up',
      'Quarterly staff training days',
      'Same-day Always-On Support',
    ],
  },
];

export interface MixItem {
  label: string;
  monthly: number;
}

export const mixItems: MixItem[] = [
  { label: 'AI Sidekick', monthly: 80 },
  { label: 'Admin on Autopilot', monthly: 90 },
  { label: 'Content on Tap', monthly: 120 },
  { label: 'Never-Miss Inbox', monthly: 100 },
  { label: 'Get Found by AI', monthly: 70 },
  { label: 'Always-On Support', monthly: 60 },
  { label: 'Vibe-Code Rescue', monthly: 0 },
];

export interface MixTeam {
  label: string;
  multiplier: number;
}

export const mixTeams: MixTeam[] = [
  { label: 'Just me', multiplier: 1 },
  { label: '2–10 people', multiplier: 1.25 },
  { label: '10+ people', multiplier: 1.6 },
];

export interface Testimonial {
  quote: string;
  name: string;
  business: string;
}

export const testimonials: Testimonial[] = [
  { quote: 'Pete got our enquiries answering themselves in a week. I actually take lunch breaks now.', name: 'Sarah', business: 'Salon owner' },
  { quote: 'No jargon, no nonsense. He just sorted it and showed us how it works.', name: 'Dave', business: 'Plumber' },
  { quote: "Our reviews get replies and our socials get posted, and I didn't have to learn a thing.", name: 'Priya', business: 'Café owner' },
  { quote: 'The chatbot books more appointments than my receptionist did on a Saturday.', name: 'Mark', business: 'Physio clinic' },
  { quote: 'I was sceptical. Now my quotes go out the same day instead of the same week.', name: 'Jo', business: 'Roofer' },
  { quote: "Best money I've spent on the business this year, and I'm tight.", name: 'Tom', business: 'Garage owner' },
  { quote: 'He explained everything like a mate would. Zero judgement for asking daft questions.', name: 'Leanne', business: 'Florist' },
  { quote: 'Invoices chase themselves now. I got my Sunday evenings back.', name: 'Raj', business: 'Electrician' },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "I'm rubbish with tech. Is this for me?",
    answer: "Especially you. If you can use WhatsApp, you can use this. The fiddly bits are handled for you, and you're shown the rest until it's second nature.",
  },
  {
    question: 'What kind of businesses do you work with?',
    answer: "Small businesses and founders: trades, salons, clinics, shops, cafés, agencies, and anyone with a half-finished app. If admin is eating your week, let's talk.",
  },
  {
    question: "What's in the AI Health Check?",
    answer: "A close look at where your hours (and your team's) actually go. You get a plain-English plan with the quick wins, the tools, what they cost and how much time they'll save.",
  },
  {
    question: "What's the guarantee?",
    answer: "If the Health Check doesn't find at least five hours a week to save you, you don't pay for it. Simple.",
  },
  {
    question: 'Is my customer data safe?',
    answer: 'Yes. Everything uses business-grade tools with proper data protection, lives in your own accounts, and is never used to train AI without your say-so.',
  },
  {
    question: 'Can I cancel my plan?',
    answer: "Any time, with 30 days' notice. Everything that's been built stays yours.",
  },
  {
    question: 'Can you fix an app I built with AI tools?',
    answer: "Yes, that's Vibe-Code Rescue. Security gaps, broken bits and missing features get fixed, then it's tested and launched properly. Quoted per project.",
  },
  {
    question: 'How do I show up in ChatGPT and other AI tools?',
    answer: "That's Get Found by AI. Your website, listings and reviews get set up so AI assistants understand what you do and recommend you when customers ask.",
  },
  {
    question: 'Will AI replace my staff?',
    answer: 'Nope. It takes the repetitive stuff off their plate so they can spend more time with customers.',
  },
];

export interface CallFact {
  key: string;
  value: string;
}

export const callFacts: CallFact[] = [
  { key: 'Length', value: '30 min' },
  { key: 'Where', value: 'Video or phone' },
  { key: 'Cost', value: 'Free' },
];

// Sample October 2026 calendar from the prototype. This is NOT live availability:
// the Confirm link opens an email enquiry instead of reserving a slot.
export const sampleMonthLabel = 'October 2026';

export const sampleAvailableDays = [
  5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30,
];

export const sampleSlots = ['09:30', '10:00', '11:30', '13:00', '14:30', '16:00'];
