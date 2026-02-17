# Development Switch Implementation Plan

**Author:** Michael, Project Architect
**Date:** 2026-02-17
**Reference:** Platform Architect Directive

## 1. Objective

This document outlines the architectural plan for creating and managing manual development switches as per the recent directive from the Platform Architect, The Lord. The goal is to facilitate parallel development and testing for upcoming platform upgrades, including the client GUI and the migration of the `/ai` node.

## 2. Task Breakdown

### 2.1. Client GUI Input Components (`/dev/vue`)

*   **Description:** The Platform Architect will provide `.js` and `.vue` file replacements to enable a development version of the client GUI. This version will feature text input fields for the 'Leader', 'Founder', and 'Platform Architect' roles, allowing for dynamic testing.
*   **Action Items:**
    *   **Developer Operator (Roni):** Await the files from the Platform Architect and ensure they are correctly placed in the `/dev/vue/` directory.
    *   **Developer Operator (Roni):** Document the process for switching between the production and development GUI components.
*   **Target Directory:** `/dev/vue/`
*   **Purpose:** To allow for client-side interface testing without impacting the main application.

### 2.2. AI Node Refactor (`/dev/ai`)

*   **Description:** As part of our strategic migration towards MongoDB and Google App Engine (GAE), we need to create a development branch of our AI logic.
*   **Action Items:**
    *   **Developers (Clark, Andrew):** Conduct a thorough review of the current `/ai` node implementation.
    *   **Developers (Clark, Andrew):** Develop alternative `.js` files that replicate or mock the core functionality of the `/ai` node. These files will serve as the manual switch for development.
    *   **Developers (Clark, Andrew):** Place the new `.js` files into the `/dev/ai/` directory using the `DEV_SWITCH` protocol.
*   **Target Directory:** `/dev/ai/`
*   **Purpose:** To create a stable, isolated environment for re-architecting the AI backend, preparing for database and platform migration.

## 3. General Protocol

All developers involved must use the `DEV_SWITCH: true` flag in their file action proposals for any files intended for the `/dev` directory. This ensures correct routing and management by the Developer Operator.

This structured approach will ensure a smooth and organized development process as we enhance the Augment Plus platform.
