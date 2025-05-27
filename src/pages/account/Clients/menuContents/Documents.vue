<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-header bg-transparent border-0">
            <span v-if="!isAddingNew" class="fw-500">Documents</span>
            <span v-else>
                <i @click="isAddingNew = false" class="bi bi-arrow-left cursor-pointer"></i>
                Add New Document
            </span>
            <button v-if="!isAddingNew" @click="isAddingNew = true"
                class="btn btn-sm btn-outline-dark float-end rounded-4 ">
                <i class="bi bi-plus"></i> Add New Document
            </button>
        </div>
        <div v-if="!isAddingNew" class="card-body">
            <EasyDataTable show-index alternating :headers="headers" :items="sampleData.ClientDocuments"
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
                    <div class="small text-muted">Document Type</div>
                    <select class="form-select ">
                        <option v-for="i in documentTypes" :value="i.id" :key="i.id">
                            {{ i.name }}
                        </option>
                    </select>
                </div>
                <div class="col-md-6">
                    <div class="small text-muted">Issuing Country</div>
                    <select class="form-select ">
                        <option selected>Select--</option>
                    </select>
                </div>

                <div class="col-md-6">
                    <div class="small text-muted">ID Number</div>
                    <input type="text" class="form-control">
                </div>

                <div class="col-md-6">
                    <div class="small text-muted">Purpose</div>
                    <input type="text" class="form-control">
                </div>


                <div class="col-md-6">
                    <div class="small text-muted">Front Side (2MB MAX)</div>
                    <DropzoneComponent />
                </div>

                <div class="col-md-6">
                    <div class="small text-muted">Back Side (2MB MAX)</div>
                    <DropzoneComponent />
                </div>


                <div v-if="isAddingNew" class="col-12 mt-5">
                    <button v-if="!isSaving" @click="simulateFormSubmission" type="button"
                        class="btn btn-theme rounded-4 float-end">Run Check</button>
                    <button v-else type="button" class="btn btn-theme float-end" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Checking...
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
import DropzoneComponent from '@/components/dropzoneComponent.vue';
import helperFunctions from '@/stores/helperFunctions';

const clientsStore = useClientsStore()
const { clientDetails, documentTypes } = storeToRefs(clientsStore)

const headers = ref<Header[]>([
    { text: 'Document Type', value: 'document_type', sortable: true },
    { text: 'Issuing Country', value: 'issuing_country', sortable: true },
    { text: 'ID Number', value: 'id_no', sortable: true },
    { text: 'Purpose', value: 'purpose', sortable: true },
    { text: 'Action', value: 'action' },
])


const isAddingNew = ref<boolean>(false)




const isSaving = ref<boolean>(false);
const simulateFormSubmission = () => {
    isSaving.value = true;
    setTimeout(() => {
        isSaving.value = false;
        // helperFunctions.toast('Client added successfully', 'success');
        helperFunctions.toast('Documents added successfully', 'success');
    }, 2000);
};





function showDetails(item: any) {
}
</script>