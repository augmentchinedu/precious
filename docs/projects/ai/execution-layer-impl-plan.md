# Execution Layer Implementation Plan

## 1. Introduction

This document outlines the implementation plan for the **Execution Layer**, based on the technical specification found in `execution-layer-spec.md`. It is intended to guide the development process for Andrew, Benson, and Clark.

## 2. Technology Stack

-   **Runtime:** Node.js (as it is a listed capability of the organization).
-   **Core Dependencies:**
    -   File System: Native `fs` module.
    -   Version Control: A library like `simple-git` to interface with the Git command line.
    -   Logging: A robust logging library like `pino` for efficient JSONL output.

## 3. Modular Breakdown

The Execution Layer will be built as a set of distinct, testable modules that are orchestrated by a central controller. This aligns with the architectural principle of Modularity.

### 3.1. `ActionParser`

-   **Responsibility:** Ingests the raw agent output and extracts the `FILE_ACTION` block.
-   **Input:** String (Full agent output).
-   **Output:** Object `{ type, path, content }` or `null` if no valid block is found.

### 3.2. `ActionValidator`

-   **Responsibility:** Validates the parsed action object against the rules defined in the specification.
-   **Input:** The output object from `ActionParser`.
-   **Tasks:**
    -   Verify `type` is `create` or `append`.
    -   Verify `path` is a relative path targeting a `.md` file.
    -   Check for directory traversal characters (`..`) in the path for security.
    -   Verify content is not empty.

### 3.3. `FileSystemManager`

-   **Responsibility:** Executes the validated file system operations.
-   **Input:** A validated action object.
-   **Methods:**
    -   `handleCreate(path, content)`: Checks for file existence, then creates the file.
    -   `handleAppend(path, content)`: Checks for file existence, then appends to the file.
-   **Error Handling:** Must throw specific errors for "File already exists" or "File not found".

### 3.4. `VersionControlManager`

-   **Responsibility:** Stages and commits the file change.
-   **Input:** The `path` of the modified file and metadata about the originating agent.
-   **Tasks:**
    -   Stage the specific file (`git add <path>`).
    -   Construct the standardized commit message as per the specification.
    -   Execute the commit (`git commit -m "..."`).
    -   Return the resulting commit hash.

### 3.5. `AuditLogger`

-   **Responsibility:** Writes structured logs for every processed action.
-   **Location:** `logs/execution-layer.log`
-   **Input:** A log object containing `timestamp`, `agent`, `action`, `status`, and `details`.
-   **Action:** Appends the log object as a single line of JSON to the log file.

### 3.6. `ExecutionController`

-   **Responsibility:** The main entry point that orchestrates the workflow.
-   **Workflow:**
    1.  Call `ActionParser`.
    2.  Call `ActionValidator`.
    3.  Call `FileSystemManager`.
    4.  Call `VersionControlManager`.
    5.  Call `AuditLogger` at each step to record progress and outcome.
    6.  Return the final status object.

## 4. Task Breakdown & Suggested Assignment

To begin parallel development, the work can be divided as follows. This is a suggestion to facilitate immediate progress.

| Task                                 | Primary Developer | Description                                                                |
|
