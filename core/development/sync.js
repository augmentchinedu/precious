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
        if (
          name === ".git" ||
          name === ".githooks" ||
          name === ".gitmodules"
        ) {
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