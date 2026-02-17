# Implementation Plan: Output Dispatcher Skeleton

## 1. Purpose

This document provides a proposed implementation skeleton for the **Output Dispatcher** component. It completes the triad of I/O components by providing a dedicated, decoupled mechanism for sending data from the Platform Core back to the connected human interface.

**Reference Documents:**
*   [Project Architecture: Input/Output (I/O) Subsystem](docs/architecture/IO_SUBSYSTEM.md)
*   [DEV_SWITCH: Initial Configuration for I/O Subsystem](/dev/io_subsystem_config.md)
*   [Implementation Plan: Input Gateway Skeleton](docs/dev/implementation/01_input_gateway_skeleton.md)
*   [Implementation Plan: Session Manager Skeleton](docs/dev/implementation/02_session_manager_skeleton.md)

## 2. Proposed File Structure

Following the established pattern, this component will reside in `src/io/dispatcher/`.

```
/src
  /io
    /gateway/
      ...
    /session/
      ...
    /dispatcher/
      - dispatcher.ts        # The Output Dispatcher module/class
    - types.ts               # Shared types, including OutboundMessage
```

## 3. Pseudo-code Skeleton

The Output Dispatcher will act as a static class, managing a map of active connections. It does not create connections but simply manages references to those created by the Input Gateway.

### `src/io/types.ts` (Appending OutboundMessage type)
```typescript
// Appending to the shared types file

export interface OutboundMessage {
  type: 'data' | 'error' | 'session_created' | 'broadcast';
  timestamp: string;
  payload: any;
}
```

### `src/io/dispatcher/dispatcher.ts`
```typescript
// Manages sending data to connected clients

import { WebSocket } from 'ws';
import { OutboundMessage } from '../types';

// This map holds the live WebSocket object for each active session.
// Key: sessionId, Value: WebSocket instance
const connections: Map<string, WebSocket> = new Map();

export class OutputDispatcher {
  /**
   * Registers an active WebSocket connection against a session ID.
   * This should be called by the gateway handler immediately after a session is created.
   */
  public static registerConnection(sessionId: string, ws: WebSocket): void {
    connections.set(sessionId, ws);
    console.log(`[OutputDispatcher] Connection registered for session: ${sessionId}`);
  }

  /**
   * Removes a WebSocket connection reference when a client disconnects.
   */
  public static unregisterConnection(sessionId: string): void {
    if (connections.has(sessionId)) {
      connections.delete(sessionId);
      console.log(`[OutputDispatcher] Connection unregistered for session: ${sessionId}`);
    }
  }

  /**
   * Sends a structured message to a specific session. This is the primary interface
   * for the Platform Core to communicate with a human reviewer.
   */
  public static dispatch(sessionId: string, payload: any): boolean {
    const ws = connections.get(sessionId);

    if (ws && ws.readyState === WebSocket.OPEN) {
      const message: OutboundMessage = {
        type: 'data',
        timestamp: new Date().toISOString(),
        payload: payload,
      };
      ws.send(JSON.stringify(message));
      console.log(`[OutputDispatcher] Dispatched message to session: ${sessionId}`);
      return true;
    } else {
      console.warn(`[OutputDispatcher] Dispatch failed: No active connection for session ${sessionId}.`);
      return false;
    }
  }

  /**
   * Sends a message to all currently connected clients.
   * Useful for system-wide alerts or status updates.
   */
  public static broadcast(payload: any): void {
    const message: OutboundMessage = {
      type: 'broadcast',
      timestamp: new Date().toISOString(),
      payload: payload,
    };
    const messageString = JSON.stringify(message);

    console.log(`[OutputDispatcher] Broadcasting to ${connections.size} clients.`);
    for (const ws of connections.values()) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(messageString);
      }
    }
  }
}
```

## 4. Full Integration Example

This shows how all three components (Gateway, Session Manager, Dispatcher) work together in the `handler.ts` file.

### `src/io/gateway/handler.ts` (Complete Integration Example)
```typescript
import { SessionManager } from '../session/manager';
import { OutputDispatcher } from '../dispatcher/dispatcher';
import { validateMessage } from './validation'; // from Andrew's proposal

export const handleConnection = (ws) => {
  // Use a placeholder user ID until authentication is implemented.
  const session = SessionManager.createSession('human-reviewer-1');
  
  // 1. Register the new connection with the dispatcher.
  OutputDispatcher.registerConnection(session.id, ws);

  // 2. Inform the client of its new session ID.
  const sessionCreatedPayload = { sessionId: session.id };
  OutputDispatcher.dispatch(session.id, { type: 'session_created', payload: sessionCreatedPayload });

  ws.on('message', (message) => {
    // ... parsing and validation logic ...
    const { isValid, error, data } = validateMessage(JSON.parse(message.toString()));

    // Ensure incoming message contains the session ID for stateful interaction
    const currentSession = SessionManager.getSession(data.sessionId);
    if (!currentSession) {
      // Handle invalid session
      return;
    }
    
    // 3. Forward the validated command to the Platform Core with session context.
    // PlatformCore.processCommand(currentSession, data.command);
  });

  ws.on('close', () => {
    console.log(`Client disconnected from session: ${session.id}`);
    // 4. Clean up resources on disconnection.
    OutputDispatcher.unregisterConnection(session.id);
    SessionManager.terminateSession(session.id);
  });
};
```

## 5. Next Steps

With skeletons for all three core I/O components now defined, I believe we have a complete and actionable plan for implementation. We can proceed with confidence, knowing the pieces are designed to fit together.

@Roni, I await your direction on whether we should begin scaffolding these files or if further review is needed.
