# oscarfraile.dev · Personal portfolio

Personal portfolio built with React 19, TypeScript, Vite and Tailwind CSS 4.
English and Spanish content share reusable components and a small language context.

## Features and structure

- Hero, professional experience, technology stack, education and project sections.
- Language toggle with copy in `src/context/translations.ts`.
- Keyword emphasis through `HighlightText`.
- Pastel theme, sticker-style cards and wave dividers using semantic CSS tokens.
- Downloadable CVs in English and Spanish.

```text
src/
├── assets/          Profile image and logo
├── components/      Layout, sections and shared visual components
├── context/         LanguageContext and translations
└── index.css        Tailwind theme tokens and animations
scripts/             CV generation scripts
public/              Downloadable English/Spanish PDFs
```

## Run and check

From this directory, using a Node.js version compatible with Vite 7 (Node 22.12+):

```powershell
npm ci
npm run dev
```

```powershell
npm run lint
npm run build
npm run preview
```

`build` runs TypeScript checks before producing `dist/`. There is no `npm test` script.
The portfolio is independent of the other React exercises in the parent directory.

## Update downloadable CVs

The PDFs reuse experience and profile text from `src/context/translations.ts`.
After editing the copy, install Python's `reportlab` package in your chosen environment
and run:

```powershell
npm run cv
```

Set `PYTHON` if a specific interpreter is needed. The generator writes
`public/cv-oscar-fraile.pdf` and `public/cv-oscar-fraile-es.pdf`. Generate them before
the production build if you want the downloads to include the latest text.

[Back to React](../README.md)
