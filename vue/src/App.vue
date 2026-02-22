<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const isRunning = ref(false);
const activeSessionId = ref(null);
const lastSessionId = ref(null);
const lastSessionFile = ref(null);
const error = ref("");

let pollTimer = null;

const stateText = computed(() => {
  if (isRunning.value && activeSessionId.value) {
    return `Running session: ${activeSessionId.value}`;
  }

  if (lastSessionId.value) {
    return `Last session: ${lastSessionId.value}`;
  }

  return "No session has run yet.";
});

async function refreshStatus() {
  try {
    const response = await fetch("/api/session-state");
    if (!response.ok) {
      throw new Error(`Status request failed (${response.status})`);
    }

    const payload = await response.json();
    isRunning.value = payload.isRunning;
    activeSessionId.value = payload.activeSessionId;
  } catch (err) {
    error.value = err.message;
  }
}

async function startSession() {
  error.value = "";

  try {
    const response = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Unable to start session");
    }

    isRunning.value = true;
    activeSessionId.value = payload.sessionId;
    lastSessionId.value = payload.sessionId;
    lastSessionFile.value = payload.sessionFile;
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(async () => {
  await refreshStatus();
  pollTimer = setInterval(refreshStatus, 1500);
});

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer);
  }
});
</script>

<template>
  <main class="shell">
    <section class="panel">
      <h1>Live Agent Session Console</h1>
      <p class="state">{{ stateText }}</p>

      <button class="run" :disabled="isRunning" @click="startSession">
        {{ isRunning ? "Session in progress" : "Start New Session" }}
      </button>

      <p v-if="lastSessionFile" class="file">Session log: {{ lastSessionFile }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </section>
  </main>
</template>
