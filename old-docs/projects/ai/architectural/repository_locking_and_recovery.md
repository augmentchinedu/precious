# Repository Locking and Automated Recovery Procedure

## 1. Purpose

This document provides the technical specification for a session-level repository lock. This mechanism, proposed by Michael, makes the single-session execution model explicit and provides a path for automated recovery from abnormal session termination (e.g., process crash), ensuring the repository is always in a clean state before a new session begins.

## 2. Lock Mechanism

-   **Location:** The `ExecutionController` will create a lock file at `[repository_root]/.git/session.lock` upon successful session start.
-   **Content:** The lock file will contain the Process ID (PID) of the running `ExecutionController`.
-   **Lifecycle:** The lock file is created after the initial clean-repo check and removed as the final step of a graceful shutdown.

## 3. Session Startup Logic

On startup, the `ExecutionController` will check for the existence of `.git/session.lock`:

1.  **No Lock File:** The repository is free. The session proceeds, creating its own lock file.
2.  **Lock File Exists:** A previous session may be active or may have terminated abnormally.
    a. Read the PID from the lock file.
    b. Check if a process with this PID is currently running.
    c. **If process is running:** An active session exists. The new session must abort with an error message indicating the repository is locked.
    d. **If process is NOT running:** The lock is stale, left over from a crashed session. Initiate the **Automated Recovery Procedure**.

## 4. Automated Recovery Procedure

This procedure is a critical safeguard, triggered by the detection of a stale lock file. It must be executed before the new session begins its own work.

1.  **Log:** Announce that a stale lock was found and automated recovery is commencing. Include the PID from the stale file.
2.  **Hard Reset:** Execute `git reset --hard HEAD`. This reverts all changes to tracked files, returning them to the state of the last successful commit.
3.  **Clean:** Execute `git clean -fd`. This is a crucial step that removes all untracked files (`-f`) and directories (`-d`). This cleans up any new files created by the failed session before its pre-commit crash.
4.  **Remove Lock:** Delete the stale `.git/session.lock` file.
5.  **Proceed:** The repository is now in a guaranteed clean state. The new session can proceed with its normal startup sequence, including creating a new lock file.

## 5. Operational Monitoring

The presence of the lock file serves as a health indicator. An external monitoring agent should be configured to:

-   Check for the existence of `.git/session.lock`.
-   Alert an operator if the file's modification time is older than a configured threshold (e.g., 1 hour).
-   This handles the edge case of a hung (unresponsive but not crashed) process that is not being replaced by a new session attempt.


## 6. Critique and Refinement of the Lock Mechanism (by Clark)

The specification for a PID-based lock file is a strong start, but it contains a potential race condition that could lead to system deadlock. This section identifies the issue and proposes a refinement.

### 6.1. Identified Race Condition: PID Reuse

The reliance on solely a Process ID (PID) to validate a lock is unsafe. PIDs are recycled by the operating system. If a session crashes and its PID is later reassigned to a different, unrelated process, a new session will incorrectly believe the original session is still active and refuse to start. This will halt all automated work until the unrelated process terminates or an operator manually deletes the lock file.

**Failure Scenario:**
1.  Session A (PID 12345) creates `.git/session.lock` and then crashes.
2.  An unrelated system process starts and is assigned PID 12345.
3.  Session B starts, reads PID 12345 from the lock, sees it is an active process, and aborts.
4.  The system is now deadlocked.

### 6.2. Proposed Refinement: Enhanced Lock File Content

To prevent this race condition, the lock file's contents must be sufficient to uniquely identify the process that created it. A PID alone is not sufficient.

**Recommendation:** The lock file should contain a structured data format (e.g., a simple key-value text file or JSON) with more specific identifiers.

**Enhanced Lock File Content Example:**
```
pid=12345
hostname=augment-plus-runner-1
startTimestamp=2026-02-17T05:30:01.123Z
```

**Refined Session Startup Logic:**
When a new session encounters a lock file, its check must be more thorough:
1.  Read the `pid`, `hostname`, and `startTimestamp` from the lock file.
2.  Check if a process with `pid` is running on the current `hostname`.
3.  If it is running, further introspect the process to see if its start time matches the `startTimestamp` in the lock file.
4.  Only if all these attributes match should the lock be considered valid. Otherwise, the lock is stale, and the **Automated Recovery Procedure** should be initiated.

This enhancement makes an accidental match astronomically unlikely, thus resolving the PID reuse race condition and making the locking mechanism robust.
