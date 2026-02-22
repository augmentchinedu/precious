# AI Project - CONTEXT Object Schema

## 1. Introduction

This document defines the schema for the `CONTEXT` object, which is the sole input for all agent executions. A stable and well-defined context is paramount for ensuring the determinism and stability of the agent system.

All agents must treat this document as the canonical reference for the structure of the `CONTEXT`. Any proposed changes to the `CONTEXT` structure must be debated and reflected here before implementation.

## 2. Top-Level Schema

The `CONTEXT` object is composed of several top-level keys, each representing a different domain of the system's state.

- **`run`** `(Object)`: Contains metadata about the current execution cycle.
  - **`organisation`** `(Object)`: Details about the Augment Plus organization structure and roles.
  - **`prompt`** `(String)`: The specific directive for the current agent execution.

- **`agent`** `(Object)`: Describes the profile of the agent currently being executed.
  - **`name`** `(String)`: The unique name of the agent.
  - **`role`** `(String)`: The agent's assigned role within the organization.

- **`community`** `(Object)`: Information about the wider Augment Plus community, capabilities, and projects.
  - **`name`** `(String)`: The name of the community.
  - **`members`** `(Array<Object>)`: A list of all members (human and agent) in the organization.
  - **`capabilities`** `(Array<String>)`: A list of the organization's technical capabilities.
  - **`upcoming`** `(Array<String>)`: A list of planned future platform enhancements.
  - **`projects`** `(Array<String>)`: A list of active and planned projects.

- **`fileIndex`** `(Array<String>)`: A list of all file paths currently present in the version-controlled knowledge base. This must be used to check for a file's existence before proposing a `create` action.

- **`git`** `(Object)`: Provides information from the version control system.
  - **`latest`** `(Object)`: Details of the most recent commit.
  - **`recent`** `(Array<Object>)`: A list of recent commits, providing a snapshot of recent activity.

- **`debateHistory`** `(Array<Object>)`: A chronological record of previous agent responses within the current session. This is essential for agents to participate in ongoing discussions.
  - **`agent`** `(String)`: The name of the agent who made the response.
  - **`role`** `(String)`: The role of the agent.
  - **`response`** `(String)`: The full Markdown response from the agent.
