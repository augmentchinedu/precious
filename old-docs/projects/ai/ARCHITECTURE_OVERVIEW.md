# AI Project: Architecture Overview

## 1. Introduction

This document outlines the high-level architecture for the `ai` project within Augment Plus. Its purpose is to establish a common understanding of the system's design, guide development, and ensure alignment with the broader platform evolution, including planned migrations to MongoDB and Google Cloud Platform (GCP).

## 2. Core Architectural Principles

All development within the `ai` project must adhere to the following principles to ensure stability, scalability, and long-term maintainability.

*   **Stateless Execution:** Agents should be designed to be stateless within a single execution cycle. All necessary state must be loaded from the persistence layer at the start of a run and saved back at the end. Do not rely on in-memory variables persisting between separate agent invocations.
*   **Persistence Abstraction:** All interactions with data storage (e.g., agent state, knowledge base files) must go through a defined Persistence Layer. This decouples agent logic from the underlying storage mechanism (currently file system, eventually MongoDB).
*   **Modularity and Loose Coupling:** Agents, capabilities, and system components must be designed as modular, loosely coupled units. This allows for independent development, testing, and replacement.
*   **Configuration-driven:** System behavior and agent composition should be driven by configuration where possible, rather than being hardcoded. This improves flexibility and simplifies management.

## 3. High-Level Components

The `ai` system is composed of several key logical components:

*   **Execution Engine:** The core process responsible for orchestrating an agent run. It loads the agent, injects context, invokes the agent's logic, and manages the post-execution action dispatch.
*   **Context Provider:** Assembles the `CONTEXT` JSON object provided to an agent at the start of a run. It is responsible for gathering platform state, file indexes, debate history, and other relevant information.
*   **Agent Core:** The fundamental structure defining an agent. It includes the agent's role, capabilities, and the primary execution logic.
*   **Action Dispatcher:** A service that receives and processes actions proposed by agents, such as `FILE_ACTION`. It is responsible for validating and executing these actions against the system's knowledge base.
*   **Persistence Layer (Interface):** An abstract interface defining the contract for storing and retrieving data.
    *   **Methods:** `read(path)`, `write(path, content)`, `append(path, content)`.
    *   **Implementation:** The current implementation uses the local file system. A future implementation will target MongoDB without requiring changes to the agent's core logic.

## 4. Future Platform Integration

*   **MongoDB:** The Persistence Layer interface is designed to make the transition to MongoDB seamless from the agent's perspective.
*   **GCP App Engine:** The principle of Stateless Execution is critical for compatibility with scalable cloud runtimes like App Engine.
*   **Memory Layer:** The architecture is designed to accommodate a future Memory Layer, likely as a more advanced implementation of the Persistence Layer interface, providing more sophisticated query and retrieval capabilities.


## 5. Refined Persistence Architecture (Update)

Based on critical feedback and further analysis, the single Persistence Layer concept is being refined into two distinct, specialized interfaces to better align with our immediate needs and future migration to MongoDB.

### 5.1. Knowledge Base Interface

This interface governs interaction with the version-controlled corpus of Markdown files (e.g., the `docs/` directory). It is file-path-oriented and is used internally by the `Action Dispatcher`. Agents do not call this interface directly; they propose `FILE_ACTION`s, which the dispatcher then executes using this interface.

-   **Purpose:** To manage the content of the shared, version-controlled knowledge base.
-   **Interface Methods:** `read(path)`, `write(path, content)`, `append(path, content)`.
-   **Access Pattern:** Mediated by the `Action Dispatcher` to ensure validation and control.

### 5.2. Document Store Interface

This interface provides a document-oriented database abstraction for all other persistence needs, including agent state ("short-term memory"), logs, and other structured records. This design is explicitly chosen to align with the upcoming MongoDB migration.

-   **Purpose:** To provide a robust, queryable, and scalable mechanism for managing structured application data.
-   **Interface Methods (as proposed by Andrew):**
    -   `create_document(collection: str, document: dict) -> str`
    -   `get_document(collection: str, document_id: str) -> dict | None`
    -   `update_document(collection: str, document_id: str, updates: dict)`
    -   `delete_document(collection: str, document_id: str)`
    -   `find_documents(collection: str, filter: dict) -> list[dict]`
-   **Current Implementation:** Will be implemented on the file system for the interim (e.g., using directories for collections and JSON files for documents).
-   **Future Implementation:** Will be implemented using a native MongoDB driver, requiring no changes to agent logic.

This dual-interface approach provides the architectural clarity needed for developers to build effectively today, while ensuring a seamless transition to a more powerful backend tomorrow. It correctly separates the concerns of managing unstructured text files from managing structured data.


## 5. Refined Persistence Layer Architecture

**Status:** Adopted per `ADR-001` process.

Based on detailed proposals and developer feedback (specifically Andrew's `PERSISTENCE_LAYER_DESIGN_PROPOSAL.md`), the high-level Persistence Layer interface has been refined. The initial file-centric proposal is superseded by a more robust, document-oriented model to better align with the planned migration to MongoDB (see `ADR-002`).

This decision formalizes the standard Data Access Layer (DAL) for the `ai` project.

### 5.1. Unified Document-Oriented Interface

Instead of separate interfaces for knowledge and state, the system will expose a single, unified persistence interface based on collections and documents.

*   **Rationale:** This provides a consistent data access pattern for all developers, simplifies the mental model of the system, and directly prepares all agent logic for the eventual MongoDB backend. It avoids the creation of technical debt and a costly future migration.
*   **Reference:** The canonical definition for this interface is specified in `docs/projects/ai/PERSISTENCE_LAYER_DESIGN_PROPOSAL.md`.

### 5.2. Initial File-System Implementation

The initial implementation of this interface will be backed by the file system.

*   **Collections** will be mapped to directories.
*   **Documents** will be mapped to individual JSON files within those directories.
*   **Note:** Query operations (`find_documents`) in this implementation may be slow as they will rely on in-memory filtering. This is an acceptable limitation for development and reinforces the need for the MongoDB migration.

This refinement ensures our architectural principles are backed by a concrete, forward-looking technical specification that promotes long-term system stability.
