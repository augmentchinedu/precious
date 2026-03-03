import fs from 'fs/promises';
import path from 'path';

/* ============================= */
/* Custom Error Classes          */
/* ============================= */

class FileSystemManagerError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class PathTraversalError extends FileSystemManagerError { }
export class FileAlreadyExistsError extends FileSystemManagerError { }
export class FileNotFoundError extends FileSystemManagerError { }
export class WriteError extends FileSystemManagerError { }
export class AppendError extends FileSystemManagerError { }

/* ============================= */
/* FileSystemManager             */
/* ============================= */

export class FileSystemManager {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.allowedRoots = ["docs", "code"];
  }

  /**
   * Resolve secure path for any agent.
   * Returns { absolutePath, relativePath }.
   */
  resolveSecurePath(relativePath) {
    if (!relativePath) throw new PathTraversalError("Path is empty");

    let normalized = path.normalize(relativePath).replace(/\\/g, "/").trim();

    if (!normalized) throw new PathTraversalError("Path is empty");

    const [rootFolder] = normalized.split("/");

    // Preserve backward compatibility by defaulting to docs/
    if (!this.allowedRoots.includes(rootFolder)) {
      normalized = path.posix.join("docs", normalized);
    }

    const [validatedRoot] = normalized.split("/");
    if (!this.allowedRoots.includes(validatedRoot)) {
      throw new PathTraversalError("Path must be within docs/ or code/");
    }

    // Keep docs behavior; code paths should retain explicit filenames
    if (validatedRoot === "docs" && !path.extname(normalized)) normalized += ".md";

    const absolutePath = path.join(this.rootDir, normalized);
    const gitPath = normalized; // renamed from relativePath

    // Ensure path is inside root
    const relativeToRoot = path.relative(this.rootDir, absolutePath);
    if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
      throw new PathTraversalError("Path escapes repository root");
    }

    return { absolutePath, relativePath: gitPath };
  }

  async handleCreate(relativePath, content) {
    try {
      const { absolutePath } = this.resolveSecurePath(relativePath);
      await fs.mkdir(path.dirname(absolutePath), { recursive: true });
      await fs.writeFile(absolutePath, content + "\n", { flag: "w" });
    } catch (err) {
      if (err instanceof FileSystemManagerError) throw err;
      throw new WriteError(err.message);
    }
  }

  async handleAppend(relativePath, content) {
    try {
      const { absolutePath } = this.resolveSecurePath(relativePath);
      await fs.access(absolutePath).catch(() => {
        throw new FileNotFoundError(`File not found: ${relativePath}`);
      });
      await fs.appendFile(absolutePath, "\n\n" + content + "\n");
    } catch (err) {
      if (err instanceof FileSystemManagerError) throw err;
      throw new AppendError(err.message);
    }
  }
}
