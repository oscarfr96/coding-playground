# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with HMR
npm run build      # Type-check + production build (tsc -b && vite build)
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

## Architecture

Single-page portfolio app built with React 19, TypeScript, Vite, and Tailwind CSS v4.

**Entry point:** `src/main.tsx` wraps `<App>` in `<LanguageProvider>` (the only context provider).

**Internationalization:** All UI strings live in `src/context/translations.ts` as two exported objects (`en`, `es`). `LanguageContext.tsx` exposes a `useLanguage()` hook that returns `{ t, language, toggleLanguage }`. Every component gets translated strings via `const { t } = useLanguage()` — never hardcode UI text.

**Page structure** (`src/App.tsx`): sections rendered top-to-bottom inside `<Layout>`:
- `Hero` — intro with profile image and contact links
- `Experience` — professional timeline
- `TechStack` — categorized skill badges
- `Projects` — personal project cards

**Layout** (`src/components/Layout.tsx`): sticky header with logo, CV download, GitHub link, and language toggle; main content area; footer with copyright and email.

**Styling:** Tailwind CSS v4 with `@theme` configuration in `src/index.css`. Custom design tokens use an Apple-inspired palette (`apple-light`, `apple-dark`, `apple-gray`, `apple-border`) and a `blob` keyframe animation. Always use these tokens rather than raw colors.

**Static assets:** `src/assets/` holds `profile.png` and `logo-oscarfraile.png` imported directly into components. A CV PDF is expected at `public/cv-oscar-fraile.pdf` (referenced in translations).
