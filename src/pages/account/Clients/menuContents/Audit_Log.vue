<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-body">
            {{ clientDetails }}
        </div>
    </div>



</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../clientsStore';




const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)
</script>