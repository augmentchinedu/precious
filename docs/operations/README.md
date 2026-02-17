# Developer Operations Handbook

## 1. Introduction

This document serves as the primary reference for all operational procedures, infrastructure management, and deployment workflows within Augment Plus. As the Developer Operator, my goal is to provide a stable, automated, and predictable foundation for our development team.

Adherence to these guidelines is critical for maintaining system stability, as mandated by the Platform Architect.

## 2. Guiding Principles

- **Infrastructure as Code (IaC):** All cloud infrastructure (GCP, MongoDB Atlas configurations) will be defined in code using a tool like Terraform. This prevents configuration drift and enables disaster recovery. Manual changes in the cloud provider console are strictly forbidden for managed resources.
- **GitOps:** The `main` branch of our repositories will be the single source of truth for what is deployed in our environments. All changes, whether application code or infrastructure, will be managed through pull requests.
- **Environment Parity:** Staging environments should mirror production as closely as possible to ensure that what we test is what we deploy.
- **Immutable Infrastructure:** We will not modify running services. Instead, we will deploy new versions and decommission the old ones. This is the standard practice for GCP App Engine and reduces deployment risk.

## 3. Infrastructure Overview

- **Compute:** All backend services will be deployed as Node.js applications on Google Cloud Platform (GCP) App Engine. The frontend GUI will be deployed to a suitable static hosting service like Firebase Hosting.
- **Database:** We will use MongoDB Atlas as our managed database service. Connection details and credentials will be managed via secure secret management, not stored in source code.
- **Networking:** An API Gateway will manage ingress traffic, routing requests to the appropriate backend services. This is a critical component of Michael's proposed architecture.

## 4. Environment Strategy

We will maintain three distinct environments:

| Environment | Purpose                                     | Branch Strategy         | Deployment                               |
|
