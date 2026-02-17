# Implementation Plan: Session Manager Skeleton

## 1. Purpose

This document provides a proposed implementation skeleton for the **Session Manager** component. It is designed to work in tandem with the Input Gateway and follows the architectural directive to start with an in-memory storage solution for managing user sessions.

**Reference Documents:**
*   [Project Architecture: Input/Output (I/O) Subsystem](docs/architecture/IO_SUBSYSTEM.md)
*   [DEV_SWITCH: Initial Configuration for I/O Subsystem](/dev/io_subsystem_config.md)
*   [Implementation Plan: Input Gateway Skeleton](docs/dev/implementation/01_input_gateway_skeleton.md)

## 2. Proposed File Structure

This component will live in the `src/io/session/` directory as proposed by Andrew. We will also define our session-related types.

```
/src
  /io
    /gateway/
      ...
    /session/
      - manager.ts           # The Session Manager module/class
    /dispatcher/
      ...
    - types.ts               # Shared types, including Session type
```

## 3. Pseudo-code Skeleton

This pseudo-code outlines a simple, static class to manage sessions in memory using a `Map`.

### `src/io/types.ts` (Appending Session type)
```typescript
// Shared types for the I/O Subsystem

export interface Session {
  id: string;
  userId: string; // Or other identifier for the connected human
  createdAt: number;
  lastActivityAt: number;
  context: Record<string, any>; // For storing session-specific state
}

export interface InboundMessage {
  // TBD: Define the structure of messages from the client
  command: string;
  payload: any;
}
```

### `src/io/session/manager.ts`
```typescript
// Manages live sessions in-memory

import { randomUUID } from 'crypto';
import { Session } from '../types';

// As per Roni's config, session timeout is 1 hour.
const SESSION_TIMEOUT_SECONDS = 3600; 

export class SessionManager {
  private static sessions: Map<string, Session> = new Map();

  /**
   * Creates a new session for a given user and stores it.
   */
  public static createSession(userId: string): Session {
    const sessionId = randomUUID();
    const now = Date.now();
    const newSession: Session = {
      id: sessionId,
      userId,
      createdAt: now,
      lastActivityAt: now,
      context: {},
    };

    this.sessions.set(sessionId, newSession);
    console.log(`[SessionManager] Session created: ${sessionId} for user: ${userId}`);
    return newSession;
  }

  /**
   * Retrieves an active session by its ID.
   */
  public static getSession(sessionId: string): Session | undefined {
    const session = this.sessions.get(sessionId);
    if (session) {
      // Update activity timestamp on access
      session.lastActivityAt = Date.now();
      this.sessions.set(sessionId, session);
    }
    return session;
  }

  /**
   * Terminates a session, removing it from memory.
   */
  public static terminateSession(sessionId: string): boolean {
    if (this.sessions.has(sessionId)) {
      this.sessions.delete(sessionId);
      console.log(`[SessionManager] Session terminated: ${sessionId}`);
      return true;
    }
    return false;
  }

  /**
   * Periodically purges stale sessions. To be called by a system-level cron or interval.
   */
  public static purgeStaleSessions() {
    const now = Date.now();
    let purgedCount = 0;
    for (const [sessionId, session] of this.sessions.entries()) {
      const idleTime = (now - session.lastActivityAt) / 1000;
      if (idleTime > SESSION_TIMEOUT_SECONDS) {
        this.terminateSession(sessionId);
        purgedCount++;
      }
    }
    if (purgedCount > 0) {
      console.log(`[SessionManager] Purged ${purgedCount} stale sessions.`);
    }
  }
}
```

## 4. Integration with Input Gateway

Here is how Andrew's proposed `handler.ts` could be updated to integrate with this `SessionManager`.

### `src/io/gateway/handler.ts` (Example Update)
```typescript
import { SessionManager } from '../session/manager';

export const handleConnection = (ws) => {
  // For now, we'll use a placeholder user ID. Auth will come later.
  const session = SessionManager.createSession('human_reviewer_1');
  
  // Send the session ID to the client so it can be included in subsequent messages.
  ws.send(JSON.stringify({ type: 'session_created', payload: { sessionId: session.id } }));

  ws.on('message', (message) => {
    // ... validation logic ...

    // Assume message now includes sessionId
    const currentSession = SessionManager.getSession(data.sessionId);
    if (!currentSession) {
      ws.send(JSON.stringify({ type: 'error', payload: 'Invalid or expired session.' }));
      ws.close();
      return;
    }
    
    // ... forward command to Platform Core with session context ...
  });

  ws.on('close', () => {
    console.log(`Client disconnected for session: ${session.id}`);
    SessionManager.terminateSession(session.id);
  });
};
```

## 5. Next Steps

This skeleton provides the foundation for our in-memory session management. I welcome feedback from the team. If this is approved, we have a clear path for implementing both the Gateway and the Session Manager in parallel.
