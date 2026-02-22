import { ai } from "./client.js";

const FILE_ACTION_PROTOCOL_BLOCK = `FILE ACTION PROTOCOL (MANDATORY FORMAT):

===FILE_ACTION===
type: create | append
path: relative/path/to/file.md | .js | .vue
---
File content here
===END_FILE_ACTION===`;

const STRICT_RULES_BLOCK = `STRICT RULES:
- Only operate on .md, .js, or .vue files.
- Use relative paths only.
- NEVER overwrite files unless explicitly necessary.
- Prefer "append" over "create" when file exists.
- Do NOT generate multiple FILE_ACTION blocks unless required.
- Do NOT include explanation inside FILE_ACTION blocks.`;

const BASE_SYSTEM_INSTRUCTIONS = `You are an autonomous agent operating inside platform. 
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
- .md files are routed automatically to /docs.`;

const CACHEABLE_STATIC_BLOCKS = `${FILE_ACTION_PROTOCOL_BLOCK}\n\n${STRICT_RULES_BLOCK}`;

const CACHE_TTL_SECONDS = 3600;
const cacheByModel = new Map();

export function buildInlineSystemPrompt() {
  return `${BASE_SYSTEM_INSTRUCTIONS}\n\n${CACHEABLE_STATIC_BLOCKS}`;
}

export function buildContextPrompt(context) {
  return `CONTEXT:\n${JSON.stringify(context, null, 2)}`;
}

export async function getCachedPromptName(model) {
  const existing = cacheByModel.get(model);
  if (existing) {
    return existing;
  }

  if (!ai.caches?.create) {
    return null;
  }

  try {
    const cache = await ai.caches.create({
      model,
      config: {
        displayName: `platform-static-rules-${model}`,
        ttl: `${CACHE_TTL_SECONDS}s`,
        systemInstruction: CACHEABLE_STATIC_BLOCKS,
      },
    });

    const cacheName = cache?.name ?? null;
    if (cacheName) {
      cacheByModel.set(model, cacheName);
    }

    return cacheName;
  } catch (error) {
    console.warn("Prompt cache unavailable, using inline prompt blocks.", error);
    return null;
  }
}

export function __resetPromptCacheForTests() {
  cacheByModel.clear();
}
