<template>
    <!--  -->
    <vue-tel-input :custom-validate="false" v-model="localValue" @update:modelValue="handleInput"
        :class="`${className} ${size}-field`" :dropdownOptions :inputOptions></vue-tel-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: String,
    className: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    size: {
        type: String,
        default: 'large',
        validator: (value: string) => ['large', 'normal'].includes(value)
    },
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

function handleInput(value: string) {
    localValue.value = value;
    emit('update:modelValue', value);
}

watch(() => props.modelValue, () => {
    if (JSON.stringify(props.modelValue) !== JSON.stringify(localValue.value)) localValue.value = props.modelValue
}, { immediate: true, deep: true })

const dropdownOptions = {
    showDialCodeInList: true,
    showDialCodeInSelection: false,
    showFlags: true,
    showSearchBox: true,
    searchBoxPlaceholder: 'Search country',
}

const inputOptions = {
    autofocus: false,
    showDialCode: true,
    placeholder: props.placeholder || 'Enter Phone Number',
    type: 'tel',
    maxlength: 15,
}
</script>

<style scoped>
.large-field {
    width: 100%;
    height: 50px;
    border-radius: .375rem;
}

.normal-field {
    width: 100%;
    height: 40px;
    /* border-radius: 30px; */
    background-color: #fff;
    border-radius: .375rem;
}
</style>

<style>
.vti__dropdown-list {
    z-index: 9999 !important;
}

.vti__input {
    border-radius: 0 .375rem .375rem 0;
}
</style>