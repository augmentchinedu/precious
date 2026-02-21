# Developer Operator Review: Custom Domain Mappings

**Date:** 2026-02-21
**Author:** Roni (Developer Operator)
**Topic:** Operational Impact of Custom Domain Mappings
**Status:** Reviewed

## Overview

This document presents an operational review from the Developer Operator's perspective regarding the recently implemented custom domain mappings for the platform's nodes. These mappings, as outlined in `docs/platform/CUSTOM_DOMAIN_MAPPINGS.md` and detailed by the Platform Architect, establish clear distinctions between production (`gkrane.online`) and development (`bawell.online`) environments for the Express, Games, Stores, AI, and Currency nodes.

## Operational Impact from a Developer Operator's Perspective

The introduction of dedicated custom domains for platform services is a significant enhancement with several positive operational impacts for Developer Operators:

1.  **Enhanced Clarity and Consistency for Environments:**
    *   The explicit separation of `gkrane.online` for production and `bawell.online` for development environments provides unambiguous endpoints. This reduces potential confusion and errors when developers or operators need to access specific services in different environments.
    *   Consistent subdomain patterns (e.g., `ai.gkrane.online` for production AI, `ai.bawell.online` for development AI) simplify mental models and reduce the cognitive load for managing multiple services.

2.  **Streamlined CI/CD and Deployment Processes:**
    *   Automated Continuous Integration/Continuous Deployment (CI/CD) pipelines can now be more robustly configured to target specific environments using these predictable URLs. This simplifies scripting for deployments, automated testing against deployed services, and rollback procedures.
    *   Reduced risk of accidental cross-environment deployments due to clearer target identification.

3.  **Improved Local Development and Testing:**
    *   Developers can configure their local setups to more closely mirror the production and development environments, particularly for features that rely on specific domain contexts (e.g., CORS policies, OAuth redirects, cookie domains).
    *   Facilitates integration testing by providing stable and consistent external endpoints for development services.

4.  **Simplified Monitoring and Troubleshooting:**
    *   When issues arise, it is now easier to quickly identify which environment is affected based on the domain reported in logs or monitoring alerts.
    *   Monitoring tools can be configured with distinct alerts and dashboards for production and development domains, allowing for more targeted operational oversight.
    *   Streamlines communication during incident response by providing clear, standardized references to affected services.

## Recommendations and Next Steps

*   **Documentation Updates:** Ensure all developer guides, internal runbooks, and CI/CD configuration documentation are updated to reflect the new domain mappings. This includes any service mesh or API gateway configurations.
*   **Tooling Configuration:** Verify that all automated tools, scripts, and monitoring systems are correctly configured to utilize and differentiate between the new production and development domains.
*   **DNS and SSL Verification:** Confirm successful DNS propagation and the proper configuration and expiry monitoring of SSL/TLS certificates for all new domains and subdomains across both environments.
*   **Developer Communication:** Disseminate clear instructions and best practices for developers on how to leverage these new domains in their daily workflows, emphasizing the importance of environment distinction.

This development is a significant step towards a more organized, efficient, and robust operational environment for The Great Unknown platform.
