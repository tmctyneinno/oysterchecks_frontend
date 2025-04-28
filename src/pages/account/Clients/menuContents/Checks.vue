<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-header bg-transparent border-0">
            <span v-if="!isAddingNew" class="fw-500">Checks</span>
            <span v-else>
                <i @click="isAddingNew = false" class="bi bi-arrow-left cursor-pointer"></i>
                New Check
            </span>
            <button v-if="!isAddingNew" @click="isAddingNew = true"
                class="btn btn-sm btn-outline-dark float-end rounded-4 ">
                <i class="bi bi-plus"></i> New Check
            </button>
        </div>
        <div v-if="!isAddingNew" class="card-body">
            <EasyDataTable show-index alternating :headers="headers" :items="sampleData.ClientsChecks"
                buttons-pagination>
                <template #header="header">
                    <span>{{ header.text == '#' ? 'S/N' : header.text }}</span>
                </template>

                <template #item-type="item">
                    <span class="text-muted text-center text-uppercase">{{ item.type }}</span>
                </template>

                <template #item-action="item">
                    <a @click="showDetails(item)" href="#">Details</a>
                </template>
            </EasyDataTable>
        </div>

        <div v-else class="card-body">
            <div class="row g-3 small">
                <div class="col-md-6">
                    <div class="small text-muted">Check Type</div>
                    <select class="form-select ">
                        <option selected>Select--</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <div class="small text-muted">Required Document</div>
                    <select class="form-select ">
                        <option selected>Select--</option>
                    </select>
                </div>

                <div class="col-md-6">
                    <div class="form-label">Uplaod Document</div>
                    <div class="small text-muted">Front Side (2MB MAX)</div>
                    <input type="file" name="" id="">
                </div>

                <div class="col-md-6">
                    <div class="form-label">Uplaod Document</div>
                    <div class="small text-muted">Back Side (2MB MAX)</div>
                    <input type="file" name="" id="">
                </div>


                <div v-if="isAddingNew" class="col-12 mt-5">
                    <button class="btn btn-theme rounded-4 float-end">
                        Run Check
                    </button>
                    <button @click="isAddingNew = false" class="btn btn-outline-dark me-2 rounded-4 float-end">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>


</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../clientsStore';
import { ref } from 'vue';
import sampleData from '@/stores/sample_data.json'
import type { Header, Item } from 'vue3-easy-data-table';

const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)

const headers = ref<Header[]>([
    { text: 'Status', value: 'status', sortable: true },
    { text: 'Date Completed', value: 'date_completed', sortable: true },
    { text: 'Result Summary', value: 'result_summary', sortable: true },
    { text: 'Request Date', value: 'request_date', sortable: true },
    { text: 'Action', value: 'action' },
])


const isAddingNew = ref<boolean>(false)

function showDetails(item: any) {
}
</script>