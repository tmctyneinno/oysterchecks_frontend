<template>

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

        <div class=" col-lg-4 col-md-6">
            <div class="form-label">Name of Building</div>
            <CustomTextField v-model="buildingName" :floatLabel="false" />
            <div class="xsmall text-danger">{{ errors?.buildingName }}</div>
        </div>

        <div class=" col-lg-4 col-md-6">
            <div class="form-label">Address Type</div>
            <CustomSelect v-model="type" :options="addressTypes" placeholder="select type" />
            <div class="xsmall text-danger">{{ errors?.type }}</div>
        </div>



        <div class="col-12">
            <div class="float-end col-md-2">
                <loadingButton @click="submitForm" className="btn-theme w-100" :loading="isSubmitting">
                    Submit
                </loadingButton>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/stores/clientsStore';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import CustomSelect from '@/components/Inputs/customSelect.vue';
import LoadingButton from '@/components/loadingButton.vue';
import CustomTextField from '@/components/Inputs/customTextField.vue';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)

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

const addressTypes = ref(['main', 'alternative', 'other'])


// form and validation
const validationRules = {
    line: yup.string().required('Line is required'),
    country: yup.object().required('Country is required'),
    state: yup.object().required('State is required'),
    city: yup.object().required('City is required'),
    propertyNumber: yup.string().required('Property Number is required'),
    buildingName: yup.string().required('Bulding Name is required'),
    type: yup.string().required('Type is required'),
    postalCode: yup.string().required('Postal Code is required'),
    fromDate: yup.string(),
    toDate: yup.string(),
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
const [buildingName, buildingNameAttr] = defineField('buildingName');
const [type, typeAttr] = defineField('type');
const [fromDate, fromDateAttr] = defineField('fromDate');
const [toDate, toDateAttr] = defineField('toDate');


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



const submitForm = handleSubmit(async (values: any) => {
    helperFunctions.confirm('Add Address?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {

            try {
                const obj = {
                    clientId: clientDetails.value?.client_id,
                    country: countryIsoCode.value,
                    state: stateIsoCode.value,
                    city: values.city?.label,
                    postalCode: values.postalCode,
                    line: values.line,
                    propertyNumber: values.propertyNumber,
                    buildingName: values.buildingName,
                    type: values.type,
                    fromDate: values.fromDate ? new Date(values.fromDate).toDateString() : null,
                    toDate: values.toDate ? new Date(values.toDate).toDateString() : null,
                }

                const { data } = await api.verify(obj)
                if (data.status == 201) {
                    helperFunctions.toast(data.message, 'success')

                }

            } catch (error) {
                helperFunctions.toast('Could not verify, Pls try again', 'error')
            }
            // finally { isSaving.value = false }
        }
    })

})






</script>