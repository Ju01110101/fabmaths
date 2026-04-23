<template>
  <div class="app">
    <div class="app-inner" :class="{ loading: store.loading }">
      <AppHeader />
      <div class="app-inner">
        <router-view />
      </div>
      <AppFooter />

      <!-- <CookieNotice v-if="showCookieNotice" /> -->
    </div>

    <LoadingOverlay v-if="loading" />
  </div>
</template>

<script setup>
import CookieNotice from '@/components/CookieNotice.vue'
import Cookies from 'js-cookie'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'

import { useMainStore } from '@/stores/mainStore'
const store = useMainStore()

const loading = computed(() => {
  return store.loading
})

// store.loading = true

const showCookieNotice = computed(() => {
  return store.showCookieNotice
})

const cookieWasDismissed = Cookies.get('cookie_notice_dismissed')
store.showCookieNotice = !cookieWasDismissed

const route = useRoute()
const path = computed(() => route.path)

/*
watch(path, () => {
  // store.loading = true
  // store.mobileMenuOpen = false
})
*/

watch(
  () => route.path,
  (path) => {
    console.log('route = ', path)
    document.body.className = ''
    if (path === '/about') document.body.classList.add('about')
    else if (route.path === '/landing-v01') document.body.classList.add('landing')
      else if (route.path === '/thank-you') document.body.classList.add('thank-you')
    else if (route.path === '/contact') document.body.classList.add('contact')
    else if (route.path === '/') document.body.classList.add('home')      
  },
  { immediate: true }
)
</script>
