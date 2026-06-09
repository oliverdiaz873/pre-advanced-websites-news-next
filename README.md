# Pre-Advanced Websites – News (Next.js Edition)

A pre-advanced level and fully responsive news website built with modern frontend technologies and Next.js.

## Documentation

Start with [docs/getting-started.md](docs/getting-started.md).

Core documentation:

- [Architecture](docs/architecture.md)
- [Folder Structure](docs/folder-structure.md)
- [Features](docs/features/README.md)

## Project Overview
Pre-Advanced Websites – News (Next.js Edition) is a pre-advanced level web project focused on building a professional news website using modern frameworks like Next.js and Tailwind CSS.

This project represents an evolution from the React version, leveraging the power of Next.js to provide server-side rendering, static generation, and optimized performance. It features a more scalable, component-based architecture with enhanced SEO capabilities and improved developer experience.

The website simulates a digital news platform with a modern UI, prioritizing performance, responsiveness, clean design, and server-side optimization.

## Features
- Fully responsive design for all screen sizes.
- Component-based architecture using React and Next.js.
- News-oriented layout with sections for headlines and articles.
- Server-side rendering (SSR) and static site generation (SSG) with Next.js.
- Styled using Tailwind CSS for a modern UI approach.
- Type-safe development with TypeScript.
- Interactive elements and dynamic rendering.
- Optimized performance with Next.js Image component and code splitting.
- Enhanced SEO with Next.js meta tags and dynamic routing.
- Frontend-focused project with Next.js capabilities.

## Technologies Used
- HTML5 – Semantic markup structure.  
- CSS3 – Base styling when needed.  
- JavaScript (ES6+) – Core scripting language.  
- React – JavaScript library for building user interfaces.  
- Next.js – React framework for production with SSR and SSG.  
- TypeScript – Static typing for safer and more maintainable code.  
- Tailwind CSS – Utility-first styling system.  
- Next.js App Router – Modern file-based routing system.  

## Responsiveness
This website is 100% responsive, adapting seamlessly to:

- Mobile devices
- Tablets
- Laptops and desktops

Responsiveness is achieved using:

- Tailwind CSS utility classes
- Flexible and adaptive layouts
- Modern responsive design principles
- Next.js responsive image optimization

## Project Purpose
This project is part of the Pre-Advanced Websites series, designed to:

- Strengthen modern frontend development skills with Next.js
- Apply React, Next.js, and TypeScript best practices
- Build scalable and reusable UI components
- Improve responsive web design techniques
- Learn server-side rendering and static generation strategies
- Understand production-ready web application architecture

## Internationalization (i18n)
This project implements internationalization (i18n) using `next-intl` and Next.js 16 routing.

### Architecture & Pipeline
1. **Source Translations**: Static UI translations live inside `src/i18n/locales/{locale}/*.json` (e.g. `common.json`, `navbar.json`, `metadata.json`). Dynamic article content and categories live in `src/data/`.
2. **Compilation Step (`npm run build:locales`)**: This script merges static translation JSONs with dynamic data and produces the final consolidated dictionaries in `messages/{locale}.json` consumed by `next-intl` at runtime.
3. **Automation**: The script `build:locales` runs automatically before `npm run dev` and `npm run build`.
4. **Routing**: All client-side navigation uses the localized `Link` component from `@/i18n/routing` instead of standard `next/link` to preserve the user's selected locale and enable fast client-side transitions.

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for more details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
