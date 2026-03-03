# Live Development Environment: Operational Guide

This document provides a detailed, step-by-step operational guide for implementing the standardized live development environment. It is the implementation counterpart to the strategic plan.

## Related Documents
- [Platform Action Plan](../platform/action-plan.md#pending-actions)
- [Live Development Environment Plan](./live-development-environment-plan.md)

## 1. Overview
This guide serves as the primary technical resource for the DevOps team and developers in setting up, deploying to, and managing the live development environment. The goal is to create a production-like environment that is automatically updated from our development branches, enabling rapid testing and validation.

This work directly corresponds to **Action Item #3** in the [Platform Action Plan](../platform/action-plan.md#pending-actions).

## 2. Technical Stack
The live development environment will mirror our production setup on Google Cloud Platform to ensure consistency and reliability.

- **Cloud Provider**: Google Cloud Platform (GCP)
- **Compute**: Cloud Run for serverless container deployment.
- **CI/CD**: A combination of GitHub Actions (for triggering workflows) and Google Cloud Build (for executing builds and deployments).
- **Container Registry**: Google Artifact Registry to store our service images.
- **Database**: Cloud SQL (PostgreSQL) instances, separate from production.
- **Monitoring**: Google Cloud's Operations Suite (Cloud Logging, Cloud Monitoring).

## 3. Implementation Phases

### Phase 1: GCP Project Setup & Configuration
The first step is to establish a dedicated and secure GCP project for this environment.

- **Action**: Create a new GCP project named `the-great-unknown-live-dev`.
- **Action**: Enable the following APIs within the project:
  - Cloud Run API
  - Cloud Build API
  - Artifact Registry API
  - Identity and Access Management (IAM) API
  - Cloud SQL Admin API
- **Action**: Set up a budget alert to monitor costs and notify the [Ministry of Finance](../ministries/finance/finance-ministry-review-of-architect-directives-2026-02-24.md).

### Phase 2: CI/CD Pipeline for a Pilot Service
We will pilot the new workflow with a single service to refine the process before a full-scale rollout. The `browsers` service is an ideal candidate, given its ongoing refactoring.

- **Action**: Select the `browsers` service as the pilot. See [Benson's Refactor Plan](./benson-refactor-browsers-plan.md).
- **Action**: Create a new GitHub Actions workflow file (`.github/workflows/deploy-live-dev.yml`).
- **Workflow Steps**:
  1. **Trigger**: On push to the `develop` branch.
  2. **Authenticate**: Authenticate with GCP using Workload Identity Federation.
  3. **Build & Push**: Submit a build to Google Cloud Build that builds the Docker image and pushes it to Artifact Registry. Tag the image with the commit SHA.
  4. **Deploy**: Use Cloud Build to deploy the newly pushed image to the `browsers` service on Cloud Run within the `the-great-unknown-live-dev` project.

### Phase 3: Database and Service Dependencies
A parallel environment requires its own data layer.

- **Action**: Provision a new Cloud SQL instance in the `the-great-unknown-live-dev` project.
- **Action**: Use Secret Manager to securely store database credentials and other secrets.
- **Action**: Document the required environment variables for services connecting to the database and other dependencies.

### Phase 4: Platform-Wide Rollout
Once the pilot is successful, we will roll out the live development environment to all services.

- **Action**: Create a reusable template for the GitHub Actions workflow.
- **Action**: Incrementally onboard all other platform microservices to the new CI/CD pipeline.
- **Action**: Update all relevant documentation to reflect the new workflow.

## 4. Access Control
Access will be managed using the principle of least privilege.

- **Developers (Augment Plus)**: Will be granted `roles/run.invoker` to test their services and `roles/logging.viewer` to debug issues in the live-dev environment.
- **DevOps (Roni)**: Will have `roles/editor` access within the live-dev project.
- **Admins (Sandra)**: Will have `roles/owner` access.

## 5. Next Steps
- Begin Phase 1 immediately.
- Coordinate with Benson to prepare the `browsers` service for the pilot deployment.
- Report progress back to the [Platform Action Plan](../platform/action-plan.md#pending-actions).
