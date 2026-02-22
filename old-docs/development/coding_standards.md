# Augment Plus Coding Standards

## 1. Introduction

This document defines the official coding standards for all software development at Augment Plus. The goal is to produce code that is high-quality, consistent, and maintainable. These standards are to be followed by all developers (Andrew, Benson, Clark) and are supplementary to the procedures in the `developer_operations_handbook.md`.

## 2. General Principles

*   **DRY (Don't Repeat Yourself):** Avoid duplicating code. Abstract and reuse common logic.
*   **KISS (Keep It Simple, Stupid):** Write the simplest possible code that solves the problem. Avoid unnecessary complexity.
*   **Readability Matters:** Code is read more often than it is written. Prioritize clarity. Write code for humans first, machines second.

## 3. Formatting & Linting

*   **Automatic Formatting:** We use Prettier for automatic code formatting. All code should be formatted before a Pull Request is created. A shared configuration file will be added to our project repositories.
*   **Linting:** We use ESLint to catch common errors and enforce style rules. All code must pass the linter without errors.

## 4. Naming Conventions

*   **Variables & Functions:** Use `camelCase`. Names should be descriptive (e.g., `fetchUserData` instead of `getData`).
*   **Classes & Vue Components:** Use `PascalCase` (e.g., `UserAuthentication`, `UserProfileCard`).
*   **Constants:** Use `UPPER_CASE_SNAKE_CASE` for constant values that do not change (e.g., `API_BASE_URL`).
*   **File Names:** Use `kebab-case` for files (e.g., `user-profile.vue`) and `PascalCase` for Vue components (`UserProfile.vue`).

## 5. JavaScript (ES6+) & Node.js

*   **`const` over `let`:** Use `const` by default. Only use `let` for variables that need to be reassigned. Avoid `var`.
*   **Arrow Functions:** Prefer arrow functions for their conciseness and lexical `this` binding.
*   **Promises & Async/Await:** Use `async/await` for asynchronous operations to improve readability. All promises must have error handling (e.g., `try...catch` blocks).
*   **Modules:** Use ES6 `import`/`export` syntax.

```javascript
// Good
import { fetchUserData } from './api/userService';

const loadProfile = async (userId) => {
  try {
    const user = await fetchUserData(userId);
    console.log(user.name);
  } catch (error) {
    console.error('Failed to load user profile:', error);
  }
};
```

## 6. Vue 3 (PWA Development)

*   **Composition API:** We will use the Composition API for all new components to improve logic organization and reuse.
*   **Component Structure:** A Single-File Component (.vue) should have the following order: `<script setup>`, `<template>`, `<style scoped>`.
*   **Props:** Prop definitions should be as specific as possible, including `type`, `required`, and a `default` value if applicable.
*   **Scoped Styles:** Always use the `scoped` attribute on `<style>` tags to prevent styles from leaking globally.

## 7. Comments

*   **When to Comment:** Comment on the *why*, not the *what*. Explain complex logic, business rules, or the reasoning behind a particular implementation.
*   **Avoid Clutter:** Do not leave commented-out code in the final commit. Use Git history for that.
*   **TODOs:** Use `// TODO:` for tasks that need to be done but can't be completed in the current commit. Include a brief description of the task.

```javascript
// TODO: Refactor this to use the new WebSocket service for real-time updates.
```
