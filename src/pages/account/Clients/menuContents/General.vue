<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-header bg-transparent border-0">
            <button class="btn btn-sm btn-outline-dark float-end rounded-4 ">
                <i class="bi bi-pencil-fill"></i> Edit
            </button>
        </div>
        <div class="card-body">
            <div class="d-flex flex-wrap gap-2">
                <div>
                    <div class="small text-muted">First Name</div>
                    {{ clientDetails }}
                </div>
            </div>
        </div>
    </div>


</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../clientsStore';




const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)
</script>