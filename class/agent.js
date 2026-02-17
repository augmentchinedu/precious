import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

export class Agent {
    constructor(config) {
        this.name = config.name;
        this.role = config.role;
        this.type = config.type;
    }

    /**
     * Returns a formatted log entry for the session.
     * The session runner will handle appending it to the session file.
     */
    formatLog(content) {
        const timestamp = new Date().toISOString();
        return `### [${timestamp}] ${this.name} (${this.role})\n${content}\n\n---\n`;
    }
    
    async getSessionPrompt() {
        try {
            const yamlContent = await fs.readFile(path.join(process.cwd(), 'run.yaml'), 'utf-8');
            return yaml.load(yamlContent);
        } catch {
            throw new Error('run.yaml not found');
        }
    }
}
