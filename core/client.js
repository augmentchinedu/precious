// core/client.js
import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.PROJECT_ID,
  location: "us-central1",
});