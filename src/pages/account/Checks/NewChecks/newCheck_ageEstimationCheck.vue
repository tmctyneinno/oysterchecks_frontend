<template>

    <div class="d-flex justify-content-center mt-3 fs-5 text-muted" v-if="clientDetails?.type != 'person'">
        <i class="bi bi-exclamation-circle-fill me-2"></i>
        This check can only be performed on a client of type: 'person'.
    </div>
    <NewCheckTemplate v-else>
        <template #form>
            <div class="row g-3">
                <div class="col-12">

                    <div class="row g-3">
                        <div class="col-12">
                            <ImagesUploadRules />
                        </div>


                        <div class="col-lg-5">
                            <div class="form-label">
                                Upload Live Photo
                                <i data-bs-toggle="tooltip"
                                    data-bs-title="Live Photos are images (i.e. selfies) of the client's face."
                                    class="bi bi-question-circle-fill small"></i>
                                <RedAsteric />
                            </div>
                            <DropzoneComponent :formats="['jpg', 'jpeg', 'png']" :text="livePhoto?.name"
                                @fileUploaded="updateLivePhotoImage" />
                            <div class="xsmall text-danger">{{ errors?.livePhoto }}</div>
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
import { onMounted, } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DropzoneComponent from '@/components/Inputs/dropzoneComponent.vue';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import LoadingButton from '@/components/loadingButton.vue';
import NewCheckTemplate from './newCheckTemplate.vue';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import RedAsteric from '@/components/redAsteric.vue';
import { useNewChecksStore } from './useNewChecksStore';
import ImagesUploadRules from './imagesUploadRules.vue';
import { useTemplateStore } from '@/stores/template';

const clientsStore = useClientsStore()
const { clientDetails, newCheck } = storeToRefs(clientsStore)

const newCheckStore = useNewChecksStore()
const templateStore = useTemplateStore()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    templateStore.activateToolTip++
})


const { errors, handleSubmit, defineField, isSubmitting, resetForm, setFieldValue, resetField } = useForm({
    validationSchema: toTypedSchema(yup.object({
        livePhoto: yup.mixed().required('Please upload an image of the client\'s face')
            .test('fileSize', 'File must be less than 4MB',
                (value: any) => {
                    if (!value) return true; // Skip if no file
                    return value.size <= 4096 * 1024; // 4096 KB = 4MB
                }
            ),


    })),

});

const [livePhoto, livePhoto_Attr] = defineField<any>('livePhoto');



function updateLivePhotoImage(file: any) {
    setFieldValue('livePhoto', file)
}

const runCheck = handleSubmit(async (values: any) => {
    helperFunctions.confirm('Run this check?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {

            try {
                newCheckStore.isSubmittingForm = true
                templateStore.showOverlayLoading()
                const checkType: string = newCheck.value.selectedType?.type ?? 'age_estimation_check'

                const formData = new FormData()
                formData.append('clientId', clientDetails.value?.client_id)
                formData.append('check_type', checkType)
                formData.append('livePhoto', values?.livePhoto)

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
            finally {
                newCheckStore.isSubmittingForm = false;
                templateStore.showOverlayLoading(false)
            }
        }
    })

})






</script>