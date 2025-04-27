<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-header bg-transparent border-0">
            <span v-if="!isEditing" class="fw-500">General</span>
            <span v-else>
                <i @click="isEditing = false" class="bi bi-arrow-left cursor-pointer"></i>
                Edit Clients Details
            </span>
            <button v-if="!isEditing" @click="isEditing = true"
                class="btn btn-sm btn-outline-dark float-end rounded-4 ">
                <i class="bi bi-pencil-fill"></i> Edit
            </button>
        </div>
        <div class="card-body">
            <!-- <div class="d-flex flex-wrap gap-2"> -->
            <div class="row g-3 small">
                <div class="col-md-4">
                    <div class="small text-muted">First Name</div>
                    <span v-if="!isEditing"> {{ clientDetails?.name }}</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Middle Name</div>
                    <span v-if="!isEditing">Nill</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Last Name</div>
                    <span v-if="!isEditing">Robertson</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Email Address</div>
                    <span v-if="!isEditing">{{ clientDetails?.email }}</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Date of birth</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Nationality</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Mobile</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>
                <div class="col-md-4">
                    <div class="small text-muted">Telephone</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>
                <div class="col-md-4">
                    <div class="small text-muted">Birth Country</div>
                    <span v-if="!isEditing">Nil</span>
                    <select v-else class="form-select ">
                        <option selected>Select--</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <div class="small text-muted">Gender</div>
                    <span v-if="!isEditing">Nil</span>
                    <select v-else class="form-select ">
                        <option selected>Select--</option>
                    </select>
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Join Date</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>
                <div class="col-md-4">
                    <div class="small text-muted">Created On</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>
                <div class="col-md-4">
                    <div class="small text-muted">SSN Number (US Only)</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Social Insurance Number</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">National Identity Number</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Tax Identification Number</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">External ID</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">CLient ID</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div v-if="isEditing" class="col-12">
                    <button class="btn btn-theme rounded-4 float-end">
                        Edit Client
                    </button>
                    <button @click="isEditing = false" class="btn btn-outline-dark me-2 rounded-4 float-end">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>


</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../clientsStore';
import { ref } from 'vue';

const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)


const isEditing = ref<boolean>(false)
</script>