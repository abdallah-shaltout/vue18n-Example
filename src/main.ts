import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import i18n from './i18n'
import i18nPlugin from './plugins/i18n'
import type { Locale } from './i18n/translation'
import type { RouteLocationAsRelativeGeneric } from 'vue-router'
declare module 'vue' {
  interface ComponentCustomProperties {
    $localPath: (route: RouteLocationAsRelativeGeneric) => RouteLocationAsRelativeGeneric
    $switchLang: (lang: string) => void
  }
}

import '@/assets/css/master.css'

app.use(router).use(i18n).use(i18nPlugin).mount('#app')
