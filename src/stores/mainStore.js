import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    showCookieNotice: false,
    showCaseStudies: false,
    mobileMenuOpen: false,
    loading: false
  }),
})
