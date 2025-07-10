<template>

    <NewCheckTemplate>
        <template #form>
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
                    <CustomSelect :disabled="true" v-model="country" :options="clientsStore.countries"
                        placeholder="select country" />
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
                    <CustomSelect v-model="city" :options="citiesArray" :taggable="true" placeholder="select city"
                        :noOptionsText="'No available options, type a city and press ENTER'" />
                    <div class="xsmall text-danger">{{ errors?.city }}</div>
                </div>

                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">Property Number
                        <RedAsteric />
                    </div>
                    <CustomTextField v-model="propertyNumber" :floatLabel="false" />
                    <div class="xsmall text-danger">{{ errors?.propertyNumber }}</div>
                </div>

                <div class=" col-lg-4 col-md-6">
                    <div class="form-label">Postal Code
                        <RedAsteric />
                    </div>
                    <CustomTextField v-model="postalCode" :floatLabel="false" />
                    <div class="xsmall text-danger">{{ errors?.postalCode }}</div>
                </div>
            </div>
        </template>

        <template #button>
            <loadingButton @click="runCheck" className="btn-theme w-100" :loading="newCheckStore.isSubmittingForm">
                RUN CHECk
            </loadingButton>
        </template>

    </NewCheckTemplate>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/stores/clientsStore';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import CustomSelect from '@/components/Inputs/customSelect.vue';
import LoadingButton from '@/components/loadingButton.vue';
import CustomTextField from '@/components/Inputs/customTextField.vue';
import NewCheckTemplate from './newCheckTemplate.vue';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import RedAsteric from '@/components/redAsteric.vue';
import { useNewChecksStore } from './useNewChecksStore';
import { useTemplateStore } from '@/stores/template';

const clientsStore = useClientsStore()
const { clientDetails, newCheck } = storeToRefs(clientsStore)

const newCheckStore = useNewChecksStore()
const templateStore = useTemplateStore()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    if (clientDetails.value?.nationality) setFieldValue('country', currentClientCountry.value)
})


const statesArray = ref<any[]>([])
const citiesArray = ref<any[]>([])

const countryIsoCode = computed(() => { return country.value?.isoCode ?? '' })
const stateIsoCode = computed(() => { return state.value?.isoCode ?? '' })


const currentClientCountry = computed(() => {
    return clientsStore.countries.find((country) => country.isoCode === clientDetails.value?.nationality)
})

const { errors, handleSubmit, defineField, isSubmitting, resetForm, setFieldValue, resetField } = useForm({
    validationSchema: toTypedSchema(yup.object({
        line: yup.string().required('Line is required'),
        country: yup.object().required('Country is required'),
        state: yup.object().required('State is required'),
        city: yup.mixed().required('City is required'),
        propertyNumber: yup.string().required('Property Number is required'),
        postalCode: yup.string().required('Postal Code is required'),
    })),
    initialValues: {
        country: currentClientCountry.value,
    }
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
                newCheckStore.isSubmittingForm = true
                templateStore.showOverlayLoading()

                const formData = new FormData();
                const checkType: string = newCheck.value.selectedType?.type ?? 'multi_bureau_check'

                formData.append('check_type', checkType);
                formData.append('clientId', clientDetails.value?.client_id);
                formData.append('country', countryIsoCode.value);
                formData.append('state', stateIsoCode.value);
                formData.append('city', values.city?.label ?? values.city);
                formData.append('postalCode', values.postalCode);
                formData.append('line', values.line);
                formData.append('propertyNumber', values.propertyNumber);

                const { data } = await api.verify(formData, checkType)
                if (data.status == 201) {
                    helperFunctions.toast(data.message, 'success')
                    newCheck.value.selectedType = null
                    newCheck.value.adding = false
                }

            } catch (error: any) {
                helperFunctions.toast(error?.response?.data?.errors?.message ?? 'Could not verify, Pls try again', 'error')
            }
            finally {
                newCheckStore.isSubmittingForm = false;
                templateStore.showOverlayLoading(false)
            }
        }
    })

})






</script>