<template>
    <div class="row g-4">
        <div class="col-12 fs-4 cursor-pointer" @click="router.back()">
            <i class="bi bi-arrow-left"></i> Back to Clients
        </div>

        <div class="col-12">
            <div class="card rounded-4 border-0">
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-7 d-flex justify-content-start align-items-center gap-3">
                            <ImageCircle :url="'/images/avatar.png'" height="50px" />
                            <div>
                                <div class="fw-600">{{ route.query?.client }} </div>
                                <div class="small text-muted">{{ route.query?.email }}</div>
                            </div>
                        </div>
                        <div class="col-md-5 d-lg-flex justify-content-end align-items-center gap-3">
                            <button class="my-2 my-md-0 btn btn-outline-danger  rounded-4  ">
                                Delete Client
                            </button>
                            <button class="btn btn-outline-dark rounded-4">
                                Export Client Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card h-100 border-0 rounded-4">
                <div class="card-body">
                    <ClientsDetailsMenu />
                </div>
            </div>
        </div>

        <div class="col-md-8">
            <div class="card h-100 border-0 rounded-4">
                <div class="card-body">

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useClientsStore } from './clientsStore';
import ClientsDetailsMenu from './ClientsDetailsMenu.vue';


const clientsStore = useClientsStore()



const router = useRouter()
const route = useRoute()
</script>

<style scoped>
.active-tab {
    color: var(--theme-color);
    font-weight: 700;
    margin-left: 5px;
}
</style>