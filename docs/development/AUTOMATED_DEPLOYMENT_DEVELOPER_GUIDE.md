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
