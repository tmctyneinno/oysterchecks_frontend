<template>

    <NewCheckTemplate>
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
import { onMounted, ref, } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import LoadingButton from '@/components/loadingButton.vue';
import NewCheckTemplate from './newCheckTemplate.vue';
import { useNewChecksStore } from './useNewChecksStore';

const clientsStore = useClientsStore()
const { clientDetails, newCheck } = storeToRefs(clientsStore)
const newCheckStore = useNewChecksStore()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
})


function runCheck() {

    helperFunctions.confirm('Run this check?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {
            try {
                newCheckStore.isSubmittingForm = true

                const obj: any = {
                    check_type: newCheck.value.selectedType?.type,
                    clientId: clientDetails.value?.client_id,
                }

                const { data } = await api.verify(obj, obj.check_type)
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
}




</script>