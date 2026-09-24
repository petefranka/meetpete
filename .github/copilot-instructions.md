# Meet Pete Copilot Instructions

## Product

Meet Pete helps small businesses use AI without jargon, fuss or a hard sell. The website should feel friendly, practical, playful and human. It should explain benefits in plain English and help visitors understand what is possible, choose suitable support and book a free conversation with Pete.

The source of truth for the current experience is:

- `ux-prototype/Meet Pete Desktop.html`
- `ux-prototype/Meet Pete Mobile.html`

Open and inspect both rendered prototypes before making design, layout, interaction or copy changes. Treat them as design references rather than production code.

## Brand

- Write in concise, conversational UK English.
- Sound warm, direct and reassuring, never corporate or overly technical.
- Explain outcomes before technology: hours saved, fewer repetitive jobs and more time for the work that matters.
- Keep the established personality and phrases such as "AI, made simple", "Book a free call", "No jargon", "Pick your flavour" and "Let's have a natter".
- Prefer short headings, clear benefits and specific calls to action.
- Do not introduce enterprise, warehouse, fulfilment, tenant or internal-platform terminology.
- Do not invent prices, guarantees, testimonials, availability or service claims.

## Visual direction

- Preserve the warm off-white, near-black, white and bright-pink palette shown in the prototypes.
- Use Archivo for bold display text and buttons, and Instrument Sans for body copy, with suitable fallbacks.
- Preserve bold compact headings, dark outlines, pill-shaped controls, pink highlights, offset shadows, playful AI doodles and generous whitespace.
- Use the desktop prototype for wide layouts and the inner mobile layout for narrow screens.
- The phone frame in the mobile prototype is a presentation device, not part of the production website.
- Favour visual fidelity while preserving semantic HTML, accessibility, responsive behaviour and maintainable code.

## Experience

Keep the prototype's page order and anchor structure:

1. Header and menu
2. Hero
3. Before-and-after examples
4. Selectable "Sound familiar?" statements
5. Services
6. Four-step process
7. Pricing plans
8. About Pete
9. Testimonials
10. FAQ
11. Free-call contact section
12. Footer

Preserve the intended interactions: accessible menu, selectable statements, service details, process steps, pricing paths, testimonial controls, FAQ disclosures and contact choices. Use semantic links for navigation and buttons for state changes. Every interactive control must support keyboard use, visible focus and an accessible name.

## Engineering

- Inspect the repository before changing code and follow the framework, scripts and conventions that actually exist.
- Do not assume a frontend framework, backend, component library, authentication system, hosting platform or booking provider unless the repository establishes one.
- Keep changes focused and consistent with existing patterns.
- Reuse shared components and tokens where they exist; do not copy generated prototype markup, classes, scripts, blob URLs or large inline style blocks into production.
- Keep repeated services, process steps, plans, testimonials and FAQs in a single canonical data source where the chosen architecture supports it.
- Treat prototype calendar dates and times as examples. A real booking flow must use approved live availability and must not claim success until a booking is confirmed.
- Replace placeholder social and legal links with approved destinations before publishing.
- Never commit credentials or expose private integration keys in client code.

## Validation

Use the repository's documented build, lint and test commands. Add meaningful tests for new behaviour using the existing test framework.

For visual or interaction work, compare the implementation with both prototypes in the browser at representative desktop and phone widths. Exercise the menu, selectable statements, all service choices, process steps, pricing actions, testimonials, FAQs, contact flow and anchor navigation. Do not claim validation for checks that were not run.
