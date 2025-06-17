<template>
    <div class="col-12">
        <div class="card min-vh-50 border-0 rounded-4">
            <div class="card-header bg-transparent border-0">
                NEW CHECK
            </div>

            <div class="card-body">

                <div class="row g-3 small">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-md-6 col-lg-4">
                                <div class="small text-muted">Check Type</div>
                                <CustomSelect v-model="slectedCheckType" :options="availableChecks"
                                    placeholder="select type" label="name" />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 d-none">
                        <div class="small text-muted">Required Document</div>
                        <CustomSelect :options="resources.documentTypes" placeholder="select type" label="name" />
                    </div>

                    <div class="col-md-6 d-none">
                        <div class="form-label">Uplaod Document</div>
                        <div class="small text-muted">Front Side (2MB MAX)</div>
                        <DropzoneComponent />
                    </div>

                    <div class="col-md-6 d-none">
                        <div class="form-label">Upload Document</div>
                        <div class="small text-muted">Back Side (2MB MAX)</div>
                        <DropzoneComponent />
                    </div>



                </div>
            </div>
            <div class="card-footer bg-transparent border-0">
                <div class="row justify-content-end g-1">
                    <div class="col-md-2">
                        <button @click="emit('done', false)"
                            class="btn btn-outline-dark me-2 rounded-4 float-end w-100">
                            Cancel
                        </button>
                    </div>
                    <div v-if="slectedCheckType" class="col-md-3 col-lg-2">
                        <loadingButton @click="runCheck" className="btn-theme w-100" :loading="isSaving">
                            RUN CHECk
                        </loadingButton>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../Clients/clientsStore';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DropzoneComponent from '@/components/Inputs/dropzoneComponent.vue';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import CustomSelect from '@/components/Inputs/customSelect.vue';
import LoadingButton from '@/components/loadingButton.vue';

const clientsStore = useClientsStore()
const { clientDetails, resources, clientExistingChecks, availableChecks } = storeToRefs(clientsStore)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    await clientsStore.getClientResources()
    isLoadingDetails.value = false
})

const emit = defineEmits(['done'])

const isLoadingDetails = ref<boolean>(true)

const isSaving = ref<boolean>(false);


const slectedCheckType = ref<any>(null)
function runCheck() {
    helperFunctions.confirm('Run this check?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {
            if (["extensive_screening_check", "standard_screening_check"].includes(slectedCheckType.value?.type)) {
                try {
                    isSaving.value = true
                    const { data } = await api.verify({ id: clientDetails.value?.id, check_type: slectedCheckType.value?.type })
                    if (data.status == 201) {
                        helperFunctions.toast(data.message, 'success')
                        slectedCheckType.value = null
                        emit('done', true)
                    }

                } catch (error) {
                    helperFunctions.toast('Could not verify, Pls try again', 'error')
                }
                finally { isSaving.value = false }
            }
        }
    })
}
</script>