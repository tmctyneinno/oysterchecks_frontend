import { defineStore } from "pinia";
import { ref } from "vue";

export const useNewChecksStore = defineStore('newChecksStore', () => {

    const selectedCheckType = ref<any>(null)

    return { selectedCheckType }
})