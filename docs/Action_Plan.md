# Documentation Action Plan
**Directive:** "Update all our documents. Keep Them Living. Migrate Needed Documentations to our new `docs/` dir."
**Date:** 2026-02-23
**Status:** Active

---

## Summary of Issues Identified

Across reviews from Andrew, Benson, and Clark (Augment Plus Developers), three core problems were consistently raised:

1. **Documentation goes stale** — it doesn't keep pace with the codebase.
2. **Documentation is scattered** — modules, services, and components lack local, discoverable docs.
3. **No enforcement** — there are no automated or workflow-level gates to ensure documentation is maintained.

---

## Action Items

### 1. Adopt Docs-as-Code
**Priority:** High
**Owner:** All Developers / Tech Leads

- Treat documentation with the same discipline as source code.
- Require documentation updates in every Pull Request that changes functionality, APIs, or operational behaviour.
- Add documentation review as a mandatory PR checklist step.

---

### 2. Mandate Module-Level `README.md` Files
**Priority:** High
**Owner:** All Developers

- Every service under `dev/node/<service-id>/` must have a `README.md`.
- Every module under `modules/<module-name>/` must have a `README.md`.
- Minimum content: overview, setup instructions, key interfaces/endpoints, links to `docs/`.

---

### 3. Enforce Inline API Documentation
**Priority:** High
**Owner:** Backend Developers

- All Node.js services and modules must use JSDoc comments on public functions and endpoints.
- RESTful APIs must have OpenAPI/Swagger specifications covering endpoints, payloads, authentication, and error handling.
- Documentation should be auto-generated from source where possible.

---

### 4. Standardise Vue.js Component Documentation
**Priority:** High
**Owner:** Frontend Developers

- All components in `modules/components/` require companion documentation (e.g., `Button.md` alongside `Button.vue`, or Storybook entries).
- Must document: props, events, slots, usage examples, and design considerations.

---

### 5. Create HTML5 Game Development Guidelines
**Priority:** Medium
**Owner:** Game Developers / Tech Lead

- Create `docs/development/games/` section.
- Cover: game logic patterns, asset management, performance optimisation, cross-browser compatibility, and platform service integration.

---

### 6. Add Practical Code Examples to All Documentation
**Priority:** Medium
**Owner:** All Developers

- API docs must include working `curl` examples.
- Component docs must include live demos or runnable snippets.
- Module docs must include integration examples.

---

### 7. Implement CI Documentation Linting
**Priority:** Medium
**Owner:** DevOps / Roni (Developer Operator)

- Add automated CI checks for:
  - Broken internal links.
  - Required README sections.
  - Valid JSDoc syntax.
  - Formatting standards compliance.
- Fail the build on critical documentation violations.

---

### 8. Document Inter-Service Communication Standards
**Priority:** Medium
**Owner:** Platform Architect / Michael (Project Architect)

- Create `docs/architecture/inter-service-communication.md`.
- Cover: API contracts, data serialisation formats, authentication mechanisms, error handling patterns across Node.js services.

---

### 9. Expand `TESTING_STRATEGY.md`
**Priority:** Medium
**Owner:** Andrew / Benson / Clark

- Add detailed examples for unit, integration, and end-to-end tests.
- Cover: Node.js, Vue 3, and HTML5 Game contexts.
- Include guidance on mock data, test frameworks, and CI integration.

---

### 10. Improve Cross-Linking and Navigation
**Priority:** Low (ongoing)
**Owner:** All Developers

- Audit existing `docs/` for missing internal links.
- Ensure every module README links to relevant architecture docs, coding standards, and deployment guides.
- Assign periodic documentation review cycles.

---

## Migration Checklist (to `docs/` dir)

| Document / Area | Status | Owner |
|---|---|---|
| `CODING_STANDARDS.md` | ✅ Migrated | — |
| `ENVIRONMENT_SETUP.md` | ✅ Migrated | — |
| `DEVELOPMENT_WORKFLOW.md` | ✅ Migrated | — |
| `TESTING_STRATEGY.md` | ⚠️ Needs expansion | All Devs |
| `docs/design/DESIGN_SYSTEM.md` | ✅ Present | — |
| `docs/architecture/agent-protocol-spec.md` | ✅ Present | — |
| Module-level READMEs (`dev/node/*/`) | ❌ Missing | All Devs |
| Module-level READMEs (`modules/*/`) | ❌ Missing | All Devs |
| Vue component docs (`modules/components/`) | ❌ Missing | Frontend Devs |
| API specs (Node.js services) | ❌ Missing | Backend Devs |
| Game development guidelines | ❌ Missing | Game Devs |
| Inter-service communication standards | ❌ Missing | Architect / Michael |

---

## Success Criteria

- Every service and module has a local `README.md`.
- No PR merges without a documentation review step.
- CI pipeline catches broken links and missing doc sections automatically.
- All public APIs have auto-generated or manually maintained OpenAPI specs.
- `docs/` directory is the single source of truth, consistently cross-linked.