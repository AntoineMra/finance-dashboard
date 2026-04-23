# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack
- **Frontend Framework**: Vue 3 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Sass
- **UI Components**: Vuetify 3
- **State Management**: Pinia
- **Routing**: Vue Router
- **Testing**: Cypress (unit + E2E)
- **Linting**: ESLint with Vue plugin
- **Charts**: Chart.js with vue-chartjs

## Project Structure
- `/src` — Vue application
  - `/components` — Reusable Vue components
  - `/views` — Page-level components
  - `/stores` — Pinia state management
  - `/router` — Vue Router configuration
  - `main.ts` — Application entry point
- `/public` — Static assets
- `/cypress` — Test suite (component + E2E)
- `vite.config.ts` — Vite configuration
- `tsconfig.json` — TypeScript configuration

## Quick Start

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev         # start dev server with hot-reload (http://localhost:5173)
npm run build       # build for production
npm run preview     # preview production build locally
```

### Linting
```bash
npm run lint        # fix linting issues
npm run ci:lint     # check without fixing (CI mode, strict)
```

### Type Checking
```bash
npm run type-check  # or: npm run build (runs type-check first)
```

## Testing

### Unit Tests (Components)
```bash
npm run test:unit       # headless component tests
npm run test:unit:dev   # headed tests with UI (Cypress)
```

### End-to-End Tests
```bash
npm run test:e2e        # run against production build
npm run test:e2e:dev    # run against dev server (faster)
```

## Architecture Notes
- Components use `<script setup lang="ts">` syntax
- Pinia stores handle state; define in `/src/stores`
- Routes defined in `/src/router/index.ts`
- Tailwind + Vuetify for styling (Vuetify overrides global styles)
- Axios is configured for API calls; check `/src` for interceptors
- Chart.js used for dashboard visualizations

## Common Tasks

### Add a New Page
1. Create Vue component in `/src/views`
2. Add route to `/src/router/index.ts`
3. Link in navigation

### Add a New Component
1. Create in `/src/components`
2. Import and use in parent components
3. Write unit tests in `/cypress/component`

### API Integration
- Axios instance likely configured with interceptors
- Check `/src` for any API service/utility files
- Backend API URL likely in environment variables (`.env`)

## Notes
- TypeScript is enforced; use strict mode
- ESLint runs on save; fix issues before committing
- Vite rebuilds instantly on file change
- Cypress tests can run headless (CI) or headed (development)
- Build artifacts go to `/dist`
