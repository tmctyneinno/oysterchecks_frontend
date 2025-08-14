<template>
    <ul class="nav flex-column">
        <div class="mb-4 ms-2" v-for="(item, index) in templateStore.sidebarmenu" :key="index">
            <div class="xsmall text-uppercase" style="color: #FFFFFF57;">
                {{ item.heading ?? '' }}
            </div>

            <li v-for="(menu, menuIndex) in item.menu" :key="menuIndex" class="nav-item">
                <!-- If the item has children (dropdown menu) -->
                <template v-if="menu.children">
                    <a class="nav-link" data-bs-toggle="collapse" :href="'#submenu' + index" @click="toggleMenu(index)">
                        <span class="me-2" v-html="menu.icon"></span>
                        {{ menu.title }}
                        <i :class="menuState[index] ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" class="float-end"></i>
                    </a>
                    <ul :id="'submenu' + index" class="collapse list-unstyled ps-3"
                        @shown.bs.collapse="menuState[index] = true" @hidden.bs.collapse="menuState[index] = false">
                        <li v-for="(subItem, subIndex) in menu.children" :key="subIndex">
                            <router-link :to="subItem.link" class="nav-link submenu">
                                {{ subItem.title }}
                            </router-link>
                        </li>
                    </ul>
                </template>

                <!-- If it's a regular menu item -->
                <template v-else>
                    <router-link :to="menu.link ?? ''" class="nav-link">
                        <span class="me-2" v-html="menu.icon"></span>
                        {{ menu.title }}</router-link>
                </template>
            </li>
        </div>

    </ul>


</template>

<script setup lang="ts">
import { useTemplateStore } from "@/stores/template";
import { reactive } from "vue";

const templateStore = useTemplateStore()

const menuState = reactive<any>({});

const toggleMenu = (index: any) => {
    menuState[index] = !menuState[index];
};

</script>


<style scoped>
.bi {
    transition: transform 0.3s ease;
}

.nav-link {
    transition: all ease-in-out 0.4s;
    color: var(--vt-c-white);
    /* font-size: small; */
}

.nav-link:not(.submenu) {
    margin-block: 6px;
}

.nav-link:hover {
    transform: translateX(5px);
    color: var(--vt-c-white-mute);
}

/* #344E83 */

.router-link-exact-active {
    /* color: var(--theme-color) !important;
    font-weight: bold; */
    transform: translateX(5px);
    background-color: #344E83;
}
</style>