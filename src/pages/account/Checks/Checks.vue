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
                    <!-- <div class="col-md-3">
                        <button @click="openAddClientsStore" class="btn btn-theme small float-end">Create new
                            Client</button>
                    </div> -->
                </div>
            </div>
            <div class="col-12">
                <InlineSearchForm placeholder-prop="Search by clients name" />
            </div>

            <div class="col-12">
                <div class="card  min-vh-100 border-0">
                    <div class="card-body">
                        <EasyDataTable show-index alternating :headers="headers" :items="sampleData.allchecks"
                            buttons-pagination>
                            <template #header="header">
                                <span>{{ header.text == '#' ? 'S/N' : header.text }}</span>
                            </template>

                            <template #item-name="item">

                                <button @click="viewClient(item.id, item.name)"
                                    class="text-theme btn btn-link cursor-pointer hover-tiltY p-0 border-0 text-decoration-non">{{
                                        item.name
                                    }}</button>
                            </template>

                            <template #item-risk="item">
                                <span class="rounded-2 small d-flex justify-content-center"
                                    :style="`background-color: ${clientsStore.riskShader(item.risk).bg}; color: ${clientsStore.riskShader(item.risk).color}`">
                                    {{ clientsStore.riskShader(item.risk).text }}
                                </span>
                            </template>

                            <template #item-created_at="item">
                                <span>{{ useFunctions.dateDisplay(item.created_at) }}</span>
                            </template>

                            <template #item-action="item">
                                <button class="btn-sm border-0 bg-transparent text-info-emphasis hover-tiltY">
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button class="btn-sm border-0 bg-transparent text-danger-emphasis hover-tiltY">
                                    <i class="bi bi-trash3"></i>
                                </button>

                            </template>
                        </EasyDataTable>
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import InlineSearchForm from '@/components/InlineSearchForm.vue';
import useFunctions from '@/stores/useFunctions';
import sampleData from '@/stores/sample_data.json'
import { ref, watchEffect } from 'vue';
import type { Header, Item } from 'vue3-easy-data-table';
import { useClientsStore } from '../Clients/clientsStore';
import ClientsDetailsComponent from '../Clients/ClientsDetails.vue';
import ClientsChecks from './ClientsChecks.vue';
import { useRoute, useRouter } from 'vue-router';


const isShowingDetails = ref<boolean>(false)
const route = useRoute()
const router = useRouter()

watchEffect(() => {
    isShowingDetails.value = route.query?.refId ? true : false
})


const headers = ref<Header[]>([
    { text: 'Clients Name', value: 'name', sortable: true },
    { text: 'Type', value: 'type', sortable: true },
    { text: 'Status', value: 'status', sortable: true },
    { text: 'Outcome', value: 'outcome', sortable: true },
    { text: 'Started', value: 'started' },
    { text: 'Completed', value: 'completed' },
])


const clientsStore = useClientsStore()

function viewClient(id: string, name: string) {
    router.push({
        path: '',
        query: {
            refId: id,
            client: name,
            tme: new Date().getTime()
        }
    })

}

</script>

<style scoped></style>