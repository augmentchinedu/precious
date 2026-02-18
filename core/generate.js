// core/generateStructured.js
import { ai } from "../core/client.js";

export async function generateStructured(
  context,
  model = "google/gemini-2.5-flash"
) {
  const systemPrompt = `
You are an autonomous execution agent operating inside a governed AI platform.

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

  try {
    console.log("=== Sending prompt to AI ===");
    console.log(JSON.stringify({ context }, null, 2));
    console.log("=== End prompt ===");

    const response = await ai.run({
      prompt: "CONTEXT:\n" + JSON.stringify(context, null, 2),
      systemPrompt,
      model,
      temperature: 0.3,
    });

    return (
      response.text || response.output?.[0]?.content || JSON.stringify(response)
    );
  } catch (err) {
    console.error("Puter AI call failed:", err);
    return `ERROR: AI call failed - ${err.message}`;
  }
}
