import { ai } from "./client.js";

export async function generateStructured(
  context,
  model = "fireworks/gpt-oss-20b"
) {
  const systemPrompt = `

CAPABILITIES:
- You may propose creation or appending of Markdown (.md) files.
- Developer agents may propose .js or .vue files, which must be routed to /dev automatically.

FILE ACTION PROTOCOL:

Use this exact block:

===FILE_ACTION===
type: create | append
path: relative/path/to/file.md | .js | .vue
---
File content here
===END_FILE_ACTION===

Rules:
- Only operate on .md, .js, or .vue files.
- Developers automatically route .js/.vue files to /dev; no DEV_SWITCH needed.
- .md files go to /docs.
- Use relative paths only.
- Do not overwrite files unless necessary.
- Prefer append over recreate.
- Keep content professional and structured.
`;

  const response = await ai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: "CONTEXT:\n" + JSON.stringify(context, null, 2),
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}
