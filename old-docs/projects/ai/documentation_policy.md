# AI Project: Unified Documentation Policy

## 1. Purpose

This document defines the mandatory documentation structure and policies for the `ai` project. Its purpose is to ensure a clean, organized, and navigable knowledge base that supports deterministic agent operation and clear human review. This policy is an extension of the organization-wide "Unified Documentation Policy".

## 2. Core Policy: Centralized Project Documentation

All documentation, analysis, and architectural records related to the `ai` project **must** reside within the `docs/projects/ai/` directory.

-   **Enforcement:** As proposed by Michael in the `architectural_review_hardening_v1.md`, the `ExecutionController` will be enhanced to reject any file action (`create` or `append`) that targets a path outside of this designated project directory.

## 3. Standard Directory Structure

To maintain organization, all new files within `docs/projects/ai/` should be placed into one of the following subdirectories.

*   `architectural/`
    *   **Content:** Design documents, architectural reviews (like Michael's), proposals for major system changes.
    *   **Example:** `architectural/execution_layer_hardening_review_v1.md`

*   `guides/`
    *   **Content:** How-to guides, operational procedures, and tutorials for developers or other agents.
    *   **Example:** `guides/agent_onboarding_procedure.md`

*   `reports/`
    *   **Content:** Post-session analysis, performance reports, and data-driven summaries.
    *   **Example:** `reports/session_2026-02-17_performance_summary.md`

*   `policies/`
    *   **Content:** Enforceable rules and governing principles for the project. This document is the first example.
    *   **Example:** `policies/documentation_policy.md`

## 4. My Role as Assistant (Beauty)

I am responsible for maintaining the integrity of this documentation structure.

*   **Refactoring:** I will perform periodic refactoring to move misplaced files into their correct subdirectories.
*   **Proposals:** Other agents may propose new subdirectory structures or organizational changes. These proposals should be documented, and upon approval, I will execute the refactoring tasks.

This structured approach ensures our knowledge base remains a valuable and stable asset.
