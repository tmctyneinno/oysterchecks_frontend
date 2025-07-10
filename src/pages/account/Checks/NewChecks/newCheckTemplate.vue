<template>
    <div class="col-12">
        <div class="card border-0 pt-0 pb-4">
            <div class="card-header border-0 bg-transparent  py-3">
                <h3 class="text-danger-emphasis lh-1  text-uppercase">
                    {{ clientsStore?.newCheck?.selectedType?.name }}
                </h3>
                <div class="xsmall text-muted fst-italic lh-1">
                    {{ clientsStore?.newCheck?.selectedType?.description }}
                </div>
            </div>
            <div class="card-body">
                <slot name="form"> </slot>
            </div>
            <div class="card-footer bg-transparent border-0">
                <div class="row justify-content-end g-1">
                    <div class="col-md-4 col-lg-2">
                        <button @click="clientsStore.newCheck.adding = false" :disabled="newCheckStore.isSubmittingForm"
                            class="btn btn-outline-dark me-md-2 rounded-4 float-end w-100">
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
import { useNewChecksStore } from './useNewChecksStore';

const clientsStore = useClientsStore()
const newCheckStore = useNewChecksStore()


</script>