// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  build: {
    transpile: ['vue'],
  },

  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    contactEmail: process.env.CONTACT_EMAIL,
  },

  nitro: {
    static: true,
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
    externals: {
      inline: ['vue'],
    },
  },

  vite: {
    optimizeDeps: {
      include: ['vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/variables.scss" as *;
            @use "~/assets/scss/media_queries.scss" as *;
          `,
        },
      },
    },
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.icon' }
      ]
    }
  },

  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/eslint'],

  i18n: {
    vueI18n: './i18n.config.js',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
    ],
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    bundle: {
      fullInstall: true,
      dropMessageCompiler: false,
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },

  css: ['~/assets/scss/main.scss'],
})
