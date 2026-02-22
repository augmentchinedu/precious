import { describe, expect, it } from "vitest";
import { getCachedSystemFooter, getStaticPromptBlocks } from "../promptBlocks.js";

describe("promptBlocks", () => {
  it("returns static protocol and strict-rules prompt blocks", () => {
    const blocks = getStaticPromptBlocks();

    expect(blocks.fileActionProtocol).toContain("FILE ACTION PROTOCOL");
    expect(blocks.strictRules).toContain("STRICT RULES");
  });

  it("caches combined footer across calls", () => {
    const firstFooter = getCachedSystemFooter();
    const secondFooter = getCachedSystemFooter();

    expect(firstFooter).toBe(secondFooter);
    expect(firstFooter).toContain("FILE ACTION PROTOCOL");
    expect(firstFooter).toContain("STRICT RULES");
  });
});
