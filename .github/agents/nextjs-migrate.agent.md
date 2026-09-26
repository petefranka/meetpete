---
name: NextJS Migrate
description: "Convert Vite project to Next.js: pages, components, styling, assets"
target: vscode
argument-hint: "Vite project path and new Next.js project name"
tools: [vscode, execute, bash, edit]
user-invocable: true
---

# NextJS Migrate

Convert a Vite project to Next.js.

## Inputs

**Required**:
- **Vite project path** (e.g., `./my-vite-app`)
- **New project name** (e.g., `my-app`)

## Workflow

### 1. Analyze
- Inspect Vite project structure
- Detect:
  - Page routes (`src/pages` or `src/routes`)
  - Components directory
  - Styling system (Tailwind, CSS modules, styled-components)
  - Assets (images, fonts, icons)
  - Package dependencies
- Create migration map: `Vite path → Next.js path`

### 2. Create Next.js Project
- `npx create-next-app@latest --typescript --app-router`
- Initialize git

### 3. Migrate Structure
- **Pages/Routes**:
  - `src/pages/index.tsx` → `src/app/page.tsx`
  - `src/pages/about.tsx` → `src/app/about/page.tsx`
  - `src/pages/[id].tsx` → `src/app/[id]/page.tsx` (dynamic routes)
  - Nested routes: folder structure preserved
- **Components**: Copy `src/components/*` → `src/components/*`
- **Styling**: 
  - Tailwind → Tailwind (configure `tailwind.config.js`)
  - CSS modules → CSS modules (same)
  - Global CSS → `src/app/globals.css`
- **Assets**: Copy `public/*` → `public/*`
- **Config**: Copy `tsconfig.json`, `next.config.js` adjustments

### 4. Update Imports & Code
- Update routing imports:
  - `import { useRouter } from 'react-router-dom'` → `import { useRouter } from 'next/navigation'`
  - `import Link from 'react-router-dom'` → `import Link from 'next/link'`
- Update metadata (if using Head):
  - Vite `<Head>` → Next.js `<Metadata>` in layout.tsx
- Update asset imports (if changed)
- Fix relative imports based on new structure

### 5. Migrate Dependencies
- Copy relevant dependencies from Vite `package.json`
- Run `npm install`
- Remove Vite-specific packages (vite, @vitejs/plugin-react, etc.)

### 6. Validate
- [ ] `npm run dev` starts
- [ ] Routes accessible
- [ ] Components render
- [ ] Styling applied
- [ ] Assets load
- [ ] No console errors
- [ ] `npm run build` succeeds

### 7. Output
- New Next.js project at `{new-project-name}/`
- `MIGRATION_COMPLETE.md`:
  - What was migrated
  - What changed (routing, imports, etc.)
  - Breaking changes (if any)
  - Next steps
- Git commit: `"Migrate Vite → Next.js"`

## Acceptance

- [ ] Project structure created
- [ ] All pages converted to Next.js routing
- [ ] Components functional
- [ ] Styling intact
- [ ] Assets present
- [ ] Dev server runs
- [ ] Build succeeds
- [ ] No console errors

## Usage

```
"Migrate my Vite app: ./my-vite-app → my-next-app"
```

Output: Standalone Next.js project, ready for further work (add SaaS backend, UI design, etc).
