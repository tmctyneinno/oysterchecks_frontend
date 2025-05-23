import { defineStore } from "pinia";
// @ts-ignore
import Cookies from 'js-cookie';
import { computed, reactive, ref } from "vue";

export const useAuthStore = defineStore('authStore', () => {

    const token = ref<any>('')
    const profile = ref<any>(null)
    const cookieValues = reactive({
        token: import.meta.env.VITE_TOKEN_NAME,
        expiry: 3 // days
    })

    const isLoggedIn = computed(() => token.value || Cookies.get(cookieValues.token));

    const login = (tokenStr: string) => {
        Cookies.set(cookieValues.token, tokenStr, { expires: cookieValues.expiry });
        token.value = tokenStr;
        window.location.reload();
    }

    function logout() {
        Cookies.remove(cookieValues.token);
        token.value = '';
        window.location.reload()
    }


    return {
        login,
        logout,
        isLoggedIn,
        cookieValues,
        profile
    }

})