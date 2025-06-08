<template>
    <div class="min-vh-50 d-flex justify-content-center align-items-center text-muted">
        <div>
            <i style="font-size: 4.4rem;color: #ccc;" class=" bi bi-trash2"></i>
            <div class="text-center"> {{ text ?? 'Empty Data' }} </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(['text'])
</script>