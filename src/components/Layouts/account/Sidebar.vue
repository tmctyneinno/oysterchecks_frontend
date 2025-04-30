<template>
  <div class="sidebar ">
    <Layout_menu />

    <div class="bottom">
      <div class="d-flex justify-content-cente ms-4 cursor-pointer text-white">
        <div id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i
            class="bi bi-box-arrow-left me-1"></i> Logout</div>
        <div class="dropdown-menu dropdown-menu-end border-0" aria-labelledby="triggerId">
          <a @click="logout" class="dropdown-item text-danger bg-transparent" href="#">
            Logout
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Layout_menu from './Menu.vue';


const router = useRouter()


function logout() {
  router.replace({ path: '/login' })
  // window.location.reload()
}

</script>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  bottom: 0;
  width: 250px !important;
  /* border-right: 1px solid var(--bs-border-color); */
  background-color: var(--theme-color-thick);
  overflow-y: auto;
  padding-top: 50px;
  overflow-x: hidden;
}

/* [data-bs-theme="light"] {
  .sidebar {
    border: none !important;
  }
} */

.bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
  width: 250px;
  padding-bottom: 10px;
}


@media (max-width: 767px) {
  .sidebar {
    display: none;
  }
}
</style>