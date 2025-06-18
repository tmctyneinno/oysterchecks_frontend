<template>
    <ClientsSkeleton v-if="isLoadingDetails" />

    <div v-else class="row g-3">
        <div class="col-12 fs-4 cursor-pointer" @click="router.back()">
            <i class="bi bi-arrow-left"></i> Client's checks
        </div>

        <ClientHeadComponent />

        <div v-if="!newCheck.adding" class="col-12">
            <div class="card min-vh-50 border-0 rounded-4">
                <div class="card-header bg-transparent border-0">
                    <span class="fw-500"> Checks </span>

                    <button @click="newCheck.adding = true" class="btn btn-sm btn-dark float-end rounded-4 ">
                        <i class="bi bi-plus-lg"></i> New Check
                    </button>

                </div>
                <div class="card-body">
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
            </div>
        </div>

        <NewChecksIndex v-else />
    </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/stores/clientsStore';
import { onMounted, ref, watch } from 'vue';
import type { Header, Item, ServerOptions } from 'vue3-easy-data-table';
import { useRoute, useRouter } from 'vue-router';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import EmptyDataComponent from '@/components/emptyDataComponent.vue';
import ClientsSkeleton from '@/components/skeletonLoaders/clientsSkeleton.vue';
import ClientHeadComponent from '../Clients/clientHeadComponent.vue';
import NewChecksIndex from './NewChecks/newChecksIndex.vue';

const clientsStore = useClientsStore()
const { clientExistingChecks, newCheck } = storeToRefs(clientsStore)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    const client_id = route.query?.refId as string
    await clientsStore.getClientDetails(client_id)
    await getChecks()
    isLoadingDetails.value = false
})

const isLoadingDetails = ref<boolean>(true)

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


watch(() => newCheck.value.adding, (newValue) => {
    if (!newValue) getChecks()
})


const isSaving = ref<boolean>(false);

function showDetails(item: any) {
}


</script>