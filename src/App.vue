<template>
  <vue3-progress-bar></vue3-progress-bar>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';


// @ts-ignore
import * as bootstrap from 'bootstrap'
import { useRoute } from 'vue-router'
import { nextTick, watch } from 'vue';

const route = useRoute()

watch(() => [route.fullPath, /*templateStore.activateToolTip*/], async () => {
  await nextTick();
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    const instance = bootstrap.Tooltip.getInstance(el);
    if (instance) instance.dispose();
    bootstrap.Tooltip.getOrCreateInstance(el);
  });
});

</script>