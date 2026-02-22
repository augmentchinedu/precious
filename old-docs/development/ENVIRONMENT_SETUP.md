# Environment Setup Guide

This document provides instructions for setting up a local development environment for Augment Plus projects. A consistent environment is crucial for code quality and collaboration. All developers must follow this guide.

## 1. Core Prerequisites

Before you begin, ensure you have the following software installed on your system:

*   **Git:** For version control. [Download Git](https://git-scm.com/downloads).
*   **Node.js:** We recommend using the latest Long-Term Support (LTS) version. [Download Node.js](https://nodejs.org/).
*   **Code Editor:** We recommend [Visual Studio Code](https://code.visualstudio.com/) with the following extensions:
    *   ESLint
    *   Prettier - Code formatter
    *   Volar (for Vue 3 development)

## 2. Getting the Code

1.  **Clone the Repository:** Use `git clone` to get a local copy of the project repository. You will need to obtain the specific repository URL from the project's documentation.
    ```bash
    git clone [repository-url]
    cd [repository-name]
    ```

2.  **Configure Git:** Make sure your local Git configuration is set with the name and email you use for commits.
    ```bash
    git config user.name "Your Name"
    git config user.email "your.email@example.com"
    ```

## 3. Installing Dependencies

Our projects use Node.js and `npm` for dependency management. Run the following command in the root of the project directory to install all required packages:

```bash
npm install
```

## 4. Environment Configuration

Our applications follow the twelve-factor app methodology for configuration, as mandated by our architectural principles.

1.  **Create `.env` file:** Create a `.env` file in the project root by copying the example file.
    ```bash
    cp .env.example .env
    ```

2.  **Update Variables:** Open the `.env` file and populate it with the necessary local configuration values (e.g., database connection strings, API keys). Consult the project's specific `README.md` for details on required variables. **Never commit your `.env` file to version control.**

## 5. Running the Application

To start the local development server, run the following command:

```bash
npm run dev
```

This will typically start the application, which you can access at `http://localhost:3000` or a similar address specified in the console output. The server will watch for file changes and automatically reload.

## 6. Linting and Formatting

To maintain code quality, run the linter and formatter before committing code.

*   **Lint:** `npm run lint`
*   **Format:** `npm run format`

Adhering to these setup steps ensures a smooth development workflow and alignment with our platform's standards.


## Hosting Standard: Render (Effective 2026-02-19)

All production hosting for **The Great Unknown** is standardized on **Render**. Any prior hosting assumptions should be treated as deprecated for current and new services.

### Source of truth
- Render blueprint/config: `docs/.render.yaml`
- Ops reference: `docs/operations/README.md` (section: “Hosting: Render (Migration Standard)”)
- Workflow reference: `docs/DEVELOPMENT_WORKFLOW.md` (section: “Hosting Standard: Render (Effective 2026-02-19)”)
- Architecture decision: `docs/platform/ARCHITECTURE_DECISION_RECORD.md` (ADR: Hosting Standardization on Render)

### Environment variables (Render)
Configure environment variables in the **Render dashboard** (do not commit secrets to the repository).

Minimum expected:
- `NODE_ENV=production`

Additional variables (as required by the service):
- Database connection strings
- API keys / tokens
- Any service-specific configuration

### Deployment expectations (Node/Express)
- **Service type:** Web service (Node)
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Auto-deploy:** enabled for the main branch (per Render configuration)
- **Health verification:** validate the health endpoint if available (see `docs/src/routes/health.js`)

### Rules
- Do **not** commit secrets to the repository; configure them in Render.
- If additional services are introduced, extend the Render blueprint and update ops/workflow documentation accordingly.
