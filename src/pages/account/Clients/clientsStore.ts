import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useClientsStore = defineStore('adminClientsStore', () => {

    // interfaces
    interface clientsDetailsInterface {
        current: any;
        tabsList: {
            id: number;
            group: string;
            text: string;
        }[];
        tabShowing: number;
    }

    const toggleAddModal = ref<boolean>(false)

    const clientsDetails = reactive<clientsDetailsInterface>({
        current: null,
        tabsList: [
            { id: 1, group: 'info', text: 'General' },
            { id: 2, group: 'info', text: 'Addresses' },
            { id: 3, group: 'due', text: 'Checks' },
            { id: 4, group: 'due', text: 'AML Risk' },
            { id: 5, group: 'activity', text: 'Audit Log' },
        ],
        tabShowing: 1,

    })

    const clientsTabByGroup = (group: 'info' | 'due' | 'activity') => {
        return clientsDetails.tabsList.filter((x: { group: string }) => x.group == group)
    }

    const riskShader = (risk: string) => {
        const map: Record<string, { bg: string; color: string; text: string }> = {
            '4': { bg: '#FFE4E4', color: '#DE1919', text: 'High' },
            '3': { bg: '#FFFAEA', color: '#C1971B', text: 'Medium' },
            '2': { bg: '#D4FFE1', color: '#0B6526', text: 'Low' },
            '1': { bg: '#E6E6E6', color: '#4C4848', text: 'No Risk' },
        }

        return map[risk] || { bg: '', color: '', text: '' }
    }


    return {
        clientsDetails,
        clientsTabByGroup,
        toggleAddModal,
        riskShader
    }
})