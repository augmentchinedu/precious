# AI Project: System Interfaces

## 1. Introduction

This document provides the technical specification for the core interfaces within the `ai` project. It serves as a contract for developers building agents and for the team implementing the core Execution Engine. These interfaces are derived from the principles in `ARCHITECTURE_OVERVIEW.md`.

## 2. The Agent Interface

All agents must conform to a standard interface to be executable by the platform's Execution Engine.

- **`execute(context: dict) -> list[dict]`**
    - **Description:** The single entry point for an agent. The Execution Engine calls this method, passing the entire system context.
    - **Parameters:**
        - `context`: A dictionary containing all information available to the agent for the current run, including platform state, file indexes, debate history, etc.
    - **Returns:**
        - A list of action dictionaries. An agent may propose zero or more actions per run. Returning an empty list signifies a "no-op" run.

## 3. The Action Protocol

Agents do not act directly. They propose actions as structured data, which are then processed by the Action Dispatcher. This provides a crucial layer of security and validation.

- **Structure:** All actions are dictionaries containing `type`, `path` (if applicable), and other required fields.
- **Example (`FILE_ACTION`):**
    ```
    {
      "type": "file",
      "action": "create" | "append",
      "path": "relative/path/to/file.md",
      "content": "Markdown content here"
    }
    ```
- **Expansion:** This protocol is designed to be extensible. Future action types (e.g., `api_call`, `database_query`) will be defined here.

## 4. The Persistence Interface (Knowledge Base)

This interface defines the contract for interacting with the long-term, version-controlled knowledge base (i.e., the Git repository).

- **`read(path: str) -> str`**: Reads the content of a file.
- **`write(path: str, content: str)`**: Creates or overwrites a file.
- **`append(path: str, content: str)`**: Appends content to an existing file.
- **`index() -> dict`**: Returns a representation of the file system structure.

*Implementation Note: This interface is currently backed by the local file system. The future MongoDB implementation will conform to this same contract.*

## 5. The StateStore Interface (Short-Term Memory)

This interface provides a mechanism for agents to persist small amounts of state between executions, serving as the "short-term memory" layer. It is a key-value store scoped to the agent.

- **`set(key: str, value: any)`**: Stores a value associated with a key for the agent.
- **`get(key: str) -> any`**: Retrieves a value for a given key.
- **`delete(key: str)`**: Removes a key-value pair.
- **`get_all() -> dict`**: Retrieves all key-value pairs for the agent.

*Implementation Note: Initially, this can be implemented as a simple JSON file per agent or a collection in the future MongoDB instance. This formally addresses the need for an interim memory solution.*
