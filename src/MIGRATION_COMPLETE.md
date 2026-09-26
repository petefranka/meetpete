# Vite to Next.js migration

The Meet Pete frontend now runs on Next.js 16 with the App Router.

## Migration map

| Previous Vite surface | Next.js surface |
| --- | --- |
| `main.tsx` | `app/layout.tsx` and `app/providers.tsx` |
| `App.tsx` route table | App Router filesystem routes |
| `pages/HomePage/HomePage.tsx` | `app/page.tsx` |
| `pages/AiSeoPage/AiSeoPage.tsx` | `app/ai-seo/page.tsx` |
| React Router redirects | `next.config.ts` redirects |
| `RouteScrollManager` | Native Next links and URL fragments |
| `index.html` metadata and font links | `app/layout.tsx` |
| `vite.config.ts` | `next.config.ts` and `vitest.config.ts` |

## What changed

- Replaced Vite and React Router with Next.js App Router.
- Added the MUI App Router cache provider so Emotion styles are collected during server rendering.
- Kept `AiSeoProvider` in the root layout so its workflow state survives client navigation from `/` to `/ai-seo`.
- Replaced React Router links and navigation hooks with `next/link` and `next/navigation`.
- Preserved `/scan` and `/scan-my-site` as temporary redirects to `/ai-seo`.
- Added explicit Client Component boundaries only where state, effects, browser APIs or MUI polymorphic link components require them.
- Retained Vitest and moved its configuration to `vitest.config.ts`.
- Kept existing assets in `public/` and existing feature components, models, data and tests in place.

## Behaviour and compatibility

- Canonical routes remain `/` and `/ai-seo`.
- Homepage-to-analysis Provider hand-off still normalises the domain without adding it to the URL.
- Hash links such as `/#contact` continue to scroll to their target.
- Existing component tests and `data-testid` contracts are unchanged.
- Unknown routes redirect to `/`, matching the previous fallback behaviour.

## Validation

- `npm test`
- `npm run typecheck`
- `npm run build`
- `npm run dev`
- HTTP checks for `/`, `/ai-seo`, `/scan`, `/scan-my-site` and an unknown route
- Chrome checks at 1440px and 390px with no horizontal overflow or browser errors
- Provider hand-off, legacy redirect and cross-route contact hash navigation

## Commands

```bash
npm run dev
npm test
npm run typecheck
npm run build
npm start
```
