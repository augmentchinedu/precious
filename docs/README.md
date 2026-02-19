# Augment Plus Documentation Hub

## 1. Overview

Welcome to the central documentation hub for Augment Plus and The Great Unknown ecosystem. This directory serves as the single source of truth for all project guidelines, architectural blueprints, and operational procedures.

The creation and unification of this documentation follows the directive from our Platform Architect, The Lord, to ensure all team members are aligned and have access to consistent, up-to-date information.

## 2. Key Documents

Please familiarize yourself with the following core documents. Each is maintained by the designated role-holder.

*   **[System Architecture](./ARCHITECTURE.md)**
    *   **Maintained by:** Michael (Project Architect)
    *   **Purpose:** Outlines the high-level system architecture, including the service-oriented node structure, code modules, and deployment strategy on Google Cloud. This is the primary technical blueprint.

*   **[Developer Onboarding & Setup](./DEVELOPMENT_SETUP.md)**
    *   **Maintained by:** Michael (Project Architect)
    *   **Purpose:** Provides actionable steps for developers to set up their environment and, most importantly, verify their access to the core GitHub repositories.

*   **[Community Guidelines](./COMMUNITY_GUIDELINES.md)**
    *   **Maintained by:** Sandra (Community Administrator)
    *   **Purpose:** Defines the code of conduct and official communication channels. It clarifies that all interaction will be centered on GitHub (Discussions and Issues) rather than real-time chat platforms.

*   **[Social Media Strategy](./SOCIAL_MEDIA_STRATEGY.md)**
    *   **Maintained by:** Francesca (Social Media Manager)
    *   **Purpose:** Details the strategy for our public-facing communications, emphasizing a manual, real-time, and authentic approach to engagement.

## 3. A Living Resource

This documentation is a living resource. It will be updated as the project evolves. Please refer back to this hub regularly to stay informed of any changes.


## Hosting: Render (Effective 2026-02-19)

Production hosting for **The Great Unknown** is standardized on **Render**.

### Source of truth
- Render blueprint/config: `docs/.render.yaml`
- Ops reference: `docs/operations/README.md` (section: “Hosting: Render (Migration Standard)”)
- Workflow reference: `docs/DEVELOPMENT_WORKFLOW.md` (section: “Hosting Standard: Render (Effective 2026-02-19)”)
- Architecture decision: `docs/platform/ARCHITECTURE_DECISION_RECORD.md` (ADR: Hosting Standardization on Render)

### Deployment expectations (Node/Express)
- **Service type:** Web service (Node)
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment variables:** set `NODE_ENV=production` (plus any required secrets via Render dashboard)
- **Auto-deploy:** enabled for the main branch (per Render configuration)
- **Health verification:** validate the health endpoint if available (see `docs/src/routes/health.js`)

### Rules
- Do **not** commit secrets to the repository; configure them in Render.
- If additional services are introduced, extend the Render blueprint and update ops/workflow docs accordingly.
