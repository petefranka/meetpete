---
description: "Conditional public-module export guidance for a future Meet Pete JavaScript or TypeScript frontend."
applyTo: "src/**/*.{ts,tsx,js,jsx}"
---

# Public module exports

Use this guidance only if the Meet Pete application adopts a module-based JavaScript or TypeScript frontend. Follow the project's actual module format and import conventions; no app or framework has been chosen in this workspace.

- Add an `index.ts` or `index.js` only when a component or feature directory is intended as a stable public import boundary. A single focused file needs no barrel.
- Export only the public surface, explicitly. In TypeScript, use `export type` for type-only exports. Keep implementation details, fixtures and tests private; avoid circular imports and barrel side effects.
- External consumers import via the public boundary if one exists; files within the feature can import local implementation files directly.
- For example, a future `Services` module could expose `ServicesSection` while keeping service-tab and service-panel helpers internal. Names and paths here are illustrative, not existing files.
- Update the public exports when renaming or moving a module, then run the app's actual type-check/build and affected tests. Do not add barrels to every directory for consistency.
