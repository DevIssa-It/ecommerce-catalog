<div align="center">
  <h1>🛒 E-commerce Catalog</h1>
  <p><strong>Modern Vue.js Product Showcase with Stunning UI</strong></p>
  
  [![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue?style=for-the-badge)](https://ecommerce-catalog-orpin.vercel.app/)
  [![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
</div>

---

## 🚀 **Live Demo**

**🌟 Experience it live:** [https://ecommerce-catalog-orpin.vercel.app/](https://ecommerce-catalog-orpin.vercel.app/)

---

## ✨ **Key Features**

| Feature | Description |
|---------|-------------|
| 📱 **Responsive Design** | Perfect on all devices - mobile, tablet, desktop |
| ⭐ **Interactive Ratings** | Animated star system with smooth transitions |
| 🖼️ **Dynamic Gallery** | High-quality product images with optimized loading |
| 🏷️ **Smart Filtering** | Category-based product organization |
| ♿ **Accessibility First** | WCAG compliant with ARIA labels |
| ⚡ **Lightning Fast** | Optimized performance with lazy loading |
| 🎨 **Modern UI/UX** | Clean, intuitive interface design |

---

## 🛠️ **Tech Stack**

<div align="center">

| Frontend | Language | Styling | Build | Testing | Deploy |
|:--------:|:--------:|:-------:|:-----:|:-------:|:------:|
| ![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vue.js&logoColor=white) | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) |
| Vue 3 | TypeScript | CSS3 | Vite | Vitest + Cypress | Vercel |

</div>

---

## 📁 **Project Structure**

```
🏗️ ecommerce-catalog/
├── 📂 src/
│   ├── 🧩 components/
│   │   └── ProductCard.vue     # Main product display component
│   ├── 📄 pages/               # Application pages
│   ├── 🛣️ router/              # Vue Router configuration
│   ├── 🔧 services/            # API services
│   ├── 🗃️ stores/              # State management
│   └── 🎯 App.vue              # Root component
├── 🌍 public/                  # Static assets
└── 📋 index.html               # Entry point
```

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
