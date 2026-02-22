import { describe, expect, it } from "vitest";
import { DEFAULT_MODEL, normalizeModelName } from "../modelConfig.js";

describe("modelConfig", () => {
  it("uses a supported default model", () => {
    expect(DEFAULT_MODEL).toBe("gemini-2.0-flash");
  });

  it("prefixes unqualified model names", () => {
    expect(normalizeModelName("gemini-2.0-flash")).toBe("models/gemini-2.0-flash");
  });

  it("keeps already qualified model names", () => {
    expect(normalizeModelName("models/gemini-2.0-flash")).toBe("models/gemini-2.0-flash");
  });

  it("falls back to default for blank values", () => {
    expect(normalizeModelName("   ")).toBe("models/gemini-2.0-flash");
  });
});
