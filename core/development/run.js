import { spawn } from "node:child_process";
import path from "node:path";
import { nodes } from "../../data/index.js";

const runningProcesses = [];

export function startNextProcess() {
  for (const node of nodes) {
    const nodePath = path.join(process.cwd(), "dev", "node", node.id);

    console.log(`🚀 Starting ${node.name} on port ${node.port}`);

    const child = spawn(process.execPath, ["index.js"], {
      cwd: nodePath,
      env: {
        ...process.env,
        PORT: String(node.port),
        APP_NAME: node.name,
      },
      stdio: "inherit",
      detached: true,
    });

    process.on("exit", () => {
      for (const child of runningProcesses) {
        try {
          process.kill(child.pid);
        } catch {}
      }
    });

    runningProcesses.push(child);
  }
}
