import fs from "fs/promises";
import os from "os";
import path from "path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { runSession } from "../sessionRunner.js";

describe("runSession", () => {
  const createdDirs = [];

  afterEach(async () => {
    await Promise.all(
      createdDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true }))
    );
  });

  it("writes session output, executes file actions, and resets active session", async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "session-runner-"));
    createdDirs.push(tempDir);
    const sessionFile = path.join(tempDir, "session_1.md");

    const debateLog = [];
    const setActiveSession = vi.fn();
    const processAction = vi.fn().mockResolvedValue({ success: true });

    await runSession({
      sessionId: "session_1",
      sessionFile,
      agents: [{ name: "Agent A", role: "Dev" }],
      executionController: { processAction },
      getLatestCommit: () => ({ hash: "abc123", author: "dev", message: "msg", date: "today" }),
      getDebateLog: () => debateLog,
      setActiveSession,
      buildAgentContext: (agent, log) => ({ agent, log }),
      generateAgentOutput: async () =>
        "hello\n===FILE_ACTION===\ntype: append\npath: docs/note.md\n---\ncontent\n===END_FILE_ACTION===",
      throttle: async () => {},
    });

    const content = await fs.readFile(sessionFile, "utf-8");
    expect(content).toContain("# SESSION START");
    expect(content).toContain("# SESSION COMPLETE");
    expect(content).toContain("### Agent: Agent A (Dev)");
    expect(processAction).toHaveBeenCalledTimes(1);
    expect(debateLog).toHaveLength(1);
    expect(setActiveSession).toHaveBeenCalledWith(null);
  });

  it("records agent errors and continues", async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "session-runner-"));
    createdDirs.push(tempDir);
    const sessionFile = path.join(tempDir, "session_1.md");

    const debateLog = [];

    await runSession({
      sessionId: "session_1",
      sessionFile,
      agents: [{ name: "Agent A", role: "Dev" }],
      executionController: { processAction: vi.fn() },
      getLatestCommit: () => ({}),
      getDebateLog: () => debateLog,
      setActiveSession: vi.fn(),
      buildAgentContext: () => ({ agent: { name: "Agent A" } }),
      generateAgentOutput: async () => {
        throw new Error("generation failed");
      },
      throttle: async () => {},
    });

    const content = await fs.readFile(sessionFile, "utf-8");
    expect(content).toContain("Agent error: generation failed");
    expect(content).toContain("# SESSION COMPLETE");
    expect(debateLog).toHaveLength(0);
  });
});
