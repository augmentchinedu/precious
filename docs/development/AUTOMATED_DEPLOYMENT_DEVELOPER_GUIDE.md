# Automated Deployment Developer Guide

## Document Information
- **Author:** Beauty, Assistant (Compiled from Platform Administrator and Project Architect guidance)
- **Date:** 2026-02-19
- **Status:** Draft / Initial Version
- **Version:** 1.0

## 1. Introduction

This guide provides practical information for developers within the Augment Plus community on how to effectively work with the new push-event triggered automated deployment system for The Great Unknown platform nodes. This system leverages webhooks connected to the `augmentchinedu/node` module and the App Engine to automate the deployment of individual services (e.g., `express`, `ai`, `store`, `game`, `currency`).

This automation aims to improve deployment efficiency, reduce manual errors, and enable faster delivery of features and updates.

## 2. Core Concepts

*   **Push-Event Triggered Deployments:** Your `git push` events to designated branches in the `augmentchinedu/node` repository (or associated node repositories) will automatically trigger a deployment process.
*   **Node Module as Trigger:** The `augmentchinedu/node` module serves as the primary repository for deployment triggers, impacting individual nodes.
*   **Independent Node Deployment:** Each platform node is designed to be independently deployable, reinforcing microservices principles.

## 3. Developer Workflow Impact

### 3.1 Branching Strategy

Adhere to the defined branching strategy as specified in `docs/platform/NODE_DEPLOYMENT_STRATEGY.md`.
*   **Feature Branches:** Work on dedicated feature branches for new development. Pushing to these branches *may* trigger deployments to development/staging environments for testing.
*   **`develop` Branch:** Pushes to the `develop` branch will typically trigger deployments to a staging environment for integrated testing.
*   **`main` Branch (or equivalent release branch):** Pushes to `main` (after successful CI/CD pipeline runs and approvals) will trigger production deployments. **Direct pushes to `main` are strongly discouraged.**

### 3.2 Committing and Pushing Code

*   **Granular Commits:** Make small, atomic commits that represent a single logical change. This aids in debugging and rollback.
*   **Clear Commit Messages:** Write descriptive commit messages that explain *what* was changed and *why*.
*   **Testing Before Push:** Always ensure your code passes local tests before pushing to a remote branch, especially if that branch triggers automated deployments.

## 4. Working with Shared Modules

Our ecosystem relies on shared modules (`augmentchinedu/models`, `augmentchinedu/schemas`, `augmentchinedu/components`). Changes to these modules can impact multiple nodes.

*   **Versioning:** Always specify and respect module versions within your node's `package.json` (or equivalent).
*   **Backward Compatibility:** Strive for backward compatibility when making changes to shared modules. Breaking changes require careful coordination across all consuming nodes and a phased deployment strategy.
*   **Testing Shared Module Updates:** When updating a shared module, thoroughly test its impact on all dependent nodes before deploying.

## 5. Monitoring Your Deployments

*   **Accessing Deployment Status:** The App Engine dashboard or integrated CI/CD tooling will provide real-time status updates on your deployments (success, failure, in progress).
*   **Logs:** Access centralized logging systems (details to be provided in `docs/operations/README.md`) to view application logs and troubleshoot deployment issues or runtime errors.
*   **Metrics:** Monitor key performance indicators (KPIs) and health metrics for your deployed node to ensure stability and performance.

## 6. Rollback Procedures

In case of a failed deployment or post-deployment issues:

*   **Automated Rollbacks:** The deployment system may have automated rollback capabilities. Understand how these work.
*   **Manual Rollback:** Be prepared to manually trigger a rollback to the last known stable version through the App Engine dashboard or version control system if automated options are insufficient.
*   **Consult Platform Administrator:** For critical issues requiring immediate rollback, inform the Platform Administrator (Sandra) immediately.

## 7. Security Best Practices

*   **Code Review:** Participate in thorough code reviews to identify potential security vulnerabilities before deployment.
*   **Dependency Scanning:** Ensure your node's dependencies are regularly scanned for known vulnerabilities.
*   **Credentials:** Never hardcode sensitive credentials. Use environment variables or secure secrets management.

## 8. Next Steps & Further Reading

*   **`docs/platform/NODE_DEPLOYMENT_STRATEGY.md`**: For operational context of the deployment strategy.
*   **`docs/platform/AUTOMATED_DEPLOYMENT_ARCHITECTURE_CONSIDERATIONS.md`**: For architectural context and principles.
*   **`docs/development/CODING_STANDARDS.md`**: To maintain code quality and consistency.
*   **`docs/development/TESTING_STRATEGY.md`**: To ensure robust testing procedures.

Stay tuned for workshops and further communications on best practices for developing within this new automated deployment environment.


## 5.1 Deployment Visibility and Troubleshooting Resources

Efficient troubleshooting is key to leveraging automated deployments. Here's how to gain visibility into your deployments and quickly address issues:

### 5.1.1 App Engine Deployment Dashboard
*   **Access:** Navigate to the App Engine Dashboard (URL to be provided by Platform Administration).
*   **Functionality:** This dashboard provides a high-level overview of all active deployments, their status (e.g., `in progress`, `successful`, `failed`), and deployment history.
*   **Identifying Your Deployment:** Look for your specific node's service name (e.g., `express`, `ai`, `store`) and the corresponding commit hash or branch name that triggered the deployment.

### 5.1.2 Accessing CI/CD Pipeline Logs
*   **Access:** (Specific CI/CD tool interface URL to be provided, e.g., Render Logs, GitHub Actions logs if integrated).
*   **Functionality:** These logs detail the steps executed during the automated deployment pipeline (e.g., `build`, `test`, `deploy`). This is crucial for identifying issues *before* the application fully starts.
*   **Key Information to Look For:**
    *   Build failures (compilation errors, dependency issues).
    *   Test failures.
    *   Configuration errors during deployment setup.

### 5.1.3 Centralized Application Logs
*   **Access:** (Specific centralized logging system URL/tool to be provided, e.g., Grafana Loki, ELK Stack, Render Logs).
*   **Functionality:** Once your node has deployed and started, application-specific logs are invaluable for runtime issue diagnosis.
*   **Effective Log Filtering:**
    *   **Service Name:** Filter logs by the name of your specific node (e.g., `service:ai`, `service:express`).
    *   **Deployment ID/Version:** If available, filter by the deployment ID or version to isolate logs from a specific deployment.
    *   **Timestamp:** Focus on logs generated around the time of your deployment or when the issue occurred.
    *   **Keywords:** Search for error codes, exception messages, or specific operational messages relevant to your change.

### 5.1.4 Common Deployment Troubleshooting Steps

Should a deployment fail or an issue arise post-deployment, follow these initial steps:

1.  **Check App Engine Dashboard:** Verify the deployment status. If `failed`, proceed to pipeline logs.
2.  **Review CI/CD Pipeline Logs:** Identify the exact step where the pipeline failed. Common issues include:
    *   **`npm install` / `yarn install` errors:** Missing dependencies, incorrect package versions, registry issues.
    *   **Build command errors:** Transpilation failures, syntax errors, incorrect build configurations.
    *   **Test failures:** Unit or integration tests preventing deployment.
3.  **Inspect Application Logs (for successful deployments with runtime issues):** If the deployment was successful but the application is not functioning as expected, dive into the centralized application logs. Look for:
    *   Startup errors (e.g., port conflicts, database connection failures).
    *   Unhandled exceptions or critical errors after application start.
    *   Configuration loading issues.
4.  **Verify Environment Variables:** Ensure all necessary environment variables are correctly configured for the target environment.
5.  **Local Reproduction:** Attempt to reproduce the issue locally using the exact commit that failed in deployment.
6.  **Rollback:** If rapid resolution is not immediately apparent and the issue is critical, initiate a rollback to the last stable version as outlined in Section 6.
7.  **Escalate:** If the issue persists after these steps, consult the `docs/operations/README.md` for escalation procedures or contact the Developer Operator team.


## 5.2 Preparing Your Node for Automated Deployment

To ensure your individual node (e.g., `express`, `ai`, `store`) is correctly integrated into the automated deployment pipeline triggered by the `augmentchinedu/node` module, specific structural and configuration guidelines must be followed.

### 5.2.1 Node Project Structure

Individual node code is expected to reside within designated subdirectories inside the `augmentchinedu/node` repository, typically under `modules/node/`. For example:

```
augmentchinedu/node/
├── modules/
│   ├── node/
│   │   ├── express/
│   │   │   ├── package.json
│   │   │   └── src/
│   │   ├── ai/
│   │   │   ├── package.json
│   │   │   └── src/
│   │   ├── store/
│   │   │   ├── package.json
│   │   │   └── src/
│   │   └── ... (other nodes)
│   └── cloudbuild.yaml
└── package.json
```

Each node subdirectory (`express/`, `ai/`, etc.) should be a self-contained application, with its own `package.json` defining dependencies and build/start scripts relevant to that specific node.

### 5.2.2 Node-Specific `package.json` Configuration

Within your node's subdirectory, the `package.json` is critical for defining its identity and operational commands:

*   **`name`**: Should be unique and reflect the node's purpose (e.g., `"name": "express-node"`).
*   **`version`**: Follow semantic versioning.
*   **`main`**: Entry point for your node application.
*   **`scripts`**:
    *   **`start`**: Essential for the deployment system to know how to run your application (e.g., `"start": "node src/index.js"`).
    *   **`build`**: If your node requires a build step before deployment (e.g., `"build": "tsc"`).
    *   **`test`**: For running node-specific tests (e.g., `"test": "jest"`).

Example `package.json` for an `ai` node:
```json
{
  "name": "ai-node",
  "version": "1.0.0",
  "description": "AI processing node for The Great Unknown",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "build": "echo 'No build step required for this node'",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "openai": "^4.20.0"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

### 5.2.3 Deployment Manifest (`cloudbuild.yaml`)

The central `cloudbuild.yaml` file (located at `modules/node/cloudbuild.yaml`) in the `augmentchinedu/node` repository is responsible for orchestrating the build and deployment process for all nodes. Developers must understand its structure:

*   It likely contains conditional logic (e.g., based on changed files, commit messages, or specific branch pushes) to identify *which* node subdirectory requires a deployment.
*   It will execute `npm install`, `npm run build` (if defined), and `npm run start` within the context of the identified node's subdirectory.
*   **Developer Action:** When making changes to your node, ensure that the `cloudbuild.yaml`'s logic correctly identifies your node for deployment. If new nodes are added or the deployment logic needs adjustment, collaborate with the Platform Administrator or Developer Operator to update `cloudbuild.yaml`.

### 5.2.4 Environment Variables and Configuration

Each node will likely require specific environment variables for its operation (e.g., database connection strings, API keys).

*   **Management:** Environment variables should be managed through the App Engine's configuration interface or `render.yaml` if applicable. **Never hardcode sensitive information.**
*   **Node-specific variables:** Ensure your node's code is designed to read configuration from environment variables (e.g., `process.env.MY_API_KEY`).
*   **Collaboration:** Coordinate with Platform Administration for the secure configuration and update of environment variables specific to your node.

By adhering to these structural and configuration guidelines, developers can effectively leverage the automated deployment system, ensuring their nodes are seamlessly built, tested, and deployed to The Great Unknown platform.


## 6. Automated Testing in the CI/CD Pipeline

Automated testing is a critical component of the push-event triggered deployment pipeline. It acts as a safety net, ensuring that changes pushed to the `augmentchinedu/node` module (or node-specific repositories) meet quality standards and do not introduce regressions before reaching production environments. Robust automated tests are the primary gatekeepers for successful continuous deployment.

### 6.1 Importance of Automated Tests

*   **Quality Assurance:** Automated tests verify the functionality and correctness of your code changes for the specific node.
*   **Regression Prevention:** They detect unintended side effects or breaking changes introduced by new development, protecting existing functionality.
*   **Fast Feedback Loop:** Failures in the test suite provide immediate feedback, allowing developers to address issues rapidly before deployment.
*   **Pipeline Integrity:** Tests are typically a required step in the automated deployment pipeline; a failed test will halt the deployment, preventing faulty code from being pushed live.

### 6.2 Types of Tests for Automated Deployments

Developers should aim for a comprehensive testing strategy that includes:

*   **Unit Tests:** Focus on individual functions, methods, or components in isolation. These are fast and provide granular feedback. Each node should have a robust suite of unit tests.
*   **Integration Tests:** Verify the interaction between different components or services within your node, or between your node and external dependencies (e.g., databases, other internal services via mocked interfaces).
*   **Contract Tests (for inter-node communication):** While more advanced, for nodes interacting via APIs, contract tests ensure that changes to one node's API do not break consuming nodes. This aligns with the "API Versioning and Compatibility" guidance from `docs/platform/AUTOMATED_DEPLOYMENT_ARCHITECTURE_CONSIDERATIONS.md`.

### 6.3 Integrating Tests into the Deployment Pipeline

The `cloudbuild.yaml` (or equivalent CI/CD configuration) for the `augmentchinedu/node` module will be configured to automatically run your node's test suite as part of the deployment process.

*   **`package.json` `test` script:** Ensure your node's `package.json` includes a `test` script that executes all necessary automated tests (e.g., `\"test\": \"jest --passWithNoTests\"` or `\"test\": \"mocha\"`). The CI/CD pipeline will invoke this script.
*   **Exit Codes:** The CI/CD system relies on the exit code of the test command. A non-zero exit code (indicating test failures) will cause the pipeline to fail and the deployment to abort.
*   **Test Environment:** Be aware that tests within the pipeline might run in a containerized environment. Ensure your tests do not have hardcoded paths or rely on local machine configurations. Use environment variables for any test-specific configurations.

### 6.4 Best Practices for Automated Testing

*   **Write Granular and Focused Tests:** Each test should focus on a single piece of functionality.
*   **Keep Tests Fast:** Slow tests prolong the CI/CD pipeline, reducing developer velocity. Optimize test execution.
*   **Maintain Test Suites:** Treat your test code with the same rigor as your application code. Refactor, review, and ensure tests remain relevant.
*   **Mock External Dependencies:** For integration tests, mock external services (e.g., databases, APIs of other nodes) to keep tests deterministic and isolated from external system failures.
*   **Coverage:** Strive for high test coverage, but prioritize critical paths and complex logic.
*   **Document Test Expectations:** Clear test names and assertions make it easier to understand failures.

By adhering to a strong automated testing discipline, developers contribute directly to the stability and reliability of The Great Unknown platform, enabling continuous and confident deployments.

## 7. Rollback Procedures

(This section corresponds to the original Section 6)

## 8. Security Best Practices

(This section corresponds to the original Section 7)

## 9. Next Steps & Further Reading

(This section corresponds to the original Section 8)
