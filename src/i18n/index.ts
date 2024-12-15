import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'

export default createI18n({
  locale: import.meta.env.VITE_I18N_LOCALE,
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: { en, ar },
})
