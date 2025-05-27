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
                    placeholder-prop="Search Client" />
            </div>

            <div class="col-12">
                <div class="card  min-vh-100 border-0">
                    <div class="card-body">
                        <EasyDataTable show-index alternating :headers="headers" :items="filteredSampleData"
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
                                <span>{{ helperFunctions.dateDisplay(item.created_at) }}</span>
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

        <AddClientsModal />
    </div>
</template>

<script setup lang="ts">
import InlineSearchForm from '@/components/InlineSearchForm.vue';
import helperFunctions from '@/stores/helperFunctions';
import sampleData from '@/stores/sample_data.json'
import { computed, ref, watchEffect } from 'vue';
import type { Header, Item } from 'vue3-easy-data-table';
import { useClientsStore } from './clientsStore';
import AddClientsModal from './addClientsModal.vue';
import ClientsDetailsComponent from './ClientsDetails.vue';
import { useRoute, useRouter } from 'vue-router';


const isShowingDetails = ref<boolean>(false)
const route = useRoute()
const router = useRouter()

watchEffect(() => {
    isShowingDetails.value = route.query?.refId ? true : false
})


const headers = ref<Header[]>([
    { text: 'Clients Name', value: 'name', sortable: true },
    { text: 'Email Address', value: 'email', sortable: true },
    { text: 'Risk', value: 'risk', sortable: true },
    { text: 'Created Date', value: 'created_at', sortable: true },
    { text: 'Action', value: 'action' },
])


const clientsStore = useClientsStore()

function openAddClientsStore() {
    clientsStore.toggleAddModal = !clientsStore.toggleAddModal
}

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


const searchKeyword = ref<string>('')
const filteredSampleData = computed(() => {
    if (!searchKeyword.value) {
        return sampleData.Clients
    }
    return sampleData.Clients.filter(client => {
        return client.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
            client.email.toLowerCase().includes(searchKeyword.value.toLowerCase())
    })
})

</script>

<style scoped></style>