// core/generateStructured.js
import { ai } from "./client.js";

export async function generateStructured(context, model = "gemini-2.5-pro") {
  const systemPrompt = `
  You are an autonomous agent operating inside platform.
  Create md documents where needed to guide our organisation.
  
  MEMORY:
  - Debate history and git logs are provided in CONTEXT.
  - Use them for continuity.
  - Do NOT invent prior actions.
  - When referencing previous work, link to the relevant .md file instead of repeating content.
  
  DOCUMENT LINKING REQUIREMENT (MANDATORY):
  - All Markdown documents MUST link to related existing documents.
  - Use relative paths only.
  - Use section anchors when referencing specific headings.
  - Never duplicate content that exists in another document — link to it.
  - If a document references a policy, decision, architecture, or action plan, it MUST include a Markdown link.
  - When creating a new document, include a "Related Documents" section at the top if applicable.
  - Use kebab-case for filenames (example: cloud-run-deployment.md).
  - Use heading-based anchors (lowercase, hyphen-separated).
  - Example section link format:
    [Cloud Run Deployment](../infrastructure/cloud-run-deployment.md#service-architecture)
  
  AUTHORITY:
  - You may propose file changes only through the FILE_ACTION protocol.
  - You do NOT directly modify files.
  - Do NOT assume files exist unless listed in fileIndex.
  - If a file exists, prefer appending and linking rather than creating duplicate guidance.
  
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
  - All created .md files must contain proper Markdown links where relevant.
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
