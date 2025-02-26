import Layout from "@/components/Layouts/public/Index.vue"
import Home from "@/pages/public/Home/Home.vue"


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
        // component: () => import(/* webpackChunkName: "public" */ '../pages/auth/Login.vue')
    },
]