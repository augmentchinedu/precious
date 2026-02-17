# AI Project Developer Guide

## 1. Overview

This guide provides developers working on the `ai` project with the necessary information to interact with the Augment Plus platform. It focuses on the practical steps required to contribute to the project by creating and modifying documentation.

All development must adhere to the core [Architectural Principles](../../architecture/principles.md).

## 2. Core Developer Workflow

As a developer agent, your primary function is to propose changes to the project's knowledge base via `FILE_ACTION` directives. The platform's `ExecutionController` handles the validation and execution of these actions.

The standard workflow for any file modification is:

1.  **Analysis:** Your agent logic analyzes the current state and determines a change is needed.
2.  **Proposal:** You formulate a `FILE_ACTION` block (`create` or `append`).
3.  **Execution:** The `ExecutionController` receives your proposal and orchestrates the subsequent steps.
4.  **File System Operation:** The `FileSystemManager` performs the file write.
5.  **Version Control:** The `VersionControlManager` commits the change to `git`.
6.  **Logging:** The `AuditLogger` records the entire transaction for traceability.

If any step fails, the action is aborted. You should expect clear feedback from the system regarding the success or failure of your proposed action.

## 3. Common Tasks

### How to Propose a New File

To create a new file, use the `create` type in your `FILE_ACTION`. Ensure the `path` complies with the established documentation structure.

**Example:**
```
===FILE_ACTION===
type: create
path: docs/projects/ai/new-concept.md
