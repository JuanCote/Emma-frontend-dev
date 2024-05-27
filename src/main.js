import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vue3GoogleLogin from 'vue3-google-login'
import './styles.css';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App)

app.component('QuillEditor', QuillEditor)
app.use(router)
app.use(store)
app.use(vue3GoogleLogin, {
    'clientId': '148016884149-up69degi8qlsk08gm1m7e8sh57ckqe42.apps.googleusercontent.com',
})
app.mount('#app')
