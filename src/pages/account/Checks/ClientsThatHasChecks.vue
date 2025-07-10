<template>
    <ClientsChecks v-if="isShowingDetails" />

    <div v-else>
        <div class="row g-3">
            <div class="col-12">
                <div class="row g-2">
                    <div class="col-md-9">
                        <div class="fs-4">Checks</div>
                        <div class="small text-muted">View, manage and track all checks performed on clients
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <InlineSearchForm @search="(keyword: string) => searchKeyword = keyword"
                    placeholder-prop="Search by clients name" :is-searching="itemsLoading" />
            </div>

            <div class="col-12">
                <div class="card  min-vh-100 border-0">
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

                            <template #item-nationality="item">
                                {{ clientsStore.countryName(item.nationality) }}
                            </template>

                            <template #item-name="item">
                                <button @click="viewClient(item.id, item.client_id)"
                                    class="text-theme btn btn-link cursor-pointer hover-tiltY p-0 border-0 text-nowrap">{{
                                        item.name
                                    }}</button>
                            </template>


                            <template #item-created_at="item">
                                <span>{{ helperFunctions.dateDisplay(item.created_at) }}</span>
                            </template>

                            <template #item-no_of_checks="item">
                                <span>
                                    <span class="badge rounded-pill text-bg-secondary">
                                        {{ item.no_of_checks }}
                                    </span>

                                </span>
                            </template>

                            <!-- <template #item-action="item">
                                <button class="btn-sm border-0 bg-transparent text-info-emphasis hover-tiltY">
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button class="btn-sm border-0 bg-transparent text-danger-emphasis hover-tiltY">
                                    <i class="bi bi-trash3"></i>
                                </button>

                            </template> -->
                        </EasyDataTable>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import InlineSearchForm from '@/components/InlineSearchForm.vue';
import helperFunctions from '@/stores/helperFunctions';
import { onMounted, ref, watch, watchEffect } from 'vue';
import type { Header, Item, ServerOptions } from 'vue3-easy-data-table';
import { useClientsStore } from '@/stores/clientsStore';
import ClientsChecks from './ClientsChecks.vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api';
import EmptyDataComponent from '@/components/emptyDataComponent.vue';


const isShowingDetails = ref<boolean>(false)
const route = useRoute()
const router = useRouter()
const clientsStore = useClientsStore()

watchEffect(() => {
    isShowingDetails.value = route.query?.refId ? true : false
})



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

onMounted(() => {
    getClientsWithChecks()
})

async function getClientsWithChecks() {
    try {
        itemsLoading.value = true

        const obj = {
            page: serverOptions.value.page,
            rowsPerPage: serverOptions.value.rowsPerPage,
            search: searchKeyword.value,
            checks: 'true',
        }

        const params = new URLSearchParams(obj as Record<string, string>);

        const { data } = await api.getClients(params.toString())
        serverItemsLength.value = data.data.total
        items.value = data.data.data
    } catch (error) { }
    finally {
        itemsLoading.value = false
    }
}

const debouncedLoadCollateralHistory = helperFunctions.debounce(getClientsWithChecks, 500);
watch(serverOptions, (value) => { getClientsWithChecks(); }, { deep: true });
watch(searchKeyword, debouncedLoadCollateralHistory, { deep: true });
watch(() => route.query?.refId, () => { getClientsWithChecks() })



const headers = ref<Header[]>([
    { text: 'Clients Name', value: 'name', sortable: true },
    { text: 'Email Address', value: 'email', sortable: true },
    { text: 'Nationality', value: 'nationality', sortable: true },
    { text: 'Telephone', value: 'telephone', sortable: true },
    { text: 'Checks', value: 'no_of_checks', sortable: true },
    // { text: 'Risk', value: 'risk', sortable: true },
    // { text: 'Created Date', value: 'created_at', sortable: true },
    // { text: 'Action', value: 'action' },
])



function viewClient(id: string, client_id: string) {
    clientsStore.newCheck.adding = false
    router.push({
        path: '',
        query: {
            refId: id,
            client: client_id,
            tme: new Date().getTime()
        }
    })

}

</script>

<style scoped></style>