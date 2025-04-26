import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import sample_data from '@/stores/sample_data.json'

export const useClientsStore = defineStore('adminClientsStore', () => {

    // interfaces
    interface clientsDetailsMenuInterface {
        tabs: {
            id: number;
            group: string;
            text: string;
        }[];
        tabShowing: number;
    }

    const toggleAddModal = ref<boolean>(false)

    const clientDetails = ref<any>(null)

    const clientsDetailsMenu = reactive<clientsDetailsMenuInterface>({
        tabs: [
            { id: 1, group: 'info', text: 'General' },
            { id: 2, group: 'info', text: 'Addresses' },
            { id: 3, group: 'due', text: 'Checks' },
            { id: 4, group: 'due', text: 'AML Risk' },
            { id: 5, group: 'activity', text: 'Audit Log' },
        ],
        tabShowing: 1,
    })

    const clientsTabByGroup = (group: 'info' | 'due' | 'activity') => {
        return clientsDetailsMenu.tabs.filter((x: { group: string }) => x.group == group)
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
        clientsDetailsMenu,
        clientDetails,
        toggleAddModal,
        clientsTabByGroup,
        riskShader,
    }
})