<template>
    <ClientsSkeleton v-if="isLoadingDetails" />
    <div v-else class="row g-4">
        <div class="col-12 fs-4 cursor-pointer" @click="router.back()">
            <i class="bi bi-arrow-left"></i> Back to Clients
        </div>

        <ClientHeadComponent :client="clientsStore.clientDetails" />

        <div class="col-md-3">
            <div class="card h-100 border-0 rounded-4">
                <div class="card-body">
                    <menuComponent />
                </div>
            </div>
        </div>

        <div class="col-md-9">
            <component :is="contentToShow?.component" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute, type LocationQueryValue } from 'vue-router';
import { useClientsStore } from '../clientsStore';
import menuComponent from './menu_list.vue';
import { onMounted, computed, ref } from 'vue';
import sample_data from '@/stores/sample_data.json'
import api from '@/api';
import ClientsSkeleton from '@/components/skeletonLoaders/clientsSkeleton.vue';
import ClientHeadComponent from '../clientHeadComponent.vue';

const clientsStore = useClientsStore()

const router = useRouter()
const route = useRoute()

const contentToShow = computed(() => {
    return clientsStore.clientsDetailsMenu.tabs.find((x: { tab: number }) => x.tab == clientsStore.clientsDetailsMenu.tabShowing);
})

onMounted(() => {
    getClientDetails()
})

const isLoadingDetails = ref<boolean>(false)
async function getClientDetails() {
    try {
        isLoadingDetails.value = true
        const client_id = route.query?.refId as string
        const { data } = await api.getClient(client_id)
        clientsStore.clientDetails = data
    } catch (error) { }
    finally { isLoadingDetails.value = false }
}
</script>

<style scoped>
.active-tab {
    color: var(--theme-color);
    font-weight: 700;
    margin-left: 5px;
}
</style>