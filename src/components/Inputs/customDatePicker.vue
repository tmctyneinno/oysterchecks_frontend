<template>
    <VueDatePicker :flow="flow" :format="format" :teleport="true" v-model="localValue" hide-input-icon
        :clearable="false" :enable-time-picker="false" auto-apply :max-date="maxDate" :min-date="minDate" />

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDateFormat } from '@vueuse/core';

const props = defineProps({
    modelValue: {
        type: Date,
        default: () => null
    },
    maxDate: {
        type: Date,
        default: undefined
    },

    minDate: {
        type: Date,
        default: undefined
    }
})
const emit = defineEmits(['update:modelValue']);
const localValue = ref(props.modelValue)

const flow = ref(['year', 'month', 'calendar']);

const format = (date: Date) => {
    const dd = useDateFormat(date, 'MMM D, YYYY')
    return dd.value
}


watch(() => localValue.value, () => {
    emit('update:modelValue', localValue.value);

})

watch(() => props.modelValue, () => {
    if (!props.modelValue) localValue.value = props.modelValue
})


</script>
