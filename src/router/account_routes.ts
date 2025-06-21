
import { useAuthStore } from '@/stores/authStore';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const pageGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) {
        next({ path: '/login' });
    }
    else {
        next()
    }
}


export default [
    {
        path: '/account',
        component: () => import('../components/Layouts/account/Index.vue'),
        beforeEnter: pageGuard,
        children: [
            { path: 'dashboard', name: 'Admin-Dashboard', meta: { name: 'Dashboard', }, component: () => import('../pages/account/Dashboard/Dashboard.vue') },
            { path: 'clients', name: 'Admin-Clients', meta: { name: 'Clients', }, component: () => import('../pages/account/Clients/Clients.vue') },
            { path: 'checks', name: 'Admin-Checks', meta: { name: 'Checks', }, component: () => import('../pages/account/Checks/Checks.vue') },
            { path: 'dbs-checks', name: 'Admin-DBS-Checks', meta: { name: 'DBS Checks', }, component: () => import('../pages/account/DBS_Checks/DBS_Checks.vue') },
            { path: 'tools', name: 'Admin-Tools', meta: { name: 'Tools', }, component: () => import('../pages/account/Tools/Tools.vue') },
            { path: 'audit-report', name: 'Admin-Audit_Report', meta: { name: 'Audit Report', }, component: () => import('../pages/account/Audit_Report/Audit_Report.vue') },
            { path: 'help-and-support', name: 'Admin-HelpAndSupport', meta: { name: 'Help & Support', }, component: () => import('../pages/account/HelpAndSupport/HelpAndSupport.vue') },
            { path: 'settings', name: 'Admin-Settings', meta: { name: 'Settings', }, component: () => import('../pages/account/Settings/Settings.vue') },


            // {
            //     path: 'dbs-checks',
            //     component: () => import('../pages/account/DBS_Checks/DBS_ChecksIndex.vue'),
            //     children: [
            //         { path: '', name: 'Admin-DBS-Checks', meta: { name: 'DBS Checks', }, component: () => import('../pages/account/DBS_Checks/DBS_Checks.vue') },
            //         { path: 'options', name: 'Admin-DBS-Checks-Options', meta: { name: 'DBS Checks', }, component: () => import('../pages/account/DBS_Checks/DBS_Checks_Options.vue') },
            //     ],
            // },


        ],
    },
]