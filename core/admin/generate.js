// core/generateStructured.js
import { ai } from "./client.js";
import {
  buildContextPrompt,
  buildInlineSystemPrompt,
  getCachedPromptName,
} from "./promptCache.js";

export async function generateStructured(context, model = "gemini-2.5-flash") {
  const contextPrompt = buildContextPrompt(context);
  const cachedPromptName = await getCachedPromptName(model);

  const response = await ai.models.generateContent({
    model,
    config: cachedPromptName ? { cachedContent: cachedPromptName } : undefined,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: cachedPromptName
              ? contextPrompt
              : `${buildInlineSystemPrompt()}\n\n${contextPrompt}`,
          },
        ],
      },
    ],
  });

  return response.text;
}
