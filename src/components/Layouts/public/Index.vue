<template>
    <div>
        <Layout_header />

        <div class="min-vh-100" style="padding-bottom: 130px;">
            <RouterView />
        </div>

        <Layout_Footer />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Layout_Footer from './Footer.vue';
import Layout_header from './Header.vue';
</script>
