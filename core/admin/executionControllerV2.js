import fs from 'fs/promises';
import path from 'path';
import { FileSystemManager } from './fileSystemManager.js';
import { VersionControlManager } from './versionControlManager.js';
import { AuditLogger } from './auditLogger.js';

function sanitizeAgentName(name) {
    if (!name) return "unknown";
    return name.replace(/[^a-zA-Z0-9-_]/g, "_").trim();
}

export class ExecutionControllerV2 {
    constructor(rootDir, options = {}) {
        this.rootDir = rootDir;
        this.fileSystemManager = new FileSystemManager(rootDir);
        this.gitManager = new VersionControlManager(rootDir);
        this.logger = new AuditLogger(rootDir);
        this.maxConcurrent = options.maxConcurrent || 5;
        this.activeExecutions = 0;
    }

    async _acquireSlot() {
        while (this.activeExecutions >= this.maxConcurrent) {
            await new Promise(r => setTimeout(r, 50));
        }
        this.activeExecutions++;
    }

    _releaseSlot() {
        this.activeExecutions = Math.max(0, this.activeExecutions - 1);
    }

    async processAction(action, agent, sessionId = "N/A") {
        await this._acquireSlot();
        const agentName = sanitizeAgentName(agent?.name);

        try {
            // Resolve path (absolute for fs, relative for Git)
            const { absolutePath, relativePath } = this.fileSystemManager.resolveSecurePath(action?.path);

            // Ensure parent directory exists
            await fs.mkdir(path.dirname(absolutePath), { recursive: true });

            // Handle create/append
            switch (action.type) {
                case "create":
                    await this.fileSystemManager.handleCreate(action.path, action.content || "");
                    break;
                case "append":
                    await this.fileSystemManager.handleAppend(action.path, action.content || "");
                    break;
                default:
                    throw new Error(`Unsupported action type: ${action.type}`);
            }

            // Stage & commit using relative path
            await this.gitManager.stageFile(relativePath);
            const commitHash = await this.gitManager.commit(
                relativePath,
                agentName,
                action.type,
                { timestamp: new Date().toISOString(), sessionId }
            );

            this.logger.logAction({
                agent: agentName,
                action: { type: action.type, path: relativePath },
                status: "success",
                details: { commit_hash: commitHash }
            });

            this._releaseSlot();
            return { success: true, commitHash };

        } catch (error) {
            this._releaseSlot();
            this._logFailure(agentName, action, error.message);
            return { success: false, error };
        }
    }

    _logFailure(agentName, action, message) {
        this.logger.logAction({
            agent: agentName,
            action: { type: action?.type || "unknown", path: action?.path || "" },
            status: "failure",
            details: { error_message: message }
        });
    }
}
