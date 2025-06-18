<template>
    <div class="col-12">
        <div class="card min-vh-100 border-0 rounded-4">
            <div class="card-header bg-transparent border-0 pt-3">
                <div class="col-md-6 col-lg-4">
                    <CustomSelect v-model="newCheck.selectedType" :options="availableChecks" placeholder="select type"
                        label="name" />
                </div>
            </div>

            <div class="card-body bg-light">
                <newCheck_amlCheck v-if="newCheck.selectedType?.type == 'extensive_screening_check'" />
                <NewCheck_bureauCheck v-if="newCheck.selectedType?.type == 'multi_bureau_check'" />
                <NewCheck_bureauCheck v-if="newCheck.selectedType?.type == 'document_check'" />
                <NewCheck_bureauCheck v-if="newCheck.selectedType?.type == 'identity_check'" />
                <NewCheck_bureauCheck v-if="newCheck.selectedType?.type == 'age_estimation_check'" />
                <NewCheck_bureauCheck v-if="newCheck.selectedType?.type == 'proof_of_address_check'" />
            </div>
        </div>

    </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/stores/clientsStore';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DropzoneComponent from '@/components/Inputs/dropzoneComponent.vue';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import CustomSelect from '@/components/Inputs/customSelect.vue';
import LoadingButton from '@/components/loadingButton.vue';
import CustomTextField from '@/components/Inputs/customTextField.vue';


// forms
import newCheck_amlCheck from './newCheck_amlCheck.vue';
import NewCheck_bureauCheck from './newCheck_bureauCheck.vue';

const clientsStore = useClientsStore()
const { clientDetails, availableChecks, newCheck } = storeToRefs(clientsStore)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    await clientsStore.getClientResources()
    isLoadingDetails.value = false
})


const statesArray = ref<any[]>([])
const citiesArray = ref<any[]>([])

const countryIsoCode = computed(() => { return form.country?.isoCode ?? '' })
const stateIsoCode = computed(() => { return form.state?.isoCode ?? '' })

interface FormInterface {
    line: string,
    country: any,
    state: any,
    city: any,
    postalCode: string,
}

const form = reactive<FormInterface>({
    line: '',
    country: null,
    state: null,
    city: null,
    postalCode: '',
})

watch(() => form.country, () => {
    form.state = null
    statesArray.value = []
    if (form.country) {
        statesArray.value = clientsStore.statesByCountry(countryIsoCode.value)
    }
})

watch(() => form.state, () => {
    form.city = null
    citiesArray.value = []
    if (form.state) {
        citiesArray.value = clientsStore.citiesByState(countryIsoCode.value, stateIsoCode.value)
    }
})


const isLoadingDetails = ref<boolean>(true)

const isSaving = ref<boolean>(false);

const requiredFields = computed<any[]>(() => {
    return availableChecks.value.find(x => x.type === newCheck.value.selectedType?.type)?.fields ?? []
})
const showFieldFromSelection = (field: string): boolean => requiredFields.value.includes(field)

const validateRequiredFields = (): boolean => {
    for (const field of requiredFields.value) {
        if (!(field in form)) {
            console.warn(`Field "${field}" not found in form interface`);
            continue;
        }

        if (!form[field as keyof FormInterface]) {
            helperFunctions.toastShort('Please complete all required fields');
            return false;
        }
    }
    return true;
};


function runCheck() {

    if (!validateRequiredFields()) return;

    helperFunctions.confirm('Run this check?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {

            try {
                isSaving.value = true

                const obj = {
                    check_type: newCheck.value.selectedType?.type,
                    clientId: clientDetails.value?.client_id,
                    country: countryIsoCode.value,
                    state: stateIsoCode.value,
                    city: form.city?.label,
                    postalCode: form.postalCode,
                    line: form.line,
                    // ...form
                }

                const { data } = await api.verify(obj)
                if (data.status == 201) {
                    helperFunctions.toast(data.message, 'success')
                    newCheck.value.selectedType = null
                    newCheck.value.adding = false
                }

            } catch (error) {
                helperFunctions.toast('Could not verify, Pls try again', 'error')
            }
            finally { isSaving.value = false }
        }
    })
}




</script>