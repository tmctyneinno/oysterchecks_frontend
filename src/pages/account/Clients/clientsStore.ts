import { defineStore } from "pinia";
import { computed, reactive, ref, defineAsyncComponent, markRaw } from "vue";
import { Country, type ICountry } from 'country-state-city';
import api from "@/api";

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

    const General = markRaw(defineAsyncComponent(() => import('./Details/Menus/general.vue')))
    // const Addresses = markRaw(defineAsyncComponent(() => import('./Details/Menus/addresses.vue')));
    // const Documents = markRaw(defineAsyncComponent(() => import('./Details/Menus/documents.vue')));
    // const Checks = markRaw(defineAsyncComponent(() => import('./menuContents/Checks.vue')));
    const AML_Risk = markRaw(defineAsyncComponent(() => import('./Details/Menus/aml_risk.vue')));
    const Audit_Log = markRaw(defineAsyncComponent(() => import('./Details/Menus/audit_log.vue')));

    const clientsDetailsMenu = reactive<clientsDetailsMenuInterface>({
        tabs: [
            { tab: 1, group: 'info', text: 'General', component: General },
            // { tab: 2, group: 'info', text: 'Addresses', component: Addresses },
            // { tab: 3, group: 'info', text: 'Documents', component: Documents },
            { tab: 6, group: 'info', text: 'Audit Log', component: Audit_Log },
            { tab: 4, group: 'info', text: 'Checks', component: null },
            // { tab: 5, group: 'due', text: 'AML Risk', component: AML_Risk },
        ],
        tabShowing: 1,
    })

    const clientsTabByGroup = (group: 'info' | 'due' | 'activity') => {
        return clientsDetailsMenu.tabs.filter((x: { group: string }) => x.group == group)
    }

    const countries: ICountry[] = Country.getAllCountries()
        .map((x: any) => ({ label: x.name + ' (' + x.isoCode + ')', ...x }))

    const countryName = (isCode: string): string | undefined => {
        return countries.find(x => x.isoCode == isCode)?.name
    }

    const resources = reactive({
        checksTypes: [],
        documentTypes: [],
        isLoaded: false
    })

    const clientExistingChecks = ref<string[]>([])
    const availableChecks = computed(() => {
        return resources.checksTypes.filter((x: { type: string }) => !clientExistingChecks.value.includes(x.type))
    })

    async function getClientResources() {
        if (!resources.isLoaded)
            try {
                const { data } = await api.checksResources()
                resources.checksTypes = data.check_types
                resources.documentTypes = data.document_types
                resources.isLoaded = true
            } catch (error) { }
    }

    async function getClientDetails(client_id: string) {
        if (!clientDetails.value)
            try {
                const { data } = await api.getClient(client_id)
                clientDetails.value = data
            } catch (error) { }
    }






    // ######################################################33

    const riskShader = (risk: string) => {
        const map: Record<string, { bg: string; color: string; text: string }> = {
            '4': { bg: '#FFE4E4', color: '#DE1919', text: 'High' },
            '3': { bg: '#FFFAEA', color: '#C1971B', text: 'Medium' },
            '2': { bg: '#D4FFE1', color: '#0B6526', text: 'Low' },
            '1': { bg: '#E6E6E6', color: '#4C4848', text: 'No Risk' },
        }

        return map[risk] || { bg: '', color: '', text: '' }
    }

    const statusShader = (risk: string) => {
        const map: Record<string, { bg: string; color: string; }> = {
            'failed': { bg: '#FFE4E4', color: '#DE1919', },
            'pending': { bg: '#FFFAEA', color: '#C1971B', },
            'complete': { bg: '#D4FFE1', color: '#0B6526', },
        }

        return map[risk] || { bg: '', color: '', text: '' }
    }






    return {
        clientsDetailsMenu,
        clientDetails,
        toggleAddModal,
        resources,
        clientExistingChecks,
        availableChecks,
        countries,
        clientsTabByGroup,
        riskShader,
        statusShader,
        countryName,
        getClientResources,
        getClientDetails,
    }
})