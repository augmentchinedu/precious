// dev/watcher.js
import { copy, ensureDir, pathExists } from "fs-extra";
import chokidar from "chokidar";
import path from "path";

import { platform } from "../../data/index.js";

const nodes = platform.services; // array of node names

// Source modules
const MODULES_DIR = path.resolve("modules");
const NODE_MODULES = ["node", "build", "controllers"]; // modules to copy

// Sync a module folder into a specific node
async function syncModuleToNode(nodeName, moduleFolder) {
  const src = path.join(MODULES_DIR, moduleFolder);
  const dest =
    moduleFolder === "node"
      ? path.join("dev/node", nodeName) // root of node
      : path.join("dev/node", nodeName, moduleFolder);

  if (!(await pathExists(src))) return; // skip if module doesn't exist

  await ensureDir(dest);
  try {
    await copy(src, dest, {
      overwrite: true,
      errorOnExist: false,
      filter: (srcPath) => {
        const name = path.basename(srcPath);
        // Exclude git metadata
        if (name === ".git" || name === ".githooks" || name === ".gitmodules") {
          return false;
        }
        return true;
      },
    });
    console.log(`Synced ${src} → ${dest}`);
  } catch (err) {
    console.error(`Error syncing ${src} → ${dest}:`, err.message);
  }
}

// Initial sync to all nodes
async function initialSync() {
  for (const node of nodes) {
    for (const moduleFolder of NODE_MODULES) {
      await syncModuleToNode(node, moduleFolder);
    }
  }
}

// Watcher
function watch() {
  const watcher = chokidar.watch(MODULES_DIR, {
    ignored: /(\.git|\.githooks|\.gitmodules)/,
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on("all", async (event, filePath) => {
    const relative = path.relative(MODULES_DIR, filePath);
    const topFolder = relative.split(path.sep)[0];

    if (NODE_MODULES.includes(topFolder)) {
      // Sync changed module to all nodes
      for (const node of nodes) {
        await syncModuleToNode(node, topFolder);
      }
    }
  });

  console.log("Watching modules for changes...");
}

// Run
(async () => {
  await initialSync();
  watch();
})();