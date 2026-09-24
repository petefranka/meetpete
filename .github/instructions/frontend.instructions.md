---
description: "Meet Pete website design, responsive behaviour, interaction and copy guidance grounded in the desktop and mobile prototypes."
applyTo: "{src/**/*.{ts,tsx,js,jsx,css,scss,html},public/**/*.{html,css,js},ux-prototype/*.html}"
---

# Meet Pete frontend

The website is a React 19 + Vite + TypeScript (strict) single-page app rooted at `src/` — the `src/` folder is the Vite project root and app code lives directly in it, not in a nested `src/src/`. Scripts: `npm run dev`, `npm run build` (runs `tsc --noEmit` then bundles), `npm run preview` and `npm run typecheck`. No test runner is configured yet. The two reference pages, [Meet Pete Desktop.html](../../ux-prototype/Meet%20Pete%20Desktop.html) and [Meet Pete Mobile.html](../../ux-prototype/Meet%20Pete%20Mobile.html), remain the design and copy source of truth: inspect both rendered pages before implementing a screen, and treat them as references, not production source or proof that an integration works. Do not assume MSAL, i18next, a booking API or a different directory structure exists.

## UI library

- Material UI (`@mui/material`) is the default UI library. Build sections from MUI primitives (`Box`, `Stack`, `Typography`, `Button`, `Collapse`) composed with `sx`, and reach for additional MUI components only when they earn their place.
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

1. Header with Meet Pete mark, Menu and "Book a free call"; menu links to Services (`#services`), How it works (`#process`), Pricing (`#pricing`), About (`#about`) and FAQ (`#faqs`).
2. Hero (`#top`): "AI, made simple", "Get your business ready for the AI era.", "Save time, cut cost, so you can focus on what matters most.", primary "Book a free call" (`#contact`) and secondary "See what's possible" (`#services`). Keep the three reassurance points: "Free 30-min call", "No jargon", "Cancel any time".
3. "Your week, glow-up edition." before/after scenarios (enquiries, invoices, posts and missed calls), then "Everyone's banging on about AI. Sound familiar?" with selectable statements and a response/CTA.
4. Services (`#services`): "Eight ways to get your evenings back." The eight options, in order: AI Health Check, Your AI Sidekick, Admin on Autopilot, Content on Tap, Never-Miss Inbox, Vibe-Code Rescue, Get Found by AI and Always-On Support. Selecting a service changes its explanation/example.
5. Process (`#process`): "From \"where do I start?\" to sorted in four weeks." Discovery, Plan, Implement and Upskill, with the relevant week and You/Pete responsibilities.
6. Pricing (`#pricing`): "Pick your flavour." Vanilla, Raspberry ("Most popular") and Mint; "Mix my own" is a separate path. Every plan starts with an AI Health Check. Do not invent prices, inclusions, discounts or checkout behaviour.
7. About (`#about`): "Hi, I'm Pete. Nice to meet you.", followed by testimonial carousel, FAQ (`#faqs`), contact (`#contact`) and footer. The contact offer is a free, no-obligation 30-minute video or phone call. Footer repeats the conversational CTA and navigation.

Match the source copy for the particular view being implemented, including service descriptions, plan inclusions and FAQ answers; do not replace it with enterprise booking vocabulary. Preserve the friendly, plain-English UK voice ("flavour", "natter", "no jargon"), direct benefits and short CTAs. Desktop and mobile occasionally use different secondary CTA labels or condensed copy; choose the corresponding version deliberately instead of mixing variants. Treat testimonial names/claims, calendar slots, prices, social and legal links as prototype content until independently approved; do not present them as verified facts or live destinations.

## Interaction and responsive behaviour

- Menu is an accessible open/close overlay with working in-page links, visible focus and appropriate Escape/focus behaviour. The mobile header uses icon-only Menu beside the CTA; provide an accessible name.
- The "Sound familiar?" statements are independently selectable; the feedback reflects the selected count. Services use a selected list/detail panel on desktop and an expanded accordion-style item on mobile.
- Process steps update the corresponding week, description and responsibilities; carousel controls update testimonials; FAQs expand answers. Use a single state source per interactive group, semantic buttons, accessible expanded/selected state, and keyboard operation.
- Pricing cards and plan CTAs remain legible when stacked. "See prices" and "Mix my own" must show their actual prototype flow if implemented; do not turn these into dead controls or silently fabricate transactions.
- Contact includes an appointment-style date/time picker in the prototype and an email alternative. The prototype's "Confirm" link is a `mailto:` link and the displayed October 2026 calendar is sample UI, not evidence of real availability or a completed booking. For production, wire actual availability/confirmation to an approved service or clearly label a non-booking email enquiry; never claim a slot is reserved when it is not.
- Keep semantic landmarks/headings, form labels, visible status feedback, sufficiently large tap targets, keyboard focus, contrast and `prefers-reduced-motion`. Do not copy exported HTML, inline scripts, generated class names, remote blobs or demo-only embeds into the application wholesale.

## Validation

From `src/`, run `npm run typecheck` and `npm run build` before considering a change done. Compare the implemented page against **both** HTML references in the browser at representative desktop and phone widths. Check menu, selectable statements, every service, process steps, pricing/mix flow, carousel, FAQ, contact and anchor navigation; validate that contact outcomes match the real integration. No test runner is configured yet; when one is added, add focused tests for changed behaviour and responsive critical paths using that framework.
