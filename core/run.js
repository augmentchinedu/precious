import { spawn } from "node:child_process";
import path from "node:path";
import { services } from "../data/index.js";

const runningProcesses = [];

/**
 * Start all services
 */
export function startNextProcess() {
  for (const node of services) {
    const nodePath = path.join(process.cwd(), "dev", "node", node.id);

    console.log(`🚀 Starting ${node.name} on port ${node.port}`);

    const child = spawn(
      process.platform === "win32" ? "npm.cmd" : "npm",
      ["run", "dev"],
      {
        cwd: nodePath,
        env: {
          ...process.env,
          PORT: String(node.port),
          APP_NAME: node.name,
        },
        stdio: "inherit",
        detached: true, // allow independent process group
      }
    );

    runningProcesses.push(child);
  }
}

/**
 * Kill all children safely
 */
function killChildren() {
  for (const child of runningProcesses) {
    try {
      if (process.platform === "win32") {
        spawn("taskkill", ["/pid", child.pid, "/t", "/f"]);
      } else {
        process.kill(-child.pid); // kill entire group on Unix
      }
    } catch {}
  }
}

// Listen for common termination signals
["exit", "SIGINT", "SIGTERM", "SIGHUP", "uncaughtException"].forEach((evt) => {
  process.on(evt, () => {
    killChildren();
    process.exit(); // exit after killing children
  });
});
