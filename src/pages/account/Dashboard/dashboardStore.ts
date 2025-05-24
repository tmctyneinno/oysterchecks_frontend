import { defineStore } from "pinia";
import { ref } from "vue";

export const useDashboardStore = defineStore('adminDashboardStore', () => {


    const summaryCards = ref<{ icon: string, info: string, number: number }[]>([
        { icon: '<i class="bi bi-person-fill"></i>', info: 'Total Clients Verified', number: 0 },
        { icon: '<i class="bi bi-exclamation-triangle-fill"></i>', info: 'Pending Verifications', number: 0 },
        { icon: '<i class="bi bi-x-circle-fill"></i>', info: 'High Risk Cases', number: 0 },
        { icon: '<i class="bi bi-file-text-fill"></i>', info: 'Total documents Submmited', number: 0 },
        { icon: '<i class="bi bi-check-circle-fill"></i>', info: 'Verification Process', number: 0 },
    ])


    return {
        summaryCards
    }
})