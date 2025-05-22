<template>
    <button class="btn btn-theme w-100 btn-lg" disabled>
        <div class="loader"></div>
    </button>
</template>

<style scoped>
/* HTML: */
.loader {
    width: 3rem;
    aspect-ratio: 4;
    margin: 0.5rem auto !important;
    --_g: no-repeat radial-gradient(circle closest-side, #ccc 90%, #0000);
    background:
        var(--_g) 0% 50%,
        var(--_g) 50% 50%,
        var(--_g) 100% 50%;
    background-size: calc(100%/3) 100%;
    animation: l7 1s infinite linear;
}

@keyframes l7 {
    33% {
        background-size: calc(100%/3) 0%, calc(100%/3) 100%, calc(100%/3) 100%
    }

    50% {
        background-size: calc(100%/3) 100%, calc(100%/3) 0%, calc(100%/3) 100%
    }

    66% {
        background-size: calc(100%/3) 100%, calc(100%/3) 100%, calc(100%/3) 0%
    }
}
</style>