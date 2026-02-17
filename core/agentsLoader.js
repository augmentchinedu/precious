// ai/core/agentsLoader.js
import { platform } from '../data/index.js';
import { Agent } from '../../class/agent.js';

export function loadAgents(sessionLogFile) {
    return platform.members
        .filter(member => member.type === 'agent')
        .map(member => new Agent(member, sessionLogFile));
}
