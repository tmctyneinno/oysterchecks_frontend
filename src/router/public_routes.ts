import Layout from "@/components/Layouts/public/Index.vue"
import Home from "@/pages/public/Home/Home.vue"


export default [
    {
        path: '/',
        component: Layout,
        children: [

            // LANDING PAGE
            { path: '', name: 'Home', meta: { name: 'Home', }, alias: '/home', component: Home },

            // ABOUT US
            { path: 'about-us', name: 'About Us', meta: { name: 'About Us', }, component: () => import('../pages/public/About/AboutUs.vue') },
            { path: 'who-we-are', name: 'Who We Are', meta: { name: 'Who We Are', }, component: () => import('../pages/public/About/WhoWeAre.vue') },
            { path: 'core-values', name: 'Core Values', meta: { name: 'Core Values', }, component: () => import('../pages/public/About/CoreValues.vue') },
            { path: 'mission', name: 'Mission', meta: { name: 'Mission', }, component: () => import('../pages/public/About/Mission.vue') },
            { path: 'why-choose-us', name: 'Why Choose Us', meta: { name: 'Why Choose Us', }, component: () => import('../pages/public/About/WhyChooseUs.vue') },
            { path: 'industry', name: 'Industry', meta: { name: 'Industry', }, component: () => import('../pages/public/About/Industry.vue') },

            //SERVICES 
            { path: 'employment-checks', name: 'Employment Checks', meta: { name: 'Employment Checks', }, component: () => import('../pages/public/Services/EmploymentChecks.vue') },
            { path: 'periodic-kyc', name: 'Periodic KYC', meta: { name: 'Periodic KYC', }, component: () => import('../pages/public/Services/PeriodicKYC.vue') },
            { path: 'transaction', name: 'Transaction', meta: { name: 'Transaction', }, component: () => import('../pages/public/Services/Transaction.vue') },
            { path: 'aml-solution', name: 'AML Solution', meta: { name: 'AML Solution', }, component: () => import('../pages/public/Services/AMLSolution.vue') },
            { path: 'bpss-clearance', name: 'BPSS Clearance', meta: { name: 'BPSS Clearance', }, component: () => import('../pages/public/Services/BPSSClearance.vue') },

            // TECHNOLOGY
            { path: 'technology', name: 'Technology', meta: { name: 'Technology', }, component: () => import('../pages/public/Technology.vue') },

            // CONTACT US
            { path: 'contact-us', name: 'Contact Us', meta: { name: 'Contact Us', }, component: () => import('../pages/public/ContactUs.vue') },

            // BOOK A DEMO
            { path: 'book-a-demo', name: 'Book A Demo', meta: { name: 'Book A Demo', }, component: () => import('../pages/public/BookADemo.vue') },

        ],
    },

    {
        path: '/:pathMatch(.*)*',
        name: '404',
        redirect: '/',
        // component: () => import(/* webpackChunkName: "public" */ '../pages/auth/Login.vue')
    },
]