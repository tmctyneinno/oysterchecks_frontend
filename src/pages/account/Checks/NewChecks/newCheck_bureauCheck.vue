<template>

    <NewCheckTemplate>
        <template #form>
            <div class="row g-3">
                <div class="col-md-8">
                    <div class="form-label">Address</div>
                    <CustomTextField v-model="form.line" :floatLabel="false" />
                </div>
                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">Country</div>
                    <CustomSelect v-model="form.country" :options="clientsStore.countries"
                        placeholder="select country" />
                </div>

                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">State</div>
                    <CustomSelect v-model="form.state" :options="statesArray" placeholder="select state" />
                </div>

                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">City</div>
                    <CustomSelect v-model="form.city" :options="citiesArray" placeholder="select city" />
                </div>

                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">Postal Code</div>
                    <CustomTextField v-model="form.postalCode" :floatLabel="false" />
                </div>
            </div>
        </template>

        <template #button>
            <loadingButton @click="runCheck" className="btn-theme w-100" :loading="isSaving">
                RUN CHECk
            </loadingButton>
        </template>

    </NewCheckTemplate>

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
import NewCheckTemplate from './newCheckTemplate.vue';

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

const validateRequiredFields = (): boolean => {
    for (const field of requiredFields.value) {
        if (!(field in form)) {
            console.warn(`Field "${field}" not found in form interface`);
            continue;
        }

        if (!form[field as keyof FormInterface]) {
            helperFunctions.toast('Please complete all required fields', 'warning');
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