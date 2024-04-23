import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/Main.vue"
import Emma from "@/views/Emma.vue"
import Auth from "@/views/Auth.vue"
import store from "../store/index.js"

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

router.beforeEach((to, from, next) => {
  store.dispatch('checkUser').then((response) => {
    if (!response && to.path !== '/auth') {
      next('/auth')
    } else  if (['/emma', '/emma/', '/'].includes(to.path)) {
      next('/emma/analytic')
    }else (
      next()
    )
  })
});
export default router
