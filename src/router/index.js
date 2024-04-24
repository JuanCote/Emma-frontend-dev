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
    store.dispatch('initializeState')
    const tutorial = store.getters.getTutorial
    if (!response && to.path !== '/auth') {
      next('/auth')
    } else if (!tutorial.done && response) {
      switch (tutorial.currentStep) {
        case 1:
          if (to.path != '/emma/settings/bot_settings') {
            next('/emma/settings/bot_settings')
          } else {
            next()
          }
        case 2:
          if (to.path != '/emma/settings/knowledge_base') {
            next('/emma/settings/knowledge_base')
          } else {
            next()
          }
        case 3:
          if (to.path != '/emma/bot_events') {
            next('/emma/bot_events')
          } else {
            next()
          }
        case 4:
          if (to.path != '/emma/bot_events/create_script') {
            next('/emma/bot_events/create_script')
          } else {
            next()
          }
        case 5:
          if (to.path != '/emma/settings/bot_settings') {
            next('/emma/settings/bot_settings')
          } else {
            next()
          }
      }
    } else  if (['/emma', '/emma/', '/'].includes(to.path)) {
      next('/emma/analytic')
    }else (
      next()
    )
  })
});
export default router
