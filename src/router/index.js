import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/Main.vue"
import Emma from "@/views/Emma.vue"
import Auth from "@/views/Auth.vue"
import store from "../store/index.js"

const router = createRouter({
  history: createWebHistory('/Emma-frontend-dev/'),
  routes: [
    {
      path: `/`,
      component: Main
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
  if (to.path != '/') {
    store.dispatch('checkUser').then((response) => {
      store.dispatch('initializeState')
      const tutorial = store.getters.getTutorial
      if (!response && to.path !== '/auth') {
        next('/auth')
      } else if (!tutorial.done && response) {
        switch (tutorial.currentStep) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            if (to.path != '/emma/settings/knowledge_base') {
              next('/emma/settings/knowledge_base')
            } else {
              next()
            }
            break
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            store.dispatch('setNextStep', {step: 0, currentStep: 9})
            if (to.path != '/emma/bot_events/create_script') {
              next('/emma/bot_events/create_script')
            } else {
              next()
            }
            break
          case 8:
            if (to.path != '/emma/bot_events') {
              next('/emma/bot_events')
            } else {
              next()
            }
            break
          case 14:
          case 15:
          case 16:
          case 17:
            if (to.path != '/emma/bot_events' && to.path != '/emma/bot_events/create_script') {
              next('/emma/bot_events')
            } else {
              next()
            }
            break
            case 18:
            case 19:
            case 20:
            case 21:
              if (to.path != '/emma/settings/bot_settings/widget') {
                next('/emma/settings/bot_settings/widget')
              } else {
                next()
              }
              break

            case 22:
              if (to.path != '/emma/settings/bot_settings/telegram') {
                next('/emma/settings/bot_settings/telegram')
              } else {
                next()
              }
            case 24:
              if (to.path != '/emma/all_bots') {
                next('/emma/all_bots')
              } else {
                next()
              }
        } 
      } else  if (['/emma', '/emma/', '/'].includes(to.path)) {
        next('/emma/all_bots')
      }else (
        next()
      )
    })
  }else {
    next()
  }
});
export default router
