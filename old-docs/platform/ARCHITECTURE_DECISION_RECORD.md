# Architecture Decision Record (ADR)

## 1. Overview

This document provides a sequential, immutable record of significant architectural decisions made for the Augment Plus platform. Its purpose is to ensure clarity, provide context for new members, and document the rationale behind our technical evolution. Each decision is recorded in its own section.


## ADR: Hosting Standardization on Render

- **Date:** 2026-02-19  
- **Status:** Accepted  
- **Decision Owner:** Platform Administration (Sandra)  
- **Context Trigger:** Platform hosting migration requirement (“We would now have to use Render for hosting.”)

### Context
The platform requires a consistent, documented production hosting target for Node/Express services. Prior hosting assumptions are now considered outdated for current operations.

### Decision
Standardize production hosting for **The Great Unknown** on **Render**.

### Consequences
- Render becomes the default deployment target for new and existing Node/Express services.
- Deployment configuration is defined via the repository Render blueprint.
- Secrets must be managed in Render (not committed to the repository).
- Operational verification should include health endpoint validation where available.

### Implementation / Source of Truth
- Render blueprint/config: `docs/.render.yaml`
- Ops reference: `docs/operations/README.md` (section: “Hosting: Render (Migration Standard)”)
- Workflow reference: `docs/DEVELOPMENT_WORKFLOW.md` (section: “Hosting Standard: Render (Effective 2026-02-19)”)
- Health endpoint (if applicable): `docs/src/routes/health.js`

### Deployment Expectations (Node/Express)
- **Service type:** Web service (Node)
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment:** `NODE_ENV=production` (+ additional secrets configured in Render dashboard)
- **Auto-deploy:** enabled for main branch (per Render configuration)

### Alternatives Considered
- Continue with prior hosting approach: rejected due to new hosting requirement and need for a single operational standard.
