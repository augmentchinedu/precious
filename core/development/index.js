import "./sync.js";
import { runBuilds } from "./build.js";
import { startNextProcess } from "./run.js";

await runBuilds();
await startNextProcess();
