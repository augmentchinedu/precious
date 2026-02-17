# Developer Operations Handbook

## 1. Introduction

This handbook outlines the standard operating procedures for the development team at Augment Plus. Its purpose is to ensure a consistent, stable, and efficient development lifecycle. Adherence to these guidelines is crucial for maintaining code quality, system stability, and alignment with the platform's architectural vision.

This document is maintained by Roni (Developer Operator).

## 2. Core Principles

*   **Stability First:** Our primary goal is to protect the stability of the platform. No change should compromise the integrity of our systems.
*   **Clarity and Consistency:** We follow consistent workflows to reduce errors and improve collaboration.
*   **Architectural Alignment:** All code must adhere to the architectural patterns and decisions defined by the Project Architect (Michael) and approved by the Platform Architect (The Lord).
*   **Ownership and Accountability:** Developers are responsible for the quality of their code, from their local machine through to production.

## 3. Roles & Responsibilities

*   **Developer Operator (Roni):**
    *   Oversees the end-to-end development lifecycle.
    *   Manages development, staging, and production environments.
    *   Manages the CI/CD pipeline and deployment processes.
    *   Conducts final code reviews for merge-readiness and operational soundness.
    *   Acts as the gatekeeper for merges into main/release branches.

*   **Developers (Andrew, Benson, Clark):**
    *   Implement features according to architectural specifications.
    *   Write clean, maintainable, and tested code.
    *   Participate in peer code reviews.
    *   Create pull requests for all new code.

## 4. Development Workflow & Git Branching Strategy

We will follow a simplified Gitflow model to ensure a clear separation of work.

1.  **`main` Branch:** This branch represents the production-ready code. Direct commits are strictly forbidden. Merges only come from the `develop` branch during a release.
2.  **`develop` Branch:** This is our main integration branch. It contains the latest delivered development changes for the next release.
3.  **Feature Branches (`feature/...`):**
    *   All new development work must be done in a feature branch.
    *   Branches should be created from `develop`.
    *   Naming convention: `feature/TICKET-ID-brief-description` (e.g., `feature/AGP-123-user-authentication`).
    *   Once a feature is complete, a Pull Request (PR) is opened to merge it back into `develop`.

## 5. Code Review & Pull Request (PR) Process

1.  **Create PR:** Developer opens a PR from their `feature/...` branch into the `develop` branch.
2.  **PR Description:** The PR must include a clear description of the changes, the problem it solves, and instructions for testing.
3.  **Peer Review:** At least one other developer must review the PR for logic, style, and adherence to standards.
4.  **Operator Review:** After peer approval, Roni (Developer Operator) performs a final review, checking for operational risks, environmental compatibility, and adherence to the deployment process.
5.  **Merge:** Upon approval from Roni, the PR is merged into `develop`.

## 6. Environment Management & DEV_SWITCH

*   **Development Environments:** Developers are responsible for their local development environments.
*   **Staging Environment:** The `develop` branch is automatically deployed to a staging environment for integration testing and QA.
*   **Production Environment:** The `main` branch reflects the code running in production.
*   **`DEV_SWITCH` Files:**
    *   `DEV_SWITCH` files are a mechanism for developers to request manual operational changes that cannot be automated through the CI/CD pipeline.
    *   **Use Cases:** Toggling feature flags, running a one-off data migration script, or other sensitive manual interventions.
    *   **Protocol:** A developer proposes a `DEV_SWITCH` file in the `/dev` directory. This file must be reviewed and executed by Roni, who is responsible for assessing its impact on system stability before actioning it. This creates an audit trail for manual operations.
