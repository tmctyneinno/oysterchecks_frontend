<template>
    <div class="col-12">
        <div class="card border-0 pt-0 " style="min-height: 20vh;">
            <div class="card-body"> </div>
            <div class="card-footer bg-transparent border-0">
                <div class="row justify-content-end g-1">
                    <div class="col-md-2">
                        <button @click="newCheck.adding = false"
                            class="btn btn-outline-dark me-2 rounded-4 float-end w-100">
                            Cancel
                        </button>
                    </div>
                    <div v-if="newCheck.selectedType" class="col-md-3 col-lg-2">
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
import { useClientsStore } from '@/stores/clientsStore';
import { onMounted, ref, } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import LoadingButton from '@/components/loadingButton.vue';

const clientsStore = useClientsStore()
const { clientDetails, newCheck } = storeToRefs(clientsStore)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    await clientsStore.getClientResources()
    isLoadingDetails.value = false
})

const isLoadingDetails = ref<boolean>(true)

const isSaving = ref<boolean>(false);
function runCheck() {

    helperFunctions.confirm('Run this check?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {
            try {
                isSaving.value = true

                const obj = {
                    check_type: newCheck.value.selectedType?.type,
                    clientId: clientDetails.value?.client_id,
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