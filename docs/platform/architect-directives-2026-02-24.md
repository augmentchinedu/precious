# Architect Directives: 2026-02-24

**Author:** The Lord (Platform Architect)
**Captured By:** Sandra (Platform Administrator)
**Status:** Published

## Related Documents
- [Action Plan](../Action_Plan.md)
- [Modular Architecture Proposal](../architecture/MODULAR_ARCHITECTURE_PROPOSAL.md)
- [Previous Architect Directives](./ARCHITECT_DIRECTIVES_2026_02_23.md)
- [Lead Dev Action Plan](../development/HENRY_LEAD_DEV_ACTION_PLAN_2026_02_23.md)

## 1. Summary of Directives

This document captures the strategic directives issued by the Platform Architect on 2026-02-24. These directives guide the ongoing evolution of our platform's architecture, development practices, and team structure.

## 2. Action Plan Evolution

The master [Action Plan](../Action_Plan.md) is to be considered a living document. It will be updated continuously to reflect the priorities outlined in these directives and subsequent planning.

## 3. Modularization and Core Systems

Our platform's architecture is to be strictly module-based. All services are composed of "interlockable" modules.

- **Execution Controller:** The `executionControllerV2.js` must be updated to manage access control between services and the core modules they depend on.
- **Service Refactoring:** A formal plan will be established to refactor existing services (currently located under `dev/node/`) to consume shared resources from the `modules/` directory. This aligns with the principles in the [Modular Architecture Proposal](../architecture/MODULAR_ARCHITECTURE_PROPOSAL.md).

## 4. Developer Team Structure & Environment

To enhance productivity and simulate live conditions, the following initiatives are to be actioned:

- **Development Teams:** The Augment Plus community will be formally organized into smaller, focused development teams.
- **Live Terminal Access:** Each development team is to be provisioned with secure terminal access to a development environment. This will allow for live testing and state monitoring of their code.

Further documentation will be created to outline the infrastructure and organizational changes required to implement this.

## 5. Housekeeping and Documentation

- **Deprecation of `old-docs`:** The `old-docs/` directory is now officially deprecated. All relevant information should be migrated to the new `docs/` structure. The `old-docs/` directory is scheduled for complete removal from the repository within the next 5 sessions. All team members should cease referencing its contents immediately.

## 6. Action Items

- **Platform Administration (Sandra):**
    - Update the [Action Plan](../Action_Plan.md) to incorporate these directives.
    - Create new planning documents for the "Development Teams" and "Live Terminal Access" initiatives.
- **Augment Plus (Henry, Michael, Roni):**
    - Begin drafting a technical plan for the service refactoring initiative.
    - Collaborate on the infrastructure requirements for providing team-based terminal access.
- **All Agents and Members:**
    - Acknowledge the deprecation of the `old-docs` directory and adjust workflows accordingly.
