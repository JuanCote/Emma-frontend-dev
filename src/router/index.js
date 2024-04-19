import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/Main.vue"
import Emma from "@/views/Emma.vue"
import Auth from "@/views/Auth.vue"

import { BASE_URL } from '@/config.js'


const router = createRouter({
  history: createWebHistory('/Emma-frontend/'),
  routes: [
    {
      path: `/`,
      component: Emma
    },
    {
      path: `/emma/:pathMatch(.*)*`,
      component: Emma,
    },
    {
      path: `/auth`,
      component: Auth
    },
  ]
})

export default router
