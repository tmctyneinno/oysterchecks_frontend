<template>
    <Dbs_checks_index v-if="pageToShow == 'index'" />
    <DBS_Checks_Options v-if="pageToShow == 'select'" />

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';

import Dbs_checks_index from './dbs_checks_index.vue';
import DBS_Checks_Options from './DBS_Checks_Options.vue';

const route = useRoute()

const pageToShow = ref<any>('index')

watchEffect(() => {
    pageToShow.value = route.query?.page ?? 'index'
})


</script>
