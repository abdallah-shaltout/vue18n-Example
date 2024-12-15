import i18n from '@/i18n'
import type {
  NavigationGuardNext,
  RouteLocationAsRelativeGeneric,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
export const languages = [
  {
    code: 'ar',
    name: 'Arabic',
    htmlAttrs: {
      lang: 'ar',
      dir: 'rtl',
    },
  },
  {
    code: 'en',
    name: 'English',
    htmlAttrs: {
      lang: 'en',
      dir: 'ltr',
    },
  },
] as const

export type Locale = (typeof languages)[number]['code']

class LocaleManager {
  private static STORAGE_KEY = 'user-locale'

  static getCurrentLocale(): Locale {
    const storedLocale = localStorage.getItem(this.STORAGE_KEY) as Locale | null
    const browserLocale = navigator.language.split('-')[0] as Locale
    if (storedLocale && this.isValidLocale(storedLocale)) {
      return storedLocale
    }

    if (this.isValidLocale(browserLocale)) {
      return browserLocale
    }

    return import.meta.env.VITE_I18N_LOCALE
  }

  static setCurrentLocale(code: Locale) {
    if (!this.isValidLocale(code)) {
      console.warn(`Invalid locale: ${code}. Using default.`)
      code = import.meta.env.VITE_I18N_LOCALE
    }

    i18n.global.locale.value = code
    localStorage.setItem(this.STORAGE_KEY, code)
    const localeConfig = languages.find((l) => l.code === code)
    if (localeConfig) {
      document.documentElement.lang = localeConfig.htmlAttrs.lang
      document.documentElement.dir = localeConfig.htmlAttrs.dir
    }
  }

  private static isValidLocale(code: string): boolean {
    return languages.some((l) => l.code === code)
  }
}

function switchLanguage(code: string) {
  LocaleManager.setCurrentLocale((code as Locale) || import.meta.env.VITE_I18N_LOCALE)
}

function currentLocale(): Locale {
  return LocaleManager.getCurrentLocale()
}

function localPath(route: RouteLocationAsRelativeGeneric): RouteLocationAsRelativeGeneric {
  return {
    ...route,
    params: {
      ...route.params,
      locale: currentLocale() === import.meta.env.VITE_I18N_LOCALE ? 'ar' : currentLocale(),
    },
  }
}

function i18nRouteMiddleware(
  to: RouteLocationNormalizedGeneric,
  _from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) {
  const routeLang = to.params.locale as Locale

  switchLanguage(routeLang ?? currentLocale())

  next()
}

export { switchLanguage, currentLocale, localPath, i18nRouteMiddleware }
