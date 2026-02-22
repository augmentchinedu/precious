import { beforeEach, describe, expect, it, vi } from "vitest";
import { ai } from "../client.js";
import { generateStructured } from "../generate.js";
import { __resetPromptCacheForTests } from "../promptCache.js";

describe("generateStructured", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    __resetPromptCacheForTests();
  });

  it("inlines static blocks when cache api is unavailable", async () => {
    const generateSpy = vi
      .spyOn(ai.models, "generateContent")
      .mockResolvedValue({ text: "ok" });

    const originalCaches = ai.caches;
    ai.caches = undefined;

    await expect(generateStructured({ agent: { name: "A" } })).resolves.toBe(
      "ok"
    );

    const payload = generateSpy.mock.calls[0][0];
    expect(payload.config).toBeUndefined();
    expect(payload.contents[0].parts[0].text).toContain("STRICT RULES:");
    expect(payload.contents[0].parts[0].text).toContain(
      "FILE ACTION PROTOCOL (MANDATORY FORMAT):"
    );

    ai.caches = originalCaches;
  });

  it("uses cached content and does not recreate cache for repeated calls", async () => {
    const generateSpy = vi
      .spyOn(ai.models, "generateContent")
      .mockResolvedValue({ text: "ok" });

    const createSpy = vi
      .spyOn(ai.caches, "create")
      .mockResolvedValue({ name: "cachedContents/static-rules" });

    await generateStructured({ turn: 1 }, "gemini-2.5-flash");
    await generateStructured({ turn: 2 }, "gemini-2.5-flash");

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(generateSpy).toHaveBeenCalledTimes(2);

    const payload = generateSpy.mock.calls[1][0];
    expect(payload.config).toEqual({ cachedContent: "cachedContents/static-rules" });
    expect(payload.contents[0].parts[0].text).toBe("CONTEXT:\n{\n  \"turn\": 2\n}");
  });
});
