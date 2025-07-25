<template>
    <div class="col-12">
        <div class="row g-2">
            <div class="col-md-12">
                <div class="fs-4">Settings</div>
            </div>


            <div class="col-12">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1"
                            type="button" role="tab" aria-controls="tab1" aria-selected="true">
                            My Profile
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button"
                            role="tab" aria-controls="tab2" aria-selected="false">
                            Notifications
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button"
                            role="tab" aria-controls="tab3" aria-selected="false">
                            Password & Security
                        </button>
                    </li>

                    <!-- <li class="nav-item" role="presentation">
                        <button class="nav-link" id="tab4-tab" data-bs-toggle="tab" data-bs-target="#tab4" type="button"
                            role="tab" aria-controls="tab4" aria-selected="false">
                            Team
                        </button>
                    </li> -->
                </ul>


                <!-- Tab panes -->
                <div class="tab-content pt-4">
                    <div class="tab-pane active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                        <Profile />
                    </div>
                    <div class="tab-pane" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                        <Notifications />
                    </div>
                    <div class="tab-pane" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                        <Password_security />
                    </div>

                    <div class="tab-pane" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
                        <!-- <team /> -->
                        <Profile />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>




<script setup lang="ts">
import Notifications from './tabContents/notifications.vue';
import Password_security from './tabContents/password_security.vue';
import Profile from './tabContents/profile.vue';
import Team from './tabContents/team.vue';

</script>




<style scoped>
.nav-link {
    color: #111;
    border: none !important;
    font-weight: 500;
    background: transparent !important;
}


.nav-link.active {
    color: var(--theme-color) !important;
    border-bottom: 2px solid var(--theme-color) !important;
}
</style>