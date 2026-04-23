import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'

function getUserLocale() {
  const lang = navigator.language || navigator.userLanguage
  if (lang.startsWith('fr')) return 'fr'
  if (lang.startsWith('es')) return 'es'
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: getUserLocale(),
  fallbackLocale: 'en',
  messages: { en, fr, es }
})
