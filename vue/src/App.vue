<script setup>
import axios from "axios";
import { onBeforeUnmount, onMounted, ref } from "vue";

const status = ref({
  activeSession: null,
  isRunning: false,
  responsesCollected: 0,
  agentsLoaded: 0,
  timestamp: null,
});
const runResult = ref(null);
const errorMessage = ref("");
const isTriggering = ref(false);
let pollHandle = null;

async function fetchStatus() {
  try {
    const response = await axios.get("/api/session-status");
    status.value = response.data;
  } catch (error) {
    errorMessage.value =
      error?.response?.data?.error || error.message || "Failed to fetch status.";
  }
}

async function triggerSessionRun() {
  isTriggering.value = true;
  errorMessage.value = "";

  try {
    const response = await axios.post("/api/run");
    runResult.value = response.data;
    await fetchStatus();
  } catch (error) {
    errorMessage.value =
      error?.response?.data?.error || error.message || "Failed to trigger session.";
  } finally {
    isTriggering.value = false;
  }
}

onMounted(async () => {
  await fetchStatus();
  pollHandle = setInterval(fetchStatus, 2000);
});

onBeforeUnmount(() => {
  if (pollHandle) {
    clearInterval(pollHandle);
  }
});
</script>

<template>
  <main class="container">
    <header>
      <h1>Live Agent Control Panel</h1>
      <p>Trigger and monitor autonomous session runs in real time.</p>
    </header>

    <section class="card">
      <h2>Session Status</h2>
      <ul>
        <li><strong>Running:</strong> {{ status.isRunning ? "Yes" : "No" }}</li>
        <li><strong>Active Session:</strong> {{ status.activeSession || "None" }}</li>
        <li><strong>Responses Collected:</strong> {{ status.responsesCollected }}</li>
        <li><strong>Agents Loaded:</strong> {{ status.agentsLoaded }}</li>
        <li><strong>Updated:</strong> {{ status.timestamp || "-" }}</li>
      </ul>
    </section>

    <section class="card actions">
      <button :disabled="isTriggering || status.isRunning" @click="triggerSessionRun">
        {{ isTriggering ? "Starting..." : "Start New Session" }}
      </button>
      <p v-if="status.isRunning" class="hint">A session is currently running.</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="runResult" class="success">
        Session <strong>{{ runResult.sessionId }}</strong> accepted.
      </p>
    </section>
  </main>
</template>
