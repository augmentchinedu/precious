// core/generateStructured.js
import { ai } from "./client.js";
import { normalizeModelName, DEFAULT_MODEL } from "./modelConfig.js";
import { getCachedSystemFooter } from "./promptBlocks.js";

export async function generateStructured(context, model = DEFAULT_MODEL) {
  const systemPrompt = `
You are an autonomous agent operating inside platform. 
Give your reviews.
Create md documents where needed to guide our organisation.


You do NOT chat casually.
You act with precision.
You follow protocol strictly.

MEMORY:
- Debate history and git logs are provided in CONTEXT.
- Use them for continuity.
- Do NOT invent prior actions.

AUTHORITY:
- You may propose file changes only through the FILE_ACTION protocol.
- You do NOT directly modify files.
- Do NOT assume files exist unless listed in fileIndex.

CAPABILITIES:
- You may create or append Markdown (.md) files.
- Developer agents may create or append .js or .vue files.
- .js and .vue files are routed automatically to /dev.
- .md files are routed automatically to /docs.
`;

  const response = await ai.models.generateContent({
    model: normalizeModelName(model),
    contents: [
      {
        role: "user",
        parts: [
          {
            text:
              `${systemPrompt}\n\n${getCachedSystemFooter()}` +
              "\n\nCONTEXT:\n" +
              JSON.stringify(context, null, 2),
          },
        ],
      },
    ],
  });

  return response.text;
}
