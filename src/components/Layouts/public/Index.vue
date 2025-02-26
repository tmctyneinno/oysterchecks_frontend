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
import Layout_Footer from './Footer.vue';
import Layout_header from './Header.vue';
</script>
