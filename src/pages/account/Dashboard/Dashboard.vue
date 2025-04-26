<template>
    <div>
        <div class="d-md-flex gap-2">
            <div v-for="(card, index) in dashboardStore.summaryCards" :key="index" class="col mb-2">
                <div class="card border-0 h-100">
                    <div class="card-body pb-0">
                        <div v-html="card.icon"></div>
                        <div class="small mt-2">{{ card.info }}</div>
                    </div>
                    <div class="card-footer fw-500 fs-4 bg-transparent border-0 pt-0">
                        {{ useFunctions.addCommas(card.number) }}
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-2">
            <div class="row g-2">
                <div class="col-md-8">
                    <div class="card border-0 min-vh-100">
                        <div class="card-header border-0 bg-transparent fw-bold py-4">
                            Clients Added This Year
                            <div class="float-end">
                                <select class="form-select form-select-sm bg-white">
                                    <option selected>Last 7 Days</option>
                                    <option value="1">Last 30 Days</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-body">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card border-0 min-vh-100">
                        <div class="card-body">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import useFunctions from '@/stores/useFunctions';
import { useDashboardStore } from './dashboardStore';
import { ref } from 'vue';


const dashboardStore = useDashboardStore()

</script>

<style scoped>
.card {
    background-color: #E5E6FF;
}
</style>