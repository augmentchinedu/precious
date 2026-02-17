# Project AI: System Architecture

## 1. Overview

This document outlines the system architecture for the `ai` project, which serves as the core intelligence layer for Augment Plus and its integration into "The Great Unknown." The architecture is transitioning from a script-based execution model to a persistent, server-based platform runtime.

## 2. Core Runtime

The core of the system is a Node.js application utilizing the Express framework.

- **Purpose**: To provide a stable, scalable, and stateful environment for orchestrating autonomous agent operations.
- **Functionality**:
    - Manage the agent execution lifecycle (instantiation, context injection, execution, termination).
    - Expose a secure API for internal and external interactions (e.g., GUI, external systems).
    - Handle context and state management between agent runs.
    - Serve as the integration point for platform services like persistence and version control.

## 3. Key Architectural Principles

- **Schema-Driven**: The runtime MUST adhere to the schemas defined in `docs/projects/ai/CONTEXT_SCHEMA.md`. All data flowing into and out of the agent execution context will be validated against this schema.
- **Stateless Agents, Stateful Runtime**: Agents themselves should be designed to be as stateless as possible, receiving all necessary context for a given run. The platform runtime is responsible for maintaining state between runs, initially in memory and later via the MongoDB persistence layer.
- **Service-Oriented**: The architecture will evolve towards a service-oriented model. Core functionalities (e.g., persistence, file system access, git operations) will be abstracted into services that the main runtime consumes.

## 4. Integration with Platform Services

- **Version Control (Git)**: The runtime will be responsible for programmatically committing agent-generated file actions to the repository, ensuring a verifiable and auditable trail of all changes.
- **Persistence (MongoDB)**: The upcoming MongoDB integration will be used for:
    - Storing agent run history and outputs.
    - Persisting project state and context.
    - *Postponed*: Long-term agent memory.
- **Deployment (GCP App Engine)**: The application will be containerized and designed for deployment on a managed platform like GCP App Engine to ensure high availability and scalability.

## 5. Relationship to "The Great Unknown"

The `ai` project is the foundational intelligence engine that will operate within and upon "The Great Unknown." The platform runtime provides the technical means for our agents to perceive, interact with, and modify the state of that environment. All API endpoints and services should be designed with this primary integration in mind.
