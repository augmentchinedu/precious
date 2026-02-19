# AI Project Operations Guide

## 1. Introduction

This document provides the operational procedures for deploying, monitoring, and maintaining the `ai` agent system within Augment Plus. It is the practical counterpart to the `ARCHITECTURE.md` and is essential for upholding the platform principle of stability. All Developer Operators and contributing developers must adhere to these guidelines.

## 2. System Monitoring & Observability

Proactive monitoring is critical for detecting instability before it impacts the platform.

### 2.1. Key Metrics

The core runtime environment must track and expose the following metrics:
- **Agent Execution Time:** The wall-clock time for each agent to complete its run. Sudden spikes can indicate performance regressions.
- **Context Object Size:** The size (in bytes or KB) of the `CONTEXT` object passed to each agent. Continuous growth may indicate a need for context pruning strategies to maintain performance.
- **File Action Throughput:** The rate of `create` and `append` actions, categorized by success and failure. A high failure rate indicates a potential system fault.
- **Debate Participation Rate:** The number of agents participating in debate rounds, which can be an indicator of system health and engagement.

### 2.2. Logging

All agent executions and platform actions must be logged in a structured format. Each log entry should include:
- `timestamp`: ISO 8601 format.
- `agent_name`: The name of the executing agent.
- `run_id`: A unique identifier for the execution cycle.
- `log_level`: e.g., INFO, WARN, ERROR.
- `message`: A descriptive message.
- `metadata`: Relevant contextual data, such as file paths for `FILE_ACTION` or referenced agent for `DEBATE`.

## 3. Deployment & Rollback

Changes to agent logic or platform runtime must be deployed in a controlled manner.

### 3.1. Deployment Process

1.  **Code Review:** All changes must be reviewed by at least one other agent or human developer.
2.  **Staging Test:** Before merging to the main branch, changes must be tested against a golden dataset of `CONTEXT` objects to ensure deterministic output and prevent regressions.
3.  **Merge:** Upon successful testing, the changes can be merged.

### 3.2. Rollback Procedure

The Git repository is the source of truth. In the event of an incident caused by a recent change, the following rollback procedure must be initiated immediately:
1.  **Identify Faulty Commit:** Use logs and metrics to trace the instability to a specific commit.
2.  **Execute `git revert`:** Revert the faulty commit on the main branch. This creates a new commit that undoes the changes, preserving the project history.
3.  **Post-Mortem:** Document the incident and the reason for the rollback in a new project issue or document.

## 4. Incident Response

1.  **Alerting:** Automated alerts will be configured to trigger on metric thresholds (e.g., `FILE_ACTION` failure rate > 5%, sustained increase in agent execution time).
2.  **Triage:** The on-call Developer Operator is responsible for acknowledging the alert and beginning an investigation.
3.  **Resolution:** The primary goal is to restore stability. This may involve executing the rollback procedure. Root cause analysis can be performed after the system is stable.


## Hosting Standard: Render (Effective 2026-02-19)

**Status:** Active  
**Applies to:** The Great Unknown (Node/Express services, including AI subsystem services where applicable)  
**Owner:** Platform Administration (Sandra)  
**Trigger:** “We would now have to use Render for hosting.”

### Decision
All production hosting is standardized on **Render**. Any prior hosting assumptions are deprecated for current and new services.

### Source of truth
- Render blueprint/config: `docs/.render.yaml`
- Ops reference: `docs/operations/README.md` (section: “Hosting: Render (Migration Standard)”)
- Workflow reference: `docs/DEVELOPMENT_WORKFLOW.md` (section: “Hosting Standard: Render (Effective 2026-02-19)”)
- Architecture decision: `docs/platform/ARCHITECTURE_DECISION_RECORD.md` (ADR: Hosting Standardization on Render)
- Health endpoint (if applicable): `docs/src/routes/health.js`

### Deployment expectations (Node/Express)
- **Service type:** Web service (Node)
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment variables:** set `NODE_ENV=production` (+ additional secrets configured in Render dashboard)
- **Auto-deploy:** enabled for the main branch (per Render configuration)
- **Health verification:** validate the health endpoint if available

### Operational rules
- Do **not** commit secrets to the repository; configure them in Render.
- If additional services are introduced (e.g., separate AI workers/services), extend the Render blueprint and update ops documentation accordingly.

### Change log
- 2026-02-19: Hosting standard updated to Render.
