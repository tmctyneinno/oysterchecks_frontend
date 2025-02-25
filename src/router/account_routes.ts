export default [
    {
        path: '/account',
        component: () => import('../views/account/Layout/Layout.vue'),
        children: [
            { path: 'dashboard', name: 'Dashboard', meta: { name: 'Dashboard', }, alias: '/dashboard', component: () => import('../views/account/Dashboard.vue') },
            { path: 'tables', name: 'Tables', meta: { name: 'Tables', }, alias: '/tables', component: () => import('../views/account/Tables/Tables.vue') },
            { path: 'elements', name: 'Elements', meta: { name: 'Elements', }, alias: '/elements', component: () => import('../views/account/Elements/Elements.vue') },
            { path: 'charts', name: 'Charts', meta: { name: 'Charts', }, alias: '/charts', component: () => import('../views/account/Charts/Charts.vue') },
            { path: 'blank-page', name: 'Blank_Page', meta: { name: 'Blank Page', }, alias: '/blank-page', component: () => import('../views/account/Blank_Page.vue') },
        ],
    },
]