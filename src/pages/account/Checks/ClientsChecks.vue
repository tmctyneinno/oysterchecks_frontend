<template>
    <ClientsSkeleton v-if="isLoadingDetails" />

    <div v-else class="row g-3">
        <div class="col-12 fs-4 cursor-pointer" @click="router.back()">
            <i class="bi bi-arrow-left"></i> Client's checks
        </div>

        <ClientHeadComponent :client="clientDetails" />

        <div class="col-12">

            <div class="card h-100 border-0 rounded-4">
                <div class="card-header bg-transparent border-0">
                    <span class="fw-500">
                        {{ isAddingNew ? 'New Check' : 'Checks' }}
                    </span>

                    <button v-if="!isAddingNew" @click="isAddingNew = true"
                        class="btn btn-sm btn-dark float-end rounded-4 ">
                        <i class="bi bi-plus-lg"></i> New Check
                    </button>

                    <button v-else @click="isAddingNew = false"
                        class="btn btn-sm btn-light text-danger float-end rounded-4 ">
                        <i class="bi bi-x-lg"></i> Cancel
                    </button>

                </div>
                <div v-if="!isAddingNew" class="card-body">
                    <EasyDataTable show-index alternating :headers="headers" :items="items" buttons-pagination
                        :loading="itemsLoading" v-model:server-options="serverOptions"
                        :server-items-length="serverItemsLength">
                        <template #header="header">
                            <span>{{ header.text == '#' ? 'S/N' : header.text }}</span>
                        </template>

                        <template #empty-message>
                            <EmptyDataComponent :text="'No Checks'" />
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
                            <CustomSelect :options="checktypes" placeholder="select type" label="name" />
                        </div>
                        <div class="col-md-6">
                            <div class="small text-muted">Required Document</div>
                            <CustomSelect :options="documentTypes" placeholder="select type" label="name" />
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
import { onMounted, ref, watch } from 'vue';
// import sampleData from '@/stores/sample_data.json'
import type { Header, Item, ServerOptions } from 'vue3-easy-data-table';
import { useRoute, useRouter } from 'vue-router';
import DropzoneComponent from '@/components/Inputs/dropzoneComponent.vue';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import EmptyDataComponent from '@/components/emptyDataComponent.vue';
import ClientsSkeleton from '@/components/skeletonLoaders/clientsSkeleton.vue';
import ClientHeadComponent from '../Clients/ClientHeadComponent.vue';
import CustomSelect from '@/components/Inputs/customSelect.vue';

const clientsStore = useClientsStore()
const { clientDetails, checktypes, documentTypes } = storeToRefs(clientsStore)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    await getClientDetails()
    await getResources()
    isLoadingDetails.value = false
    // getClientsChecks()
})

const isLoadingDetails = ref<boolean>(true)
async function getClientDetails() {
    try {
        const client_id = route.query?.refId as string
        const { data } = await api.getClient(client_id)
        clientDetails.value = data
    } catch (error) { }

}

async function getResources() {
    try {
        const { data } = await api.clientsResources()
        checktypes.value = data.check_types
        documentTypes.value = data.document_types
    } catch (error) { }

}


// const items = ref<Item[]>(sampleData.ClientsChecks);
const items = ref<Item[]>([]);
const itemsLoading = ref<boolean>(false)
const searchKeyword = ref<string>('');
const serverItemsLength = ref(0);
const serverOptions = ref<ServerOptions | any>({
    page: 1,
    rowsPerPage: 15,
    // sortType: 'desc',
    // sortBy: ''
});

async function getClientsChecks() {
    try {
        itemsLoading.value = true

        const obj = {
            page: serverOptions.value.page,
            rowsPerPage: serverOptions.value.rowsPerPage,
            search: searchKeyword.value,
            id: route.query.refId
        }

        const params = new URLSearchParams(obj as Record<string, string>);

        const { data } = await api.getClientChecks(params.toString())
        serverItemsLength.value = data.data.total
        items.value = data.data.data
    } catch (error) { }
    finally {
        itemsLoading.value = false
    }
}

const debouncedLoadCollateralHistory = helperFunctions.debounce(getClientsChecks, 500);
watch(serverOptions, (value) => { getClientsChecks(); }, { deep: true });
watch(searchKeyword, debouncedLoadCollateralHistory, { deep: true });

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