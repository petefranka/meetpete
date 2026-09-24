---
description: "Meet Pete contact, booking and external-link integration boundaries."
applyTo: "{src/**/*,public/**/*}"
---

# External integrations and content

The current workspace has static desktop and mobile HTML references, not a deployed application, authentication system, booking backend or configured integrations. Do not carry over unrelated tenancy, identity, hosting or cloud dependencies.

- The primary "Book a free call" links lead to `#contact`. The prototype shows a date/time selector and a `mailto:hello@meetpete.com` "Confirm" link; it does **not** reserve an appointment. Do not display a successful booking or send a calendar invitation without a working, approved booking integration.
- When adding live scheduling, obtain dates, time zones and availability from the provider; handle expired slots, failure, loading and confirmation explicitly. Never hardcode the prototype's October 2026 calendar or pretend its sample times are live.
- "Send an email instead" and contact email links may use the prototype's address if approved for the site. Provide a usable fallback and do not claim an email was sent just because a `mailto:` link was opened.
- The prototype's LinkedIn, Instagram, Privacy policy, Terms and Cookies links currently point to `#`. Replace placeholders with approved destinations before publishing, or omit/disable them with an honest explanation; never leave misleading live-looking links.
- Treat sample testimonials, guarantees, pricing and offer claims as content requiring owner verification. Keep canonical copy and plan/service data consistent across desktop/mobile presentations; preserve any intentional responsive wording differences.
- Load fonts and assets in accordance with the selected app's hosting and privacy requirements. Do not rely on `blob:file:` URLs, scraped prototype assets or credentials embedded in client code.
- Keep third-party keys and private booking credentials server-side. Validate user input, obtain consent for any analytics or tracking, limit data sent to external providers, and show explicit errors instead of success-shaped fallbacks.
- Once an integration is introduced, add boundary tests for availability, reservation success/failure, email alternatives and external-link destinations using the actual project's test conventions. Use the app's documented build/test commands.
