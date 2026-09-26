---
description: "Public-module export guidance for the Meet Pete Next.js frontend."
applyTo: "src/**/*.{ts,tsx,js,jsx}"
---

# Public module exports

Meet Pete uses TypeScript ES modules with Next.js App Router. Keep barrels compatible with Server and Client Component boundaries.

- Add an `index.ts` or `index.js` only when a component or feature directory is intended as a stable public import boundary. A single focused file needs no barrel.
- Export only the public surface, explicitly. In TypeScript, use `export type` for type-only exports. Keep implementation details, fixtures and tests private; avoid circular imports and barrel side effects.
- External consumers import via the public boundary if one exists; files within the feature can import local implementation files directly.
- The existing `components/home/index.ts`, `components/ai-seo/index.ts` and `components/layout/index.ts` files expose page-level composition surfaces. Keep cards, demos, hooks, test helpers and other implementation details private to their feature folders.
- Do not use a barrel to hide or bypass a Server/Client Component boundary. Importing a module below a `'use client'` boundary makes that dependency part of the client graph.
- Update the public exports when renaming or moving a module, then run the app's actual type-check/build and affected tests. Do not add barrels to every directory for consistency.
