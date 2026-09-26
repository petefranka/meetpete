import { z } from 'zod';

const invalidWebsiteAddressMessage = 'Enter a valid website address, such as yourbusiness.co.uk.';

export const websiteDomainSchema = z
  .string()
  .trim()
  .min(1, 'Enter your website address.')
  .transform((value) => (/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`))
  .pipe(
    z.url({
      protocol: z.regexes.httpProtocol,
      hostname: z.regexes.domain,
      error: invalidWebsiteAddressMessage,
    }),
  )
  .transform((value) => new URL(value))
  .refine((url) => {
    return !url.username && !url.password;
  }, invalidWebsiteAddressMessage)
  .transform((url) => url.hostname.toLowerCase());

export const navItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
});

export const beforeAfterItemSchema = z.object({
  before: z.string().min(1),
  after: z.string().min(1),
});

export const chatMessageSchema = z.object({
  text: z.string().min(1),
  from: z.enum(['customer', 'assistant']),
});

export const serviceSchema = z.object({
  id: z.string().min(1),
  num: z.string().min(1),
  tab: z.string().min(1),
  tier: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  demo: z.enum(['chat', 'ai']),
  features: z.array(z.string().min(1)).min(1),
  footer: z.string().min(1),
});

export const processStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  when: z.string().min(1),
  summary: z.string().min(1),
  you: z.string().min(1),
  us: z.string().min(1),
  col: z.number().int().positive(),
  span: z.number().int().positive(),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  business: z.string().min(1),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const exampleAreaSchema = z.object({
  label: z.string().min(1),
  score: z.number().min(0).max(100),
});

export const exampleReportSchema = z.object({
  domain: websiteDomainSchema,
  score: z.number().min(0).max(100),
  verdict: z.string().min(1),
  areas: z.array(exampleAreaSchema).min(1),
});

export const aiSeoAreaSchema = z.object({
  label: z.string().min(1),
  question: z.string().min(1),
  score: z.number().min(0).max(100).nullable(),
});

export const aiSeoResultSchema = z.object({
  domain: websiteDomainSchema,
  meta: z.string().min(1),
  score: z.number().min(0).max(100),
  verdict: z.string().min(1),
  issueSummary: z.string().min(1),
  areas: z.array(aiSeoAreaSchema).min(1),
  competitorNote: z.string().min(1),
  competitors: z.array(
    z.object({
      name: z.string().min(1),
      score: z.number().min(0).max(100),
      you: z.boolean(),
    }),
  ),
});

export const aiSeoStatusSchema = z.enum(['idle', 'scanning', 'results']);

export const aiAnswerRowSchema = z.object({
  prompt: z.string().min(1),
  ranks: z.array(z.number().int().positive().nullable()),
});

export const quickWinSchema = z.object({
  points: z.number().int().positive(),
  headline: z.string().min(1),
  fix: z.string().min(1),
});

export const prioritySchema = z.enum(['Critical', 'High', 'Medium', 'Low', 'Passing']);

export const actionItemSchema = z.object({
  priority: prioritySchema,
  headline: z.string().min(1),
  cat: z.string().min(1),
  tech: z.string().min(1),
  mean: z.string().min(1),
  why: z.string().min(1),
  fix: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  test: z.string().min(1).optional(),
  srcName: z.string().min(1),
});

export type NavItem = z.infer<typeof navItemSchema>;
export type BeforeAfterItem = z.infer<typeof beforeAfterItemSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type ExampleArea = z.infer<typeof exampleAreaSchema>;
export type AiSeoArea = z.infer<typeof aiSeoAreaSchema>;
export type AiSeoResult = z.infer<typeof aiSeoResultSchema>;
export type AiSeoStatus = z.infer<typeof aiSeoStatusSchema>;
export type AiAnswerRow = z.infer<typeof aiAnswerRowSchema>;
export type QuickWin = z.infer<typeof quickWinSchema>;
export type Priority = z.infer<typeof prioritySchema>;
export type ActionItem = z.infer<typeof actionItemSchema>;
