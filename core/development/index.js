import { initialSync, watch } from "./sync.js";
import { runBuilds } from "./build.js";
import { startNextProcess } from "./run.js";

await initialSync();
watch();

await runBuilds();
await startNextProcess();
