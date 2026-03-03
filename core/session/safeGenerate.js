import { generateStructured } from "../admin/generate.js";

export async function safeGenerate(context, options = {}) {
  const {
    maxRetries = 5,
    baseDelayMs = 1000,
    maxDelayMs = 30000,
    random = Math.random,
    sleep = defaultSleep,
  } = options;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      return await generateStructured(context, options);
    } catch (error) {
      if (isRateLimitError(error)) {
        if (attempt === maxRetries) break;

        const delayMs = computeRetryDelay({
          error,
          attempt,
          baseDelayMs,
          maxDelayMs,
          random,
        });

        console.warn(
          `429 RESOURCE_EXHAUSTED for ${
            context.agent?.name || "unknown"
          }, retrying in ${delayMs}ms (attempt ${attempt + 1}/${maxRetries})...`
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

function isRateLimitError(error) {
  const code = Number(error?.code ?? error?.statusCode ?? error?.error?.code);
  const status = `${error?.status || error?.error?.status || ""}`;

  return code === 429 || status === "RESOURCE_EXHAUSTED";
}

function computeRetryDelay({
  error,
  attempt,
  baseDelayMs,
  maxDelayMs,
  random,
}) {
  const retryAfterHeader =
    error?.headers?.["retry-after"] ??
    error?.response?.headers?.["retry-after"] ??
    error?.error?.headers?.["retry-after"];

  const retryAfterMs = parseRetryAfter(retryAfterHeader);
  if (retryAfterMs !== null) {
    return Math.min(retryAfterMs, maxDelayMs);
  }

  const exponentialBackoff = Math.min(baseDelayMs * 2 ** attempt, maxDelayMs);
  return Math.floor(random() * exponentialBackoff);
}

function parseRetryAfter(value) {
  if (value === undefined || value === null || value === "") return null;

  const asSeconds = Number(value);
  if (!Number.isNaN(asSeconds)) {
    return Math.max(0, asSeconds * 1000);
  }

  const retryAt = Date.parse(value);
  if (Number.isNaN(retryAt)) return null;

  return Math.max(0, retryAt - Date.now());
}
