# AI Node Review: Agent Execution & Context Management

**Author:** Benson, Developer
**Date:** 2026-02-17
**Reference:** `docs/project/dev_switch_plan.md`, `docs/ai/review_andrew.md`

## 1. Introduction

This document provides a review of the agent execution model within the `/ai` node, complementing Andrew's analysis of the data persistence layer. The goal is to outline a refactoring strategy that makes our agent execution stateless, a critical requirement for migrating to a scalable cloud environment like Google App Engine (GAE).

## 2. Analysis of the Current Execution Model

Based on the system's behavior, it's likely that the current `/ai` node operates on a stateful execution model:

*   **In-Memory Context:** A large `CONTEXT` object, containing the entire state of the simulation (platform details, file index, debate history, etc.), is likely loaded into memory at the start of a run.
*   **Sequential Execution:** Agents are probably invoked sequentially, with each agent's function receiving and potentially modifying this single, monolithic context object directly.
*   **State Dependency:** An agent's output depends on the modifications made to the context by the previous agent in the same run. This creates a tight coupling and makes the process fragile and difficult to scale.

## 3. Problems with the Stateful Model

This approach presents several challenges for our future architecture:

*   **Scalability:** A single, large state object prevents us from running agent executions in parallel or distributing them across multiple server instances on GAE.
*   **Resilience:** If the process crashes mid-run, the entire in-memory state is lost, leading to data inconsistency.
*   **Testability:** Testing a single agent's logic is difficult, as it requires constructing the entire complex state object it expects as input.

## 4. Proposed Refactoring for a Stateless Execution Model

To align with the principles of GAE and the proposed MongoDB backend, I propose refactoring towards a stateless, transactional execution model for each agent.

**Core Concept:** Treat each agent's turn as an independent, stateless function call.

**Execution Flow:**

1.  **Load Minimum Context:** Instead of loading everything, the execution harness would fetch only the necessary data for the current agent from the database. This would use the data access layer proposed by Andrew (the future `mock-datastore.js`). This data includes the agent's profile, the immediate prompt/task, and recent relevant history.
2.  **Execute Agent Logic:** The agent's core logic function is called with this lean, specific context. The function's sole responsibility is to process the input and return a result (e.g., its response and any file actions). It should not modify the input context directly.
3.  **Persist Results:** The output from the agent function (the response string) is saved back to the database, likely appended to the `debateHistory`. Any `FILE_ACTION` blocks are handled by a separate, dedicated service that also logs its actions to the database.

## 5. Next Steps for `/dev/ai` Development

In line with this strategy, I will work with Clark and Andrew on the `.js` files for `/dev/ai`. My focus will be on:

*   **`agent-runner.js`**: I can develop a new runner module that implements the stateless execution flow described above. It will use Andrew's `mock-datastore.js` to fetch context and persist results for a single agent turn.
*   **Refactoring an Agent:** I will take one of the agent roles and refactor its logic to be a pure function, dependent only on the inputs it receives, preparing it to be used by the new `agent-runner.js`.

This approach ensures our work on the `/ai` node is comprehensive, addressing both the data layer (Andrew's focus) and the application logic layer (my focus), getting us ready for a scalable and robust future.
