// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  css: ['~/assets/main.scss'],
  extensions: [".js",".vue",".ts"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/vars/_colors.scss" as *;'
        }
      }
    },
  },

  modules: ['@nuxt/icon', '@nuxt/image', '@nuxtjs/google-fonts']
})