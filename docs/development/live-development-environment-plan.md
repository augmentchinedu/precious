# Live Development Environment: Investigation and Design Plan

**Author:** Roni (Developer Operator)
**Status:** In Progress

## Related Documents
- [Architect Directives: 2026-02-24](../platform/architect-directives-2026-02-24.md)
- [Architectural Response to Directives](../architecture/architectural-response-to-directives-2026-02-24.md)
- [Finance Ministry Review of Architect Directives](../ministries/finance/finance-ministry-review-of-architect-directives-2026-02-24.md)
- [Action Plan](../Action_Plan.md#2-developer-empowerment-teams--environments)

## 1. Introduction

This document outlines the plan to investigate, design, and cost the new live development environments, as mandated by the [Architect Directives of 2026-02-24](../platform/architect-directives-2026-02-24.md). This initiative is a core component of our strategy to empower the Augment Plus development teams and accelerate our development cycles.

The technical approach will be based on the containerization strategy proposed in the [Architectural Response](../architecture/architectural-response-to-directives-2026-02-24.md#4-live-development-environments).

## 2. Objectives

The primary goals of this initiative are:

1.  **Design a Standardized Environment:** Create a reproducible, container-based development environment that closely mirrors our production setup on Google Cloud Run.
2.  **Enable Live Terminal Access:** Implement a secure and efficient method for developers to gain terminal access into their running development containers.
3.  **Provide a Cost Projection:** Produce a detailed cost analysis for the infrastructure required, as requested by the [Ministry of Finance](../ministries/finance/finance-ministry-review-of-architect-directives-2026-02-24.md#22-developer-team-environments--live-terminal-access).
4.  **Improve Developer Experience:** Streamline onboarding, reduce environment-related bugs, and provide powerful tools for live testing and debugging.

## 3. Investigation and Design Plan

The project will be executed in the following phases:

### Phase 1: Technology and Tooling Evaluation

-   **Containerization:** Confirm Docker as the core technology. Define best practices for creating lightweight and efficient images.
-   **Orchestration:** Evaluate `docker-compose` for defining and managing multi-service environments for development teams.
-   **Terminal Access:** Research and benchmark solutions for providing secure, web-based terminal access. Options include self-hosted gateways like `ttyd` or `GoTTY`, or investigating libraries like `xterm.js` for a custom solution.

### Phase 2: Base Environment Design

-   **Create a Base `Dockerfile`:** Develop a universal `Dockerfile` for our Node.js services. This will include standardized versions of Node, npm/pnpm, and any globally required tools.
-   **Image Repository:** Plan for storing our base images in Google Cloud's Artifact Registry for secure and fast access within our GCP ecosystem.

### Phase 3: Proof of Concept (PoC)

-   **Single Service PoC:** Build a working, containerized environment for a single service (e.g., `accounts`). This will include a `docker-compose.yml` file and scripts to start/stop the environment.
-   **Terminal Access PoC:** Integrate the chosen terminal access solution to prove we can securely connect to a running container.
-   **Team PoC:** Expand the PoC to include a second, dependent service to simulate a development team's multi-service workflow.

## 4. Cost Analysis Plan

In parallel with the technical design, I will develop the cost projection requested by the Ministry of Finance.

-   **Resource Identification:** Identify all required GCP resources. This will likely include:
    -   Compute Engine (GCE) instances to host the Docker daemons for development teams.
    -   Artifact Registry for Docker image storage.
    -   Cloud Build for automating image creation.
    -   Networking resources (VPC, firewall rules, potential load balancers).
-   **Cost Estimation:** Use the GCP Pricing Calculator to estimate both initial setup and ongoing monthly costs based on projected usage patterns (e.g., number of teams, hours of operation).
-   **Cost-Benefit Analysis:** Articulate the qualitative and quantitative benefits (e.g., reduced developer onboarding time, faster bug resolution, increased deployment frequency) to justify the investment.

## 5. Next Steps and Deliverables

-   **Collaboration:** I will work closely with Michael (Project Architect) throughout this process to ensure the design aligns with our overall architectural vision.
-   **Deliverable 1: Technical Design Document:** A document detailing the container architecture, `Dockerfile` standards, `docker-compose` strategy, and the chosen solution for secure terminal access.
-   **Deliverable 2: Cost Projection Report:** A formal report for the Ministry of Finance containing the detailed cost analysis and benefit assessment.

I will begin Phase 1 immediately and provide updates as the investigation progresses.
