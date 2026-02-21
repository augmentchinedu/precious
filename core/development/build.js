import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { nodes } from "../../data/index.js";

const NODES_DIR = join(process.cwd(), "dev", "node");

export async function runBuilds() {
  const nodeFolders = await readdir(NODES_DIR, { withFileTypes: true });

  for (const dirent of nodeFolders) {
    if (!dirent.isDirectory()) continue;

    const nodeId = dirent.name;
    const nodeData = nodes.find((n) => n.id === nodeId);

    if (!nodeData) {
      console.log(`⚠️ No node config for ${nodeId}`);
      continue;
    }

    const nodePath = join(NODES_DIR, nodeId);
    const packagePath = join(nodePath, "package.json");

    try {
      const packageRaw = await readFile(packagePath, "utf-8");
      const pkg = JSON.parse(packageRaw);

      const hasDeps =
        (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) ||
        (pkg.devDependencies && Object.keys(pkg.devDependencies).length > 0);

      if (!hasDeps) {
        console.log(`🚀 Running build for: ${nodeId}`);

        const buildFile = join(nodePath, "build", "index.js");

        await runBuildProcess(buildFile, {
          SERVICE_NAME: nodeData.id,
          APP_NAME: nodeData.name,
        });
      } else {
        console.log(`⏭ Skipping ${nodeId} (has dependencies)`);
      }
    } catch (err) {
      console.log(`⚠️ Skipping ${nodeId}: ${err.message}`);
    }
  }
}

function runBuildProcess(file, envVars) {
  return new Promise((resolve, reject) => {
    const child = spawn("node", [file], {
      stdio: "inherit",
      env: {
        ...process.env,
        ...envVars,
      },
    });

    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Build failed with code ${code}`));
    });
  });
}
