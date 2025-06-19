<template>

    <NewCheckTemplate>
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
import { onMounted, ref, } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import LoadingButton from '@/components/loadingButton.vue';
import NewCheckTemplate from './newCheckTemplate.vue';

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