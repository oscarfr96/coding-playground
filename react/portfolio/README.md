# oscarfraile.dev — Personal Portfolio

Personal portfolio built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool and dev server
- **Tailwind CSS v4** — utility-first styling with `@theme` custom tokens
- **lucide-react** — icons

## Features

- Bilingual (EN / ES) via a custom `LanguageContext` — no i18n library needed
- Apple-inspired minimal design with a brand color accent palette
- Keyword highlighting in bio and experience descriptions (`HighlightText` component)
- Sections: Hero · Experience · Tech Stack · Projects
- Project cards with live demo and source code links

## Project Structure

```
src/
├── assets/          # Images and logo
├── components/      # Layout, Hero, Experience, TechStack, Projects, HighlightText
├── context/         # LanguageContext + translations (en/es)
└── index.css        # Tailwind @theme tokens
public/
└── cv-oscar-fraile.pdf
```

## Getting Started

```bash
npm install
npm run dev
```

```bash
npm run build   # Type-check + production build
npm run lint    # ESLint
```
