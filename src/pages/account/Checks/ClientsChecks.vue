<template>
    <div class="row g-3">
        <div class="col-12 fs-4 cursor-pointer" @click="router.back()">
            <i class="bi bi-arrow-left"></i> Client's checks
        </div>

        <div class="col-12">
            <div class="card rounded-4 border-0">
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-lg-7 d-flex justify-content-start align-items-center gap-3">
                            <ImageCircle :src="'/images/avatar.png'" height="50px" />
                            <div>
                                <div class="fw-600">{{ route.query?.client }} </div>
                                <div class="small text-muted">{{ route.query?.email }}</div>
                            </div>
                        </div>
                        <div class="col-lg-5 d-lg-flex justify-content-end align-items-center gap-3">
                            <button class="btn btn-outline-dark rounded-4">
                                Export Client Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">

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
                                <option v-for="i in checktypes" :value="i.id" :key="i.id">
                                    {{ i.name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <div class="small text-muted">Required Document</div>
                            <select class="form-select ">
                                <option v-for="i in documentTypes" :value="i.id" :key="i.id">
                                    {{ i.name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <div class="form-label">Uplaod Document</div>
                            <div class="small text-muted">Front Side (2MB MAX)</div>
                            <DropzoneComponent />
                        </div>

                        <div class="col-md-6">
                            <div class="form-label">Upload Document</div>
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

        </div>
    </div>




</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../Clients/clientsStore';
import { ref } from 'vue';
import sampleData from '@/stores/sample_data.json'
import type { Header, Item } from 'vue3-easy-data-table';
import { useRoute, useRouter } from 'vue-router';
import DropzoneComponent from '@/components/dropzoneComponent.vue';
import helperFunctions from '@/stores/helperFunctions';

const clientsStore = useClientsStore()
const { clientDetails, checktypes, documentTypes } = storeToRefs(clientsStore)

const route = useRoute()
const router = useRouter()

const headers = ref<Header[]>([
    { text: 'Status', value: 'status', sortable: true },
    { text: 'Date Completed', value: 'date_completed', sortable: true },
    { text: 'Result Summary', value: 'result_summary', sortable: true },
    { text: 'Request Date', value: 'request_date', sortable: true },
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