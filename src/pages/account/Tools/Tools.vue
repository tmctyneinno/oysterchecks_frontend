<template>
    <div class="row g-3">
        <div class="col-12">
            <div class="row g-2">
                <div class="col-md-9">
                    <div class="fs-4">Tools</div>
                    <div class="fw-500">Bulk Import</div>
                    <div class="small text-muted">You can import a CSV file to add up to 1,000 clients in bulk and
                        optionally run checks on them
                    </div>
                </div>

            </div>
        </div>


        <div class="col-12">
            <div class="card  min-vh-100 border-0">
                <div class="card-body">
                    <EasyDataTable show-index alternating :headers="headers" :items="sampleData.Tools"
                        buttons-pagination>
                        <template #header="header">
                            <span>{{ header.text == '#' ? 'S/N' : header.text }}</span>
                        </template>

                        <template #item-result="item">
                            <div>Person: 2</div>
                            <div>Skipped Lines: 0</div>
                        </template>

                        <template #item-created_at="item">
                            <span>{{ helperFunctions.dateDisplay(item.created_at) }}</span>
                        </template>

                        <template #item-action="item">
                            <button class="btn-sm border-0 bg-transparent text-info-emphasis hover-tiltY">
                                <i class="bi bi-pencil-fill"></i>
                            </button>
                            <button class="btn-sm border-0 bg-transparent text-danger-emphasis hover-tiltY">
                                <i class="bi bi-trash3"></i>
                            </button>

                        </template>
                    </EasyDataTable>
                </div>
            </div>


        </div>
    </div>

</template>

<script setup lang="ts">
import InlineSearchForm from '@/components/InlineSearchForm.vue';
import helperFunctions from '@/stores/helperFunctions';
import sampleData from '@/stores/sample_data.json'
import { ref, watchEffect } from 'vue';
import type { Header, Item } from 'vue3-easy-data-table';

import { useRoute, useRouter } from 'vue-router';


const isShowingDetails = ref<boolean>(false)
const route = useRoute()
const router = useRouter()

watchEffect(() => {
    isShowingDetails.value = route.query?.refId ? true : false
})


const headers = ref<Header[]>([
    { text: 'File', value: 'file', sortable: true },
    { text: 'Import Type', value: 'import_type', sortable: true },
    { text: 'Created On', value: 'created', sortable: true },
    { text: 'Result', value: 'result', sortable: true },
    { text: 'Status', value: 'status', sortable: true },
])






function viewClient(id: string, name: string) {
    router.push({
        path: '',
        query: {
            refId: id,
            client: name,
            tme: new Date().getTime()
        }
    })

}

</script>

<style scoped></style>