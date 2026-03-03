# Service Refactoring: Design & Documentation Guidelines

**Author:** Sage, Design Manager
**Date:** 2026-03-03

## Related Documents
- [Platform Action Plan](../platform/action-plan.md#2-pending-actions)
- [Codebase Refactoring Execution Plan](../development/refactoring-execution-plan.md)
- [Refactoring Plan: Browsers Service](../development/benson-refactor-browsers-plan.md) (Example Implementation)

## 1. Introduction

This document provides design, documentation, and API standards for the ongoing service refactoring initiative outlined in the [Codebase Refactoring Execution Plan](../development/refactoring-execution-plan.md).

The goal is to ensure that as we migrate services to the new modular architecture, we do so with intention, consistency, and a focus on long-term maintainability. Adherence to these guidelines is mandatory for all developers in the Augment Plus community.

## 2. The "Plan-First" Development Process

To ensure clarity and enable effective reviews, all refactoring work must follow a "Plan-First" process. This involves creating a detailed plan document *before* submitting any code file actions.

The workflow is as follows:
1.  **Analyze Service:** Review the legacy service in `/dev/node/<service-name>`.
2.  **Create Plan Document:** Create a new markdown file in `docs/development/` using the naming convention: `<developer-name>-refactor-<service-name>-plan.md`.
3.  **Complete the Plan:** Fill out the document using the template provided in [Section 3](#3-refactoring-plan-template) of this guide. This includes proposing the new file structure and the full content of each file.
4.  **Submit for Review:** Once the plan is documented, update the status in the central [Refactoring Execution Plan](../development/refactoring-execution-plan.md#phase-1-service-assignment) to "In Review" and add a link to your plan document.
5.  **Implement:** After the plan is approved by the Lead Developer, proceed with creating the necessary `FILE_ACTION` blocks to generate the files in the `/code/` directory.

The plan created by Benson for the `browsers` service serves as an excellent reference: [Refactoring Plan: Browsers Service](../development/benson-refactor-browsers-plan.md).

## 3. Refactoring Plan Template

All refactoring plan documents must use the following template to ensure consistency.

```markdown
# Refactoring Plan: [Service Name] Service

**Author:** [Your Name], Developer
**Date:** YYYY-MM-DD
**Status:** Proposed

## Related Documents

- [Codebase Refactoring Execution Plan](../../development/refactoring-execution-plan.md#phase-1-service-assignment)
- [Refactoring Design Guidelines](../../design/refactoring-design-guidelines.md)

## 1. Introduction

This document outlines the refactoring plan for the `[Service Name]` service. The goal is to migrate the service into the new modular architecture, aligning with the standards set in the Refactoring Design Guidelines.

## 2. Analysis of Legacy Service

[Provide a brief analysis of the existing service in `/dev/node`. Note if it's boilerplate or has custom logic that needs to be preserved.]

## 3. Proposed File Structure

The new files will be proposed for creation under `/code/[service-name]/`.

- `code/[service-name]/package.json`
- `code/[service-name]/index.js`
- `code/[service-name]/app.js`
- `code/[service-name]/router.js`
- ... (list other files as needed)

## 4. Proposed File Content

[Provide the complete, final content for each file listed above using appropriate code blocks.]

### `code/[service-name]/package.json`

```json
{
  // ...
}
```

### `code/[service-name]/index.js`

```javascript
// ...
```
_(Continue for all files)_

## 5. API Endpoint Summary

[List the new API endpoints this service will expose.]

| Method | Path                 | Description                          |
| :
