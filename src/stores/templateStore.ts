import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTemplateStore = defineStore('templateStore', () => {
  const modal = ref<boolean>(false)
  return { modal }
})
