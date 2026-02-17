# Augment Plus: Development Workflow

## 1. Introduction

This document outlines the standardized development workflow for all projects and modules within Augment Plus. Adherence to these guidelines is mandatory for all developers (Andrew, Benson, Clark) to ensure code quality, maintain a clean repository history, and enable effective CI/CD automation. As the Developer Operator, Roni is responsible for maintaining this process.

## 2. Branching Strategy

We will adopt a simplified GitFlow branching model.

*   **`main`**: This branch represents the latest production-ready code. Direct pushes to `main` are strictly forbidden. Code is merged into `main` only from the `develop` branch during a release.
*   **`develop`**: This is the primary development branch. It contains the latest delivered development changes for the next release. All feature branches are merged into `develop`.
*   **Feature Branches (`feature/<feature-name>`)**: All new features and non-trivial bug fixes should be developed in a feature branch.
    *   Branches should be created from the `develop` branch.
    *   Example: `feature/user-authentication`, `feature/wallet-api`
*   **Hotfix Branches (`hotfix/<fix-name>`)**: Used for critical fixes in production.
    *   Branches should be created from the `main` branch.
    *   Once complete, they must be merged into both `main` and `develop`.

## 3. Commit Message Convention

We will use the **Conventional Commits** specification. This provides a clear history and allows us to automate changelog generation and versioning.

The format is: `<type>[optional scope]: <description>`

*   **`<type>`**: Must be one of the following:
    *   `feat`: A new feature.
    *   `fix`: A bug fix.
    *   `docs`: Documentation only changes.
    *   `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
    *   `refactor`: A code change that neither fixes a bug nor adds a feature.
    *   `test`: Adding missing tests or correcting existing tests.
    *   `chore`: Changes to the build process or auxiliary tools and libraries.

*   **`[optional scope]`**: The module or part of the codebase affected (e.g., `api`, `components`, `currency`).

*   **`<description>`**: A concise description of the change in the imperative mood (e.g., "add login endpoint" not "added login endpoint").

**Example Commit Messages:**
*   `feat(api): add user wallet creation endpoint`
*   `fix(components): correct button alignment on mobile`
*   `docs: update development workflow guide`
*   `chore: configure initial CI pipeline`

## 4. Pull Request (PR) Process

1.  **Create a PR**: Once a feature or fix is complete, open a Pull Request (PR) from your `feature/*` branch into the `develop` branch.
2.  **Description**: The PR description should clearly explain the "what" and "why" of the changes. Link to any relevant tasks or issues.
3.  **Review**: At least one other developer must review and approve the PR.
4.  **CI Checks**: All automated CI checks (e.g., linting, tests, build) must pass successfully.
5.  **Merge**: Once approved and all checks pass, the PR can be merged into `develop`. Use a "squash and merge" to maintain a clean history in the `develop` branch.

## 5. CI/CD Pipeline Overview

The upcoming CI/CD pipeline will automate the following steps upon the creation of a Pull Request:

1.  **Linting**: Check code for style consistency.
2.  **Testing**: Run all unit and integration tests.
3.  **Building**: Ensure the application and all modules build successfully.
4.  **(Future) Deployment**: Automatically deploy the `develop` branch to a staging environment and the `main` branch to production.
