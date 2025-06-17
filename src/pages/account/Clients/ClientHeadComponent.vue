<template>
    <div class="col-12">
        <div class="card rounded-4 border-0">
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-lg-7 d-flex justify-content-start align-items-center gap-3">
                        <ImageCircle :src="client?.img ?? ''" height="50px" />
                        <div>
                            <div class="fw-600 text-capitalize">{{ client?.name }} </div>
                            <div class="small text-muted">{{ client?.email }}</div>

                        </div>
                    </div>
                    <div class="col-lg-5 d-lg-flex justify-content-end align-items-center gap-3">
                        <button disabled class="btn btn-outline-dark rounded-4">
                            Export Client Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps({
    client: Object,
    default: {}
})
</script>