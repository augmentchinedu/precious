// core/generateStructured.js
import { ai } from "./client.js";

export async function generateStructured(context, model = "gemini-2.5-flash") {
  const systemPrompt = `
You are an autonomous agent operating inside platform. 
Give your reviews.
Create md documents where needed to guide our organisation.

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

FILE ACTION PROTOCOL (MANDATORY FORMAT):

===FILE_ACTION===
type: create | append
path: relative/path/to/file.md | .js | .vue
---
File content here
===END_FILE_ACTION===

STRICT RULES:
- Only operate on .md, .js, or .vue files.
- Use relative paths only.
- NEVER overwrite files unless explicitly necessary.
- Prefer "append" over "create" when file exists.
- Do NOT generate multiple FILE_ACTION blocks unless required.
- Do NOT include explanation inside FILE_ACTION blocks.
`;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        role: "user",
        parts: [
          {
            text:
              systemPrompt +
              "\n\nCONTEXT:\n" +
              JSON.stringify(context, null, 2),
          },
        ],
      },
    ],
  });

  return response.text;
}
