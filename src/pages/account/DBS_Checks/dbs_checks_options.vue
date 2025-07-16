<template>

    <div class="fw-70 fs-5 my-3">
        <i @click="router.back()" class="bi bi-arrow-left cursor-pointer"></i> Select DBS Check Type
    </div>
    <div class="border-0 card min-vh-50">
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li v-for="({ value, title, desc }, index) in DBSCheckTypes" :key="index" class="list-group-item">
                    <div @click="selectedDBSType = value" class="d-flex cursor-pointer hover-tiltX">
                        <div class="col-  me-3">
                            <i v-if="selectedDBSType == value" class="bi bi-check-circle-fill text-theme fs-5"></i>
                            <i v-else class="bi bi-circle fs-5"></i>
                        </div>
                        <div class="col">
                            <div class="fw-600">{{ title }}</div>
                            <div class="text-muted">{{ desc }}</div>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="col-12">
                <button class="btn btn-theme float-end hover-tiltX">
                    Next <i class="bi bi-arrow-right"></i>
                </button>
            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDBSCheckStore } from './useDBSCheckStore';
import { useRouter } from 'vue-router';

const DBSCheckStore = useDBSCheckStore()
const { DBSCheckTypes, selectedDBSType } = storeToRefs(DBSCheckStore)

const router = useRouter()


</script>

<style scoped>
table th {
    background-color: var(--bs-secondary-bg-subtle);
}


.accordion-button:not(.collapsed) {
    background: transparent;
}
</style>