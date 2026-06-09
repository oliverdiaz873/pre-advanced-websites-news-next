# Folder Structure

This document describes the project structure that is relevant to development and maintenance.

## Root

```text
.
|-- app/
|-- docs/
|-- messages/
|-- public/
|-- scripts/
|-- src/
|-- eslint.config.mjs
|-- LICENSE
|-- next-env.d.ts
|-- next.config.ts
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- proxy.ts
|-- README.md
|-- tailwind.config.js
|-- tsconfig.json
`-- tsconfig.tsbuildinfo
```

Generated or dependency directories may also be present locally:

- `.next/`: Next.js build and development output.
- `node_modules/`: Installed npm dependencies.
- `.git/`: Git repository metadata.

## Root Directories

- `app/`: Next.js App Router route tree (locale-scoped).
- `docs/`: Project documentation.
- `messages/`: Compiled i18n message files for `next-intl`.
- `public/`: Static assets served by Next.js.
- `scripts/`: Build and validation scripts.
- `src/`: Application source code.

## Source Structure

```text
src/
|-- assets/
|-- data/
|-- features/
|-- i18n/
|-- shared/
|-- styles/
`-- theme/
```

- `assets/`: Local fonts (`Domine/`) and images (`logo/`).
- `data/`: Local static content — article data, categories, opinions, legal content, and TypeScript models.
- `features/`: Feature-oriented modules with components and hooks.
- `i18n/`: `next-intl` routing, request configuration, and static translation JSON files per locale.
- `shared/`: Reusable UI components, layouts (Header, Footer), utilities, and font configuration.
- `styles/`: Global styles and Tailwind directives (`index.css`).
- `theme/`: Custom theme system — context provider, hooks, persistence, and CSS custom properties.

## `app`

```text
app/
|-- [locale]/
|   |-- _components/
|   |-- category/
|   |-- clima/
|   |-- deporte/
|   |-- economia/
|   |-- internacional/
|   |-- justicia/
|   |-- politica/
|   |-- salud/
|   |-- news/
|   |-- opiniones/
|   |-- legal/
|   |-- search/
|   |-- layout.tsx
|   |-- loading.tsx
|   |-- not-found.tsx
|   |-- error.tsx
|   `-- page.tsx
```

Defines locale-scoped routes. Uses `_components/` for route-local client page wrappers.

Implemented route areas:

- Home.
- Category pages (7 fixed + 1 dynamic).
- News article detail.
- Opinion article detail.
- Search.
- Legal (privacy, terms).

## `src/features`

```text
src/features/
|-- navigation/
|   |-- config/
|   `-- components/
|       |-- Breadcrumb/
|       |-- DesktopNav/
|       |-- TabletNav/
|       `-- MobileNav/
`-- news/
    |-- components/
    |   |-- ArticleDetail/
    |   |-- BreakingNewsBanner/
    |   |-- FeaturedNewsSection/
    |   |-- LatestNewsSection/
    |   |-- OpinionSidebar/
    |   `-- RecentNewsSidebar/
    `-- hooks/
```

- `navigation/`: Navigation components for desktop, tablet, and mobile viewports, plus breadcrumbs.
- `news/`: News-specific components (article detail, breaking news, featured/latest sections, sidebars) and data hooks.

## `src/shared`

```text
src/shared/
|-- components/
|   |-- EmptyState/
|   |-- icons/
|   |-- LanguageSelector/
|   |-- ScrollToTop/
|   |-- SearchBar/
|   `-- ThemeToggle/
|-- config/
|   `-- fonts.ts
|-- layouts/
|   |-- Header/
|   |-- Footer/
|   |-- NewsLayout/
|   `-- LegalLayout/
`-- utils/
    `-- searchUtils.ts
```

- `components/`: Reusable UI primitives shared across features.
- `config/`: Font configuration for the self-hosted Domine typeface.
- `layouts/`: Application shells — Header, Footer, NewsLayout, LegalLayout.
- `utils/`: Shared utility functions (search normalization).

## `src/data`

```text
src/data/
|-- articleContent/
|-- opinionContent/
|-- articleFactory.ts
|-- categories.ts
|-- homeContent.ts
|-- index.ts
|-- legalContent.ts
|-- newsModels.ts
|-- opinionArticles.ts
|-- opinionDetails.ts
`-- sidebarNews.ts
```

Local static data layer. All articles, categories, opinions, and legal content are defined here as TypeScript modules.

## `src/i18n`

```text
src/i18n/
|-- locales/
|   |-- en/
|   `-- es/
|-- request.ts
`-- routing.ts
```

- `locales/{locale}/`: Static translation JSON files organized by namespace (common, footer, home, legal, metadata, navbar, news, search).
- `request.ts`: `next-intl` entry point — validates locale and loads compiled messages.
- `routing.ts`: Locale configuration and locale-aware navigation wrappers.

## `public`

Static assets served by Next.js.

- `public/images/logo/`: Site logo.
- `public/images/news/{category}/`: Article images organized by category (clima, deporte, economia, internacional, justicia, politica, salud).
- `public/images/opiniones/`: Opinion article images.
- `public/favicon*.jpg`: Favicon variants.

## `scripts`

- `build-locales.ts`: I18n build pipeline — merges static translation JSONs with dynamic data from `src/data/` into `messages/{locale}.json`.
