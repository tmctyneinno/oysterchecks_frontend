import { defineStore } from "pinia";
import { computed, reactive, ref, defineAsyncComponent, markRaw } from "vue";

export const useClientsStore = defineStore('adminClientsStore', () => {

    // interfaces
    interface clientsDetailsMenuInterface {
        tabs: {
            tab: number;
            group: string;
            text: string;
            component: ReturnType<typeof defineAsyncComponent> | null
        }[];
        tabShowing: number;
    }

    const toggleAddModal = ref<boolean>(false)

    const clientDetails = ref<any>(null)

    const General = markRaw(defineAsyncComponent(() => import('./menuContents/General.vue')))
    const Addresses = markRaw(defineAsyncComponent(() => import('./menuContents/Addresses.vue')));
    const Documents = markRaw(defineAsyncComponent(() => import('./menuContents/Documents.vue')));
    // const Checks = markRaw(defineAsyncComponent(() => import('./menuContents/Checks.vue')));
    const AML_Risk = markRaw(defineAsyncComponent(() => import('./menuContents/AML_Risk.vue')));
    const Audit_Log = markRaw(defineAsyncComponent(() => import('./menuContents/Audit_Log.vue')));

    const clientsDetailsMenu = reactive<clientsDetailsMenuInterface>({
        tabs: [
            { tab: 1, group: 'info', text: 'General', component: General },
            { tab: 2, group: 'info', text: 'Addresses', component: Addresses },
            { tab: 3, group: 'info', text: 'Documents', component: Documents },
            { tab: 4, group: 'due', text: 'Checks', component: null },
            { tab: 5, group: 'due', text: 'AML Risk', component: AML_Risk },
            { tab: 6, group: 'activity', text: 'Audit Log', component: Audit_Log },
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