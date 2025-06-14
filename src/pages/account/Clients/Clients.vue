<template>
    <ClientsDetailsComponent v-if="isShowingDetails" />
    <div v-else>
        <div class="row g-3">
            <div class="col-12">
                <div class="row g-2">
                    <div class="col-md-9">
                        <div class="fs-4">Create Clients</div>
                        <div class="small text-muted">Instantly generate a complete candidate profile ready for review
                            and
                            selection.
                        </div>
                    </div>
                    <div class="col-md-3">
                        <button @click="openAddClientsStore" class="btn btn-theme small float-end">Create new
                            Client</button>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <InlineSearchForm @search="(keyword: string) => searchKeyword = keyword"
                    placeholder-prop="Search Client" :is-searching="itemsLoading" />
            </div>

            <div class="col-12">
                <div class="card  min-vh-100 border-0">
                    <div class="card-body">
                        <EasyDataTable show-index :loading="itemsLoading" alternating :headers="headers" :items="items"
                            buttons-pagination v-model:server-options="serverOptions"
                            :server-items-length="serverItemsLength">

                            <template #header="header">
                                <span>{{ header.text == '#' ? 'S/N' : header.text }}</span>
                            </template>

                            <template #empty-message>
                                <EmptyDataComponent :text="'No Clients'" />
                            </template>

                            <template #item-name="item">
                                <button @click="goToClientsDetails(item.id, item.client_id)"
                                    class="text-theme btn btn-link cursor-pointer hover-tiltY p-0 border-0 text-decoration-non text-capitalize">
                                    {{ item.name }}
                                </button>
                            </template>

                            <template #item-nationality="item">
                                {{ clientsStore.countryName(item.nationality) }}
                            </template>

                            <template #item-created_at="item">
                                <span>{{ helperFunctions.dateDisplay(item.created_at) }}</span>
                            </template>

                            <template #item-action="item">
                                <!-- <button class="btn-sm border-0 bg-transparent text-info-emphasis hover-tiltY">
                                    <i class="bi bi-pencil-fill"></i>
                                </button> -->
                                <button @click="deleteClient(item.id)"
                                    class="btn-sm border-0 bg-transparent text-danger-emphasis hover-tiltY">
                                    <i class="bi bi-trash3"></i>
                                </button>

                            </template>
                        </EasyDataTable>
                    </div>
                </div>
            </div>
        </div>

        <AddClientsModal @done="getClients()" />
    </div>
</template>

<script setup lang="ts">
import InlineSearchForm from '@/components/InlineSearchForm.vue';
import helperFunctions from '@/stores/helperFunctions';
import sampleData from '@/stores/sample_data.json'
import { onMounted, ref, watch, watchEffect } from 'vue';
import type { Header, Item, ServerOptions } from 'vue3-easy-data-table';
import { useClientsStore } from './clientsStore';
import AddClientsModal from './addClientsModal.vue';
import ClientsDetailsComponent from './Details/ClientsDetails.vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api';
import EmptyDataComponent from '@/components/emptyDataComponent.vue';


const isShowingDetails = ref<boolean>(false)
const route = useRoute()
const router = useRouter()

watchEffect(() => {
    isShowingDetails.value = route.query?.refId ? true : false
})


onMounted(async () => {
    await clientsStore.getClientResources()
    getClients()
})

// const items = ref<Item[]>(sampleData.Clients);
const items = ref<Item[]>([]);
const itemsLoading = ref<boolean>(false)
const searchKeyword = ref<string>('');
const serverItemsLength = ref(0);
const serverOptions = ref<ServerOptions | any>({
    page: 1,
    rowsPerPage: 15,
    // sortType: 'desc',
    // sortBy: 'collateral_name'
});

async function getClients() {
    try {
        itemsLoading.value = true

        const obj = {
            page: serverOptions.value.page,
            rowsPerPage: serverOptions.value.rowsPerPage,
            search: searchKeyword.value,
        }

        const params = new URLSearchParams(obj as Record<string, string>);

        const { data } = await api.getClients(params.toString())
        serverItemsLength.value = data.data.total
        items.value = data.data.data
    } catch (error) {

    }
    finally {
        itemsLoading.value = false
    }
}

const debouncedLoadCollateralHistory = helperFunctions.debounce(getClients, 500);
watch(serverOptions, (value) => { getClients(); }, { deep: true });
watch(searchKeyword, debouncedLoadCollateralHistory, { deep: true });


const headers = ref<Header[]>([
    { text: 'Clients Name', value: 'name', sortable: true },
    { text: 'Email Address', value: 'email', sortable: true },
    { text: 'Nationality', value: 'nationality', sortable: true },
    // { text: 'Risk', value: 'risk', sortable: true },
    { text: 'Created Date', value: 'created_at', sortable: true },
    { text: 'Action', value: 'action' },
])



const clientsStore = useClientsStore()

function openAddClientsStore() {
    clientsStore.toggleAddModal = !clientsStore.toggleAddModal
}

function goToClientsDetails(id: string, client_id: string) {
    router.push({
        path: '',
        query: {
            refId: id,
            client: client_id,
            tme: new Date().getTime()
        }
    })

}

function deleteClient(id: any) {
    helperFunctions.confirmDelete('Entire Record will be deleted?', 'Yes, Delete')
        .then((confirm) => {
            if (confirm.value) {

            }
        })
}




</script>

<style scoped></style>