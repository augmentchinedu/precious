import { describe, expect, it, vi, beforeEach } from "vitest";
import * as generator from "../../admin/generate.js";
import { safeGenerate } from "../safeGenerate.js";

describe("safeGenerate", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns generation output immediately when no rate limit happens", async () => {
    vi.spyOn(generator, "generateStructured").mockResolvedValue("ok");

    await expect(safeGenerate({ agent: { name: "A" } })).resolves.toBe("ok");
  });

  it("retries on 429 errors and then succeeds", async () => {
    const sleep = vi.fn().mockResolvedValue(undefined);
    const spy = vi
      .spyOn(generator, "generateStructured")
      .mockRejectedValueOnce({ error: { code: 429 } })
      .mockResolvedValueOnce("after-retry");

    await expect(
      safeGenerate(
        { agent: { name: "A" } },
        { sleep, baseDelayMs: 10, random: () => 1 }
      )
    ).resolves.toBe("after-retry");

    expect(spy).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledWith(10);
  });

  it("retries on RESOURCE_EXHAUSTED status errors", async () => {
    const sleep = vi.fn().mockResolvedValue(undefined);
    const spy = vi
      .spyOn(generator, "generateStructured")
      .mockRejectedValueOnce({ status: "RESOURCE_EXHAUSTED" })
      .mockResolvedValueOnce("after-retry");

    await expect(
      safeGenerate(
        { agent: { name: "A" } },
        { sleep, baseDelayMs: 10, random: () => 1 }
      )
    ).resolves.toBe("after-retry");

    expect(spy).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledWith(10);
  });

  it("uses retry-after header when available", async () => {
    const sleep = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(generator, "generateStructured")
      .mockRejectedValueOnce({
        code: 429,
        headers: { "retry-after": "3" },
      })
      .mockResolvedValueOnce("after-retry");

    await expect(
      safeGenerate({ agent: { name: "A" } }, { sleep, baseDelayMs: 10 })
    ).resolves.toBe("after-retry");

    expect(sleep).toHaveBeenCalledWith(3000);
  });

  it("throws after max retries", async () => {
    vi.spyOn(generator, "generateStructured").mockRejectedValue({
      error: { code: 429 },
    });

    await expect(
      safeGenerate(
        { agent: { name: "A" } },
        { maxRetries: 2, sleep: vi.fn().mockResolvedValue(undefined), baseDelayMs: 1 }
      )
    ).rejects.toThrow("Max retries reached for agent A");
  });
});
