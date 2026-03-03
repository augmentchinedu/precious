import { describe, expect, it } from "vitest";
import path from "path";
import { FileSystemManager, PathTraversalError } from "../fileSystemManager.js";

const rootDir = "/workspace/precious";

describe("FileSystemManager.resolveSecurePath", () => {
  const manager = new FileSystemManager(rootDir);

  it("defaults relative paths to docs and appends .md", () => {
    const resolved = manager.resolveSecurePath("notes/today");

    expect(resolved.relativePath).toBe("docs/notes/today.md");
    expect(resolved.absolutePath).toBe(path.join(rootDir, "docs/notes/today.md"));
  });

  it("allows explicit docs paths", () => {
    const resolved = manager.resolveSecurePath("docs/guide/intro.md");

    expect(resolved.relativePath).toBe("docs/guide/intro.md");
  });

  it("allows explicit code paths without forcing markdown extension", () => {
    const resolved = manager.resolveSecurePath("code/core/admin/fileSystemManager.js");

    expect(resolved.relativePath).toBe("code/core/admin/fileSystemManager.js");
  });

  it("blocks traversal outside repository root", () => {
    expect(() => manager.resolveSecurePath("docs/../../etc/passwd")).toThrow(PathTraversalError);
  });
});
