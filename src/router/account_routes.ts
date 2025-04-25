export default [
    {
        path: '/account',
        component: () => import('../components/Layouts/account/Index.vue'),
        children: [
            { path: 'dashboard', name: 'Admin-Dashboard', meta: { name: 'Dashboard', }, component: () => import('../pages/account/Dashboard/Dashboard.vue') },
            { path: 'clients', name: 'Admin-Clients', meta: { name: 'Clients', }, component: () => import('../pages/account/Clients/Clients.vue') },
            { path: 'checks', name: 'Admin-Checks', meta: { name: 'Checks', }, component: () => import('../pages/account/Checks/Checks.vue') },
            { path: 'tools', name: 'Admin-Tools', meta: { name: 'Tools', }, component: () => import('../pages/account/Tools/Tools.vue') },
            { path: 'audit-report', name: 'Admin-Audit_Report', meta: { name: 'Audit Report', }, component: () => import('../pages/account/Audit_Report/Audit_Report.vue') },
            { path: 'help-and-support', name: 'Admin-HelpAndSupport', meta: { name: 'Help & Support', }, component: () => import('../pages/account/HelpAndSupport/HelpAndSupport.vue') },
            { path: 'settings', name: 'Admin-Settings', meta: { name: 'Settings', }, component: () => import('../pages/account/Settings/Settings.vue') },
        ],
    },
]