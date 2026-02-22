import { describe, expect, it, vi } from "vitest";
import { safeGenerate } from "../safeGenerate.js";

describe("safeGenerate", () => {
  it("returns generation output immediately when no rate limit happens", async () => {
    const generate = vi.fn().mockResolvedValue("ok");

    await expect(
      safeGenerate({ agent: { name: "A" } }, { generate })
    ).resolves.toBe("ok");

    expect(generate).toHaveBeenCalledTimes(1);
  });

  it("retries on 429 errors and then succeeds", async () => {
    const sleep = vi.fn().mockResolvedValue(undefined);
    const onRetry = vi.fn();
    const generate = vi
      .fn()
      .mockRejectedValueOnce({ error: { code: 429 } })
      .mockResolvedValueOnce("after-retry");

    await expect(
      safeGenerate(
        { agent: { name: "A" } },
        { sleep, baseDelayMs: 10, onRetry, generate }
      )
    ).resolves.toBe("after-retry");

    expect(generate).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledWith(10);
    expect(onRetry).toHaveBeenCalledWith({ agent: { name: "A" } }, 10);
  });

  it("throws after max retries", async () => {
    const generate = vi.fn().mockRejectedValue({ error: { code: 429 } });

    await expect(
      safeGenerate(
        { agent: { name: "A" } },
        {
          maxRetries: 2,
          sleep: vi.fn().mockResolvedValue(undefined),
          baseDelayMs: 1,
          generate,
          onRetry: vi.fn(),
        }
      )
    ).rejects.toThrow("Max retries reached for agent A");

    expect(generate).toHaveBeenCalledTimes(2);
  });
});
