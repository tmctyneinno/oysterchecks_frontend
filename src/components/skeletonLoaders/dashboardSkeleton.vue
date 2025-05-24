<template>
    <div class="d-md-flex gap-2">
        <div v-for="i in 5" :key="i" class="col mb-2">
            <SkeletonLoader width="100%" height="150" tag="div" />
        </div>
    </div>

    <div class="mt-2">
        <div class="row g-2">
            <div class="col-md-8">
                <SkeletonLoader width="100%" height="400px" />
            </div>
            <div class="col-md-4">
                <SkeletonLoader width="100%" height="400px" />
            </div>
        </div>
    </div>
</template>