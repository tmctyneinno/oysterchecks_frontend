<template>

    <div class="row g-3">
        <div class="col-md-8">
            <div class="form-label">Address
                <RedAsteric />
            </div>
            <CustomTextField v-model="line" :floatLabel="false" />
            <div class="xsmall text-danger">{{ errors?.line }}</div>
        </div>
        <div class=" col-lg-4 col-md-6">
            <div class="form-label">Country
                <RedAsteric />
            </div>
            <CustomSelect v-model="country" :options="clientsStore.countries" placeholder="select country" />
            <div class="xsmall text-danger">{{ errors?.country }}</div>
        </div>

        <div class=" col-lg-4 col-md-6">
            <div class="form-label">State
                <RedAsteric />
            </div>
            <CustomSelect v-model="state" :options="statesArray" placeholder="select state" />
            <div class="xsmall text-danger">{{ errors?.state }}</div>
        </div>

        <div class=" col-lg-4 col-md-6">
            <div class="form-label">City
                <RedAsteric />
            </div>
            <CustomSelect v-model="city" :options="citiesArray" placeholder="select city" />
            <div class="xsmall text-danger">{{ errors?.city }}</div>
        </div>

        <div class=" col-lg-4 col-md-6">
            <div class="form-label">House Number
                <RedAsteric />
            </div>
            <CustomTextField v-model="propertyNumber" :floatLabel="false" />
            <div class="xsmall text-danger">{{ errors?.propertyNumber }}</div>
        </div>

        <div class=" col-lg-4 col-md-6">
            <div class="form-label">Postal Code
                <!-- <RedAsteric /> -->
                <i data-bs-toggle="tooltip" data-bs-title="Zip or Postal Code"
                    class="bi bi-question-circle-fill small"></i>
            </div>
            <CustomTextField v-model="postalCode" :floatLabel="false" />
            <div class="xsmall text-danger">{{ errors?.postalCode }}</div>
        </div>

        <div class=" col-lg-4 col-md-6">
            <div class="form-label"> Name of Building
                <i data-bs-toggle="tooltip" data-bs-title="The building name of the client's address"
                    class="bi bi-question-circle-fill small"></i>
            </div>
            <CustomTextField v-model="buildingName" :floatLabel="false" />
            <div class="xsmall text-danger">{{ errors?.buildingName }}</div>
        </div>

        <div class=" col-lg-4 col-md-6">
            <div class="form-label">Address Type
                <i data-bs-toggle="tooltip" data-bs-title="The type of address"
                    class="bi bi-question-circle-fill small"></i>
            </div>
            <CustomSelect v-model="type" :options="addressTypes" placeholder="select type" />
            <div class="xsmall text-danger">{{ errors?.type }}</div>
        </div>

        <div class=" col-lg-4 col-md-6">
            <div class="form-label">From Date
                <i data-bs-toggle="tooltip" data-bs-title="The date the client moved into this address"
                    class="bi bi-question-circle-fill small"></i>
            </div>
            <CustomDatePicker v-model="fromDate" :clearable="true" />
            <div class="xsmall text-danger">{{ errors?.fromDate }}</div>
        </div>

        <div class=" col-lg-4 col-md-6">
            <div class="form-label">To Date
                <i data-bs-toggle="tooltip" data-bs-title="The date the client moved out of this address"
                    class="bi bi-question-circle-fill small"></i>
            </div>
            <CustomDatePicker v-model="toDate" :clearable="true" />
            <div class="xsmall text-danger">{{ errors?.toDate }}</div>
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
import RedAsteric from '@/components/redAsteric.vue';
import CustomDatePicker from '@/components/Inputs/customDatePicker.vue';
import { useTemplateStore } from '@/stores/template';

const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)

const templateStore = useTemplateStore()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    await clientsStore.getClientResources()
    isLoadingDetails.value = false
})

const emits = defineEmits(['done'])

const statesArray = ref<any[]>([])
const citiesArray = ref<any[]>([])

const countryIsoCode = computed(() => { return country.value?.isoCode ?? '' })
const stateIsoCode = computed(() => { return state.value?.isoCode ?? '' })

const isLoadingDetails = ref<boolean>(true)

const addressTypes = ref([
    { id: 1, label: 'Main', value: 'main' },
    { id: 2, label: 'Alternative', value: 'alternative' },
    { id: 3, label: 'Other', value: 'other' },
])


// form and validation
const validationRules = {
    line: yup.string().required('Address is required'),
    country: yup.object().required('Country is required'),
    state: yup.object().required('State is required'),
    city: yup.object().required('City is required'),
    propertyNumber: yup.string().required('Property Number is required'),
    buildingName: yup.string(),
    type: yup.object(),
    postalCode: yup.string(),
    fromDate: yup.date().nullable(),
    toDate: yup.date().nullable(),
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
    helperFunctions.confirm('Add new Address?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {

            try {
                templateStore.showOverlayLoading()

                const obj = {
                    clientId: clientDetails.value?.client_id,
                    country: countryIsoCode.value,
                    state: stateIsoCode.value,
                    city: values.city?.label,
                    postalCode: values.postalCode,
                    line: values.line,
                    propertyNumber: values.propertyNumber,
                    buildingName: values.buildingName,
                    type: values.type?.value,
                    fromDate: values.fromDate ? helperFunctions.dateDisplay(values.fromDate, 'YYYY-MM-DD') : undefined,
                    toDate: values.toDate ? helperFunctions.dateDisplay(values.toDate, 'YYYY-MM-DD') : undefined,
                }


                const { data } = await api.newAddress(obj)
                if (data.status == 201) {
                    resetForm()
                    emits('done')
                    helperFunctions.toast(data.message, 'success')

                }

            } catch (error) {
                helperFunctions.toast('Something went wrong, Pls try again', 'error')
            }
            finally { templateStore.showOverlayLoading(false) }
        }
    })

})






</script>