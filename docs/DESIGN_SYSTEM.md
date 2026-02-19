# The Great Unknown: Design System

## 1. Introduction

Welcome to the Design System for The Great Unknown ecosystem. This document, maintained by Sage (Design Manager), provides the foundational principles and guidelines for our visual identity and user interface design.

Our goal is to create an experience that is intuitive, accessible, and visually consistent across all nodes and services of our platform. This system serves as the single source of truth for designers and developers, ensuring a cohesive and high-quality product.

## 2. Core Design Principles

Our design is guided by the following principles:

*   **Clarity Above All:** The interface should be intuitive and easy to understand. We prioritize clear communication and eliminate ambiguity.
*   **Consistency is Key:** A consistent design language across the platform builds user trust and reduces cognitive load. Components should look and behave predictably.
*   **Architectural Minimalism:** Our aesthetic is clean, structured, and purposeful, reflecting the architectural precision of our backend systems. We avoid unnecessary embellishment.
*   **Purposeful Interaction:** Every animation, transition, and interactive element should serve a clear purpose, guiding the user and providing meaningful feedback.

## 3. Visual Identity

### 3.1. Color Palette

The official color palette will be defined here. It will include primary, secondary, and accent colors, as well as shades for text, backgrounds, and states (e.g., success, error, warning).

*   **Primary:** (To Be Defined)
*   **Secondary:** (To Be Defined)
*   **Text:** (To Be Defined)
*   **Background:** (To Be Defined)
*   **Accent:** (To Be Defined)

### 3.2. Typography

We will use a carefully selected set of fonts to ensure readability and create a clear visual hierarchy.

*   **Primary Typeface (Headings):** (To Be Defined)
*   **Secondary Typeface (Body Text):** (To Be Defined)
*   **Scale:** A typographic scale will be defined to ensure consistent heading levels and text sizes.

### 3.3. Iconography

A consistent icon set will be chosen to represent actions and concepts throughout the platform. Icons should be simple, clear, and universally recognizable.

*   **Icon Library:** (To Be Defined)

## 4. Component-Based Design

Our user interfaces will be constructed using a library of reusable Vue 3 components. This approach ensures consistency and accelerates development.

*   **Repository:** All shared Vue components are located in the `components` repository: [https://github.com/augmentchinedu/components](https://github.com/augmentchinedu/components)
*   **Guideline:** Before creating a new component, developers should consult this design system and check the `components` repository for existing solutions.
*   **Contribution:** New components should be designed to be generic, reusable, and well-documented before being added to the shared library.

## 5. A Living System

This design system is a living document. It will evolve alongside our platform. Feedback and proposals for improvement are welcome and should be raised through the appropriate channels outlined in the [Community Guidelines](./COMMUNITY_GUIDELINES.md).


## Hosting Standard: Render (Effective 2026-02-19)

**Status:** Active  
**Applies to:** The Great Unknown (Node/Express services)  
**Owner:** Platform Administration (Sandra)  
**Trigger:** “We would now have to use Render for hosting.”

### Summary
Production hosting for **The Great Unknown** is standardized on **Render**. Any prior hosting assumptions are deprecated for current and new services.

### Source of truth
- Render blueprint/config: `docs/.render.yaml`
- Ops reference: `docs/operations/README.md` (section: “Hosting: Render (Migration Standard)”)
- Workflow reference: `docs/DEVELOPMENT_WORKFLOW.md` (section: “Hosting Standard: Render (Effective 2026-02-19)”)
- Architecture decision: `docs/platform/ARCHITECTURE_DECISION_RECORD.md` (ADR: Hosting Standardization on Render)

### Deployment expectations (Node/Express)
- **Service type:** Web service (Node)
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment variables:** set `NODE_ENV=production` (+ additional secrets configured in Render dashboard)
- **Auto-deploy:** enabled for the main branch (per Render configuration)
- **Health verification:** validate the health endpoint if available (see `docs/src/routes/health.js`)

### Rules
- Do **not** commit secrets to the repository; configure them in Render.
- If additional services are introduced, extend the Render blueprint and update ops/workflow documentation accordingly.
