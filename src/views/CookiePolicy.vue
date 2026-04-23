<template>
  <div class="wrap">
    <div class="container">
      <h1>
        Cookie policy
      </h1>
      <h2>
        Analytics Cookies
      </h2>
      <p>
        The cookies used on this website aim at collecting information about traffic and how users use the site. The information gathered does not identify any individual visitor. It is aggregated and therefore anonymous. It includes the number of visitors to the site, the websites that referred them to it, the pages that they visited on it, what time of the day they visited it, whether they have visited it before, and other similar information.
      </p>
      <p>
        I use this information to help operate my website more efficiently, to gather broad demographic information and to monitor the level of activity on it. I use Google Analytics for this purpose. Google Analytics uses its own cookies.
      </p>
      <p>
        See more about these cookies <a target="_blank" class="underline" href="http://www.google.com/policies/privacy/partners/">here</a>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore'
const store = useMainStore()

setTimeout(() => { store.loading = false}, 200)
</script>
