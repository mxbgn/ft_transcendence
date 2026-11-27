<script setup lang="ts">
import { ref, onMounted } from 'vue';

const status = ref('checking…');

onMounted(async () => {
  try {
    const res = await fetch('/api/hello');
    status.value = res.ok ? (await res.json()).status : `error ${res.status}`;
  } catch {
    status.value = 'unreachable';
  }
});
</script>

<template>
  <h1 class="text-2xl font-bold">Tasks</h1>
  <p>Backend: {{ status }}</p>
</template>
