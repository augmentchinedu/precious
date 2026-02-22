export const DEFAULT_MODEL = "gemini-2.0-flash";

export function normalizeModelName(model = DEFAULT_MODEL) {
  const trimmedModel = model?.trim();

  if (!trimmedModel) {
    return `models/${DEFAULT_MODEL}`;
  }

  if (trimmedModel.startsWith("models/")) {
    return trimmedModel;
  }

  return `models/${trimmedModel}`;
}
