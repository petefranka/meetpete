---
description: "Meet Pete section and interaction component guidance for the Next.js frontend."
applyTo: "src/**/*.{ts,tsx,js,jsx}"
---

# Meet Pete component patterns

The app is React 19 + Next.js 16 App Router + TypeScript rooted at `src/`, with Material UI as the component library and the brand tokens in `theme.ts`. The prototypes are visual/behavioural references, not a React, MUI or CSS architecture to transplant. See [frontend.instructions.md](frontend.instructions.md) for routing, client boundaries, section order, copy, styling and UI-library conventions.

- Keep App Router files focused on page composition. Compose the homepage from header/menu, hero, before/after, selectable pain points, services, process, pricing, testimonials, FAQ, contact and footer; compose AI SEO from its Provider-driven idle, scanning and results sections.
- Represent repeated items (services, four process steps, FAQs, testimonial slides, report areas and action items) as data with stable identifiers, and preserve prototype ordering and exact visible labels. Derive each selected detail, CTA and expanded state from the same identifier rather than maintaining parallel flags.
- Use the app's established styling approach and shared visual tokens from the MUI theme. Do not bring over generated `scp*` classes, serialized prototype HTML or arbitrary per-element inline styles, and do not add a second component library alongside Material UI.
- Prefer links for in-page navigation and email destinations, buttons for state changes, and real form controls for input. Icon-only actions need accessible names; accordion headers expose expanded state and associated panels; overlays support focus and Escape.
- Treat narrow and wide presentations as views of the same canonical data. Keep the mobile phone bezel out of the production page.
- Keep CTA language human and specific: "Book a free call", "See what's possible", "Talk about this", "See prices", "Mix my own". Avoid unsupported claims of a confirmed booking, genuine availability, real testimonials or real prices where only demo content exists.
- Pair each public parent component with a focused Vitest test under its local `__tests__/` directory. Cover selection and derived detail, menu/FAQ keyboard behaviour, Provider transitions, contact outcomes and responsive state; prefer accessible names and visible results over implementation-specific selectors.
