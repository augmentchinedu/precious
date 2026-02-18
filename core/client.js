// core/client.js
import { init } from "@heyputer/puter.js/src/init.cjs";

// Initialize with your Puter auth token (stored in env)
export const ai = init(process.env.PUTER_AUTH_TOKEN);
