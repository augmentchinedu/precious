const STATIC_BLOCKS = Object.freeze({
  fileActionProtocol: `FILE ACTION PROTOCOL (MANDATORY FORMAT):

===FILE_ACTION===
type: create | append
path: relative/path/to/file.md | .js | .vue
---
File content here
===END_FILE_ACTION===`,
  strictRules: `STRICT RULES:
- Only operate on .md, .js, or .vue files.
- Use relative paths only.
- NEVER overwrite files unless explicitly necessary.
- Prefer "append" over "create" when file exists.
- Do NOT generate multiple FILE_ACTION blocks unless required.
- Do NOT include explanation inside FILE_ACTION blocks.`,
});

let cachedSystemFooter;

export function getCachedSystemFooter() {
  if (!cachedSystemFooter) {
    cachedSystemFooter = `${STATIC_BLOCKS.fileActionProtocol}\n\n${STATIC_BLOCKS.strictRules}`;
  }

  return cachedSystemFooter;
}

export function getStaticPromptBlocks() {
  return STATIC_BLOCKS;
}
