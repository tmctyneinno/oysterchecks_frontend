<template>
    <button type="button" ref="openModal" class="d-none" data-bs-toggle="modal" data-bs-target="#modalId">
        Launch
    </button>

    <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollabl modal-dialog-centered" role="document">
            <div class="modal-content px-2 px-lg-3">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">
                        New Client
                    </h5>
                    <button ref="closeModal" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">

                        <div class="col-12">
                            <div class="form-label">
                                First Name
                                <redAsteric />
                            </div>
                            <input placeholder="Enter First Name" type="text" class="form-control">
                        </div>

                        <div class="col-12">
                            <div class="form-label">
                                Middle Name
                                <redAsteric />
                            </div>
                            <input placeholder="Enter Middle Name" type="text" class="form-control">
                        </div>

                        <div class="col-12">
                            <div class="form-label">
                                Last Name
                                <redAsteric />
                            </div>
                            <input placeholder="Enter Last Name" type="text" class="form-control">
                        </div>

                        <div class="col-12">
                            <div class="form-label">
                                Email Address
                                <redAsteric />
                            </div>
                            <input placeholder="Enter Email Address" type="email" class="form-control">
                        </div>

                        <div class="col-12">
                            <div class="form-label">
                                Upload Image
                            </div>
                            <div class="mb-3">

                                <input type="file" class="form-control" />
                                <span class="small">Max 15MB</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-outline-secondary rounded-4" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="button" class="btn btn-theme">Add Client</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useClientsStore } from './clientsStore';
import { onBeforeRouteLeave } from 'vue-router';

const clientsStore = useClientsStore()

const openModal = ref<any>(null)
const closeModal = ref<any>(null)

watch(() => clientsStore.toggleAddModal, () => {
    openModal.value?.click()
})

onBeforeRouteLeave(() => {
    closeModal.value?.click()
})
</script>