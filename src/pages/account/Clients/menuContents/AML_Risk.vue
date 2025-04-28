<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-header bg-transparent border-0">
            <span class="fw-600">AML Risk Overview</span>
            <span class="float-end small">AML Risk Overview
                <span class="xsmall px-2 bg-success-subtle rounded-1">Low</span>
            </span>
        </div>

        <div class="card-body">
            <!-- Some borders are removed -->
            <ul class="list-group list-group-flush">
                <li class="list-group-item border-0">
                    <i class="bi bi-plus-lg"></i> Country Risk
                    <span class="xsmall px-2 bg-success-subtle rounded-2 float-end">Low</span>
                </li>
                <li class="list-group-item border-0">
                    <i class="bi bi-plus-lg"></i> Occupation Risk
                    <span class="xsmall px-2 bg-danger-subtle rounded-2 float-end">High</span>
                </li>
                <li class="list-group-item border-0">
                    <i class="bi bi-plus-lg"></i> Political Exposure Risk
                    <span class="xsmall px-2 bg-warning-subtle rounded-2 float-end">Medium</span>
                </li>
                <li class="list-group-item border-0">
                    <i class="bi bi-plus-lg"></i> Watchlist Exposure Risk
                    <span class="xsmall px-2 bg-success-subtle rounded-2 float-end">Low</span>
                </li>
            </ul>

        </div>
    </div>


</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../clientsStore';
import { ref } from 'vue';
import sampleData from '@/stores/sample_data.json'
import type { Header, Item } from 'vue3-easy-data-table';

const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)


const isAddingNew = ref<boolean>(false)

function showDetails(item: any) {
}
</script>