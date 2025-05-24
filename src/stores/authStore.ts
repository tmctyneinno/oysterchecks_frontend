import { defineStore } from "pinia";
// @ts-ignore
import Cookies from 'js-cookie';
import { computed, reactive, ref } from "vue";

export const useAuthStore = defineStore('authStore', () => {

    const token = ref<any>('')
    const profile = ref<any>(null)
    const cookieValues = reactive({
        // token: import.meta.env.VITE_TOKEN_NAME,
        tokenName: 'oytercheck#Tkn',
        expiry: 3 // days
    })

    const isLoggedIn = computed(() => token.value || Cookies.get(cookieValues.tokenName));

    const login = (str: string) => {
        Cookies.set(cookieValues.tokenName, str, { expires: cookieValues.expiry });
        token.value = str;
        window.location.reload();
    }

    function logout() {
        Cookies.remove(cookieValues.tokenName);
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