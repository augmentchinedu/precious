// index.js
import "./core/development/sync.js";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import yaml from "js-yaml";

import { getNewSessionLogFile } from "./utility/index.js";
import { loadAgents } from "./core/admin/agentsLoader.js";
import { buildContext } from "./core/admin/contextBuilder.js";
import { generateStructured } from "./core/admin/generate.js";
import { extractFileAction } from "./utility/index.js";
import { ExecutionControllerV2 } from "./core/admin/executionControllerV2.js";
import { getLatestCommit } from "./utility/git.js";

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

const ROOT = process.cwd();
const RUN_FILE = path.join(ROOT, "run.yaml");
const GUI_DIR = path.join(ROOT, "gui");

let agents = [];
let executionController;
let debateLog = [];
let activeSession = null;

/* =====================================================
   Utilities
===================================================== */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/* =====================================================
   Serve Client
===================================================== */
app.use("/assets", express.static(path.join(GUI_DIR, "assets")));
app.get("/", (req, res) => {
  res.sendFile(path.join(GUI_DIR, "index.html"));
});

/* =====================================================
   Platform Initialization
===================================================== */
async function initPlatform() {
  executionController = new ExecutionControllerV2(ROOT);

  if (await fileExists(RUN_FILE)) {
    const content = await fs.readFile(RUN_FILE, "utf-8");
    yaml.load(content);
  }

  agents = loadAgents();
  console.log(`Loaded ${agents.length} agents into memory.`);
}

/* =====================================================
   Background Session Runner
===================================================== */
async function runSession(sessionId, sessionFile) {
  try {
    console.log(`Running session engine for ${sessionId}`);

    const commit = getLatestCommit() || {};

    await fs.appendFile(
      sessionFile,
      `
# SESSION START
Date: ${new Date().toISOString()}

## Git Snapshot
Hash: ${commit.hash || "N/A"}
Author: ${commit.author || "N/A"}
Message: ${commit.message || "N/A"}
Date: ${commit.date || "N/A"}

---
`,
      "utf-8"
    );

    // inside runSession()
    async function safeGenerate(context, maxRetries = 5) {
      let attempts = 0;
      while (attempts < maxRetries) {
        try {
          return await generateStructured(context);
        } catch (err) {
          if (err?.error?.code === 429) {
            attempts++;
            const delayMs = attempts * 2000;
            console.warn(
              `429 RESOURCE_EXHAUSTED for ${
                context.agent?.name || "unknown"
              }, retrying in ${delayMs}ms...`
            );
            await new Promise((r) => setTimeout(r, delayMs));
          } else {
            throw err;
          }
        }
      }
      throw new Error(
        `Max retries reached for agent ${context.agent?.name || "unknown"}`
      );
    }

    for (const agent of agents) {
      try {
        const context = buildContext(agent, debateLog);
        await new Promise((r) => setTimeout(r, 500)); // throttle

        const raw = await safeGenerate(context);

        await fs.appendFile(
          sessionFile,
          `\n### Agent: ${agent.name} (${agent.role})\n\n${raw}\n\n---\n`,
          "utf-8"
        );

        const action = extractFileAction(raw);
        if (action) {
          const result = await executionController.processAction(
            action,
            agent,
            sessionId
          );
          if (!result.success) {
            await fs.appendFile(
              sessionFile,
              `Execution failed: ${result.error?.message}\n`,
              "utf-8"
            );
            console.error(
              `Execution failed for ${agent.name}:`,
              result.error?.message
            );
          }
        }

        debateLog.push({
          agent: agent.name,
          role: agent.role,
          response: raw,
          timestamp: new Date().toISOString(),
        });
      } catch (agentError) {
        await fs.appendFile(
          sessionFile,
          `Agent error: ${agentError.message}\n`,
          "utf-8"
        );
        console.error(
          `Agent ${agent?.name || "unknown"} failed:`,
          agentError.message
        );
      }
    }

    await fs.appendFile(sessionFile, `\n# SESSION COMPLETE\n\n`, "utf-8");
    console.log(`Session ${sessionId} completed. Logged to: ${sessionFile}`);
  } catch (err) {
    console.error(`Session ${sessionId} crashed:`, err);
    try {
      await fs.appendFile(
        sessionFile,
        `\n# SESSION CRASH\nError: ${err.message}\n`,
        "utf-8"
      );
    } catch {}
  } finally {
    activeSession = null;
  }
}

/* =====================================================
   API: Run Session
===================================================== */
app.post("/api/run", async (req, res) => {
  if (activeSession) {
    return res.status(409).json({
      error: "A session is already running",
      sessionId: activeSession,
    });
  }

  try {
    const sessionFile = await getNewSessionLogFile();
    const sessionId = path.basename(sessionFile, ".log");

    debateLog = [];
    activeSession = sessionId;

    console.log(`Session ${sessionId} started.`);

    res.status(202).json({
      status: "Session accepted",
      sessionId,
      timestamp: new Date().toISOString(),
      sessionFile,
    });

    runSession(sessionId, sessionFile);
  } catch (err) {
    console.error("Run error:", err);
    if (!res.headersSent) res.status(500).json({ error: err.message });
  }
});

/* =====================================================
   Start Server
===================================================== */
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initPlatform();

    const server = app.listen(PORT, () => {
      console.log(`Augment Plus running at Port ${PORT}`);
    });

    process.on("SIGINT", () => {
      console.log("Shutting down server...");
      server.close(() => process.exit(0));
    });
  } catch (err) {
    console.error("Fatal error during server start:", err);
    process.exit(1);
  }
}

startServer();
