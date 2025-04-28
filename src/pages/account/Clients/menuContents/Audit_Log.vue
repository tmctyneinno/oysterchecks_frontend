<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-header bg-transparent border-0">
            <span class="fw-500">Audit Log</span>


        </div>
        <div class="card-body">
            <EasyDataTable show-index alternating :headers="headers" :items="sampleData.ClientsAuditLog"
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

                <template #item-event="item">
                    <div>Address was updated</div>
                    <div>ID: {{ item.id_no }}</div>
                </template>

                <template #item-action="item">
                    <a @click="showDetails(item)" href="#">Details</a>
                </template>
            </EasyDataTable>
        </div>
    </div>


</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../clientsStore';
import { ref } from 'vue';
import sampleData from '@/stores/sample_data.json'
import type { Header, Item } from 'vue3-easy-data-table';
import ImageCircle from '@/components/ImageCircle.vue';

const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)

const headers = ref<Header[]>([
    { text: 'User', value: 'user', sortable: true },
    { text: 'Action', value: 'event', sortable: true },
    { text: 'Date', value: 'date', sortable: true },
    { text: 'Action', value: 'action' },
])


const isAddingNew = ref<boolean>(false)

function showDetails(item: any) {
}
</script>