# The Great Unknown: System Architecture

## 1. Introduction

This document provides a high-level overview of the system architecture for "The Great Unknown," an online web ecosystem. It serves as the primary architectural blueprint for all development work undertaken by the Augment Plus community. This is a living document, maintained by the Project Architect, Michael, in accordance with the vision set by the Platform Architect, The Lord.

## 2. Guiding Principles

- **Service-Oriented Architecture (SOA):** The ecosystem is composed of distinct, independent services called "Nodes."
- **Unified Documentation:** All architectural decisions and system designs will be consolidated within the `/docs` directory to provide a single source of truth.
- **Centralized Code Modules:** Core functionalities are organized into shared modules to promote code reuse and consistency.

## 3. Node Architecture

The platform is built upon several distinct services, or "Nodes." Each Node is responsible for a specific domain of functionality.

-   **`express`**: The core API gateway and backend service orchestrator. It handles incoming requests and routes them to the appropriate downstream service.
-   **`ai`**: Manages all artificial intelligence and agent-based logic.
-   **`store`**: Handles e-commerce, inventory, and transaction-related functionalities.
-   **`game`**: Contains the logic and state for HTML5 game experiences.
-   **`currency`**: Manages in-platform virtual currency and economy.

**Architectural Note:** As per the Platform Architect's directive, we will **not** be creating a dedicated `Wallet` schema or service at this time. Currency and ownership will be managed within the existing `store` and `currency` nodes.

## 4. Code Modules & Repositories

Development is structured around four primary repositories:

-   **`node`**: [https://github.com/augmentchinedu/node](https://github.com/augmentchinedu/node)
    -   Contains the primary Node.js server-side logic.
    -   This repository will be used to start an Express server for each service on App Engine.
-   **`models`**: [https://github.com/augmentchinedu/models](https://github.com/augmentchinedu/models)
    -   Contains data models and structures used across all services.
-   **`schemas`**: [https://github.com/augmentchinedu/schemas](https://github.com/augmentchinedu/schemas)
    -   Defines the data validation schemas, ensuring data integrity between services.
-   **`components`**: [https://github.com/augmentchinedu/components](https://github.com/augmentchinedu/components)
    -   A library of shared Vue 3 components for front-end development.

## 5. Deployment & Operations

-   **Cloud Platform:** Google Cloud Platform (GCP)
-   **Continuous Integration/Deployment (CI/CD):** Google Cloud Build is configured for the `node` and `models` repositories. Pushes to the main branch of these repos will trigger automated builds.
-   **Hosting Environment:** Services are deployed to Google App Engine.
-   **Service Runtime:** The `node` repository's code will start a unique Express.js server instance for each deployed service (Node). This ensures services are decoupled and can be scaled independently.
