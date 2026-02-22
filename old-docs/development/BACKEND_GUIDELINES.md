# Backend Development Guidelines

## 1. Purpose

This document provides a set of specific guidelines and standards for backend development within the Augment Plus `platform-api` repository. Its purpose is to ensure code quality, consistency, and a smooth developer experience, aligning with the architectural principles from Michael and the operational framework from Roni. All backend developers (including Andrew and Clark) are expected to adhere to these standards.

## 2. Local Development Environment

To ensure consistency and simplify onboarding, we will use Docker and `docker-compose` to run the entire backend stack locally.

- **File:** A `docker-compose.yml` file will be maintained at the root of the `platform-api` monorepo.
- **Services:** This file will define services for:
    - Each microservice (Auth, Project, Agent Runtime).
    - A local MongoDB instance for development and integration testing.
- **Benefit:** This approach eliminates "it works on my machine" issues and provides an environment that closely mirrors the staging and production setups, fulfilling Roni's principle of environment parity.

## 3. `platform-api` Monorepo Structure

To manage our Node.js microservices effectively within a single repository, we will adopt the following structure. This keeps code organized and allows for shared configurations.

```
platform-api/
├── services/
│   ├── auth-service/
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   ├── project-service/
│   │   └── ...
│   └── agent-runtime-service/
│       └── ...
├── packages/
│   ├── eslint-config-augment-plus/
│   └── logger/
├── docs/
├── docker-compose.yml
├── package.json         # Root package for workspace management (e.g., Lerna/Yarn)
└── README.md
```

- **`services/`**: Contains the code for each individual microservice.
- **`packages/`**: Contains shared local packages, such as a common ESLint configuration or a shared logging utility, to avoid code duplication.

## 4. Coding & Style Standards

- **Linter:** We will use **ESLint** with a shared configuration (`eslint-config-augment-plus`) to enforce a consistent coding style.
- **Formatter:** We will use **Prettier** to automate code formatting. This will be integrated with a pre-commit hook to ensure all committed code is formatted correctly.
- **Language:** All new backend code should be written in **TypeScript** to improve code quality, maintainability, and developer tooling.

## 5. API Specification

As per Michael's architecture, our services will be API-driven.

- **Standard:** We will use the **OpenAPI 3.0 specification** to define our API contracts.
- **Location:** Each service will contain its own `openapi.yaml` file. These can be aggregated at the API Gateway level.
- **Benefit:** This provides a clear, machine-readable contract for Benson and the GUI team, enabling them to mock API responses and develop in parallel. It also allows for automated API documentation generation.

## 6. Testing Strategy

Roni has mandated a minimum of 80% code coverage. We will achieve this through a multi-layered testing approach:

- **Unit Tests:** Each function and module should have corresponding unit tests using a framework like **Jest**. These tests must not make external network or database calls and will use mocks/stubs.
- **Integration Tests:** Each service will have integration tests that verify its interaction with the database (the local MongoDB instance in Docker) and other layers.
- **Contract Tests:** We will explore contract testing (e.g., using Pact) to verify that our services adhere to the API contracts expected by consumers like the GUI.

## 7. Action Items

- **Andrew, Clark:** Begin scaffolding the `platform-api` monorepo with the structure defined above.
- **Andrew:** Create the initial `docker-compose.yml` for running a single service and a MongoDB instance.
- **Roni:** Review the proposed monorepo structure and assist with setting up the workspace tooling (e.g., Yarn Workspaces or Lerna).



