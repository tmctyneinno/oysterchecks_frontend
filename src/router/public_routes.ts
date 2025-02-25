import Layout from "@/views/public/Layout/Layout.vue"
import Home from "@/views/public/Home/Home.vue"


export default [
    {
        path: '/',
        component: Layout,
        children: [
            { path: '', name: 'Home', meta: { name: 'Home', }, alias: '/home', component: Home },
            // 
        ],
    },

    {
        path: '/:pathMatch(.*)*',
        name: '404',
        redirect: '/',
        // component: () => import(/* webpackChunkName: "public" */ '../views/auth/Login.vue')
    },
]