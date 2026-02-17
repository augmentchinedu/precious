# Implementation Plan: Input Gateway Skeleton

## 1. Purpose

This document provides a proposed file structure and pseudo-code skeleton for the **Input Gateway** component of the I/O Subsystem. It is intended to serve as a starting point for development, aligning with the architectural principles and configurations already established.

**Reference Documents:**
*   [Project Architecture: Input/Output (I/O) Subsystem](docs/architecture/IO_SUBSYSTEM.md)
*   [DEV_SWITCH: Initial Configuration for I/O Subsystem](/dev/io_subsystem_config.md)

## 2. Proposed File Structure

I suggest we organize the I/O Subsystem code within a dedicated `src/io` directory. This promotes modularity and keeps I/O-related logic self-contained.

```
/src
  /io
    /gateway
      - index.ts             # Initializes and exposes the WebSocket server
      - handler.ts           # Handles WebSocket connection logic (on message, on close)
      - validation.ts        # Schema validation for incoming messages
    /session/
      - manager.ts           # (Placeholder for Session Manager component)
    /dispatcher/
      - dispatcher.ts        # (Placeholder for Output Dispatcher component)
    - types.ts               # Shared TypeScript types for the I/O subsystem
  - server.ts                # Main application entry point
```

## 3. Pseudo-code Skeleton

This pseudo-code demonstrates the basic logic and interaction between the proposed files for the Input Gateway.

### `server.ts`
```typescript
// Main application server entry point

import { createServer } from 'http';
import { initializeGateway } from './io/gateway';

const httpServer = createServer();

// Initialize the I/O Gateway and attach it to the http server
const ioGateway = initializeGateway(httpServer);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`I/O Gateway is active at ws://localhost:${PORT}/io`);
});
```

### `src/io/gateway/index.ts`
```typescript
// Sets up the WebSocket server

import { WebSocketServer } from 'ws';
import { handleConnection } from './handler';

export const initializeGateway = (server) => {
  const wss = new WebSocketServer({ 
    server,
    path: '/io' // As per Roni's config
  });

  console.log('Input Gateway (WebSocket Server) initialized.');

  wss.on('connection', (ws) => {
    console.log('New client connected to Input Gateway.');
    handleConnection(ws);
  });

  return wss;
};
```

### `src/io/gateway/handler.ts`
```typescript
// Handles logic for each individual WebSocket connection

import { validateMessage } from './validation';
// import { SessionManager } from '../session/manager'; // To be implemented

export const handleConnection = (ws) => {
  // const session = SessionManager.createSession(); // Example interaction

  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());
      
      // 1. Validate the incoming message
      const { isValid, error, data } = validateMessage(parsedMessage);
      if (!isValid) {
        ws.send(JSON.stringify({ type: 'error', payload: `Invalid message: ${error}` }));
        return;
      }

      // 2. Translate to a standardized command for the Platform Core (TBD)
      console.log('Received and validated command:', data);

      // 3. Forward to Platform Core (TBD)

    } catch (e) {
      ws.send(JSON.stringify({ type: 'error', payload: 'Malformed JSON message.' }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
    // SessionManager.terminateSession(session.id); // Example interaction
  });
};
```

## 4. Next Steps

I welcome feedback on this proposed structure from the team (@Benson, @Clark, @Roni). If this approach is approved, I can begin scaffolding the actual files and implementing the basic server setup.
