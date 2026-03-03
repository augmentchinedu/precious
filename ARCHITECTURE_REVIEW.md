# Architectural System Model — precious workspace

## 1. System Identity
- This workspace is a **Node.js-based local orchestration runtime** for a multi-service codebase.
- It is not an application runtime for end-user business logic itself; it acts as a **meta-runner** that syncs shared module sources into per-service working directories, optionally runs build scripts, then starts all services.
- Problem class: **multi-repo/module-to-multi-service dev orchestration**, including deployment metadata publication.

## 2. Core Responsibilities
- Maintains a catalog of service identity and routing metadata (`data/index.js`).
- Synchronizes selected source module trees (`modules/node`, `modules/build`, `modules/controllers`) into each service directory under `dev/node/<service-id>`.
- Runs a conditional build phase per service based on dependency presence in each service package manifest.
- Spawns all service processes with per-service environment overrides (`PORT`, `APP_NAME`).
- Emits service/route metadata to GCS via startup side effects in the sync module import graph.

Delegation boundaries:
- Delegates business logic execution to child `npm run start` processes.
- Delegates filesystem watching to chokidar.
- Delegates cloud persistence to Google Cloud Storage SDK.

## 3. Startup & Lifecycle Model
Boot sequence in code order:
1. `core/index.js` awaits `initialSync()`.
2. `core/index.js` starts continuous watch with `watch()` (non-blocking).
3. `core/index.js` awaits `runBuilds()`.
4. `core/index.js` awaits `startNextProcess()`.

Service synchronization/build/launch coupling:
- Initial sync executes sequentially per service and module folder.
- Watch-mode sync can re-copy full directories after any event, also sequentially.
- Build phase scans `dev/node/*`; for each configured service directory, it parses `package.json`; if dependencies/devDependencies are empty, executes `node build/index.js`; otherwise skips.
- Launch phase starts all configured services without readiness checks or inter-service dependency gating.

Shutdown handling:
- Parent process registers `process.on('exit')` and attempts `process.kill(child.pid)` for tracked children.
- Because children are spawned with `detached: true`, process-group semantics are inconsistent with simple PID kill strategy.

Lifecycle risks:
- Watch sync can delete/recreate directories while child services are running.
- Startup has no health probe barrier; all services are assumed startable immediately after build stage.
- Upload side effect is triggered at module import time from `sync.js` via `import './upload.js'`, coupling sync availability to cloud credential validity.

## 4. Dependency Model
- Dependency handling exists at two levels:
  - Workspace runtime dependencies in root `package.json`.
  - Child-service dependency heuristic in `core/build.js` (build only when service package has zero deps/devDeps).
- Build/start order is fixed by filesystem enumeration, not explicit dependency graph.
- Logical flaws:
  - “Has dependencies” is treated as “do not run build,” which is not semantically equivalent.
  - Service startup does not account for upstream/downstream relationships.
  - Service catalog in `data/index.js` can diverge from actual directories and is only weakly validated.

## 5. Process Supervision Model
- Child processes are spawned with `spawn(npm run start, { stdio: 'inherit', detached: true })`.
- Child references are stored in-memory in `runningProcesses`.
- Termination attempts occur only on parent `exit` event via direct PID kill.

Robustness assessment:
- This is **basic process launching**, not full supervision:
  - No restart policy.
  - No crash detection/alerting.
  - No readiness/liveness hooks.
  - No signal fan-out policy (`SIGTERM`, grace period, `SIGKILL` fallback).

Cross-platform risks:
- Uses `npm.cmd` on Windows and `npm` elsewhere (good), but detached-process cleanup behavior differs significantly across OSes.
- Killing a parent PID may not terminate grandchildren/process trees, especially with detached mode.

## 6. Data Integrity & Storage Patterns
- Sync strategy removes destination directories before copy, so transient empty/partial states are expected during sync windows.
- Runtime file operations can race with running service reads if sync occurs during execution.
- Upload path double-serializes payloads: caller already stringifies arrays/objects before passing into a function that stringifies again; resulting uploaded JSON content becomes JSON strings rather than raw object/array documents.
- Service and route metadata are hardcoded; there is no schema validation, checksum, or versioning.

## 7. Observability & Testing
Testing state:
- Vitest is configured but no tests are present; current `vitest` run exits with “No test files found.”

Operational visibility:
- Logging is console-based and minimal.
- No structured logs, metrics, traces, or startup timing instrumentation.
- No per-service lifecycle status model (starting/healthy/failed/stopped).
- No explicit logging around upload success in normal path (commented out).

## 8. Security Posture
- External attack/dependency surface includes cloud SDK and file watcher runtime dependencies.
- Service-account credential path is static (`json/service-account.json`) and implicitly expected at runtime.
- High-impact vulnerability zones:
  - Import-time cloud upload with privileged credentials.
  - Recursive filesystem copy/delete against service roots.
  - Process spawning across many services with inherited environment.
- Root dependency audit currently reports known vulnerabilities in installed packages.

## 9. Architectural Maturity Assessment
- **Structure: 6/10**
  - Clear orchestration separation across sync/build/run modules, but control/data model remains tightly coupled and heuristic.
- **Lifecycle control: 4/10**
  - Deterministic start order exists, but readiness, graceful shutdown, and recovery are weak.
- **Data safety: 3/10**
  - Destructive sync pattern and serialization inconsistency increase risk of metadata/data integrity issues.
- **Operational resilience: 3/10**
  - Minimal supervision, no health model, and limited observability constrain production-grade reliability.

## 10. Implicit Assumptions & Hidden Fragility
Assumptions not explicitly enforced:
- `modules/` tree exists with expected top-level folders.
- `dev/node/<id>` folder naming matches `services[]` ids.
- Each service has `package.json` and `npm run start` scripts.
- Build script exists at `build/index.js` when build is attempted.
- Cloud credentials file exists and is valid at startup.

Hidden fragility:
- Import side effects (`upload.js`) make sync module load dependent on cloud setup.
- Directory replacement strategy can break in-flight service operations.
- No lock or debounce strategy during watcher-triggered full-folder sync.
- Detached subprocess strategy may leak orphaned processes on abrupt exits.
