# FileSystemManager Module Design

## 1. Introduction

This document provides the detailed design for the `FileSystemManager` module, a core component of the Execution Layer. It is based on the task assigned in `execution-layer-impl-plan.md` and must adhere to the requirements in `execution-layer-spec.md`.

## 2. Core Responsibilities

The `FileSystemManager` is exclusively responsible for performing `create` and `append` operations on the local file system in a secure and reliable manner. It will expose two primary methods: `handleCreate` and `handleAppend`.

## 3. Security: Path Resolution and Validation

All file operations will be preceded by a mandatory path validation step to mitigate security risks.

1.  **Input:** A relative path from the `FILE_ACTION` block (e.g., `docs/projects/ai/file.md`).
2.  **Normalization:** The path will be normalized to resolve any redundant separators (e.g., `//`).
3.  **Traversal Check:** The normalized path will be inspected to ensure it does not contain `..` segments. Any attempt at directory traversal will immediately fail the operation with a `PathTraversalError`.
4.  **Absolute Path Generation:** The validated relative path will be joined with the absolute path of the repository root to create a final, fully-qualified path for the file system operation.
5.  **Boundary Check:** This final absolute path will be checked to ensure it is still located *within* the repository root directory.

This process ensures that no agent action can read from or write to any location outside the project repository.

## 4. Method Specification

### 4.1. `handleCreate(path, content)`

-   **Description:** Creates a new `.md` file. This operation must be atomic.
-   **Input:**
    -   `path`: The validated relative path of the file to create.
    -   `content`: The Markdown string to write to the file.
-   **Logic Flow:**
    1.  Perform the path resolution and validation steps described in Section 3.
    2.  Check if a file already exists at the target path. If it does, throw a `FileAlreadyExistsError`.
    3.  Ensure the parent directory for the target path exists. If not, create it recursively (equivalent to `mkdir -p`).
    4.  Write the `content` to the specified path.
-   **Success:** The method completes without throwing an error.
-   **Failure Conditions & Errors:**
    -   `PathTraversalError`: If the path attempts to navigate outside the repository.
    -   `FileAlreadyExistsError`: If a file at `path` already exists.
    -   `WriteError`: If any file system error occurs during directory or file creation.

### 4.2. `handleAppend(path, content)`

-   **Description:** Appends content to an existing `.md` file.
-   **Input:**
    -   `path`: The validated relative path of the file to append to.
    -   `content`: The Markdown string to append.
-   **Logic Flow:**
    1.  Perform the path resolution and validation steps described in Section 3.
    2.  Check if a file exists at the target path. If it does *not*, throw a `FileNotFoundError`.
    3.  Prepare the content to be appended by prepending two newline characters (`\n\n`) to the input `content`, as specified by Roni's specification. This ensures a clean separation between appended blocks.
    4.  Append the prepared content to the end of the file.
-   **Success:** The method completes without throwing an error.
-   **Failure Conditions & Errors:**
    -   `PathTraversalError`: If the path attempts to navigate outside the repository.
    -   `FileNotFoundError`: If the file at `path` does not exist.
    -   `AppendError`: If any file system error occurs during the append operation.

## 5. Error Handling Strategy

The `FileSystemManager` will not handle its own errors. Instead, it will throw specific, custom error types that the `ExecutionController` can catch and use to generate a precise failure response.

Proposed custom error classes:
-   `FileSystemManagerError` (Base class)
-   `PathTraversalError` (Inherits from base)
-   `FileAlreadyExistsError` (Inherits from base)
-   `FileNotFoundError` (Inherits from base)
-   `WriteError` (Inherits from base)
-   `AppendError` (Inherits from base)

This design ensures that the business logic of file management is cleanly separated from the orchestration and response logic in the controller.
