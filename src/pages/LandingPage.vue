<script setup lang="ts">
import { ref } from 'vue';
import modal from '@/components/modal.vue';
import { useTemplateStore } from '@/stores/templateStore';



const templateStore = useTemplateStore()
</script>

<template>
  <h1 @click="templateStore.modal = !templateStore.modal">Open modal</h1>
  <modal />
</template>
