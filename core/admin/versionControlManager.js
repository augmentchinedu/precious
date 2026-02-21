import simpleGit from 'simple-git';
import fs from 'fs/promises';

export class VersionControlManager {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.git = simpleGit(rootDir);
    }

    async stageFile(filePath) {
        try {
            await this.git.add(filePath);
        } catch (err) {
            throw new Error(`Git stage failed: ${err.message}`);
        }
    }

    async commit(filePath, agentName, actionType, metadata = {}) {
        try {
            const timestamp = metadata.timestamp || new Date().toISOString();
            const sessionId = metadata.sessionId || "N/A";
            const message = `[AI:${agentName}][${actionType}][${sessionId}] ${filePath} @ ${timestamp}`;
            const result = await this.git.commit(message, filePath);
            return result.commit;
        } catch (err) {
            throw new Error(`Git commit failed: ${err.message}`);
        }
    }

    async discardChanges(filePath) {
        try {
            // Backup content before discarding
            const absPath = path.join(this.rootDir, filePath);
            let backup = null;
            try {
                backup = await fs.readFile(absPath, 'utf-8');
            } catch { }

            await this.git.checkout([filePath]);
            return backup; // Return previous content for extra safety
        } catch (err) {
            throw new Error(`Git rollback failed: ${err.message}`);
        }
    }

    async isRepoClean(ignorePaths = []) {
        const status = await this.git.status();
        const changes = [
            ...status.modified,
            ...status.created,
            ...status.deleted,
            ...status.renamed.map(r => r.to),
        ].filter(f => !ignorePaths.includes(f) && !f.startsWith("logs/"));
        return changes.length === 0 ? { clean: true } : { clean: false, changes };
    }
}
