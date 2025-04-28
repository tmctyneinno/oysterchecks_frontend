<template>
    <div class="fw-600">Basic Information</div>
    <div class="text-muted">This is your personal information that you can update anytime</div>
    <hr>

    <div class="row g-3">
        <div class="col-md-4">
            <div class="fw-600">Profile Photo</div>
            <div class="small"> This image will be shown publicly
                as your display picture</div>
        </div>

        <div class="col-md-5 d-flex justify-content-center align-items-center">
            <div>
                <ImageCircle :src="'/images/avatar.png'" />
                <div class="text-center fw-600">Samtha Jordon</div>
            </div>

        </div>
    </div>

    <hr>
    <div class="row g-3">
        <div class="col-md-4">
            <div class="fw-600">Profile Details</div>
        </div>

        <div class="col-md-6">
            <div class="row g-3">
                <div class="col-12">
                    <div class="form-labe">First Name
                        <RedAsteric />
                    </div>
                    <input type="text" class="form-control">
                </div>

                <div class="col-12">
                    <div class="form-labe">Last Name
                        <RedAsteric />
                    </div>
                    <input type="text" class="form-control">
                </div>

                <div class="col-12">
                    <div class="form-labe">Email
                        <RedAsteric />
                    </div>
                    <input type="text" class="form-control">
                </div>

                <div class="col-12">
                    <button class="btn btn-theme float-end">Save Settings</button>
                    <button class="btn btn-outline-dark rounded-5 float-end me-2">Cancel </button>
                </div>
            </div>
        </div>

    </div>



</template>

<script setup lang="ts">
import RedAsteric from '@/components/redAsteric.vue';


</script>