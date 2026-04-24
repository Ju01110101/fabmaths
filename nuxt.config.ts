// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2025-07-15",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  nitro: {
    static: true,
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  modules: ["@pinia/nuxt"],
});
