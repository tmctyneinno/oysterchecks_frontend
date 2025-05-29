import { useAuthStore } from '@/stores/authStore';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const pageGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) {
        next({ path: '/account/dashboard' });
    }
    else {
        next()
    }
}


export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/auth/Login.vue'),
        beforeEnter: pageGuard,
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../pages/auth/Register.vue'),
        beforeEnter: pageGuard,
    },

    {
        path: '/register/otp',
        name: 'RegisterOTP',
        component: () => import('../pages/auth/RegisterOTP.vue'),
        beforeEnter: pageGuard,
    },

]