import LandingPage from '../pages/LandingPage.vue'

export default [
  {
    path: '/',
    alias: ['/index'],
    name: 'Index',
    meta: { name: 'Home', description: 'Oystercheck landing page' },
    component: LandingPage
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    meta: { name: '404', description: 'Page cannot not be found' },
    component: () => import(/* webpackChunkName: "error" */  '../pages/PageNotFound.vue')
  },
]