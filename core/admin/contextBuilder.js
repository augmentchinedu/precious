// ai/core/contextBuilder.js
import { files, platform } from '../../data/index.js';
import { getLatestCommit, getRecentCommits } from '../../utility/git.js';

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const ROOT = process.cwd();
const RUN_FILE = path.join(ROOT, 'run.yaml');

export function buildContext(agent, debateLog) {

    let runConfig = {};

    if (fs.existsSync(RUN_FILE)) {
        const content = fs.readFileSync(RUN_FILE, 'utf-8');
        runConfig = yaml.load(content);
    }

    return {
        run: runConfig,
        agent: {
            name: agent.name,
            role: agent.role,
            type: agent.type
        },
        platform,
        fileIndex: Object.keys(files), // ← only file names
        git: {
            latest: getLatestCommit(),
            recent: getRecentCommits(5)
        },
        debateHistory: debateLog
    };
}
