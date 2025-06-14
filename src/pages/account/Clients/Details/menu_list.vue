<template>
    <div class=" d-none d-md-block small ps-1 pt-2">
        <section v-for="({ title, group }) in sections" :key="group" class="mb-3">
            <div class="text-muted">{{ title }}</div>
            <ul class="list-group list-group-flush">
                <li v-for="({ tab, text }) in clientsStore.clientsTabByGroup(group)" :key="tab"
                    @click="clientsDetailsMenu.tabShowing = tab"
                    class="list-group-item border-0 cursor-pointer hover-tiltX pb-0 fw-400"
                    :class="{ 'active-tab': clientsDetailsMenu.tabShowing === tab }">
                    {{ text }}
                </li>
            </ul>
        </section>
    </div>

    <div class="d-md-none">
        <select class="form-select form-select-lg" v-model="clientsDetailsMenu.tabShowing">
            <option v-for="menu in clientsDetailsMenu.tabs" :value="menu.tab">
                {{ menu.text }}
            </option>
        </select>

    </div>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../clientsStore';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

const sections: { title: string, group: 'info' | 'due' | 'activity' }[] = [
    { title: "CLIENT'S DETAILS", group: 'info' },
    // { title: "DUE DILIGENCE", group: 'due' },
    // { title: "ACTIVITY LOG", group: 'activity' }
]

const clientsStore = useClientsStore()
const { clientsDetailsMenu, clientDetails } = storeToRefs(clientsStore)

const router = useRouter()
watch(() => clientsDetailsMenu.value.tabShowing, (val) => {
    if (val === 4) {
        router.push({
            path: '/account/checks',
            query: {
                refId: clientDetails.value.id,
                client: clientDetails.value.client_id,
                tme: Date.now()
            }
        });
        clientsDetailsMenu.value.tabShowing = 1;
    }
});

</script>

<style scoped>
.active-tab {
    color: var(--theme-color);
    font-weight: 700;
    margin-left: 5px;
}
</style>