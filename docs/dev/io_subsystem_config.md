# DEV_SWITCH: Initial Configuration for I/O Subsystem

## 1. Purpose

This file establishes the initial development configuration for the I/O Subsystem, as architected in `docs/architecture/IO_SUBSYSTEM.md`. This is a manual switch to set up the local development environment for all developers working on this module.

## 2. General Configuration

*   **NODE_ENV:** `development`
*   **LOG_LEVEL:** `debug`

## 3. Input Gateway Configuration

This component will be the primary entry point for human interaction.

*   **PROTOCOL:** `WebSocket`
*   **PORT:** `4000`
*   **API_PREFIX:** `/io`
*   **RATE_LIMIT_MAX_REQUESTS:** `100` (per 15 minutes, per IP)

## 4. Session Manager Configuration

As per the architecture, we will begin with an in-memory solution for session management to facilitate rapid development.

*   **STORAGE_TYPE:** `in-memory`
*   **SESSION_TIMEOUT_SECONDS:** `3600` (1 hour)
*   **PERSISTENCE_UPGRADE_TARGET:** `Redis` (Placeholder for future implementation)
*   **REDIS_CONNECTION_STRING:** `redis://localhost:6379` (Placeholder)

## 5. Output Dispatcher Configuration

The Output Dispatcher will utilize the connection established by the Input Gateway.

*   **TRANSPORT_PROTOCOL:** `WebSocket` (Inherited from Input Gateway)
*   **DEFAULT_FORMAT:** `JSON`

## 6. Developer Action Items

1.  Review this configuration in conjunction with the architecture document.
2.  Prepare feedback and questions for our team sync.
3.  Ensure your local development environment can accommodate a Node.js application running on port `4000`.
