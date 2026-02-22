import { describe, expect, it, vi, beforeEach } from "vitest";
import { ai } from "../client.js";
import { generateStructured } from "../generate.js";

describe("generateStructured", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("normalizes model names before calling generateContent", async () => {
    const spy = vi
      .spyOn(ai.models, "generateContent")
      .mockResolvedValue({ text: "ok" });

    await generateStructured({ agent: { name: "A" } }, "gemini-2.0-flash");

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ model: "models/gemini-2.0-flash" })
    );
  });

  it("keeps fully qualified model names", async () => {
    const spy = vi
      .spyOn(ai.models, "generateContent")
      .mockResolvedValue({ text: "ok" });

    await generateStructured({ agent: { name: "A" } }, "models/gemini-2.0-flash");

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ model: "models/gemini-2.0-flash" })
    );
  });
});
