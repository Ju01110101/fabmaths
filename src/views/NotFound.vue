<template>
  <div class="wrap">
    <div class="container">
      <h1 class="heading-404">
        404
      </h1>
      <h2>
        Page not found..
      </h2>
      <p>
        The page you're looking for might have been abducted by aliens from outer space.
      </p>
      <p>
        Back to <a class="underline" href="/">home page</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore'
const store = useMainStore()

setTimeout(() => { store.loading = false}, 200)
</script>

<style lang="scss" scoped>
.heading-404 {
  padding: 80px 40px;
  background: #1d1815;
  display: inline-block;
  font-size: 60px;
  color: white;
  margin-bottom: 50px;
}
</style>
