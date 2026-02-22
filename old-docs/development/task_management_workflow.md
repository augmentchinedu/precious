# Task Management & Issue Tracking Workflow

## 1. Introduction

This document defines the process for managing development tasks, bugs, and other work items at Augment Plus. Its purpose is to ensure that all work is tracked, prioritized, and linked to our codebase in a transparent and efficient manner. This workflow is a practical implementation of the principles outlined in the `developer_operations_handbook.md`.

## 2. Tooling: GitHub Issues

We will use GitHub Issues as our single source of truth for all development tasks. This keeps our work items co-located with our code repositories, facilitating easy linking between issues, commits, and pull requests.

## 3. Issue Lifecycle & Statuses

Each issue will progress through a series of stages, represented by labels or project board columns in GitHub.

1.  **`Backlog` / `To Do`**: The issue has been created and vetted but is not currently being worked on. It is prioritized and ready to be picked up.
2.  **`In Progress`**: A developer has assigned the issue to themselves and has started work. The corresponding feature branch has been created (e.g., `feature/PROJ-42-new-login-form`).
3.  **`In Review`**: The developer has completed the work and opened a Pull Request. The PR is awaiting review from a peer and the Developer Operator (Roni), as per the PR process.
4.  **`Done` / `Closed`**: The Pull Request has been approved and merged into the `develop` branch. The issue is considered resolved.

## 4. Issue Types

To categorize our work, we will use the following issue labels:

*   **`type: feature`**: A new piece of functionality or a user-facing improvement. Should include a user story and acceptance criteria.
*   **`type: bug`**: An issue with existing functionality that is not working as intended. Must include steps to reproduce.
*   **`type: chore`**: A task that is necessary for the health of the codebase but does not add a user-facing feature (e.g., refactoring, upgrading dependencies, improving CI/CD).
*   **`type: documentation`**: A task related to writing or updating documentation.

## 5. Standard Issue Template

All new issues (especially features and bugs) should be created using a standard template to ensure all necessary information is provided.

**Feature Request Template:**

```markdown
**As a** [type of user],
**I want to** [perform some action]
**so that** [I can achieve some goal].

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### Technical Notes (Optional)
*   Any technical considerations, potential challenges, or proposed implementation details.
```

**Bug Report Template:**

```markdown
### Description
A clear and concise description of what the bug is.

### Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. See error

### Expected Behavior
A clear and concise description of what you expected to happen.

### Actual Behavior
A clear and concise description of what actually happened.

### Environment
*   **OS:** [e.g., Windows 10]
*   **Browser:** [e.g., Chrome, Firefox]
*   **Version:** [e.g., App version 1.2.3]
```

## 6. Connecting Code with Issues

To maintain a clear audit trail, it is mandatory to link commits and Pull Requests to the corresponding issue.

*   **Branch Naming:** As defined by Roni, branch names must include the issue ID: `feature/AGP-123-brief-description`.
*   **Pull Requests:** The PR title and body should reference the issue number (e.g., "Resolves #123"). This allows GitHub to automatically link the PR to the issue and close the issue upon merge.

This structured workflow will ensure that we, the developers, can focus on building great software in an organized and accountable manner.
