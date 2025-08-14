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


</script>

<style scoped>
.list-group-item {
    padding-left: 0px;
}
</style>