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
                            <div class="form-label">Issuing Country
                                <RedAsteric />
                            </div>
                            <CustomSelect v-model="issuingCountry" :options="clientsStore.countries"
                                placeholder="select country" />
                            <div class="xsmall text-danger">{{ errors?.issuingCountry }}</div>
                        </div>


                        <div class=" col-lg-4 col-md-6">
                            <div class="form-label">Issuing State
                                <RedAsteric />
                            </div>
                            <CustomSelect v-model="issuingState" :options="statesArray" placeholder="select state" />
                            <div class="xsmall text-danger">{{ errors?.issuingState }}</div>
                        </div>

                        <div class="col-12" v-if="twoSidedDocument">
                            <fieldset class="borderr bg-light-subtle rounded-3 pb-3 px-3 mb-4">
                                <legend class="text-muted float-none xsmall p-0 px-2 w-auto">
                                    IMAGE UPLOAD GUIDELINES
                                </legend>
                                <div class="row g-1 small text-warning-emphasis">
                                    <div class="col-lg-6 ">
                                        <i class="bi bi-dot"></i> The images must be of good quality, with a
                                        <strong>minimum of 150 DPI.</strong>
                                    </div>
                                    <div class="col-lg-6 ">
                                        <i class="bi bi-dot"></i> The images must be either in <strong>JPG,
                                            PNG</strong>, or <strong>PDF</strong>
                                        format.
                                    </div>
                                    <div class="col-lg-6 ">
                                        <i class="bi bi-dot"></i> The images must be provided <strong>without blur or
                                            glare</strong>.
                                    </div>
                                    <div class="col-lg-6 ">
                                        <i class="bi bi-dot"></i> You must <strong>not</strong> take the image at
                                        <strong>an angle.</strong>
                                    </div>
                                    <div class="col-lg-6 ">
                                        <i class="bi bi-dot"></i> Each side of the document must be
                                        <strong>between 34 KB and 4 MB.</strong>
                                    </div>
                                </div>

                            </fieldset>
                        </div>

                        <div class="col-lg-5">
                            <div class="form-label">
                                Upload Document
                                <span v-if="twoSidedDocument">(front)</span>
                                <RedAsteric />
                            </div>
                            <DropzoneComponent :formats="formatToUpload" :text="document?.name"
                                @fileUploaded="updateDocumentFrontSide" />
                            <div class="xsmall text-danger">{{ errors?.document }}</div>
                        </div>

                        <div v-if="twoSidedDocument" class="col-lg-5">
                            <div class="form-label">
                                Upload Document
                                <span>(back)</span>
                                <RedAsteric />
                            </div>
                            <DropzoneComponent :formats="formatToUpload" :text="documentBack?.name"
                                @fileUploaded="updateDocumentBackSide" />
                            <div class="xsmall text-danger">{{ errors?.documentBack }}</div>
                        </div>
                    </div>
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
import { useNewChecksStore } from './useNewChecksStore';

const clientsStore = useClientsStore()
const { clientDetails, newCheck } = storeToRefs(clientsStore)

const newCheckStore = useNewChecksStore()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    await clientsStore.getClientResources()
    isLoadingDetails.value = false

    if (clientDetails.value?.nationality) setFieldValue('issuingCountry', currentClientCountry.value)

})


const twoSidedDocument = computed(() => { return documentType.value?.sides_required == 2 })
const formatToUpload = computed(() => {
    return !twoSidedDocument.value ? ['jpg', 'jpeg', 'png', 'pdf'] : ['jpg', 'jpeg', 'png']
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

        document: yup.mixed().required('Please upload a valid document')
            .test('fileSize', 'File must be less than 4MB',
                (value: any) => {
                    if (!value) return true; // Skip if no file
                    return value.size <= 4096 * 1024; // 4096 KB = 4MB
                }
            ),
        documentBack: yup.mixed().when('documentType', {
            is: (val: any) => val?.sides_required == 2,
            then: (schema) => schema.required('Please upload a valid document')
                .test('fileSize', 'File must be less than 4MB',
                    (value: any) => {
                        if (!value) return true; // Skip if no file
                        return value.size <= 4096 * 1024; // 4096 KB = 4MB
                    }
                ),
            otherwise: (schema) => schema.optional(),
        }),

    })),
    initialValues: {
        issuingCountry: currentClientCountry.value,
    }
});

const [issuingCountry, issuingCountryAttr] = defineField<any>('issuingCountry');
const [issuingState, issuingStateAttr] = defineField<any>('issuingState');
const [documentType, documentTypeAttr] = defineField<any>('documentType');
const [classification, classificationAttr] = defineField<any>('classification');
const [documentNumber, documentNumber_Attr] = defineField('documentNumber');
const [document, document_Attr] = defineField<any>('document');
const [documentBack, documentBack_Attr] = defineField<any>('documentBack');


watch(() => issuingCountry.value, () => {
    resetField('issuingState')
    statesArray.value = []
    if (issuingCountry.value) {
        statesArray.value = clientsStore.statesByCountry(countryIsoCode.value)
    }
})

function updateDocumentFrontSide(file: any) {
    setFieldValue('document', file)
}

function updateDocumentBackSide(file: any) {
    setFieldValue('documentBack', file)
}

const runCheck = handleSubmit(async (values: any) => {
    helperFunctions.confirm('Run this check?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {

            try {
                newCheckStore.isSubmittingForm = true
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
                if (twoSidedDocument.value)
                    formData.append('documentBack', values?.documentBack)

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

            } catch (error: any) {
                helperFunctions.toast(error?.response?.data?.errors?.message ?? 'Could not verify, Pls try again', 'error')
            }
            finally { newCheckStore.isSubmittingForm = false }
        }
    })

})






</script>