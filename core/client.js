// client.js
import { init } from "@heyputer/puter.js/src/init.cjs";

/**
 * Initialize Puter AI client.
 * Exports the client directly.
 */
export const ai = init(process.env.PUTER_AUTH_TOKEN);

/**
 * Persistent keep-alive loop
 */
export async function keepPuterAlive() {
  while (true) {
    try {
      if (ai.health) await ai.health(); // optional ping
    } catch (err) {
      console.warn("Puter keepAlive ping failed:", err.message);
    }
    await new Promise((r) => setTimeout(r, 30_000));
  }
}
