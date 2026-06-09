# Getting Started

This project is a Next.js App Router news website with bilingual support (Spanish/English), a custom theme system, and local static article data.

## Prerequisites

- Node.js compatible with Next.js `16.2.6`
- npm, using the committed `package-lock.json`

## Installation

Install dependencies from the project root:

```bash
npm install
```

## Environment Variables

No environment variables are currently required by the application.

## Available Commands

```bash
npm run dev
```

Starts the Next.js development server. Runs the i18n build pipeline before starting.

```bash
npm run build
```

Creates a production build. Runs the i18n build pipeline before building.

```bash
npm run start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs ESLint using the Next.js configuration.

```bash
npm run type-check
```

Runs TypeScript type checking without emitting files.

```bash
npm run build:locales
```

Runs the i18n build pipeline manually. This merges static translation JSON files with dynamic article data into `messages/{locale}.json`.

## Main Dependencies

- `next`: App Router framework, pinned to `16.2.6`
- `react` and `react-dom`: UI runtime, pinned to `19.2.4`
- `next-intl`: locale-aware routing, translations, and navigation wrappers
- `tailwindcss` and `tailwindcss-animate`: styling and animations
- `typescript`: static typing
- `eslint` and `eslint-config-next`: linting

## Development Notes

- Application source lives under `src/`.
- Static assets live under `public/`.
- Article data is local and imported from `src/data/`.
- Static translations live under `src/i18n/locales/{locale}/`.
- Compiled i18n messages are output to `messages/{locale}.json`.
- All routes are locale-scoped under `app/[locale]/`.
- The theme system supports `light`, `dark`, and `system` preferences.
