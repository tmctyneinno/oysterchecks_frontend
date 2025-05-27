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
                            <DropzoneComponent @fileUploaded="updateFile" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-outline-secondary rounded-4" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button v-if="!isSaving" @click="simulateFormSubmission" type="button" class="btn btn-theme">Add
                        Client</button>
                    <button v-else type="button" class="btn btn-theme" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Saving...
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useClientsStore } from './clientsStore';
import { onBeforeRouteLeave } from 'vue-router';
import DropzoneComponent from '@/components/dropzoneComponent.vue';
import helperFunctions from '@/stores/helperFunctions';


const clientsStore = useClientsStore()



const isSaving = ref<boolean>(false);

const simulateFormSubmission = () => {
    isSaving.value = true;
    setTimeout(() => {
        isSaving.value = false;
        closeModal.value?.click();
        helperFunctions.toast('Client added successfully', 'success');
    }, 2000);
};

function updateFile(file: any) { }




const openModal = ref<any>(null)
const closeModal = ref<any>(null)

watch(() => clientsStore.toggleAddModal, () => {
    openModal.value?.click()
})

onBeforeRouteLeave(() => {
    closeModal.value?.click()
})
</script>