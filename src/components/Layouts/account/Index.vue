<template>

  <Layout_navbar />
  <Layout_sidebar />

  <div class="content-div pb-5">
    <div class="container px-lg-4">
      <div class="mt-4 ">
        <RouterView />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import Layout_sidebar from './Sidebar.vue';
import Layout_navbar from './Navbar.vue';

import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import api from '@/api';

const authStore = useAuthStore()

onMounted(async () => {
  const { data } = await api.profile()
  console.log(data);

  authStore.profile = data
})

</script>

<style scoped>
.content-div {
  margin-left: 250px;
  overflow: hidden !important;
  background-color: var(--admin-bg);
  min-height: 100vh;
  /* padding-bottom: 100px; */
}


@media (max-width: 767px) {
  .content-div {
    margin-left: 0px;
  }

}
</style>