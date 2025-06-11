<template>
    <v-select class="d-none d-md-block" v-model="localValue" :teleport="true" :options :label :placeholder
        :clearable></v-select>
    <select class="form-select d-md-none">
        <option value="" selected disabled>{{ placeholder }}</option>
        <option v-for="option in options" :value="option">{{ option[label] }}</option>
    </select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface OptionType {
    [key: string]: any;
}


const props = defineProps({
    modelValue: {
        type: null,
        default: () => null
    },
    options: {
        type: Array as () => OptionType[],
        default: []
    },

    label: {
        type: String,
        default: 'label'
    },
    placeholder: {
        type: String,
        default: 'select ...'
    },
    clearable: {
        type: Boolean,
        default: false
    },

})
const emit = defineEmits(['update:modelValue']);
const localValue = ref(props.modelValue)


watch(() => localValue.value, () => {
    emit('update:modelValue', localValue.value);

})


</script>
