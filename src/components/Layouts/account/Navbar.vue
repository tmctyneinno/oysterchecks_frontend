<template>
  <nav class="navbar navbar-expand-lg shadow-sm sticky-top">
    <div class="container-fluid px-lg-3">
      <span class="navbar-brand">

        <a class="btn border-0 btn-lg p-2 d-md-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
          aria-controls="offcanvasExample">
          <i class="bi bi-list"></i>
        </a>
        <img class="d-none d-md-inline" src="/images/logo.png" width="150" alt="">
        <span class="route-name small text-muted">{{ route.meta.name ?? '' }}</span>
      </span>
      <div class="d-flex">
        <!-- <span class="mx-4 d-none d-md-inline">
          <ThemeToggler />
        </span> -->
        <span class="small me-2 text-capitalize text-muted d-none d-md-block">{{ authStore.profile?.name }}</span>
        <ImageCircle @click="goToProfile" class="cursor-pointer me-lg-4" :src="'/images/avatar.png'" height="30px" />
        <!-- <span class="account-icon dropdown-toggl cursor-pointer me-lg-5" id="triggerId" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false"></span>
        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="triggerId">
          <router-link to="/" class="dropdown-item bg-transparent">
            <i class="bi bi-power"></i> Logout
          </router-link>
        </div> -->
      </div>
    </div>
  </nav>



  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <!-- <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5> -->
      <img src="/images/logo-white.png" width="100" alt="">
      <button ref="offcanvasCloser" type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
        aria-label="Close"></button>
    </div>
    <div class="offcanvas-body pt-5">
      <Layout_menu />
    </div>
  </div>




</template>

<script setup lang="ts">
import ThemeToggler from '@/components/themeToggler.vue';
import Layout_menu from './Menu.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()


const route = useRoute()
const router = useRouter()
const offcanvasCloser = ref<any>(null)

watch(() => route.path, () => {
  offcanvasCloser.value?.click()
})


function goToProfile() {
  router.push({ path: '/account/settings' })
}

</script>

<style scoped>
.navbar {
  height: var(--navbar-height);
  background-color: var(--vt-c-white) !important;
}

.offcanvas {
  width: 250px;
  background-color: var(--theme-color-thick);
}

.route-name {
  margin-left: 100px;
}


@media (max-width: 767px) {
  .navbar {
    margin-left: 0px;
  }

  .route-name {
    margin-left: 10px;
  }


}


.navbar .account-icon {
  height: 26px !important;
  width: 26px !important;
  border-radius: 50% !important;
  background: url('/images/account.png');
  /* background-color: red; */
  border: 1px solid #e8e5e5;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  /* override navbar properties */
  /* display: block !important; */
}
</style>