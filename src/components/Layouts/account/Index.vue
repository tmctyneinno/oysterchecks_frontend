<template>

  <Layout_navbar />
  <Layout_sidebar />

  <div class="content-div">
    <div class="container py-3 px-lg-4">
      <div class="fw-bold text-muted mt-2">{{ route.meta.name }}</div>
      <div class="mt-5 ">
        <RouterView />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import Layout_sidebar from './Sidebar.vue';
import Layout_navbar from './Navbar.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<style scoped>
.content-div {
  margin-left: 250px;
  overflow: hidden !important;
}


@media (max-width: 767px) {
  .content-div {
    margin-left: 0px;
  }

}
</style>