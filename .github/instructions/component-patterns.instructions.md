---
description: "Meet Pete section and interaction component guidance for a future frontend implementation."
applyTo: "src/**/*.{ts,tsx,js,jsx}"
---

# Meet Pete component patterns

The app is React 19 + Vite + TypeScript rooted at `src/`, with Material UI as the component library and the brand tokens in `theme.ts`. The prototypes are visual/behavioural references, not a React, MUI or CSS architecture to transplant. See [frontend.instructions.md](frontend.instructions.md) for section order, copy, styling and the UI-library conventions.

- Compose the page from cohesive sections: header/menu, hero, before/after, selectable pain points, services, process, pricing, about, testimonials, FAQ, contact and footer. Keep data and interactions close to the owning section; extract shared controls only where doing so improves reuse or clarity.
- Represent repeated items (eight services, four process steps, three plans, FAQs and testimonial slides) as data with stable identifiers, and preserve prototype ordering and exact visible labels. Derive each selected detail, CTA and expanded state from the same identifier rather than maintaining parallel flags.
- Use the app's established styling approach and shared visual tokens from the MUI theme. Do not bring over generated `scp*` classes, serialized prototype HTML or arbitrary per-element inline styles, and do not add a second component library alongside Material UI.
- Prefer links for in-page navigation and email destinations, buttons for state changes, and real form controls for input. Icon-only actions need accessible names; accordion headers expose expanded state and associated panels; overlays support focus and Escape.
- Treat the mobile service accordion and desktop service list/detail panel as two presentations of the same service data, not two separate content sources. Keep the mobile phone bezel out of the production page.
- Keep CTA language human and specific: "Book a free call", "See what's possible", "Talk about this", "See prices", "Mix my own". Avoid unsupported claims of a confirmed booking, genuine availability, real testimonials or real prices where only demo content exists.
- Add focused interaction tests once the app has a test runner: selection and derived detail, menu/FAQ keyboard behaviour, contact outcome and responsive rendering. Use accessible names and visible results rather than implementation-specific selectors.
