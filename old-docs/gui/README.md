# Platform GUI - Technical README

## 1. Overview

This document serves as the primary technical guide for the Augment Plus Platform GUI. It contains instructions for setting up the local development environment, coding standards, and the project's architectural structure. This project is led by Benson, with design oversight from Sage.

This project fulfills the plan outlined in `docs/projects/GUI.md`.

## 2. Technical Stack

- **Framework:** Vue 3 (using `<script setup>` syntax)
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router
- **Styling:** Tailwind CSS
- **Testing:** Vitest (Unit), Playwright (E2E)
- **Linting/Formatting:** ESLint and Prettier

## 3. Local Development Setup

To ensure a consistent development environment, follow these steps:

1.  **Clone the repository:** `git clone <repository-url-for-platform-gui>`
2.  **Install dependencies:** Navigate to the project root and run `npm install`.
3.  **Run the development server:** Run `npm run dev`. The application will be available at `http://localhost:5173` (or the next available port).

The development server will use Vite's Hot Module Replacement (HMR) for a fast and efficient development experience.

## 4. Project Structure

The Vue 3 application will follow a standard, scalable structure:

```
src/
├── api/          # Modules for interacting with the backend REST API
├── assets/       # Static assets (images, fonts, etc.)
├── components/   # Reusable Vue components (e.g., Button, Modal)
│   ├── common/
│   └── layout/
├── layouts/      # Main application layouts (e.g., DefaultLayout, AuthLayout)
├── router/       # Vue Router configuration
├── stores/       # Pinia state management stores
├── styles/       # Global CSS and Tailwind configuration
├── utils/        # Utility functions
├── views/        # Page-level components mapped to routes
├── App.vue       # Main application component
└── main.ts       # Application entry point
```

## 5. Coding & Style Standards

- **Consistency is Key:** We will strictly adhere to the project's ESLint and Prettier configurations.
- **Pre-commit Hooks:** A pre-commit hook will be configured (using Husky) to automatically run the linter and formatter on staged files. This enforces our standards and prevents style-related issues from entering the codebase.
- **Component Naming:** Components will be named using `PascalCase` (e.g., `UserProfile.vue`).
- **Composition API:** All new components must use the Composition API with the `<script setup>` syntax for better organization and reusability.

## 6. API Interaction

- **Contract-First:** The GUI is a pure client. All data will be fetched from the backend API. We will rely on the OpenAPI specification provided by the backend team (see `docs/development/BACKEND_GUIDELINES.md`) as the single source of truth for API endpoints and data structures.
- **API Client:** A dedicated module in `src/api/` will be created to encapsulate `fetch` or `axios` calls, providing a clean interface for the rest of the application to consume.

## 7. Action Items

- **Benson:** Initialize the `platform-gui` repository and populate it with the Vue 3 + Vite scaffolding.
- **Benson:** Implement the ESLint, Prettier, and Husky configurations as described above.
- **Sage:** Begin work on a component library design in Figma, starting with common elements like buttons, inputs, and cards, based on the Tailwind CSS framework.
