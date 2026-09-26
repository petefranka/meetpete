interface MailtoOptions {
  to: string;
  subject: string;
  body: string;
}

export function createMailtoHref({ to, subject, body }: MailtoOptions) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
