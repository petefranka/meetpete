---
description: "Meet Pete website design, responsive behaviour, interaction and copy guidance grounded in the desktop and mobile prototypes."
applyTo: "{src/**/*.{ts,tsx,js,jsx,css,scss,html},public/**/*.{html,css,js},ux-prototype/*.html}"
---

# Meet Pete frontend

The website is a React 19 + Next.js 16 App Router + TypeScript (strict) application rooted at `src/` — the `src/` folder is the Next.js project root and app code lives directly in it, not in a nested `src/src/`. Scripts: `npm run dev`, `npm run build`, `npm start`, `npm run typecheck`, `npm test` (one Vitest run) and `npm run test:watch`. Component tests use Vitest, jsdom and Testing Library. Prototype files follow `<page-name>.<viewport>.html`, using kebab-case page names and either `desktop` or `mobile` as the viewport. The four references in `ux-prototype/` — `home-page.desktop.html`, `home-page.mobile.html`, `ai-seo-page.desktop.html` and `ai-seo-page.mobile.html` — remain the design and copy source of truth: inspect the relevant desktop and mobile prototypes before implementing a screen, and treat them as references, not production source or proof that an integration works. Do not assume MSAL, i18next or a booking API exists.

## Application architecture

- App Router route modules live under `app/`: `app/page.tsx` owns `/`, `app/ai-seo/page.tsx` owns `/ai-seo`, and `app/not-found.tsx` redirects unknown routes home. Keep route modules as small composition and workflow boundaries.
- `/scan` and `/scan-my-site` are temporary redirects configured in `next.config.ts`; do not add new links to those paths.
- `app/layout.tsx` owns document metadata, global CSS and the root HTML structure. `app/providers.tsx` is the client boundary for `AppRouterCacheProvider`, the MUI theme and `AiSeoProvider`.
- Use `next/link` for internal navigation and `useRouter` from `next/navigation` only when navigation follows successful stateful work. Native hash links such as `href="/#contact"` handle cross-route section navigation; do not recreate a pathname router or global scroll manager.
- Page chrome is shared through the `withPageLayout` HOC in `components/layout/PageShell/`. This HOC is for genuinely cross-cutting page chrome; do not introduce HOCs for ordinary composition or local state. Pages should compose feature sections and avoid reimplementing the header, bordered shell or footer.
- `app/page.tsx` composes the homepage sections in order. `app/ai-seo/page.tsx` selects the idle/scanning/results presentation from `AiSeoProvider` state and configures the AI SEO header/footer treatment.
- Homepage sections live under `components/home/<ComponentName>/<ComponentName>.tsx`.
- AI SEO sections live under `components/ai-seo/<ComponentName>/<ComponentName>.tsx`. Keep implementation-only styles and helpers under `components/ai-seo/shared/`.
- Shared visual components live under `components/common/`; shared site chrome lives under `components/layout/`.
- The `components/home/index.ts` and `components/ai-seo/index.ts` barrels expose page-level sections only. Add another barrel only when it represents a deliberate public import boundary. Keep private implementation components imported directly within their feature folder; do not export every file automatically.
- Domain models and Zod schemas live under `models/`. Infer TypeScript types from their schemas rather than maintaining duplicate interfaces.
- Validate every website-address entry point with the shared `websiteDomainSchema`. Accept bare public domains and `http(s)` URLs, normalise them to a lowercase hostname, and show the schema error next to the originating field without navigating or starting a scan.
- Canonical static copy and fixtures live under `data/` and must be parsed through the applicable Zod schema at the data boundary.
- `AiSeoProvider` owns the entered website domain and the idle/scanning/results workflow. Components consume it through `useAiSeo`; do not pass the domain through route query parameters or recreate parallel workflow state in page components.
- Keep route components, Providers and data models free of presentation styling. Keep feature-specific UI state, such as an accordion selection or mobile result tab, close to the component that owns it. A self-contained child disclosure should own its own open state rather than enlarging the parent coordinator.
- Add `'use client'` only at modules that establish an interactive or browser-only boundary. Components imported beneath an existing client boundary do not need redundant directives. Server route modules may compose Client Components, but do not pass component functions or other non-serializable props across that boundary.

## Component ownership and decomposition

- Each feature folder has one public section coordinator named after the folder. The coordinator owns section-level state and composes cohesive private components; it should not also contain every card, visual demo, table and responsive presentation.
- Decompose by responsibility rather than line count alone. Extract a unit when it has its own state, repeated rendering logic, accessible interaction contract or independently understandable visual responsibility. Do not create wrappers that merely rename a single MUI primitive.
- Keep state at the narrowest shared owner. The current boundaries are deliberate:
  - `Services/Services.tsx` owns the selected service; `ServiceCard`, `ServiceDemos`, `AiSeoStrip` and `useRevealStep` own their respective rendering, demo, workflow-entry and animation concerns.
  - `Process/Process.tsx` owns the active step; `ProcessTimeline` and `ProcessDetails` render the desktop timeline and selected-step controls.
  - `Contact/Contact.tsx` owns the sample calendar selection; `EmailAlternative` owns its disclosure and email-form fields.
  - `AiSeoResults/AiSeoResults.tsx` composes the report; `ResultsNavigation`, `CompetitorsCard` and `StickyResultsBar` own result navigation, comparison and fixed-summary behaviour.
  - `ActionPlan/ActionPlan.tsx` owns the active action; `ActionItemCard` and `QuickWinsSection` own individual disclosures and quick-win presentations.
  - `Upsell/Upsell.tsx` owns the selected mobile plan; `PlanComparison` owns the Do it yourself/Done for you comparison disclosure and its narrow-screen tabs.
- Prefer canonical data arrays and `.map()` for repeated services, steps, plans, testimonials, FAQs, report areas and action items. Pass typed domain objects into private components instead of duplicating copy or maintaining parallel flags.
- Review components that grow difficult to scan, but preserve cohesive layout code when extraction would only scatter related responsive styling. The goal is small, explicit ownership boundaries, not the maximum possible file count.
- Pair every public parent component with a focused `ComponentName.test.tsx` under that component folder's `__tests__/` directory. When a new parent coordinator is added, its test is part of the same change; when one is renamed or moved, move its test with it.
- Give each public parent root one stable, descriptive `data-testid` for smoke-level identity and scoping. Prefer role, accessible name, label, text and state queries for behaviour inside the component; do not add test IDs to every child or use them instead of accessible markup.

## UI library

- Material UI (`@mui/material`) is the default UI library. Build sections from MUI primitives (`Box`, `Stack`, `Typography`, `Button`, `Collapse`) composed with `sx`, and reach for additional MUI components only when they earn their place.
- Keep `AppRouterCacheProvider` at the root so Emotion styles are collected correctly during App Router server rendering. Shared `styled()` primitives and components that pass `next/link` through MUI's `component` prop must remain behind a client boundary.
- Centralise the Meet Pete look in a single MUI theme (`theme.ts`): palette `#F4F3F0`, `#1A1918`, `#FF8AC4` and white; Archivo for display text and buttons, Instrument Sans for body copy; 2px dark borders, pill radii and offset shadows.
- Override MUI defaults aggressively so the result matches the prototypes — the stock Material look (Roboto, indigo, flat dense controls) is off-brand. Keep global CSS (`index.css`) for resets, keyframes, scroll reveal and decorative effects that are not component structure.

## Visual language

- Warm off-white canvas (`#F4F3F0`), near-black ink (`#1A1918`), white surfaces, and bright pink accents (`#FF8AC4`). Supporting neutrals are warm greys; use actual prototype values or shared tokens instead of substituting corporate blue/green status colours.
- Archivo is the heavy display and button face; Instrument Sans is the body face, with sensible fallbacks. Large, bold, compact headlines and short conversational lines lead; body copy remains readable and less dense.
- Use dark outlines, rounded pill controls, restrained borders, and playful pink highlight shapes with offset dark shadows. Keep graphic doodles/AI motifs decorative and out of the accessibility tree. Avoid square, dense operational styling.
- Preserve strong primary (dark with pink accent/shadow) versus secondary (light outlined) CTA treatments, generous whitespace and clear section boundaries. Contrast, focus visibility and reduced motion matter more than decorative precision.
- Compare the desktop and mobile pages as distinct layout references. The mobile HTML displays a phone-frame presentation in a larger canvas; the phone bezel is a preview device, **not** website chrome to render on a real phone. Use its inner layout and interaction choices at a narrow viewport, and the desktop composition at wide viewports; do not scale the desktop page down.

## Page structure and copy

Use the prototype's section order and anchor destinations:

1. Header with Meet Pete mark, Menu and "Book a free call"; menu links to Services (`#services`), How it works (`#process`), Pricing (`#pricing`) and FAQ (`#faqs`).
2. Hero (`#top`): "AI, made simple", "Get your business ready for the AI era.", the AI-powered websites and AI-SEO benefit statement, primary "Book a free call" (`#contact`) and secondary "See what's possible" (`#services`). Keep the three reassurance points: "Free 30-min call", "No jargon", "Cancel any time".
3. "Your website, glow-up edition." before/after examples, then "Everyone's banging on about AI. Sound familiar?" with selectable statements and a response/CTA.
4. Services (`#services`): "Two ways to get found." AI websites and AI-SEO use a two-card desktop presentation and a shared-data tabbed presentation on narrower screens. The AI SEO strip starts the Provider-owned analysis workflow and navigates to `/ai-seo`.
5. Process (`#process`): "From \"where do I start?\" to sorted in four weeks." Discovery, Plan, Implement and Upskill, with the relevant week and You/Pete responsibilities.
6. Pricing (`#pricing`): "Make your own flavour." Visitors select needs and team size, then provide contact details for a tailored quote enquiry. Do not invent prices, inclusions, discounts or checkout behaviour.
7. Testimonials, FAQ (`#faqs`), contact (`#contact`) and footer. The contact offer is a free, no-obligation 30-minute video or phone call, with a separate email alternative. Footer repeats the conversational CTA and navigation.

The `/ai-seo` page has three Provider-driven states: idle shows `AiSeoHero` and `SevenAreas`, scanning keeps the hero/progress experience visible, and results replaces the introduction with `AiSeoResults`. `Upsell` remains below every state. Results compose overview/navigation, AI-answer checks, the action plan, email report, comparison/upgrade paths and the sticky summary without moving the workflow state out of `AiSeoProvider`.

Match the source copy for the particular view being implemented, including service descriptions, plan inclusions and FAQ answers; do not replace it with enterprise booking vocabulary. Preserve the friendly, plain-English UK voice ("flavour", "natter", "no jargon"), direct benefits and short CTAs. Desktop and mobile occasionally use different secondary CTA labels or condensed copy; choose the corresponding version deliberately instead of mixing variants. Treat testimonial names/claims, calendar slots, prices, social and legal links as prototype content until independently approved; do not present them as verified facts or live destinations.

## Interaction and responsive behaviour

- Menu is an accessible open/close overlay with working in-page links, visible focus and appropriate Escape/focus behaviour. The mobile header uses icon-only Menu beside the CTA; provide an accessible name.
- The "Sound familiar?" statements are independently selectable; the feedback reflects the selected count. Services show both cards on wide screens and use an accessible two-option tablist on narrower screens.
- Process steps update the corresponding week, description and responsibilities; carousel controls update testimonials; FAQs expand answers. Use a single state source per interactive group, semantic buttons, accessible expanded/selected state, and keyboard operation.
- Progressive card demos run once and finish in their completed state. Reserve the final content dimensions before revealing each step so animation never changes card or section height.
- The pricing mixer keeps selected needs, team size and enquiry fields in one state source. Its submit action may prepare a transparent email enquiry, but must not imply a calculated price, checkout or confirmed order.
- Contact includes an appointment-style date/time picker in the prototype and an email alternative. The prototype's "Confirm" link is a `mailto:` link and the displayed October 2026 calendar is sample UI, not evidence of real availability or a completed booking. For production, wire actual availability/confirmation to an approved service or clearly label a non-booking email enquiry; never claim a slot is reserved when it is not.
- Keep semantic landmarks/headings, form labels, visible status feedback, sufficiently large tap targets, keyboard focus, contrast and `prefers-reduced-motion`. Do not copy exported HTML, inline scripts, generated class names, remote blobs or demo-only embeds into the application wholesale.

## Validation

From `src/`, run `npm test`, `npm run typecheck` and `npm run build` before considering a code change done. Keep unit tests focused on observable parent-component behaviour: initial rendering, selection state, disclosures, Provider-driven workflow transitions and honest contact outcomes. Use the shared jsdom setup and application render helper rather than recreating browser/MUI/Provider mocks in each test.

Compare the implemented page against its corresponding desktop and mobile HTML references in the browser at representative wide and phone widths. Check menu, selectable statements, both service paths, Provider hand-off to `/ai-seo`, process steps, pricing mixer, carousel, FAQ, contact and anchor navigation. On the AI SEO page, exercise idle, scanning and results states, responsive result tabs, action disclosures, plan switching and the comparison disclosure. Validate that contact outcomes match the real integration. Unit tests complement this browser validation; they do not replace prototype comparison or responsive interaction checks.
