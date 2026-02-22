# Operations Handbook

## 1. Overview

This document outlines the operational procedures, infrastructure standards, and deployment strategies for the `ai` project, which serves as the core of the Augment Plus platform runtime. The goal is to ensure stability, scalability, and security.

## 2. Infrastructure

### 2.1. Cloud Provider

- **Provider:** Google Cloud Platform (GCP)
- **Primary Service:** App Engine

### 2.2. Environments

The platform maintains three distinct environments:

- `development`: For local developer testing.
- `staging`: A production-like environment for pre-deployment validation.
- `production`: The live environment serving users.

## 3. CI/CD Pipeline

A formal CI/CD pipeline will be established to automate the build, test, and deployment process.

- **Trigger:** Pushes to specific branches in the `ai` repository.
- **Tools:** To be determined (e.g., GitHub Actions, Cloud Build).
- **Process:**
    1.  Lint & Static Analysis
    2.  Unit & Integration Tests
    3.  Build Application Container
    4.  Deploy to Staging
    5.  (Manual Approval)
    6.  Deploy to Production

## 4. Data Management

### 4.1. Database

- **Service:** MongoDB Atlas (Managed Service)
- **Backup Policy:** Daily automated backups with a 30-day retention period.
- **Access Control:** IAM roles will be used to manage access. Connection strings must be managed as secrets.

## 5. Security

### 5.1. Secret Management

- **Tool:** GCP Secret Manager.
- **Policy:** Application secrets (API keys, database credentials) must not be stored in the Git repository. They will be injected into the application environment at runtime.

### 5.2. Git Authentication

- **Method:** A dedicated GitHub App will be used for programmatic repository access. Personal Access Tokens (PATs) are forbidden for automated processes.


## 6.0 Developer Environment

To ensure consistency between local development, staging, and production, and to simplify the onboarding process, a standardized local development environment is required.

### 6.1 Standardization Principle

All development on the `ai` project must be done within an environment that mirrors the production architecture as closely as possible. The goal is to eliminate "it works on my machine" issues.

### 6.2 Core Tooling

-   **Containerization:** [Docker](https://www.docker.com/) will be used for containerizing services.
-   **Orchestration:** [Docker Compose](https://docs.docker.com/compose/) will be used to define and run the multi-service local environment.

### 6.3 Local Services Configuration

A `docker-compose.yml` file will be maintained in the root of the `ai` repository. This file will define the services required for local development, starting with:

-   **`mongodb` service:** A container running a specific version of MongoDB to emulate the production database. This removes the need for manual database installation by developers.
-   **`app` service:** A container running the core `ai` application, connected to the `mongodb` service.

This allows any developer to stand up the entire local environment with a single command: `docker-compose up`.

### 6.4 Environment Variables

-   A template file, `.env.template`, will be maintained in the repository.
-   Each developer will create a local `.env` file (which will be included in `.gitignore`) to store their local configuration, such as the `mongodb://...` connection string for the Dockerized database.
-   This practice aligns with the security policy of not committing secrets to Git and prepares developers for the managed secret injection used in GCP.


### 3.0 CI/CD Pipeline (Detailed Specification)

This section provides a more detailed specification for the CI/CD pipeline, building upon the overview in section 2.3.

#### 3.1 Branching Strategy & Triggers

The CI/CD pipeline is tightly coupled to the Git branching model. While the final model is being defined, the pipeline will be configured for a model with at least the following branches:

-   **`main`:** Represents the stable, production-ready state.
-   **`staging`:** Represents the pre-production environment.
-   **Feature Branches (`feature/*`):** Used for developing new features.

**Pipeline Triggers:**
-   **On Push to `feature/*`:** The `Test & Lint` stage is triggered.
-   **On Pull Request to `staging`:** The `Test & Lint` and `Build` stages are triggered. Merging is blocked until these pass.
-   **On Merge to `staging`:** The `Deploy to Staging` stage is triggered.
-   **On Merge to `main`:** The `Deploy to Production` stage is triggered, following manual approval.

#### 3.2 Pipeline Stages

1.  **Test & Lint:**
    -   **Action:** Runs static code analysis (linting) and executes the full suite of unit and integration tests.
    -   **Purpose:** Enforces code quality and catches regressions early. A build fails immediately if this stage does not pass.

2.  **Build:**
    -   **Action:** Creates a container image (e.g., Docker) of the application. The image is tagged with the Git commit hash for traceability.
    -   **Purpose:** Packages the application and its dependencies into an immutable artifact.

3.  **Deploy to Staging:**
    -   **Action:** Deploys the container image built from the `staging` branch to the GCP App Engine staging environment.
    -   **Purpose:** Allows for final validation and user acceptance testing in a production-like environment.

4.  **Manual Approval Gate:**
    -   **Action:** Pipeline execution is paused, requiring a manual approval from a designated role (e.g., Project Architect, Developer Operator) before proceeding.
    -   **Purpose:** Provides a final human check and business-level sign-off before a production release.

5.  **Deploy to Production:**
    -   **Action:** Deploys the validated container image to the GCP App Engine production environment.
    -   **Purpose:** Releases the new version of the application to end-users. A blue/green or canary deployment strategy will be employed to minimize downtime and risk.
