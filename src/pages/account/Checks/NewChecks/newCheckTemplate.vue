<template>
    <div class="col-12">
        <div class="card border-0 pt-0">
            <div class="card-body">
                <slot name="form"> </slot>
            </div>
            <div class="card-footer bg-transparent border-0">
                <div class="row justify-content-end g-1">
                    <div class="col-md-4 col-lg-2">
                        <button @click="clientsStore.newCheck.adding = false"
                            class="btn btn-outline-dark me-2 rounded-4 float-end w-100">
                            Cancel
                        </button>
                    </div>
                    <div v-if="clientsStore.newCheck.selectedType" class="col-md-4 col-lg-2">
                        <slot name="button"> </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { useClientsStore } from '@/stores/clientsStore';
const clientsStore = useClientsStore()
</script>