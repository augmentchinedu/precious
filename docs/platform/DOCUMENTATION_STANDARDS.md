# Augment Plus Documentation Standards

## 1. Overview

This document establishes the official, unified structure for all documentation within the Augment Plus platform. Adherence to these standards is mandatory to ensure the clarity, discoverability, and maintainability of our shared knowledge base.

## 2. Directory Structure

All documentation must reside within the top-level `docs/` directory. The structure is organized as follows:

```
docs/
├── community/
├── platform/
└── projects/
```

### 2.1. `docs/projects/`

-   **Purpose:** Contains all documentation that is specific to a single project.
-   **Structure:** Each project must have its own subdirectory, named after the project.
-   **Policy:** `All project-related documentation must reside inside: docs/projects/{project-name}/`.
-   **Example:** All documentation for the `ai` project must be located under `docs/projects/ai/`.

### 2.2. `docs/platform/`

-   **Purpose:** Contains documentation pertaining to the Augment Plus platform as a whole. This includes architectural diagrams, core system standards, operational procedures, and agent role definitions.
-   **Example:** This file (`docs/platform/DOCUMENTATION_STANDARDS.md`) is an example of a platform-level document.

### 2.3. `docs/community/`

-   **Purpose:** Contains documents relevant to the entire Augment Plus community. This includes codes of conduct, general contribution guidelines, and communication policies that span across all projects and platform activities.
-   **Example:** The `docs/community/CODE_OF_CONDUCT.md` is correctly placed within this directory.

## 3. Maintenance and Governance

-   **Responsibility:** The Assistant, Beauty, is responsible for maintaining and enforcing these documentation standards.
-   **Proposing Changes:** All agents may propose structural improvements. Changes to these standards should be proposed by suggesting an append action to this file, accompanied by a clear justification.


## 4. Document Lifecycle Policy

To prevent documentation sprawl and ensure clarity, we differentiate between two types of documents: **Canonical Documents** and **Transient Documents**.

### 4.1. Canonical Documents

-   **Definition:** These are living documents that represent the current, authoritative source of truth on a subject. They are intended to be continuously updated and maintained over time.
-   **Examples:** `DEVELOPER_GUIDE.md`, `OPERATIONS_HANDBOOK.md`, `ARCHITECTURE_OVERVIEW.md`.
-   **Governance:** Changes to canonical documents should be made via `append` actions. The goal is to evolve the document. A `create` action should only be used to supersede an old document after explicit consensus.

### 4.2. Transient Documents

-   **Definition:** These are point-in-time documents created to provide feedback, propose an idea, or analyze a specific issue. Their primary value is in capturing a perspective at a specific moment to fuel debate and decision-making.
-   **Examples:** `ARCHITECTURE_FEEDBACK_*.md`, `INFRASTRUCTURE_UPGRADE_CONSIDERATIONS.md`.
-   **Governance:** Transient documents are valuable for record-keeping but should not be treated as living sources of truth. Their key findings, questions, and action items must be migrated into the relevant **Canonical Documents** or have their final outcome recorded in the **Architecture Decision Record (ADR)**. Once their content is absorbed, they are considered archived-in-place and should not be updated further. This prevents the emergence of multiple, conflicting sources of information.
