# Augment Plus Testing Strategy

## 1. Introduction

This document outlines the software testing strategy for Augment Plus. The primary goal of this strategy is to ensure the reliability, quality, and stability of our platform, in line with the "Stability First" principle defined in the `developer_operations_handbook.md`. All developers are expected to adhere to these guidelines.

## 2. Testing Philosophy

*   **Testing is a Developer Responsibility:** Every developer is responsible for writing tests for the code they produce.
*   **Test for Confidence:** We write tests to be confident that our code works correctly and that future changes do not break existing functionality.
*   **The Testing Pyramid:** We will follow the principles of the testing pyramid, focusing on a large base of fast unit tests, a smaller number of integration tests, and a very selective set of end-to-end (E2E) tests.
*   **Automate Everything:** All tests will be integrated into our CI/CD pipeline and must pass before any code is merged into the `develop` branch.

## 3. Types of Tests & Tooling

### 3.1. Unit Tests

*   **Purpose:** To test individual functions, methods, or small, isolated units of logic. They should be fast and have no external dependencies (e.g., no network or database calls).
*   **Tooling:** We will use **Vitest** for our test runner and assertion library due to its speed and compatibility with Vite-based projects like our Vue 3 applications.
*   **What to Test:** Business logic, utility functions, and complex algorithms.
*   **Requirement:** All new non-trivial functions must be accompanied by unit tests.

### 3.2. Component Tests (for Vue 3)

*   **Purpose:** To test individual Vue components in isolation. We will test a component's props, events, slots, and user interactions.
*   **Tooling:** We will use **Vue Test Utils** in conjunction with **Vitest**.
*   **What to Test:**
    *   Rendering based on different props.
    *   Emitting correct events upon user interaction.
    *   Correct display of content passed through slots.
*   **Requirement:** All new components must have corresponding component tests.

### 3.3. Integration Tests

*   **Purpose:** To test the interaction between several units or components. For example, testing a component that fetches data from an API service.
*   **Tooling:** Vitest will be used, with mocking libraries (like `msw` - Mock Service Worker) to mock API endpoints. This keeps tests fast and reliable without hitting a live backend.
*   **What to Test:** Data flow between services, component compositions, and state management interactions (e.g., Pinia stores).

### 3.4. End-to-End (E2E) Tests

*   **Purpose:** To test entire user flows from the user's perspective, running in a real browser. These tests are slow and can be brittle, so they should be used sparingly for critical paths only.
*   **Tooling:** We will use **Cypress** for E2E testing.
*   **What to Test:**
    *   User login and logout flow.
    *   Core project creation or submission forms.
    *   Critical payment or checkout processes.

## 4. Practical Implementation

*   **Test Location:** Test files should be located alongside the code they are testing in a `__tests__` directory or using a `.spec.js` / `.test.js` suffix (e.g., `userService.js` and `userService.spec.js`).
*   **Pull Requests (PRs):** Any PR that introduces or modifies code must include corresponding tests. The PR will not be approved by the Developer Operator (Roni) if tests are missing or failing.
*   **Code Coverage:** We will aim for an initial code coverage target of **80%** for all new code. This will be automatically reported in our CI pipeline. This target helps ensure that our testing is comprehensive.
