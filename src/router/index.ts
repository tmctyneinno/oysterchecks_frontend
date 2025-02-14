import { createRouter, createWebHistory } from 'vue-router'
import general_routes from './general_routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() { return { top: 0, behavior: 'smooth', } },
  linkActiveClass: 'active',
  routes: [
    ...general_routes
  ],
})

router.afterEach((to, from) => {
  document.title = "OYSTERCHECK | " + to.meta?.name?.toString()
})

export default router
