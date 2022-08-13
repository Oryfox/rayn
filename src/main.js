import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import('./assets/base.css')

const app = createApp(App)
app.use(VueCookies)

app.use(router)

app.mount('#app')
router.push('/')