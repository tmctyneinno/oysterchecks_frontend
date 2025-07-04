<template>
    <div class="dropzone " :class="{ 'active': doc?.name }" v-bind="getRootProps()">
        <div class="text-center small">
            <span v-if="imgSaving" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <div class="text-mute">{{ text }}</div>
            <div class="text-muted"> {{ formats }}</div>
        </div>
        <input v-bind="getInputProps()" />
    </div>
    <!-- <span v-if="doc?.name">
        <i class="bi bi-check-circle-fill text-success"></i>
        {{ doc.name }}
    </span> -->
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useDropzone } from 'vue3-dropzone';

const props = defineProps({
    formats: {
        type: Array as () => string[],
        default: () => ['png', 'jpg', 'jpeg', 'svg']
    },
    text: {
        type: String,
        default: 'Click to replace or drag and drop'
    },

})


const emit = defineEmits(['fileUploaded']);

// image
const doc = ref<any>(null)
const imgSaving = ref<boolean>(false);

// file input
const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    // maxSize: 1024 * 1024 * 2, // 2MB
    accept: props.formats.map(format => `.${format}`).join(','),
    onDrop: (acceptFiles: any[], rejectReasons: any) => {
        doc.value = acceptFiles[0];
        emit('fileUploaded', doc.value);
        imgSaving.value = false;
    },
});



</script>

<style scoped>
.dropzone {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 5px;
    border: 2px dashed var(--bs-secondary);
    /* background-color: var(--bs-light); */
    transition: 0.3s ease all;
    cursor: pointer;
    border-radius: 10px;
}

.dropzone:hover {
    border-color: var(--bs-success);
    /* background-color: #f0f8ff; */
    /* color: var(--bs-primary); */
}

/* active dropzone */
.active {
    border-color: var(--bs-success);
    background-color: #f0f8ff;
    color: var(--bs-success);
}
</style>