<template>
    <div class="col-12">
        <div class="card min-vh-50 border-0 rounded-4">
            <div class="card-header bg-transparent border-0 pt-3">
                <div class="col-md-6 col-lg-4">
                    <CustomSelect :loading="loadingResources" v-model="newCheck.selectedType" :options="availableChecks"
                        :noOptionsText="'No more checks available for this client'" placeholder="select type"
                        label="name" />
                </div>
            </div>

            <div class="card-body bg-light">
                <newCheck_amlCheck v-if="newCheck.selectedType?.type == 'extensive_screening_check'" />
                <newCheck_amlCheck v-if="newCheck.selectedType?.type == 'standard_screening_check'" />
                <NewCheck_bureauCheck v-if="newCheck.selectedType?.type == 'multi_bureau_check'" />
                <NewCheck_documentCheck v-if="newCheck.selectedType?.type == 'document_check'" />
                <NewCheck_indentityCheck v-if="newCheck.selectedType?.type == 'identity_check'" />
                <NewCheck_enhancedIndentityCheck v-if="newCheck.selectedType?.type == 'enhanced_identity_check'" />
                <NewCheck_bureauCheck v-if="newCheck.selectedType?.type == 'age_estimation_check'" />
                <NewCheck_proofOfAddressCheck v-if="newCheck.selectedType?.type == 'proof_of_address_check'" />
            </div>
        </div>

    </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/stores/clientsStore';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CustomSelect from '@/components/Inputs/customSelect.vue';


// forms
import newCheck_amlCheck from './newCheck_amlCheck.vue';
import NewCheck_bureauCheck from './newCheck_bureauCheck.vue';
import NewCheck_documentCheck from './newCheck_documentCheck.vue';
import NewCheck_indentityCheck from './newCheck_indentityCheck.vue';
import NewCheck_enhancedIndentityCheck from './newCheck_enhancedIndentityCheck.vue';
import NewCheck_proofOfAddressCheck from './newCheck_proofOfAddressCheck.vue';

const clientsStore = useClientsStore()
const { availableChecks, newCheck } = storeToRefs(clientsStore)

const route = useRoute()
const router = useRouter()

const loadingResources = ref<boolean>(true)

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    await clientsStore.getClientResources()
    loadingResources.value = false

    newCheck.value.selectedType = availableChecks.value[0] || null
})
</script>