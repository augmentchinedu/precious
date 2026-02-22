import fs from "fs/promises";
import { buildContext } from "../admin/contextBuilder.js";
import { extractFileAction } from "../../utility/index.js";
import { safeGenerate } from "./safeGenerate.js";

const defaultThrottle = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function formatSessionHeader(commit) {
  return `
# SESSION START
Date: ${new Date().toISOString()}

## Git Snapshot
Hash: ${commit.hash || "N/A"}
Author: ${commit.author || "N/A"}
Message: ${commit.message || "N/A"}
Date: ${commit.date || "N/A"}

---
`;
}

export async function runSession({
  sessionId,
  sessionFile,
  agents,
  executionController,
  getLatestCommit,
  getDebateLog,
  setActiveSession,
  buildAgentContext = buildContext,
  generateAgentOutput = safeGenerate,
  throttle = defaultThrottle,
}) {
  try {
    console.log(`Running session engine for ${sessionId}`);

    const commit = getLatestCommit() || {};
    await fs.appendFile(sessionFile, formatSessionHeader(commit), "utf-8");

    for (const agent of agents) {
      await processAgent({
        agent,
        sessionId,
        sessionFile,
        executionController,
        getDebateLog,
        buildAgentContext,
        generateAgentOutput,
        throttle,
      });
    }

    await fs.appendFile(sessionFile, `\n# SESSION COMPLETE\n\n`, "utf-8");
    console.log(`Session ${sessionId} completed. Logged to: ${sessionFile}`);
  } catch (error) {
    console.error(`Session ${sessionId} crashed:`, error);
    try {
      await fs.appendFile(
        sessionFile,
        `\n# SESSION CRASH\nError: ${error.message}\n`,
        "utf-8"
      );
    } catch {
      // Ignore secondary errors when logging crash output.
    }
  } finally {
    setActiveSession(null);
  }
}

async function processAgent({
  agent,
  sessionId,
  sessionFile,
  executionController,
  getDebateLog,
  buildAgentContext,
  generateAgentOutput,
  throttle,
}) {
  try {
    const debateLog = getDebateLog();
    const context = buildAgentContext(agent, debateLog);
    await throttle(500);

    const raw = await generateAgentOutput(context);

    await fs.appendFile(
      sessionFile,
      `\n### Agent: ${agent.name} (${agent.role})\n\n${raw}\n\n---\n`,
      "utf-8"
    );

    const action = extractFileAction(raw);
    if (action) {
      const result = await executionController.processAction(action, agent, sessionId);
      if (!result.success) {
        await fs.appendFile(
          sessionFile,
          `Execution failed: ${result.error?.message}\n`,
          "utf-8"
        );
        console.error(`Execution failed for ${agent.name}:`, result.error?.message);
      }
    }

    debateLog.push({
      agent: agent.name,
      role: agent.role,
      response: raw,
      timestamp: new Date().toISOString(),
    });
  } catch (agentError) {
    await fs.appendFile(sessionFile, `Agent error: ${agentError.message}\n`, "utf-8");
    console.error(
      `Agent ${agent?.name || "unknown"} failed:`,
      agentError.message
    );
  }
}
