// index.js
import "./core/development/index.js";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import yaml from "js-yaml";

import { getNewSessionLogFile } from "./utility/index.js";
import { loadAgents } from "./core/admin/agentsLoader.js";
import { ExecutionControllerV2 } from "./core/admin/executionControllerV2.js";
import { getLatestCommit } from "./utility/git.js";
import { runSession } from "./core/session/sessionRunner.js";

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

const ROOT = process.cwd();
const RUN_FILE = path.join(ROOT, "run.yaml");
const VUE_DIST_DIR = path.join(ROOT, "vue", "dist");

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

app.get("/api/session-status", (req, res) => {
  res.json({
    activeSession,
    isRunning: Boolean(activeSession),
    responsesCollected: debateLog.length,
    agentsLoaded: agents.length,
    timestamp: new Date().toISOString(),
  });
});

//  API: Run Session
app.post("/api/run", async (req, res) => {
  if (activeSession) {
    return res.status(409).json({
      error: "A session is already running",
      sessionId: activeSession,
    });
  }

  try {
    const sessionFile = await getNewSessionLogFile();
    const sessionId = path.basename(sessionFile, ".md");

    debateLog = [];
    activeSession = sessionId;

    console.log(`Session ${sessionId} started.`);

    res.status(202).json({
      status: "Session accepted",
      sessionId,
      timestamp: new Date().toISOString(),
      sessionFile,
    });

    runSession({
      sessionId,
      sessionFile,
      agents,
      executionController,
      getLatestCommit,
      getDebateLog: () => debateLog,
      setActiveSession: (value) => {
        activeSession = value;
      },
    });
  } catch (err) {
    console.error("Run error:", err);
    if (!res.headersSent) res.status(500).json({ error: err.message });
  }
});

/* =====================================================
   Serve Built Vue Client
===================================================== */
app.use(express.static(VUE_DIST_DIR));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(VUE_DIST_DIR, "index.html"));
});
/* =====================================================
   Start Server
===================================================== */
const PORT = process.env.PORT || 5050;

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
