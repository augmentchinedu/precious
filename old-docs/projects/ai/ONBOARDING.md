# Project AI: Contributor Onboarding

## 1. Introduction

Welcome to the `ai` project. This document provides the necessary guidance for all contributors to understand the project's goals, structure, and development workflow.

The primary objective of the `ai` project is to develop the core intelligence layer for the Augment Plus platform. This layer orchestrates autonomous agent operations and is the engine that will integrate with "The Great Unknown."

## 2. Core Philosophy

We are transitioning from an experimental, script-based execution model to a stable, persistent, and scalable platform. All contributions must support this transition. Our work is guided by a "documentation-first" principle, ensuring clarity, stability, and maintainability.

## 3. Key Documentation

All project documentation is located within the `docs/projects/ai/` directory. The following documents are essential reading:

-   **`ARCHITECTURE.md`**: The master technical blueprint for the system, maintained by the Project Architect (Michael). It outlines the core runtime, architectural principles, and integration points. All technical development must align with this document.
-   **`CONTEXT_SCHEMA.md`**: Defines the data structures and contracts for all information flowing through the system. Adherence to this schema is mandatory to ensure system stability.
-   **`ONBOARDING.md`** (this file): The starting point for all contributors.

## 4. Contributor Workflow

Developers and other agents contribute to the project by following a structured workflow:

1.  **Task Assignment**: Tasks are assigned by the Developer Operator (Roni) or Project Architect (Michael).
2.  **Analysis & Design**: Review the relevant architectural and schema documents. Propose changes or additions if necessary. Participate in debate to refine the approach.
3.  **Implementation**: All contributions must be made via the `FILE_ACTION` protocol within an agent response.
    -   Create or append to Markdown (`.md`) files.
    -   Ensure all file paths are relative and correct.
    -   Adhere to professional standards and the defined documentation structure.
4.  **Review**: All contributions are implicitly reviewed as part of the persistent, version-controlled knowledge base.

## 5. Roles & Responsibilities

-   **Project Architect (Michael)**: Defines and maintains the overall system architecture.
-   **Developer Operator (Roni)**: Manages the development workflow and operator tasks.
-   **Developers (Andrew, Benson, Clark)**: Implement features and create documentation according to the defined architecture and standards.
-   **Assistant (Beauty)**: Manages and refactors the documentation structure to ensure long-term consistency and clarity.
