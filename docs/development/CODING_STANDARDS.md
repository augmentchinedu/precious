# Coding Standards

This document outlines the coding standards and best practices for all software development at Augment Plus. Adherence to these standards is mandatory to ensure code consistency, readability, and maintainability across all projects.

## 1. Guiding Principles

- **Readability is Paramount:** Code is read far more often than it is written. Write clear, self-documenting code that is easy for other developers to understand.
- **Simplicity Over Complexity (KISS):** Prefer simple, straightforward solutions. Avoid unnecessary abstractions or overly clever code.
- **Don't Repeat Yourself (DRY):** Avoid duplicating code. Use functions, components, and classes to create reusable logic.

## 2. Automated Tooling

To enforce standards automatically, we rely on the tools defined in the `ENVIRONMENT_SETUP.md`.

- **Formatter (Prettier):** All code must be formatted with Prettier using the project's shared configuration. This eliminates debates over style and ensures a consistent format. Run `npm run format` before committing.
- **Linter (ESLint):** All code must pass the ESLint checks defined in the project's configuration. Linting helps catch potential bugs and enforce best practices. Run `npm run lint` before committing.

## 3. Naming Conventions

Consistent naming is one of the most effective ways to improve code readability.

- **Variables and Functions:** Use `camelCase`.
  - `const userProfile = {};`
  - `function getUserById() {}`
- **Constants:** Use `UPPER_SNAKE_CASE` for hard-coded, global-level constants.
  - `const MAX_CONNECTIONS = 10;`
- **Classes and Vue Components:** Use `PascalCase`.
  - `class ApiService {}`
  - `UserProfile.vue`
- **Files:** Use `PascalCase` for components (`MyComponent.vue`) and `kebab-case` for other files (e.g., `api-client.js`).

## 4. JavaScript & Node.js Best Practices

- **Use `const` and `let`:** `const` should be your default choice. Use `let` only for variables that must be reassigned. Avoid using `var`.
- **ES Modules:** Use `import` and `export` statements for module management. Avoid CommonJS (`require`/`module.exports`) in new code.
- **Asynchronous Code:** Use `async/await` for handling promises. It is more readable than `.then()` chains.
- **Error Handling:** Always include error handling for asynchronous operations, API calls, and I/O. Use `try...catch` blocks with `async/await`.
- **Arrow Functions:** Use arrow functions for their conciseness, especially for inline callbacks.

## 5. Vue 3 Best Practices

- **Composition API with `<script setup>`:** All new components must use the Composition API with the `<script setup>` syntax. This improves logic reuse and organization.
- **Component Naming:** Vue components should be named in `PascalCase` (e.g., `BaseButton.vue`, `UserProfileCard.vue`).
- **Props:**
  - Define props in `camelCase` within `<script setup>`.
  - Use `kebab-case` when passing props in the template.
  - Always provide a `type` and a `default` value where applicable.
- **Events:**
  - Define emitted events using `defineEmits`.
  - Event names should be `kebab-case`.
  - In the parent component, listen for events using `@event-name`.
- **Component Structure:** Keep components small and focused on a single responsibility. If a component becomes too large, break it down into smaller, child components.

## 6. Comments

- **When to Comment:** Comment on the "why," not the "what." The code should clearly explain what it does. Comments should explain why a particular implementation was chosen, especially if it's non-obvious.
- **Format:** Use `//` for single-line comments and `/** ... */` for multi-line/JSDoc style comments for functions and modules.
