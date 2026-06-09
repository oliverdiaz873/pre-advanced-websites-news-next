# Architecture

## Overview

This project is a Next.js `16.2.6` App Router news website for a bilingual digital news platform. It uses React `19.2.4`, TypeScript, `next-intl`, Tailwind CSS, component-level CSS files, and local TypeScript article data.

The application does not currently use a backend API, database, route handlers, or remote content service. All article, category, and opinion data are imported from local modules under `src/data/`.

## Route Model

Routes are defined under `app/[locale]/`. The `[locale]` segment is handled by `next-intl`, which provides locale-aware routing, message loading, and navigation wrappers.

| Route area | Route file |
| --- | --- |
| Locale layout | `app/[locale]/layout.tsx` |
| Home | `app/[locale]/page.tsx` |
| Category (generic) | `app/[locale]/category/[slug]/page.tsx` |
| Category: Clima | `app/[locale]/clima/page.tsx` |
| Category: Deporte | `app/[locale]/deporte/page.tsx` |
| Category: Economia | `app/[locale]/economia/page.tsx` |
| Category: Internacional | `app/[locale]/internacional/page.tsx` |
| Category: Justicia | `app/[locale]/justicia/page.tsx` |
| Category: Politica | `app/[locale]/politica/page.tsx` |
| Category: Salud | `app/[locale]/salud/page.tsx` |
| News article | `app/[locale]/news/[category]/[slug]/page.tsx` |
| Opinion article | `app/[locale]/opiniones/[slug]/page.tsx` |
| Search | `app/[locale]/search/page.tsx` |
| Legal: Privacy | `app/[locale]/legal/privacy/page.tsx` |
| Legal: Terms | `app/[locale]/legal/terms/page.tsx` |

Route-level loading files exist for the home page and individual news articles.

## Internationalization

Internationalization is implemented with `next-intl`.

- Supported locales: `es`, `en`.
- Default locale: `es`.
- Routing configuration: `src/i18n/routing.ts`.
- Request configuration: `src/i18n/request.ts`.
- Middleware: `proxy.ts`.
- Compiled messages: `messages/es.json` and `messages/en.json`.

The i18n pipeline works in two layers:

1. **Static translations** live in `src/i18n/locales/{locale}/*.json` (navbar, footer, home, news, search, legal, metadata, common).
2. **Dynamic content** (articles, categories, opinions) lives in `src/data/` and is extracted by `scripts/build-locales.ts`.
3. **Compilation** (`npm run build:locales`) merges both into `messages/{locale}.json`, which is consumed by `next-intl` at runtime.

The locale layout validates the locale, calls `setRequestLocale()`, loads messages with `getMessages()`, and wraps the application with `NextIntlClientProvider`.

## Layout Composition

The root locale layout (`app/[locale]/layout.tsx`) wraps all pages with:

- `ThemeProvider` from `src/theme/`.
- Global `Header` with navigation, search, language selector, and theme toggle.
- Global `Footer` with links and social icons.
- `ScrollToTop` for user experience.

This makes theme state, navigation, search, and footer links available across all routes.

## Theme System

The custom theme system lives in `src/theme/` and supports `light`, `dark`, and `system` preferences.

- `ThemeProvider`: React context provider that manages theme state.
- `useTheme`: Hook to read and set the current theme.
- `system.ts`: Detects `prefers-color-scheme` media queries.
- `storage.ts`: Persists preference to `localStorage`.
- `theme-script.ts`: Inline script that prevents flash of unstyled content (FOUC) on page load.
- `theme.css`: CSS custom properties for both light and dark color schemes.

## Rendering Strategy

The project follows the App Router default of Server Components unless a file is marked with `"use client"`.

Server-side responsibilities include:

- Route metadata through `generateMetadata`.
- Locale message loading in the root layout.
- Local article and category lookups in route pages.

Client-side responsibilities include:

- Theme toggling and persistence.
- Navigation viewport state and interactions (desktop, tablet, mobile).
- Search interactions and result filtering.
- Article detail interactivity.
- Opinion article rendering.

## Data Flow

Article data is local and static:

- `src/data/newsModels.ts`: TypeScript interfaces.
- `src/data/categories.ts`: Category definitions with labels and descriptions.
- `src/data/articleContent/*.ts`: Full article content organized by category.
- `src/data/opinionContent/*.ts`: Opinion article content.
- `src/data/homeContent.ts`, `sidebarNews.ts`, `legalContent.ts`: Additional content modules.

Article detail flow:

1. The route receives `category` and `slug` from `params`.
2. The server page looks up the article in the local data through `useNewsArticle` or equivalent lookup.
3. Missing articles call `notFound()`.
4. Article metadata is generated from the article data.
5. The article data is passed to `ArticleDetail` for translated rendering.

Category flow:

1. The route receives `slug` from `params`.
2. The server page finds the category in local category data.
3. Missing categories call `notFound()`.
4. Articles matching the category are filtered and rendered.

## State Management

The project uses local React state and React Context. It does not use Redux, Zustand, or other global state libraries.

- Theme state is managed through React Context (`ThemeProvider`).
- Navigation state (mobile menu open/closed, search active) uses local `useState`.
- Article and category data are derived from static imports, not fetched state.

## API Communication

No API communication is currently implemented.

- There are no App Router route handlers.
- There are no remote `fetch` calls in application source.
- Search is client-side against local article data.

## Styling and Assets

- Global styles live in `src/styles/index.css` (Tailwind directives).
- Feature and UI component styles live next to components as `.css` files.
- Tailwind CSS is configured through `tailwind.config.js` with dark mode via `data-theme` attribute.
- Static assets (images, favicons) live under `public/`.
- `next/image` is used for article, logo, and opinion imagery.
- The Domine font is self-hosted via `next/font/local`.
