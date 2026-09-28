<template>
  <div class="app-container">
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';

const hasComponentRoutes = true;
</script>
