# E-commerce Catalog

Vue.js E-commerce Product Catalog with responsive design and interactive product card components.

## 🌐 Live Demo
**Application**: https://ecommerce-catalog-orpin.vercel.app/

## ✨ Features
- Responsive product card display
- Interactive rating system with animated stars
- Product image gallery
- Category filtering
- Mobile-optimized design
- Accessibility compliant (ARIA labels)

## 🛠️ Tech Stack
- **Frontend**: Vue.js 3 (Composition API)
- **Language**: TypeScript
- **Styling**: CSS3 with custom properties
- **Build Tool**: Vite
- **Testing**: Vitest + Cypress
- **Deployment**: Vercel

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
