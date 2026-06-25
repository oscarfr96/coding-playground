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

**Page structure** (`src/App.tsx`): sections rendered top-to-bottom inside `<Layout>`, each separated by a `<WavyDivider>` (color set per-section via the `text-*` class):
- `Hero` — intro with profile image and contact links
- `Experience` — professional timeline
- `TechStack` — categorized skill badges
- `Education` — academic background
- `Projects` — personal project cards

**Layout** (`src/components/Layout.tsx`): sticky header with logo, CV download, GitHub link, and language toggle; main content area; footer with copyright and email.

**Styling:** Tailwind CSS v4 with `@theme` configuration in `src/index.css`. Design language "Flower Boy"
(pastel, marfil pálido). Fuentes: Geist (cuerpo, `font-sans`), Fredoka (display/títulos, `font-display`,
aplicada a h1/h2/h3), JetBrains Mono (`font-mono`). Tokens semánticos: `canvas`, `surface`,
`surface-muted`, `border`, `border-strong`, `ink`/`ink-muted`/`ink-subtle`, y acentos pastel
`accent` (rosa), `info` (cielo), `success` (menta), `highlight` (girasol) con variantes
`-soft`/`-strong`/`-bright`/`-press`/`-contrast`. Usa SIEMPRE estos tokens, no colores crudos.
Patrón visual: tarjetas "pegatina" (`border-2` + `hover:shadow-[6px_6px_0_0_...]` + ligera rotación),
botones pill, separadores ondulados (`components/WavyDivider.tsx`) y `components/SectionHeading.tsx`
para títulos de sección. `components/HighlightText.tsx` subraya palabras clave (recibe `text` + `keywords`)
con una animación `underline-draw` definida en `index.css`. Se mantienen alias `apple-*`/`brand-*` por
compatibilidad, pero el código nuevo usa los tokens semánticos.

**Static assets:** `src/assets/` holds `profile.png` and `logo-oscarfraile.png` imported directly into components. A CV PDF is expected at `public/cv-oscar-fraile.pdf` (referenced in translations).
