import { generateStructured } from "../admin/generate.js";

export async function safeGenerate(context, options = {}) {
  const { maxRetries = 5, baseDelayMs = 2000, sleep = defaultSleep } = options;

  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      return await generateStructured(context);
    } catch (error) {
      if (error?.error?.code === 429) {
        attempts += 1;
        const delayMs = attempts * baseDelayMs;
        console.warn(
          `429 RESOURCE_EXHAUSTED for ${
            context.agent?.name || "unknown"
          }, retrying in ${delayMs}ms...`
        );
        await sleep(delayMs);
        continue;
      }

      throw error;
    }
  }

  throw new Error(
    `Max retries reached for agent ${context.agent?.name || "unknown"}`
  );
}

function defaultSleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
