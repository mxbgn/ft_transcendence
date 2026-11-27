<script setup lang="ts">
  import AppHeader from '@/components/layout/AppHeader.vue';
  import AppFooter from '@/components/layout/AppFooter.vue';
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="mx-auto w-full max-w-5xl flex-1 p-4">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
