<template>
    <div id="overlay">
        <div class="loader"></div>
    </div>
</template>

<style scoped>
#overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(40, 18, 18, 0.479);
    z-index: 9999;

    display: flex;
    justify-content: center;
    align-items: center;
}



/* https://css-loaders.com/dots/ */
.loader {
    width: 5em;
    aspect-ratio: 4;
    margin: 0.5rem auto;
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