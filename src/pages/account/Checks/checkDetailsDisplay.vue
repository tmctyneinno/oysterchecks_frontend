<template>
    <!-- Some borders are removed -->
    <ul class="list-group list-group-flush">
        <li class="list-group-item">
            <strong>Client:</strong>
            <div>
                {{ data?.entityName }}
            </div>
        </li>

        <li class="list-group-item">
            <strong>Check Type:</strong>
            <div>{{ helperFunctions.resolveSnakeCaseLabel(data?.type ?? '') }}</div>
        </li>
        <li class="list-group-item">
            <strong>Status:</strong>
            <div>
                <span class="p-1 px-2 rounded-3" :style="{
                    backgroundColor: clientsStore.statusShader(data?.status ?? '').bg,
                    color: clientsStore.statusShader(data?.status ?? '').color
                }">
                    {{ data?.status ?? '' }}
                </span>
            </div>
        </li>
        <li class="list-group-item">
            <strong> Date Requested: </strong>
            <div>
                {{ helperFunctions.dateTimeDisplay(data?.createdAt) }}
            </div>
        </li>

        <li class="list-group-item">
            <strong> Date Completed: </strong>
            <div>
                {{ helperFunctions.dateTimeDisplay(data?.updatedAt) }}
            </div>
        </li>

        <li class="list-group-item d-none">
            <fieldset v-if="data?.input?.address" class="border bg-light rounded-3 pb-3 px-3 mb-4">
                <legend class="text-muted float-none xsmall p-0 px-2 w-auto">
                    ADDRESS
                </legend>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-transparent small"
                        v-for="([key, value], index) in displayValues(data.input.address)">
                        <strong class="text-capitalize">{{ key }}</strong>
                        <div>{{ value }}</div>
                    </li>
                </ul>
            </fieldset>
        </li>


    </ul>

</template>

<script lang="ts" setup>
import { useClientsStore } from '@/stores/clientsStore';
import helperFunctions from '@/stores/helperFunctions';


const clientsStore = useClientsStore()

const prop = defineProps({
    data: {
        required: true,
        type: null,
        default: () => null

    }
})


const displayValues = (object: any) => {
    const propertiesNotToDisplay = ['id', 'createdAt', 'updatedAt', 'clientId']
    return Object.entries(object).filter(([key]) => !propertiesNotToDisplay.includes(key))
}

</script>

<style scoped>
.list-group-item {
    padding-left: 0px;
}
</style>