# Cloud Run Services Deployment and Operations Handbook

**Date:** 2026-02-21
**Author:** Roni (Developer Operator)
**Status:** Draft

## 1. Introduction

This handbook provides essential guidelines and procedures for the deployment, management, and operational oversight of platform services hosted on Google Cloud Run. It incorporates recent architectural advancements, including GCP project segregation, CDN integration, and enhanced CI/CD processes. Adherence to this handbook ensures consistent, reliable, and efficient operations across all Cloud Run services.

## 2. Google Cloud Platform (GCP) Environment Management

### 2.1. Project Segregation

*   **Development Project:** Dedicated for feature development, integration testing, and pre-production staging. Services deployed here are connected to development branches and may utilize development-specific configurations and data stores.
*   **Production Project:** Hosts all live, user-facing services. Strict deployment protocols and robust monitoring are enforced.

### 2.2. Access Control and Permissions

*   Ensure Least Privilege Principle for all service accounts and user roles.
*   Developer Operators manage deployment permissions and operational roles within both development and production GCP projects.
*   Regular audits of IAM policies are mandatory.

## 3. Cloud Run Service Deployment and Management

### 3.1. Service Naming Conventions

*   All Cloud Run services must adhere to a predefined naming convention (e.g., `<node-id>-<environment>`, `express-dev`, `ai-prod`).

### 3.2. Deployment Process

*   **Automated via Cloud Build:** All service deployments (to both `dev` and `prod` environments) are triggered via Cloud Build pipelines.
*   **Image Management:** Container images are built and stored in Google Container Registry (GCR) or Artifact Registry. Tags must include build ID and git commit hash for traceability.
*   **Revision Management:** Cloud Run automatically creates new revisions upon deployment. Leverage revision management for easy rollbacks.
*   **Traffic Splitting:** Utilize Cloud Run's traffic splitting features for canary deployments and A/B testing in production, managed by Developer Operators.

### 3.3. Service Configuration

*   **Environment Variables:** Sensitive configurations are managed via Cloud Secret Manager and injected as environment variables.
*   **Resource Allocation:** Configure CPU, memory, and concurrency settings based on service requirements and performance testing.
*   **Auto-scaling:** Cloud Run's automatic scaling is the default. Monitor metrics to fine-tune minimum and maximum instances.

## 4. CDN Integration for Routes and Data

### 4.1. Google Cloud Storage (GCS) as CDN Backend

*   Platform routes and common node data are uploaded to designated GCS buckets, configured as a CDN.
*   **Versioning:** Ensure data and route configurations stored in GCS are versioned to prevent issues during updates.
*   **Access Protocols:** Services are provisioned with appropriate permissions to read from the CDN GCS buckets during build and runtime.

### 4.2. Route Consumption

*   Services must be designed to fetch their routing configurations dynamically from the CDN during startup or as part of their build process, as dictated by the automated router generation pipeline.

## 5. Continuous Integration / Continuous Deployment (CI/CD)

### 5.1. Pre-push Checks (Vitest)

*   **Mandatory Requirement:** All code pushes to origin must pass Vitest pre-push checks. Deployments will be blocked if these checks fail.
*   **Operational Impact:** This significantly reduces the risk of deploying broken code, enhancing platform stability. Developer Operators will monitor the adherence to this policy.

### 5.2. Cloud Build Pipeline

*   The centralized Cloud Build pipeline handles submodule integration, code compilation, testing, container image creation, and deployment.
*   **Pipeline Monitoring:** Developer Operators are responsible for monitoring Cloud Build pipeline execution, identifying and resolving failures, and optimizing build times.

### 5.3. Development Branch Deployments

*   Automated deployments of all `dev` branches to corresponding Cloud Run development applications are configured.
*   **Continuous Testing:** This enables continuous testing in a live, isolated environment, facilitating rapid iteration and early bug detection.

## 6. Monitoring, Logging, and Alerting

### 6.1. Google Cloud Monitoring (Stackdriver)

*   Implement comprehensive monitoring for all Cloud Run services, tracking request latency, error rates, instance count, and resource utilization.
*   **Custom Metrics:** Define custom metrics for critical application-specific functionalities.

### 6.2. Google Cloud Logging (Stackdriver)

*   Ensure all service logs are ingested into Cloud Logging.
*   **Structured Logging:** Advocate for structured logging within services to enable efficient querying and analysis.
*   **Log-based Metrics:** Create log-based metrics for specific error patterns or business events.

### 6.3. Alerting

*   Configure alerts for critical operational metrics (e.g., high error rates, low available instances, CDN access failures).
*   Define clear escalation paths for different alert severities.

## 7. Operational Responsibilities

*   **Deployment Execution:** Orchestrate and verify service deployments via Cloud Build.
*   **Environment Health:** Monitor the health and performance of all Cloud Run services and underlying infrastructure.
*   **Incident Response:** Act as first-line responders for operational incidents related to deployed services.
*   **Cost Management:** Monitor Cloud Run and GCS costs, identify optimization opportunities, and report to the Finance Ministry.
*   **Documentation:** Maintain up-to-date operational runbooks and documentation for all services.

## 8. Conclusion

This handbook outlines the core principles and practices for operating Cloud Run services within our evolving platform. By adhering to these guidelines, we ensure maximum uptime, optimal performance, and a streamlined operational workflow for The Great Unknown.
