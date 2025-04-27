<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-header bg-transparent border-0">
            <span v-if="!isAddingNew" class="fw-500">Addresses</span>
            <span v-else>
                <i @click="isAddingNew = false" class="bi bi-arrow-left cursor-pointer"></i>
                Add New Address
            </span>
            <button v-if="!isAddingNew" @click="isAddingNew = true"
                class="btn btn-sm btn-outline-dark float-end rounded-4 ">
                <i class="bi bi-plus"></i> Add New Address
            </button>
        </div>
        <div v-if="!isAddingNew" class="card-body">
            <EasyDataTable show-index alternating :headers="headers" :items="sampleData.ClientAddresses"
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
                <div class="col-md-4">
                    <div class="small text-muted">Birth Country</div>
                    <select class="form-select ">
                        <option selected>Select--</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <div class="small text-muted">Property Phpne Number</div>
                    <input type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Building Name</div>
                    <input type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Line</div>
                    <input type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">City</div>
                    <input type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">State</div>
                    <select class="form-select ">
                        <option selected>Select--</option>
                    </select>
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">From</div>
                    <input type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">After</div>
                    <input type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Type</div>
                    <select class="form-select ">
                        <option selected>Select--</option>
                    </select>
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Postal Code</div>
                    <input type="text" class="form-control">
                </div>

                <div v-if="isAddingNew" class="col-12">
                    <button class="btn btn-theme rounded-4 float-end">
                        Add New Address
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
    { text: 'Birth Country', value: 'country', sortable: true },
    { text: 'State', value: 'state', sortable: true },
    { text: 'City', value: 'city', sortable: true },
    { text: 'Type', value: 'type', sortable: true },
    { text: 'Action', value: 'action' },
])


const isAddingNew = ref<boolean>(false)



function showDetails(item: any) {
}
</script>