<template>
    <section class="img-panel">
        <h1 class="title">
            <slot name="title"></slot>
        </h1>
    </section>

    <section class="container" style="padding-top: 100px;">
        <slot name="body"></slot>
    </section>

</template>

<script setup lang="ts"></script>
<style scoped>
.img-panel {
    min-height: 150px;
    background: url('/images/landing/header-bg.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.img-panel .title {
    color: #fff;
    font-size: 2.652em;
    font-weight: 500;
}

@media (max-width: 767px) {
    .img-panel {
        min-height: 70px;
    }

    .img-panel .title {
        font-size: 1.25rem;
    }
}
</style>