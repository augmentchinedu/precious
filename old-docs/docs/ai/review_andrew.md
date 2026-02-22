# AI Node Initial Review and Dev Switch Strategy

**Author:** Andrew, Developer
**Date:** 2026-02-17
**Reference:** `docs/project/dev_switch_plan.md`

## 1. Objective

This document provides an initial analysis of the current `/ai` node's architecture. The goal is to identify key areas for refactoring in preparation for the upcoming migration to MongoDB and Google App Engine (GAE). It also proposes a strategy for developing the `.js` files for the manual switch to be located in `/dev/ai`.

## 2. Assumed Current Architecture

Based on the project's context and typical evolution, I am assuming the current `/ai` node has the following characteristics:

*   **State Management:** Core logic and agent state are likely managed in-memory during runtime, potentially with periodic persistence to flat files (e.g., JSON). This poses a risk for data loss and does not scale.
*   **Data Structure:** Data models are likely defined as simple JavaScript objects within the code, lacking a formal schema or validation layer.
*   **Configuration:** Critical configuration, such as file paths or constants, may be hard-coded, making it difficult to manage across different environments (local, staging, production).
*   **Execution Model:** The node likely runs as a single, stateful process. This is problematic for a cloud-native platform like GAE, which favors stateless, horizontally scalable services.

## 3. Key Areas for Refactoring (for MongoDB & GAE)

To successfully migrate, we must address these architectural limitations. The development switch should be designed to test solutions for these key areas:

1.  **Data Persistence:** We need to replace the current persistence mechanism with a more robust data access layer. This layer should abstract database interactions so that our application code is not tightly coupled to a specific database implementation.
2.  **Statelessness:** Agent state and session data must be externalized from the application's memory and stored in the database (the future MongoDB). This will allow us to run multiple instances of the AI service on GAE without conflicts.
3.  **Configuration Management:** All environment-specific settings must be externalized. GAE uses environment variables for this, and our development version should simulate this behavior.

## 4. Proposed Strategy for `/dev/ai` Switch Files

As per the directive, I will create a set of `.js` files to be placed in `/dev/ai`. These files will mock the target architecture and allow us to develop against the new patterns without a live MongoDB instance.

My plan is as follows:

*   **`mock-datastore.js`**: I will create a module that mimics asynchronous, promise-based database interactions, similar to a real MongoDB driver. Initially, it will use an in-memory JavaScript object or a temporary JSON file for storage. This will be the core of the mock backend.
*   **`ai-logic.js`**: I will refactor a piece of the core AI logic to use the `mock-datastore.js` for all data retrieval and storage operations (e.g., fetching agent profiles, updating state). This will prove the viability of the data abstraction layer.
*   **`index.js` (or similar entry point)**: This file will wire everything together, loading the refactored logic and the mock datastore. It will serve as the primary replacement for the current `/ai` node's entry point.

This approach allows Clark and me to work on refactoring the AI code in an isolated environment, directly preparing it for the eventual integration with MongoDB and deployment on GAE. My next action will be to propose the creation of these `.js` files.
