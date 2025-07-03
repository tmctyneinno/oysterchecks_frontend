<template>

    <NewCheckTemplate>
        <template #form>
            <div class="row g-3">
                <div class="col-12">
                    <!-- <fieldset class="border rounded-3 py-3 px-3 mb-4">
                        <legend class="text-warning-emphasis float-none small p-0 px-2 w-auto">
                            DOCUMENT DETAILS
                        </legend>
                    </fieldset> -->

                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-label">Document Type
                                <RedAsteric />
                            </div>
                            <CustomSelect v-model="documentType" :options="clientsStore.resources.documentTypes"
                                placeholder="select type" label="name" />
                            <div class="xsmall text-danger">{{ errors?.documentType }}</div>
                        </div>

                        <div class=" col-md-6">
                            <div class="form-label">Classification
                                <RedAsteric />
                            </div>
                            <CustomSelect v-model="classification"
                                :options="clientsStore.resources.documentClassifications" placeholder="select type"
                                label="name" />
                            <div class="xsmall text-danger">{{ errors?.classification }}</div>
                        </div>

                        <div class=" col-lg-4 col-md-6">
                            <div class="form-label">Document Number
                                <RedAsteric />
                            </div>
                            <CustomTextField v-model="documentNumber" :floatLabel="false" />
                            <div class="xsmall text-danger">{{ errors?.documentNumber }}</div>
                        </div>

                        <div class=" col-lg-4 col-md-6">
                            <div class="form-label">Isuing Country
                                <RedAsteric />
                            </div>
                            <CustomSelect v-model="issuingCountry" :options="clientsStore.countries"
                                placeholder="select country" />
                            <div class="xsmall text-danger">{{ errors?.issuingCountry }}</div>
                        </div>


                        <div class=" col-lg-4 col-md-6">
                            <div class="form-label">Isuing State
                                <RedAsteric />
                            </div>
                            <CustomSelect v-model="issuingState" :options="statesArray" placeholder="select state" />
                            <div class="xsmall text-danger">{{ errors?.issuingState }}</div>
                        </div>

                        <div class="col-lg-5">
                            <div class="form-label">
                                Upload Image
                                <RedAsteric />
                            </div>
                            <DropzoneComponent :formats="['jpg', 'jpeg', 'png', 'pdf']"
                                @fileUploaded="updateUploadedFile" />
                            <div class="xsmall text-danger">{{ errors?.document }}</div>
                        </div>

                        <div class="col-lg-5 cursor-pointer">
                            <div class="form-label">
                                &nbsp;
                            </div>
                            <div class="d-fle">
                                <div @click="document_side = 'front'">
                                    <i v-if="document_side !== 'front'" class="bi bi-circle"></i>
                                    <i v-else class="bi bi-circle-fill"></i> Front
                                </div>
                                <div @click="document_side = 'back'">
                                    <i v-if="document_side !== 'back'" class="bi bi-circle"></i>
                                    <i v-else class="bi bi-circle-fill"></i> Back
                                </div>
                            </div>
                        </div>

                    </div>
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
import RedAsteric from '@/components/redAsteric.vue';

const clientsStore = useClientsStore()
const { clientDetails, newCheck } = storeToRefs(clientsStore)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    await clientsStore.getClientResources()
    isLoadingDetails.value = false

    if (clientDetails.value?.nationality) setFieldValue('issuingCountry', currentClientCountry.value)

})


const statesArray = ref<any[]>([])

const countryIsoCode = computed(() => { return issuingCountry.value?.isoCode ?? '' })
const stateIsoCode = computed(() => { return issuingState.value?.isoCode ?? '' })

const isLoadingDetails = ref<boolean>(true)


const currentClientCountry = computed(() => {
    return clientsStore.countries.find((country) => country.isoCode === clientDetails.value?.nationality)
})


const { errors, handleSubmit, defineField, isSubmitting, resetForm, setFieldValue, resetField } = useForm({
    validationSchema: toTypedSchema(yup.object({
        documentNumber: yup.string().required('Document Number is required'),
        issuingState: yup.object().required('State is required'),
        issuingCountry: yup.object().required('Country is required'),
        documentType: yup.object().required('Document Type is required'),
        classification: yup.object().required('Classification Type is required'),
        document: yup.mixed().required('Please upload document'),
        document_side: yup.string(),
    })),
    initialValues: {
        issuingCountry: currentClientCountry.value,
        document_side: 'front'
    }
});

const [issuingCountry, issuingCountryAttr] = defineField<any>('issuingCountry');
const [issuingState, issuingStateAttr] = defineField<any>('issuingState');
const [documentType, documentTypeAttr] = defineField<any>('documentType');
const [classification, classificationAttr] = defineField<any>('classification');
const [documentNumber, documentNumber_Attr] = defineField('documentNumber');
const [document, document_Attr] = defineField('document');
const [document_side, document_side_Attr] = defineField('document_side');


watch(() => issuingCountry.value, () => {
    resetField('issuingState')
    statesArray.value = []
    if (issuingCountry.value) {
        statesArray.value = clientsStore.statesByCountry(countryIsoCode.value)
    }
})

function updateUploadedFile(file: any) {
    setFieldValue('document', file)
}

const runCheck = handleSubmit(async (values: any) => {
    helperFunctions.confirm('Run this check?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {

            try {
                isSubmitting.value = true
                const checkType: string = newCheck.value.selectedType?.type ?? 'document_check'

                const formData = new FormData()
                formData.append('clientId', clientDetails.value?.client_id)
                formData.append('check_type', checkType)
                formData.append('issuingCountry', countryIsoCode.value)
                formData.append('issuingState', stateIsoCode.value)
                formData.append('documentNumber', values.documentNumber)
                formData.append('type', values.documentType?.value)
                formData.append('classification', values.classification?.value)
                formData.append('document', values.document)
                formData.append('document_side', values.document_side)

                // Iterate over entries and log each one
                // for (const [key, value] of formData.entries()) {
                //     console.log(`${key}: ${value}`);
                // }

                const { data } = await api.verify(formData, checkType)

                if (data.status == 201) {
                    helperFunctions.toast(data.message, 'success')
                    newCheck.value.selectedType = null
                    newCheck.value.adding = false
                }

            } catch (error) {
                helperFunctions.toast('Could not verify, Pls try again', 'error')
            }
            finally { isSubmitting.value = false }
        }
    })

})






</script>