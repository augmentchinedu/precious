import pino from 'pino';
import fs from 'fs';
import path from 'path';

export class AuditLogger {
  constructor(rootDir) {
    const logsDir = path.join(rootDir, 'logs');

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    this.logger = pino(
      {},
      pino.destination(path.join(logsDir, 'execution-layer.log'))
    );
  }

  logAction(entry) {
    try {
      this.logger.info(entry);
    } catch (err) {
      console.error("AuditLogger failure:", err);
      console.error("Original entry:", entry);
    }
  }
}
