<template>
    <div>
        <!-- header -->
        <Layout_header />

        <!-- main slot -->
        <div class="min-vh-100 pb-4">
            <RouterView />
        </div>

        <!-- footer -->
        <Layout_Footer />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Layout_Footer from './Layout_Footer.vue';
import Layout_header from './Layout_header.vue';
</script>
