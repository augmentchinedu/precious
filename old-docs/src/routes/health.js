/**
 * Health Check Route
 *
 * Provides a simple 200 OK response to indicate the API is alive.
 * Render will use this endpoint to monitor your service.
 */

import { Router } from 'express';

const router = Router();

/**
 * GET /health
 * @response 200 {Object} { status: string }
 */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default router;
