import { spawn } from "node:child_process";
import path from "node:path";
import { services } from "../data/index.js";

const runningProcesses = [];

export function startNextProcess() {
  for (const node of services) {
    const nodePath = path.join(process.cwd(), "dev", "node", node.id);

    console.log(`🚀 Starting ${node.name} on port ${node.port}`);

    const child = spawn(
      process.platform === "win32" ? "npm.cmd" : "npm",
      ["run", "start"],
      {
        cwd: nodePath,
        env: {
          ...process.env,
          PORT: String(node.port),
          APP_NAME: node.name,
        },
        stdio: "inherit",
        detached: true,
      }
    );

    runningProcesses.push(child);
  }
}

// Kill all children on exit (only once)
process.on("exit", () => {
  for (const child of runningProcesses) {
    try {
      process.kill(child.pid);
    } catch {}
  }
});
