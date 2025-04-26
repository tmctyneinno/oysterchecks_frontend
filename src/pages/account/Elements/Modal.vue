<template>
    <button type="button" ref="openModal" class="d-none" data-bs-toggle="modal" data-bs-target="#modalId">
        Launch
    </button>

    <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">
                        Modal title
                    </h5>
                    <button ref="closeModal" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">Body</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-theme">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
// import { useClientsStore } from './clientsStore';
import { onBeforeRouteLeave } from 'vue-router';

// const clientsStore = useClientsStore()

const openModal = ref<any>(null)
const closeModal = ref<any>(null)

// watch(() => clientsStore.toggleAddModal, () => {
//     openModal.value?.click()
// })

onBeforeRouteLeave(() => {
    closeModal.value?.click()
})
</script>