import { defineStore } from "pinia";
import { ref } from "vue";

export const useDashboardStore = defineStore('adminDashboardStore', () => {


    const summaryCards = ref<{ icon: string, info: string, number: number }[]>([
        { icon: '<i class="bi bi-person"></i>', info: 'Total Clients Verified', number: 5234 },
        { icon: '<i class="bi bi-exclamation-triangle"></i>', info: 'Pending Verifications', number: 234 },
        { icon: '<i class="bi bi-x-lg"></i>', info: 'High Risk Cases', number: 34 },
        { icon: '<i class="bi bi-files"></i>', info: 'Total documents Submmited', number: 23 },
        { icon: '<i class="bi bi-check-circle"></i>', info: 'Verification Process', number: 54 },
    ])


    return {
        summaryCards
    }
})