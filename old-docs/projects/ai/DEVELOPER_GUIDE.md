# Project AI: Developer Guide

## 1. Purpose

This document provides practical instructions and standards for developers working on the `ai` project's core runtime. It complements the high-level `ARCHITECTURE.md` by detailing the "how-to" of development, testing, and contribution. Adherence to these guidelines is mandatory to ensure code quality and system stability.

## 2. Local Development Environment

### 2.1. Prerequisites

-   Node.js (LTS version)
-   npm (comes with Node.js)
-   A code editor (e.g., VS Code)

### 2.2. Initial Setup

1.  Clone the `ai` repository.
2.  Navigate to the project's root directory.
3.  Install the required dependencies:
    ```bash
    npm install
    ```

### 2.3. Running the Application

To start the Express server in a local development environment, run:
```bash
npm start
```
The server will be accessible at `http://localhost:3000` by default.

## 3. Project Codebase Structure

The Express application follows a standard Node.js structure. Key directories include:

-   **/src**: Contains the primary application source code.
    -   **/api**: API route definitions and controllers.
    -   **/services**: Business logic and integrations with external services (e.g., Git, future DB).
    -   **/utils**: Helper functions and utilities.
-   **/test**: Contains all test files (unit, integration).
-   **app.js**: The main application entry point.
-   **package.json**: Project metadata and dependencies.

## 4. Coding Standards

-   **Language**: JavaScript (ES6+ syntax).
-   **Style**: Adhere to the configuration in the project's `.eslintrc` file. Run the linter before committing.
-   **Naming Conventions**:
    -   `camelCase` for variables and functions.
    -   `PascalCase` for classes.
    -   `UPPER_SNAKE_CASE` for constants.
-   **Modularity**: Keep files and functions small and focused on a single responsibility.

## 5. API Development

-   **Versioning**: All API endpoints must be versioned, e.g., `/api/v1/...`.
-   **Request/Response Format**: All API responses must be in JSON format and follow a consistent structure:
    ```json
    {
      "success": true | false,
      "data": { ... } | null,
      "error": { "message": "..." } | null
    }
    ```
-   **Validation**: All incoming request bodies and parameters must be validated.

## 6. Testing

-   A robust testing suite is critical for platform stability.
-   **Unit Tests**: Each new function or service should be accompanied by unit tests that cover its logic in isolation.
-   **Integration Tests**: Test the interaction between different components, especially API endpoints and their underlying services.
-   **Test Location**: Test files should mirror the `src` directory structure inside the `/test` directory. For example, `src/services/file_system.js` would be tested by `test/services/file_system.test.js`.


## 7. Core Services and Logic

To enforce the architectural principles of a stateful runtime and modular design, core business logic will be encapsulated within dedicated services in the `/src/services` directory.

### 7.1. Context Management (`ContextService`)

-   **Purpose**: To manage the lifecycle of the main `context` object for each agent run.
-   **Responsibilities**:
    -   Loading the initial context for a run (e.g., from a file, or a future database record).
    -   Validating the context against `CONTEXT_SCHEMA.md` at the start and end of a run.
    -   Providing a consistent interface for other services to access context data.
    -   Persisting the final, mutated context at the end of a successful run.
-   **Implementation Note**: This service ensures that agent logic remains stateless by providing all necessary state via the context. The service itself manages the state's persistence.

### 7.2. File Action Processing (`FileActionService`)

-   **Purpose**: To securely parse and execute `FILE_ACTION` blocks produced in agent outputs. This service is the sole mechanism by which the system can write to the filesystem based on agent instructions.
-   **Responsibilities**:
    1.  **Parsing**: Extract `FILE_ACTION` blocks from an agent's raw Markdown output.
    2.  **Validation**:
        -   Ensure the block format is correct (`type`, `path`, `


## 8. Controller Pattern

To maintain a clean separation of concerns between the API transport layer (HTTP) and the core business logic (services), all API routes must use a controller.

-   **Location**: Controllers should be located in `/src/controllers`. A controller file should correspond to a specific resource or feature set (e.g., `agentRunController.js`).
-   **Responsibility**:
    1.  Define functions that handle specific API endpoints (e.g., `createAgentRun`).
    2.  Extract and validate data from the Express `req` object (`req.body`, `req.params`, `req.query`).
    3.  Call one or more services from the `/src/services` directory, passing the validated data as arguments. Services should never receive the raw `req` or `res` objects.
    4.  Receive data or errors back from the services.
    5.  Construct a final JSON response using the `res` object, adhering to the standard response format defined in Section 5.
    6.  Handle exceptions and format them into a standard error response.

### 8.1. Example Workflow: Agent Run Execution

This example illustrates the end-to-end flow for a hypothetical endpoint that triggers an agent run.

1.  **Route Definition (`/src/api/v1/routes/agentRunRoutes.js`)**:
    The route file links an HTTP path and method to a controller function.
    ```javascript
    const express = require('express');
    const router = express.Router();
    const agentRunController = require('../../../controllers/agentRunController');

    router.post('/execute', agentRunController.executeRun);

    module.exports = router;
    ```

2.  **Controller (`/src/controllers/agentRunController.js`)**:
    The controller orchestrates the process, interacting with services.
    ```javascript
    const ContextService = require('../services/ContextService');
    const FileActionService = require('../services/FileActionService');

    exports.executeRun = async (req, res) => {
      try {
        // 1. Get initial context
        const { initialContextId } = req.body;
        const context = await ContextService.load(initialContextId);

        // 2. (Hypothetical) Execute agent logic
        const agentOutput = await AgentExecutionService.run(context); // Another service

        // 3. Process agent-generated file actions
        const fileActions = FileActionService.parse(agentOutput);
        await FileActionService.execute(fileActions);

        // 4. Send success response
        res.status(200).json({ success: true, data: { message: "Run executed successfully." } });
      } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
      }
    };
    ```

This pattern ensures that `ContextService` and `FileActionService` contain only reusable, testable business logic, while the controller handles the specifics of the HTTP interaction.


## 9. Agent Output Standards

For the platform to act upon an agent's intentions, the agent's output must conform to a strict, machine-parsable format. This section defines the standards for agent-generated actions.

### 9.1. The `FILE_ACTION` Protocol

When an agent needs to create or modify a file, it must embed a `FILE_ACTION` block in its output. The `FileActionService` is specifically designed to parse and execute these blocks. Any deviation from this format will result in the action being ignored or causing an error.

The block must follow this exact structure:

```markdown
===FILE_ACTION===
type: create | append
path: relative/path/to/file.md


### 4.0 Version Control
As we transition to a formal Git workflow, this section will outline the required standards for version control.

#### 4.1 Branching Model
*(Awaiting definition from Project Architect/Developer Operator. Proposal: A simplified GitFlow or Trunk-Based model.)*

#### 4.2 Pull Request (PR) and Code Review Process
*(Awaiting definition. Proposal: All PRs must have at least one approval from a fellow developer. Automated checks for linting and unit tests should be required to pass before merging.)*

### 5.0 Data Persistence
This section details standards for interacting with the platform's database layer.

#### 5.1 MongoDB Data Modeling
*(Awaiting definition. Proposal: Define core schemas and validation rules at the application layer to ensure data consistency.)*

#### 5.2 Database Environment Configuration
*(Awaiting definition. Proposal: Document connection procedures for both local development (e.g., Docker) and the shared development/staging database.)*

### 6.0 Deployment and Environments
Guidelines for deploying applications and managing environments.

#### 6.1 GCP App Engine Deployment
*(Awaiting definition. Proposal: Provide a step-by-step guide for deploying services to App Engine, including necessary gcloud commands and configuration files like `app.yaml`.)*

#### 6.2 Environment Variable and Secret Management
*(Awaiting definition. Proposal: Define the use of a secret manager (e.g., GCP Secret Manager) and the process for accessing secrets in the App Engine environment.)*


## 4.0 Version Control
As we transition to a formal Git workflow, all developers must adhere to the standards being defined. The final branching model will be documented here once finalized by the Project Architect.

### 4.1 Pull Request (PR) and Code Review Process
**Rule:** All new code must be submitted via a Pull Request.
**Rule:** Every PR requires at least one approval from a peer developer before being considered for merge.
**Rule:** The PR must pass all automated checks (linting, unit tests) defined in the CI/CD pipeline (see Section 6).

## 5.0 Data Persistence & State Management
This section details the standards for handling all forms of persistent data, including agent state.

### 5.1 The Persistence Abstraction Layer
Per the project architecture (`ARCHITECTURE_OVERVIEW.md`), all I/O operations must be performed through a dedicated **Persistence Abstraction Layer**. Direct file system or database access is forbidden.

**Design:**
- An interface will be defined (e.g., `PersistenceInterface`) with methods like `read(path)`, `write(path, data)`, `append(path, data)`.
- The Execution Engine will provide a concrete implementation of this interface to the agent during its run.
- **Initial Implementation:** File System based.
- **Future Implementation:** MongoDB based.

**Developer Responsibility:** Your agent's logic should be written against the *interface*, not a specific implementation. This ensures your agent will work without modification after the database migration.

## 6.0 Deployment and Environments
Our goal is an automated CI/CD pipeline as outlined in the `OPERATIONS_HANDBOOK.md`. For developers, this means the following:

### 6.1 Local Environment
- A `docker-compose.yml` file will be maintained in the project root to standardize local development environments, including services like a local MongoDB instance.
- Follow the `README.md` for setup instructions.

### 6.2 Developer Role in CI/CD
- **Write Tests:** Your code is not "done" until it is accompanied by meaningful unit and/or integration tests. The CI pipeline will fail builds that do not meet test coverage standards.
- **Secure Coding:** Do not commit secrets, API keys, or credentials to the repository. Use the approved method for accessing secrets from the environment, as will be defined in the secrets management policy.

## 7.0 Agent Design Patterns

### 7.1 Stateless Execution
Per the project architecture, agents **must** be designed to be stateless within a single execution.

**Rule:** Do not rely on in-memory variables to maintain state between separate invocations. The cloud runtime environment may terminate and restart your agent process at any time.

**Correct Pattern:**
1.  At the start of your agent's run, load all required state from the `Context Provider` using the `Persistence Abstraction Layer`.
2.  Perform your logic.
3.  Before finishing, save all modified state back using the `Persistence Abstraction Layer`.

### 7.2 Interim State Management (Short-Term Memory)
To address the challenges raised by the postponed Memory Layer, we will utilize the Persistence Layer for short-term state.

**Proposal:** A dedicated "short-term memory" can be implemented as part of the Persistence Layer, potentially using a dedicated MongoDB collection with a TTL (Time-To-Live) index. This provides a pragmatic solution for passing state between agent runs without violating the stateless execution principle. Further specification is required from the Project Architect.


### 5.2 Document & Collection Standards

To ensure data consistency and long-term maintainability, all data stored via the `Document Store Interface` must adhere to the following standards.

#### 5.2.1 Collection Naming Convention

- **Format:** `[type]_[description]`
- **Case:** `snake_case`
- **Examples:**
    - `state_agents`: For storing the persistent state of agents.
    - `log_executions`: For logging agent execution runs.
    - `cache_shortterm`: For general-purpose, short-term caching.
- **Rationale:** This provides a clear, queryable, and consistent naming scheme for data collections.

#### 5.2.2 Base Document Schema

All documents created in any collection must, at a minimum, include a standard metadata block.

- **Required Fields:**
    - `_id`: A unique identifier for the document. This will typically be generated by the persistence layer (e.g., UUID).
    - `_collection`: The name of the collection the document belongs to.
    - `_created_at`: An ISO 8601 timestamp string for when the document was created.
    - `_updated_at`: An ISO 8601 timestamp string for when the document was last updated.
    - `_owner`: The identifier of the agent or system process that created the document (e.g., 'agent:Clark', 'system:ExecutionEngine').

- **Example Document:**
```json
{
  "_id": "b7bde7f7-b2b8-4c9f-b8e7-01d0a2da4843",
  "_collection": "state_agents",
  "_created_at": "2026-02-17T10:00:00.000Z",
  "_updated_at": "2026-02-17T10:05:00.000Z",
  "_owner": "agent:Benson",
  "agent_specific_field": "some_value",
  "last_known_status": "idle"
}
```

#### 5.2.3 Schema Evolution

- **Principle:** Schemas will evolve. Design your agent logic to be resilient to change.
- **Rule:** Do not make breaking changes without a clear migration plan. A breaking change includes removing a field, renaming a field, or changing a field's data type.
- **Process:** Propose breaking changes by creating a `Transient Document` outlining the change, its justification, and a migration strategy. This must be reviewed and recorded in the `ARCHITECTURE_DECISION_RECORD.md` before implementation.
- **Best Practice:** Prefer adding new fields over modifying existing ones. Agent logic should gracefully handle the absence of new fields in older documents.


### 5.0 Data Persistence Architecture (Refined)

Based on the architectural decision captured in `docs/projects/ai/ARCHITECTURE_OVERVIEW.md#5-refined-persistence-architecture-update`, the platform now has two distinct interfaces for data persistence. As a developer, you will primarily interact with the **Document Store Interface**.

#### 5.1 Knowledge Base Actions

-   **Purpose:** To read from and write to the version-controlled knowledge base (i.e., the `.md` files in the `docs/` directory).
-   **Access Method:** Agents **must not** attempt to access the file system directly. All modifications to the knowledge base must be proposed as `FILE_ACTION`s in the agent's response. The system's `Action Dispatcher` is responsible for executing these actions. This ensures a secure, auditable, and controlled process.
-   **Example:**
    ```
    // This is how you modify the knowledge base
    return [
      {
        "type": "file",
        "action": "append",
        "path": "docs/projects/ai/some_file.md",
        "content": "New information."
      }
    ];
    ```

#### 5.2 Document Store Interface (For Agent State)

-   **Purpose:** To manage structured, non-version-controlled data such as agent state, temporary records, or logs. This serves as the platform's "short-term memory" and is designed to align with the future MongoDB backend.
-   **Access Method:** The Execution Engine will provide an implementation of the Document Store interface to your agent at runtime. You should write your agent logic to use this interface for all state management needs.
-   **Interface Methods:**
    -   `create_document(collection: str, document: dict) -> str`
    -   `get_document(collection: str, document_id: str) -> dict | None`
    -   `update_document(collection: str, document_id: str, updates: dict)`
    -   `delete_document(collection: str, document_id: str)`
    -   `find_documents(collection: str, filter: dict) -> list[dict]`
-   **Example Usage (Conceptual):**
    ```python
    # In your agent's logic
    def execute(self, context):
        document_store = context.get('document_store')
        
        # Save state
        state_to_save = {'last_run': '2026-02-17', 'status': 'completed'}
        document_store.update_document('agent_state', self.agent_id, state_to_save)
        
        # Find relevant data
        related_tasks = document_store.find_documents('tasks', {'status': 'pending'})
        # ... process tasks
    ```

This dual-system provides a clear separation of concerns: structured, ephemeral state is managed via the Document Store, while the permanent, version-controlled knowledge base is managed via declarative `FILE_ACTION`s. Adherence to this model is mandatory.
