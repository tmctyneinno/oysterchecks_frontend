<template>
    <div>
        <!-- <div class="fw-bold">Notifications</div> -->
        <div class="text-muted mb-2">Tell us what you want to get notifications for and we won't bother you with
            anything
            else.</div>
        <hr>

        <ul class="list-group list-group-flush">
            <li v-for="({ id, title, value }, index) in optionsPool" :key="index" @click="addOrRemoveInPool(id)"
                class="list-group-item ps-0 bg-transparent cursor-pointer hover-tiltX">
                <i v-if="selectedPool.includes(id)" class="bi bi-check-square-fill text-theme"></i>
                <i v-else class="bi bi-square"></i>
                {{ title }}
            </li>
        </ul>

        <div class="col-lg-12 mt-3">
            <loadingButton style="width: 200px;" type="submit" className="btn-theme float-end" :loading="false">
                Save Settings
            </loadingButton>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const selectedPool = ref<number[]>([])

const optionsPool: { id: number, title: string, value: string }[] = [
    { id: 1, title: 'A check is complete', value: 'complete' },
    { id: 2, title: 'A check requires attention', value: 'attention' },
    { id: 3, title: 'A check has failed', value: 'failed' },
    { id: 4, title: 'A continuous monitoring update', value: 'update' },
    { id: 5, title: 'A webhook is disabled after multiple failed attempts', value: 'attempts' },
]

function addOrRemoveInPool(id: number) {
    if (!selectedPool.value.includes(id))
        selectedPool.value.push(id)
    else
        selectedPool.value = selectedPool.value.filter((x: any) => x !== id)
}





</script>