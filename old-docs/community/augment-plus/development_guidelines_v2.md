# Augment Plus Development Guidelines (v2): Adapting to New Platform Architecture

**Date:** 2026-02-21
**Author:** Michael (Project Architect, Augment Plus)
**Status:** Approved

## 1. Introduction

This document outlines updated development guidelines for the Augment Plus community, reflecting recent significant advancements in the platform's architecture, deployment strategy, and development workflow. Adherence to these guidelines is crucial for maintaining consistency, quality, and scalability across all modules and projects developed by Augment Plus.

## 2. Key Platform Architectural Updates and Their Impact on Augment Plus

### 2.1. Google Cloud Platform (GCP) Project Segregation

*   **Update:** The platform now operates with distinct Google Cloud Platform projects for **development** and **production** environments.
*   **Impact:** Augment Plus modules and services must be designed for seamless deployment and operation within both isolated environments. Developers should be aware of environment-specific configurations (e.g., API keys, database connections) that differentiate these projects.

### 2.2. Cloud Run as Primary Platform-as-a-Service (PaaS)

*   **Update:** Cloud Run has been adopted as the primary PaaS for deploying service nodes, with the intent to migrate all five existing nodes.
*   **Impact:**
    *   **Node.js Services:** All Node.js services developed within Augment Plus (e.g., `modules/node` implementations) **must be stateless**. Design for rapid startup and efficient resource utilization, leveraging Cloud Run's auto-scaling capabilities.
    *   **Containerization:** Familiarity with containerization principles (Docker) is recommended, as Cloud Run operates on containers.

### 2.3. Centralized CDN for Routes and Data

*   **Update:** Platform routes and node-specific data are uploaded to a Content Delivery Network (CDN) via Google Cloud Storage for efficient access during build and deployment runtimes.
*   **Impact:**
    *   **Configuration & Data Retrieval:** Modules requiring shared configurations or dynamic data during their lifecycle should implement mechanisms to fetch these resources from the designated CDN/GCS buckets.
    *   **Build Process:** The `modules/build` pipeline and related tools must correctly interact with the CDN for route generation and distribution.

### 2.4. Automated Cloud Build Pipeline & Submodules

*   **Update:** A Cloud Build pipeline automatically integrates all submodules during the build process.
*   **Impact:** Augment Plus module repositories (`modules/node`, `modules/models`, `modules/schemas`, `modules/components`) must maintain a clean and consistent structure, ensuring they can be seamlessly added and built by the centralized pipeline. This simplifies dependency management and build automation.

### 2.5. Modular Service Deployment

*   **Update:** Services are designed to be deployable using their respective `node` modules.
*   **Impact:** This reinforces the modular design principle. Each Node.js service developed by Augment Plus should function as an independent, deployable unit with clearly defined responsibilities and interfaces.

### 2.6. Automated Router Generation

*   **Update:** The node routers build pipeline generates a dedicated `router` directory exporting the applications' router.
*   **Impact:** When defining API endpoints for Augment Plus services, developers must adhere to the standardized router generation schema and conventions to ensure consistency and proper integration within the platform's routing mechanism.

### 2.7. Enhanced Quality Assurance (QA)

*   **Update:** Mandatory Vitest pre-push checks are enforced on all modules, and comprehensive testing occurs in the "Precious" environment.
*   **Impact:** **All code pushed to origin from Augment Plus members MUST pass Vitest checks.** Robust unit, integration, and end-to-end tests are now a mandatory part of every module's development lifecycle. This significantly raises the bar for code quality and stability.

### 2.8. Continuous Integration with Dev Branches

*   **Update:** All development branches are connected to dedicated development applications on Cloud Run.
*   **Impact:** This enables continuous integration and rapid testing of new features in a production-like environment. Developers should leverage this capability for early validation and defect detection.

### 2.9. Project Structure: `modules/` vs `dev/`

*   **Update:** `modules/` houses reusable core modules, while `dev/` serves constructed projects in development mode.
*   **Impact:**
    *   **`modules/`:** This directory is for highly reusable, independent components (e.g., `models`, `schemas`, `components`, generic `node` functionality).
    *   **`dev/`:** This directory is for integrated, application-specific projects where multiple modules are brought together for development, testing, and deployment (e.g., `dev/node/express`, `dev/node/ai`).

## 3. Actionable Recommendations for Augment Plus Developers

*   **Stateless Node.js Design:** Prioritize statelessness in all Node.js service development for Cloud Run compatibility.
*   **CDN-Awareness:** Design configuration and data loading mechanisms to efficiently utilize the CDN/GCS for dynamic content.
*   **Testing First:** Implement comprehensive Vitest tests for all new features and bug fixes. No pull request will be merged without passing pre-push checks.
*   **Standardized Routing:** Adhere strictly to the platform's router generation conventions for all API endpoints.
*   **Leverage `dev/`:** Utilize the `dev/` directory for integrated project development and testing, keeping core `modules/` focused on reusability.
*   **Stay Informed:** Regularly review platform updates and documentation to adapt to evolving architectural patterns.

## 4. Conclusion

These guidelines are designed to empower the Augment Plus community to build high-quality, scalable, and maintainable software within the evolving platform architecture. By embracing these principles, we will collectively contribute to the robustness and efficiency of The Great Unknown.
