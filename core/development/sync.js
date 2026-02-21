// dev/watcher.js
import { copy, ensureDir, pathExists, remove } from "fs-extra";
import chokidar from "chokidar";
import path from "path";
import "./upload.js";
import { nodes } from "../../data/index.js";

// Source modules
const MODULES_DIR = path.resolve("modules");
const NODE_MODULES = ["node", "build", "controllers"]; // modules to copy

// Sync a module folder into a specific node
async function syncModuleToNode(node, moduleFolder) {
  const src = path.join(MODULES_DIR, moduleFolder);
  const dest =
    moduleFolder === "node"
      ? path.join("dev/node", node.id)
      : path.join("dev/node", node.id, moduleFolder);

  if (!(await pathExists(src))) return;

  try {
    // 💣 Remove destination completely first
    await remove(dest);

    // Recreate directory
    await ensureDir(dest);

    // Copy fresh
    await copy(src, dest, {
      overwrite: true,
      filter: (srcPath) => {
        const name = path.basename(srcPath);
        if (name === ".git" || name === ".githooks" || name === ".gitmodules") {
          return false;
        }
        return true;
      },
    });

    // console.log(`Synced ${src} → ${dest}`);
  } catch (err) {
    console.error(`Error syncing ${src} → ${dest}:`, err.message);
  }
}

// Initial sync to all nodes
export async function initialSync() {
  for (const node of nodes) {
    for (const moduleFolder of NODE_MODULES) {
      await syncModuleToNode(node, moduleFolder);
    }
  }
}

// Watcher
export function watch() {
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

