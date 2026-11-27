<script setup lang="ts">
  import { Button } from '@/components/ui/button';
</script>
<template>
  <header class="border-b">
    <nav class="mx-auto flex max-w-5xl items-center justify-between p-4" aria-label="Main">
      <RouterLink to="/" class="text-lg font-semibold">Task  Marketplace</RouterLink>
      <div class="flex gap-2">
        <Button variant="ghost" as-child><RouterLink to="/login">Log in</RouterLink></Button>
        <Button as-child><RouterLink to="/register">Sign up</RouterLink></Button>
      </div>
    </nav>
  </header>
</template>
