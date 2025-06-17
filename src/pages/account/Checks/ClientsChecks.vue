<template>
    <ClientsSkeleton v-if="isLoadingDetails" />

    <div v-else class="row g-3">
        <div class="col-12 fs-4 cursor-pointer" @click="router.back()">
            <i class="bi bi-arrow-left"></i> Client's checks
        </div>

        <ClientHeadComponent :client="clientDetails" />

        <div class="col-12">

            <div class="card min-vh-50 border-0 rounded-4">
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


                        <template #item-status="item">
                            <span class="p-1 px-2 rounded-3" :style="{
                                backgroundColor: clientsStore.statusShader(item.status).bg,
                                color: clientsStore.statusShader(item.status).color
                            }">
                                {{ item.status }}
                            </span>
                        </template>


                        <template #item-created_at="item">
                            <span> {{ helperFunctions.dateTimeDisplay(item.created_at) }} </span>
                        </template>



                        <template #item-action="item">
                            <a @click="showDetails(item)" href="#">Details</a>
                        </template>
                    </EasyDataTable>
                </div>

                <div v-else class="card-body">

                    <div class="row g-3 small">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-md-6 col-lg-4">
                                    <div class="small text-muted">Check Type</div>
                                    <CustomSelect v-model="slectedCheckType" :options="availableChecks"
                                        placeholder="select type" label="name" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 d-none">
                            <div class="small text-muted">Required Document</div>
                            <CustomSelect :options="resources.documentTypes" placeholder="select type" label="name" />
                        </div>

                        <div class="col-md-6 d-none">
                            <div class="form-label">Uplaod Document</div>
                            <div class="small text-muted">Front Side (2MB MAX)</div>
                            <DropzoneComponent />
                        </div>

                        <div class="col-md-6 d-none">
                            <div class="form-label">Upload Document</div>
                            <div class="small text-muted">Back Side (2MB MAX)</div>
                            <DropzoneComponent />
                        </div>



                    </div>
                </div>
                <div v-if="isAddingNew" class="card-footer bg-transparent border-0">
                    <div class="row justify-content-end g-1">
                        <div class="col-md-2">
                            <button @click="isAddingNew = false"
                                class="btn btn-outline-dark me-2 rounded-4 float-end w-100">
                                Cancel
                            </button>
                        </div>
                        <div v-if="slectedCheckType" class="col-md-3 col-lg-2">
                            <loadingButton @click="runCheck" className="btn-theme w-100" :loading="isSaving">
                                RUN CHECk
                            </loadingButton>
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
import ClientHeadComponent from '../Clients/clientHeadComponent.vue';
import CustomSelect from '@/components/Inputs/customSelect.vue';
import LoadingButton from '@/components/loadingButton.vue';

const clientsStore = useClientsStore()
const { clientDetails, resources, clientExistingChecks, availableChecks } = storeToRefs(clientsStore)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    await getClientDetails()
    await clientsStore.getClientResources()
    await getChecks()
    isLoadingDetails.value = false
})

const isLoadingDetails = ref<boolean>(true)
async function getClientDetails() {
    try {
        const client_id = route.query?.refId as string
        const { data } = await api.getClient(client_id)
        clientDetails.value = data
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

async function getChecks() {
    try {
        itemsLoading.value = true

        const obj = {
            page: serverOptions.value.page,
            rowsPerPage: serverOptions.value.rowsPerPage,
            search: searchKeyword.value,
            client_id: route.query.client
        }

        const params = new URLSearchParams(obj as Record<string, string>);

        const { data } = await api.getChecks(params.toString())
        serverItemsLength.value = data.total
        items.value = data.data;
        clientExistingChecks.value = data.existing_checks
    } catch (error) { }
    finally {
        itemsLoading.value = false
    }
}

const debouncedLoadCollateralHistory = helperFunctions.debounce(getChecks, 500);
watch(serverOptions, (value) => { getChecks(); }, { deep: true });
watch(searchKeyword, debouncedLoadCollateralHistory, { deep: true });

const headers = ref<Header[]>([
    { text: 'Check Type', value: 'type', sortable: false },
    { text: 'Status', value: 'status', sortable: false },
    { text: 'Request Date', value: 'created_at', sortable: false },
    { text: 'Action', value: 'action' },
])


const isAddingNew = ref<boolean>(false)

const isSaving = ref<boolean>(false);

function showDetails(item: any) {
}

const slectedCheckType = ref<any>(null)
function runCheck() {
    helperFunctions.confirm('Run this check?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {
            if (["extensive_screening_check", "standard_screening_check"].includes(slectedCheckType.value?.type)) {
                try {
                    isSaving.value = true
                    const { data } = await api.verify({ id: clientDetails.value?.id, check_type: slectedCheckType.value?.type })
                    if (data.status == 201) {
                        helperFunctions.toast(data.message, 'success')
                        isAddingNew.value = false
                        slectedCheckType.value = null
                        getChecks()
                    }

                } catch (error) {
                    helperFunctions.toast('Could not verify, Pls try again', 'error')
                }
                finally { isSaving.value = false }
            }
        }
    })
}
</script>