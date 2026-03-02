# Documentation Action Plan – 48-Hour Split

## 1. Code Implementation (Automatable / Developer Work)

| Action                          | Priority | Tasks / Notes                                                         | Owner | Time Estimate |
| ------------------------------- | -------- | --------------------------------------------------------------------- | ----- | ------------- |
| Docs-as-Code enforcement in PRs | High     | - Add GitHub/GitLab Actions to fail PRs if documentation not updated. |       |               |

* Check for changes in `README.md` or `docs/` folder when code changes. | All Devs / DevOps | 4–6h |
  | CI Documentation Linting | Medium | - Implement link checker (`markdown-link-check`) for internal docs.
* JSDoc syntax validation for Node.js services.
* Markdown formatting checks. | DevOps / Roni | 6h |
  | Inline API Documentation | High | - JSDoc templates for all public functions.
* Swagger/OpenAPI generator integration (`swagger-jsdoc` / `openapi-generator`). | Backend Devs | 8h |
  | Vue Component Docs Standardisation | High | - Auto-generate Storybook entries where possible.
* Generate props/events tables from `.vue` files. | Frontend Devs | 6h |
  | Add Practical Code Examples | Medium | - Use snippets in README.md and Swagger examples.
* Include `curl` and live demos where possible. | All Devs | 4h |
  | Expand `TESTING_STRATEGY.md` | Medium | - Add concrete examples for Node.js, Vue 3, HTML5 games.
* Integrate with CI test coverage reporting. | Andrew / Benson / Clark | 4h |

> Focus first on CI checks + inline docs – this ensures subsequent work is enforceable.

---

## 2. Governance / Prompting (Workflow, Reviews, Policies)

| Action                                | Priority | Tasks / Notes                                          | Owner | Time Estimate |
| ------------------------------------- | -------- | ------------------------------------------------------ | ----- | ------------- |
| Mandatory Documentation Review in PRs | High     | - Update PR templates to include doc update checklist. |       |               |

* Add automated label or approval requirement if doc changes missing. | All Devs / Tech Leads | 1–2h |
  | Module-Level README Policy | High | - Prompt devs to add `README.md` on service/module creation.
* Track missing modules in internal dashboard / project board. | All Devs | 1h |
  | Cross-Linking and Navigation | Low/Ongoing | - Establish standard linking guidelines for `docs/`.
* Schedule weekly or bi-weekly audits. | All Devs | 2h |
  | Inter-Service Communication Standards | Medium | - Governance: enforce API contract compliance.
* Document conventions for serialization, auth, error handling. | Platform Architect / Michael | 2–3h |

> Automate prompts in PR templates or commit hooks to prevent human oversight.

---

## 3. Human Actions (Manual / Knowledge-Driven)

| Action                                              | Priority | Tasks / Notes                                         | Owner | Time Estimate |
| --------------------------------------------------- | -------- | ----------------------------------------------------- | ----- | ------------- |
| Module-Level READMEs (`dev/node/*/` & `modules/*/`) | High     | - Write overviews, setup instructions, key endpoints. |       |               |

* Link to `docs/` for standards. | All Devs | 6–8h |
  | Vue Component Documentation | High | - Manual writeup for design considerations, usage examples. | Frontend Devs | 4–6h |
  | HTML5 Game Development Guidelines | Medium | - Document logic patterns, asset management, cross-browser compatibility. | Game Devs / Tech Lead | 4–6h |
  | Audit Existing `docs/` for Broken Links | Medium | - Manual review of critical paths. | All Devs | 2h |
  | Migration to `docs/` Directory | Medium | - Move existing markdown files.
* Update references across repos. | All Devs | 2–3h |

> Manual actions are the bulk of the workload. Divide team to parallelize module READMEs + Vue component docs + game guidelines.

---

## Suggested 48-Hour Execution Order

**Day 1:**

1. Setup CI checks + PR templates (Code + Governance) – 6–8h
2. Begin module README creation (Human) – 4–6h
3. Start inline API documentation for Node.js services – 4–6h

**Day 2:**

1. Complete module READMEs + Vue component docs (Human) – 6–8h
2. Expand `TESTING_STRATEGY.md` – 3–4h
3. HTML5 game guidelines – 4–6h
4. Audit `docs/` for broken links + cross-linking (Human/Governance) – 2–3h
5. Verify CI enforcement works, PRs fail if docs missing (Code/Governance) – 2h

---

✅ By splitting along **Code Implementation, Governance Prompting, and Human Actions**, you ensure:

* Automation enforces compliance (CI + PR checks).
* Developers know exactly where and what to write (module/Vue/game docs).
* Migration to `docs/` is complete and discoverable.
* Within 48 hours, all high-priority items can be achieved if the team works in parallel.


## Strategic Initiatives Update (2026-02-24)

This section details the action items and strategic direction based on the [Architect Directives of 2026-02-24](./platform/architect-directives-2026-02-24.md). It incorporates the technical strategy outlined in the [Architectural Response to Directives](./architecture/architectural-response-to-directives-2026-02-24.md) and acknowledges the financial review from the [Ministry of Finance](./ministries/finance/finance-ministry-review-of-architect-directives-2026-02-24.md).

### 1. Core Architecture: Modular Refactoring

The primary technical goal is to complete the transition to a fully modular architecture as described in the [Modular Architecture Proposal](./architecture/MODULAR_ARCHITECTURE_PROPOSAL.md).

**Objective:** Refactor all services in `dev/node/` to consume shared, version-controlled modules from the `modules/` directory, eliminating code duplication and enforcing a clean separation of concerns.

**Key Actions:**

- **Enhance Execution Controller V2:** Update `core/admin/executionControllerV2.js` to act as a secure module loader, enforcing access control based on a defined manifest.
  - **Owner:** Michael (Project Architect)
  - **Reference:** [Execution Controller V2 Enhancement](./architecture/architectural-response-to-directives-2026-02-24.md#3-execution-controller-v2-enhancement)
- **Phase 1: Service Audit:** Conduct a comprehensive audit of all `dev/node/` services to identify and prioritize logic for extraction into shared modules.
  - **Owner:** Henry (Lead Developer)
  - **Reference:** [Service Refactoring Strategy](./architecture/architectural-response-to-directives-2026-02-24.md#2-service-refactoring-strategy)
- **Phase 2 & 3: Module Development & Integration:** Develop robust, centralized modules and then iteratively refactor services to use them, starting with a pilot service.
  - **Owner:** Augment Plus Development Team (Henry, Andrew, Benson, Clark)
- **Financial Planning:** Provide detailed resource estimates for the refactoring effort to the Ministry of Finance.
  - **Owner:** Henry, Michael
  - **Reference:** [Finance Ministry Review](./ministries/finance/finance-ministry-review-of-architect-directives-2026-02-24.md#21-modular-architecture-refactoring)

### 2. Developer Empowerment: Teams & Environments

To boost productivity and collaboration, we will restructure our development workflow and provide improved tooling.

**Objective:** Organize developers into focused teams and provide each team with an isolated, containerized development environment that mirrors production, complete with live terminal access.

**Key Actions:**

- **Define Team Structure:** Formalize the creation of smaller, focused development teams within Augment Plus.
  - **Owner:** Sandra (Platform Administrator), Michael (Project Architect)
- **Architect Live Environments:** Design the container-based (Docker) development environments and the mechanism for secure terminal access.
  - **Owner:** Roni (Developer Operator)
  - **Reference:** [Live Development Environments](./architecture/architectural-response-to-directives-2026-02-24.md#4-live-development-environments)
- **Cost Analysis:** Prepare a detailed cost projection and cost-benefit analysis for the new infrastructure and submit it to the Ministry of Finance.
  - **Owner:** Roni
  - **Reference:** [Finance Ministry Review](./ministries/finance/finance-ministry-review-of-architect-directives-2026-02-24.md#22-developer-team-environments--live-terminal-access)

### 3. Housekeeping: Documentation Cleanup

To reduce confusion and streamline onboarding, we will finalize the migration away from legacy documentation.

**Objective:** Fully deprecate and remove the `old-docs/` directory.

**Key Actions:**

- **Final Content Migration:** All members must ensure any critical information still in `old-docs/` is moved to the new `docs/` structure.
  - **Owner:** All Team Members
- **Directory Deletion:** The `old-docs/` directory will be permanently deleted from the repository.
  - **Owner:** Sandra (Platform Administrator)
  - **Deadline:** Within 5 sessions from 2026-02-24.
