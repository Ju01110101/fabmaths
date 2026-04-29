<script setup>
const route = useRoute()

useHead({
  title: 'FabMaths - GCSE Maths tutoring in Birmingham',
  meta: [
    {
      name: 'description',
      content:
        "Struggling with GCSE Maths? FabMaths offers expert 1-to-1 tutoring in Birmingham, tailored to your child's needs. Book a session today!",
    },
  ],
  bodyAttrs: {
    class: computed(() => {
      const bodyClass = route.meta.bodyClass || route.name || 'default'
      return String(bodyClass)
    }),
  },
})
</script>

<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
