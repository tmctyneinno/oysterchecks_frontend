<template>

    <NewCheckTemplate>
        <template #form>
            <div class="row g-3">
                <div class="col-md-8">
                    <div class="form-label">Address</div>
                    <CustomTextField v-model="line" :floatLabel="false" />
                    <div class="xsmall text-danger">{{ errors?.line }}</div>
                </div>
                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">Country</div>
                    <CustomSelect v-model="country" :options="clientsStore.countries" placeholder="select country" />
                    <div class="xsmall text-danger">{{ errors?.country }}</div>
                </div>

                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">State</div>
                    <CustomSelect v-model="state" :options="statesArray" placeholder="select state" />
                    <div class="xsmall text-danger">{{ errors?.state }}</div>
                </div>

                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">City</div>
                    <CustomSelect v-model="city" :options="citiesArray" placeholder="select city" />
                    <div class="xsmall text-danger">{{ errors?.city }}</div>
                </div>

                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">Property Number</div>
                    <CustomTextField v-model="propertyNumber" :floatLabel="false" />
                    <div class="xsmall text-danger">{{ errors?.propertyNumber }}</div>
                </div>

                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">Postal Code</div>
                    <CustomTextField v-model="postalCode" :floatLabel="false" />
                    <div class="xsmall text-danger">{{ errors?.postalCode }}</div>
                </div>
            </div>
        </template>

        <template #button>
            <loadingButton @click="runCheck" className="btn-theme w-100" :loading="isSubmitting">
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

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

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

const countryIsoCode = computed(() => { return country.value?.isoCode ?? '' })
const stateIsoCode = computed(() => { return state.value?.isoCode ?? '' })

const isLoadingDetails = ref<boolean>(true)



// form and validation
const validationRules = {
    line: yup.string().required('Line is required'),
    country: yup.object().required('Country is required'),
    state: yup.object().required('State is required'),
    city: yup.object().required('City is required'),
    propertyNumber: yup.string().required('Property Number is required'),
    postalCode: yup.string().required('Postal Code is required'),
};

const { errors, handleSubmit, defineField, isSubmitting, resetForm, setFieldValue, resetField } = useForm({
    validationSchema: toTypedSchema(yup.object(validationRules)),
});

const [line, lineAttr] = defineField('line');
const [country, countryAttr] = defineField<any>('country');
const [state, stateAttr] = defineField<any>('state');
const [city, city_Attr] = defineField<any>('city');
const [propertyNumber, propertyNumberAttr] = defineField('propertyNumber');
const [postalCode, postalCodeAttr] = defineField('postalCode');


watch(() => country.value, () => {
    resetField('state')
    statesArray.value = []
    if (country.value) {
        statesArray.value = clientsStore.statesByCountry(countryIsoCode.value)
    }
})

watch(() => state.value, () => {
    resetField('city')
    citiesArray.value = []
    if (state.value) {
        citiesArray.value = clientsStore.citiesByState(countryIsoCode.value, stateIsoCode.value)
    }
})



const runCheck = handleSubmit(async (values: any) => {
    helperFunctions.confirm('Run this check?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {

            try {
                const obj: any = {
                    check_type: newCheck.value.selectedType?.type,
                    clientId: clientDetails.value?.client_id,
                    country: countryIsoCode.value,
                    state: stateIsoCode.value,
                    city: values.city?.label,
                    postalCode: values.postalCode,
                    line: values.line,
                    propertyNumber: values.propertyNumber
                    // ...form
                }

                const { data } = await api.verify(obj, obj.check_type)
                if (data.status == 201) {
                    helperFunctions.toast(data.message, 'success')
                    newCheck.value.selectedType = null
                    newCheck.value.adding = false
                }

            } catch (error) {
                helperFunctions.toast('Could not verify, Pls try again', 'error')
            }
            // finally { isSaving.value = false }
        }
    })

})






</script>