<template>
    <div class="row g-4">
        <div class="col-12 fs-4 cursor-pointer" @click="router.back()">
            <i class="bi bi-arrow-left"></i> Back to Clients
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
import { useClientsStore } from './clientsStore';
import menuComponent from './menuComponent.vue';
import { onMounted, computed } from 'vue';
import sample_data from '@/stores/sample_data.json'

const clientsStore = useClientsStore()

const router = useRouter()
const route = useRoute()

onMounted(() => {
    clientsStore.clientDetails = sample_data.Clients.find((x: { id: LocationQueryValue | LocationQueryValue[]; }) => x.id == route.query.refId)
})

const contentToShow = computed(() => {
    return clientsStore.clientsDetailsMenu.tabs.find((x: { tab: number }) => x.tab == clientsStore.clientsDetailsMenu.tabShowing);
})
</script>

<style scoped>
.active-tab {
    color: var(--theme-color);
    font-weight: 700;
    margin-left: 5px;
}
</style>