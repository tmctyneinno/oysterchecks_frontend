<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-header bg-transparent border-0">
            <span class="fw-500">Audit Log</span>

        </div>
        <div class="card-body">
            <EasyDataTable :loading="isLoadingData" show-index alternating :headers="headers" :items="items"
                buttons-pagination>
                <template #header="header">
                    <span>{{ header.text == '#' ? 'S/N' : header.text }}</span>
                </template>

                <template #item-user="item">
                    <div class="d-flex gap-2">
                        <ImageCircle :src="'/images/avatar.png'" height="20px" />
                        <div class="fw-bold">{{ item.user }}</div>
                    </div>
                </template>

                <template #item-created_at="item">
                    {{ helperFunctions.dateTimeDisplay(item.created_at) }}

                </template>

                <!-- <template #item-action="item">
                    <a @click="showDetails(item)" href="#">Details</a>
                </template> -->

            </EasyDataTable>
        </div>
    </div>


</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/stores/clientsStore';
import { onMounted, ref } from 'vue';
import sampleData from '@/stores/sample_data.json'
import type { Header, Item } from 'vue3-easy-data-table';
import ImageCircle from '@/components/ImageCircle.vue';
import api from '@/api';
import helperFunctions from '@/stores/helperFunctions';
import ComponentLoading from '@/components/componentLoading.vue';

const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)

const headers = ref<Header[]>([
    { text: 'Action', value: 'tags', sortable: true },
    { text: 'Date', value: 'created_at', sortable: true },
    // { text: 'Action', value: 'action' },
])

onMounted(() => {
    getAudits()
})

const isLoadingData = ref<boolean>(false)
const items = ref<any[]>([])
async function getAudits() {
    try {
        isLoadingData.value = true
        const { data } = await api.getClientAudits(clientDetails.value.id)
        items.value = data

    } catch (error) { }
    finally { isLoadingData.value = false }
}




function showDetails(item: any) {
}
</script>