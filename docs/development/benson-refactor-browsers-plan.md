# Refactoring Plan: Browsers Service

**Author:** Benson, Developer
**Date:** 2026-03-03
**Status:** Proposed

## Related Documents

- [Codebase Refactoring Execution Plan](./refactoring-execution-plan.md#phase-1-service-assignment)
- [Platform Action Plan](../platform/action-plan.md#2-pending-actions)
- [Architect Directives (2026-02-24)](../platform/architect-directives-2026-02-24.md)

## 1. Introduction

This document outlines the refactoring plan for the `browsers` service, as assigned in the [Codebase Refactoring Execution Plan](./refactoring-execution-plan.md). The goal is to migrate the service from the legacy `/dev/node/browsers` directory into a new, self-contained structure that aligns with the platform's modular architecture.

This plan serves as the initial review document. Following its approval, I will proceed with generating the necessary `FILE_ACTION` blocks to create the files in the `/code/browsers/` directory.

## 2. Analysis and Approach

The existing `/dev/node/browsers` directory contains a generic set of boilerplate files that are not specific to its designated function as a "Chromium Service".

My approach is to establish a clean, foundational structure for the `browsers` service. This new structure will be self-contained and decoupled from the duplicated code in `/dev/node`. It includes a basic Express server setup, a dedicated router, and a `package.json`. A placeholder health-check endpoint will be created to verify service operation.

## 3. Proposed File Structure

The new files will be proposed for creation under the `/code/browsers/` path.

- `code/browsers/package.json`
- `code/browsers/index.js`
- `code/browsers/app.js`
- `code/browsers/router.js`

## 4. Proposed File Content

Below is the proposed content for each new file.

### `code/browsers/package.json`

```json
{
  "name": "browsers-service",
  "version": "1.0.0",
  "description": "The Great Unknown Chromium Service",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

### `code/browsers/index.js`

This file serves as the entry point for the service, responsible for starting the server.

```javascript
const app = require('./app');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Chromium Service listening on port ${PORT}`);
});
```

### `code/browsers/app.js`

This file configures the Express application and its middleware.

```javascript
const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All service-specific routes will be prefixed with /api/v1
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Chromium Service is running.');
});

module.exports = app;
```

### `code/browsers/router.js`

This file will contain all routes specific to the `browsers` service. It starts with a simple status endpoint.

```javascript
const express = require('express');
const router = express.Router();

// Placeholder for future browser-specific controllers.
// Example: const browserController = require('../../controllers/browsers/mainController');

router.get('/browsers/status', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Chromium Service' });
});

module.exports = router;
```

## 5. Next Steps

1.  **Review:** This plan should be reviewed by the Lead Developer, Henry, and the Project Architect, Michael.
2.  **Update Tracker:** Following the creation of this document, the status for the `browsers` service in the [Refactoring Execution Plan](./refactoring-execution-plan.md#phase-1-service-assignment) should be updated to "In Review" with a link to this file.
3.  **Implementation:** Upon approval of this plan, I will submit the `FILE_ACTION` requests to create the files as specified above.
