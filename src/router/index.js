import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/Main.vue"
import Emma from "@/views/Emma.vue"
import Auth from "@/views/Auth.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/emma/:pathMatch(.*)*',
      component: Emma,
    },
    {
      path: '/auth',
      component: Auth
    },
  ]
})

export default router
