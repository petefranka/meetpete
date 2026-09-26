---
description: "Prototype-based browser journey coverage for a future Meet Pete website."
applyTo: "{**/playwright/**/*.{ts,tsx,js,jsx},**/*.spec.{ts,tsx,js,jsx}}"
---

# Meet Pete browser tests

No Playwright configuration, package manifest or application exists yet. Only use these instructions if browser tests are added; follow the project's actual runner and scripts rather than assuming fixtures, authentication stubs, APIs, containers or CI setup.

- Exercise each real page at desktop and narrow phone viewports. Compare `/` with [home-page.desktop.html](../../ux-prototype/home-page.desktop.html) and [home-page.mobile.html](../../ux-prototype/home-page.mobile.html), and compare `/ai-seo` with [ai-seo-page.desktop.html](../../ux-prototype/ai-seo-page.desktop.html) and [ai-seo-page.mobile.html](../../ux-prototype/ai-seo-page.mobile.html). Prototype files follow `<page-name>.<viewport>.html`. The mobile phone frame belongs to the reference presentation, not the finished site's viewport.
- Verify section order, headings, primary/secondary CTAs and anchor targets. Open the menu, navigate to each named section, close via its control and Escape, and verify keyboard focus remains usable.
- Select/deselect the "Sound familiar?" statements and check feedback; select each service and its detail on desktop, expand the corresponding mobile accordion item, and check the four process steps' matching content.
- Check plan names and "Most popular" emphasis, pricing/mix interactions if implemented, FAQ disclosure, testimonial controls and contact alternatives. Never assert that opening `mailto:` reserved a slot; a real booking journey must assert the provider's confirmed outcome or honest failure state.
- Test at least one narrow layout without horizontal overflow, proper tap targets and accessible names on icon-only buttons. Prefer role/name and visible-state assertions to brittle generated classes or screenshot-only tests.
- Stub only external boundaries that are not the behaviour under test. Keep calendar dates deterministic in tests, but do not treat the prototype's sample availability as production data.
- Run the smallest relevant tests and the app's build/lint checks once tooling exists. Until then, validate instruction and prototype references statically; do not invent `npm` commands or claim browser tests have passed.
