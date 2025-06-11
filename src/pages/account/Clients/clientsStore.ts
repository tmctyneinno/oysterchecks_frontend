import { defineStore } from "pinia";
import { computed, reactive, ref, defineAsyncComponent, markRaw } from "vue";
import { Country, type ICountry } from 'country-state-city';

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

    const statusShader = (risk: string) => {
        const map: Record<string, { bg: string; color: string; }> = {
            'failed': { bg: '#FFE4E4', color: '#DE1919', },
            'pending': { bg: '#FFFAEA', color: '#C1971B', },
            'complete': { bg: '#D4FFE1', color: '#0B6526', },
        }

        return map[risk] || { bg: '', color: '', text: '' }
    }

    const checktypes = ref<any[]>([
        { id: 1, name: 'ID Verification' },
        { id: 2, name: 'Address Verification' },
        { id: 3, name: 'Sanctions Check' },
        { id: 4, name: 'PEP Check' },
        { id: 5, name: 'AML Risk Assessment' },
        { id: 6, name: 'Credit Check' },
        { id: 7, name: 'Fraud Check' },
        { id: 8, name: 'Background Check' },
        { id: 9, name: 'Employment Verification' },
        { id: 10, name: 'Education Verification' },
        { id: 11, name: 'Criminal Record Check' },
        { id: 12, name: 'Financial History Check' },
        { id: 13, name: 'Social Media Check' },
        { id: 14, name: 'Litigation Check' },
        { id: 15, name: 'Professional License Check' },
        { id: 16, name: 'Reference Check' },
        { id: 17, name: 'Custom Check' },
    ])


    const documentTypes = ref<any[]>([
        { id: 1, name: 'Passport' },
        { id: 2, name: 'Driver\'s License' },
        { id: 3, name: 'National ID Card' },
        { id: 4, name: 'Utility Bill' },
        { id: 5, name: 'Bank Statement' },
        { id: 6, name: 'Tax Document' },
        { id: 7, name: 'Employment Letter' },
        { id: 8, name: 'Rental Agreement' },
        { id: 9, name: 'Insurance Document' },
        { id: 10, name: 'Other' },
    ])

    const countries: ICountry[] = Country.getAllCountries()
        .map((x: any) => ({ label: x.name + ' (' + x.isoCode + ')', ...x }))

    const countryName = (isCode: string): string | undefined => {
        return countries.find(x => x.isoCode == isCode)?.name
    }


    return {
        clientsDetailsMenu,
        clientDetails,
        toggleAddModal,
        clientsTabByGroup,
        riskShader,
        statusShader,
        checktypes,
        documentTypes,
        countries,
        countryName
    }
})