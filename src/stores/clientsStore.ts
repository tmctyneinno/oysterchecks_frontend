import { defineStore } from "pinia";
import { computed, reactive, ref, defineAsyncComponent, markRaw } from "vue";
import { Country, type ICountry, State, type IState, City, type ICity } from 'country-state-city';
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

    type CheckType = {
        type: string;
        name: string;
        description: string;
        fields: any[];
    };

    const toggleAddModal = ref<boolean>(false)

    const clientDetails = ref<any>(null)

    const General = markRaw(defineAsyncComponent(() => import('../pages/account/Clients/Details/Menus/general.vue')))
    const Addresses = markRaw(defineAsyncComponent(() => import('../pages/account/Clients/Details/Menus/addresses.vue')))
    // const Documents = markRaw(defineAsyncComponent(() => import('./Details/Menus/documents.vue')));
    // const Checks = markRaw(defineAsyncComponent(() => import('./menuContents/Checks.vue')));
    const AML_Risk = markRaw(defineAsyncComponent(() => import('../pages/account/Clients/Details/Menus/aml_risk.vue')));
    const Audit_Log = markRaw(defineAsyncComponent(() => import('../pages/account/Clients/Details/Menus/audit_log.vue')));

    const clientsDetailsMenu = reactive<clientsDetailsMenuInterface>({
        tabs: [
            { tab: 1, group: 'info', text: 'General', component: General },
            { tab: 2, group: 'info', text: 'Addresses', component: Addresses },
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


    const europeanCountryCodes = ['AL', 'AD', 'AT', 'BE', 'BG', 'HR',
        'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS',
        'IE', 'IT', 'XK', 'LV', 'LI', 'LT', 'LU', 'MT', 'MD', 'MC',
        'ME', 'NL', 'MK', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS',
        'SK', 'SI', 'ES', 'SE', 'CH', 'UA', 'GB', 'VA'];

    const africanCountryCodes = [
        'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CV', 'CM', 'CF', 'TD',
        'KM', 'CG', 'CD', 'CI', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET',
        'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 'LR', 'LY', 'MG',
        'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW',
        'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG',
        'TN', 'UG', 'ZM', 'ZW'
    ];

    const countries: ICountry[] = Country.getAllCountries()
        .map((x: any) => ({ label: x.name + ' (' + x.isoCode + ')', ...x })).filter(country =>
            europeanCountryCodes.includes(country.isoCode)
        );


    const statesByCountry = (isoCode: string): IState[] => {
        return State.getStatesOfCountry(isoCode).map((x: any) => ({ label: x.name, ...x }))
    }

    const citiesByState = (countryCode: string, stateCode: string): ICity[] => {
        return City.getCitiesOfState(countryCode, stateCode).map((x: any) => ({ label: x.name, ...x }))
    }

    const countryName = (isoCode: string): string | undefined => {
        return Country.getCountryByCode(isoCode)?.name ?? '-'
    }

    const stateName = (StateISO: string, CountryISO: string): string | undefined => {
        return State.getStateByCodeAndCountry(StateISO, CountryISO)?.name ?? '-'
    }

    const resources = reactive<{
        checksTypes: CheckType[],
        documentTypes: any[],
        documentClassifications: any[],
        isLoaded: boolean
    }>({
        checksTypes: [],
        documentTypes: [],
        documentClassifications: [],
        isLoaded: false
    })

    const clientExistingChecks = ref<string[]>([])
    const availableChecks = computed<CheckType[]>(() => {
        // return resources.checksTypes;
        return resources.checksTypes.filter((x: { type: string }) => !clientExistingChecks.value.includes(x.type))
    })

    async function getClientResources() {
        if (!resources.isLoaded)
            try {
                const { data } = await api.checksResources()
                resources.checksTypes = data.check_types
                resources.documentTypes = data.document_types
                resources.documentClassifications = data.document_classifications
                resources.isLoaded = true
            } catch (error) { }
    }

    async function getClientDetails(client_id: string) {
        // if (!clientDetails.value)
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

    const newCheck = reactive<{
        selectedType: CheckType | null,
        adding: boolean
    }>({
        selectedType: null,
        adding: false
    })






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
        stateName,
        getClientResources,
        getClientDetails,
        statesByCountry,
        citiesByState,
        newCheck
    }
})