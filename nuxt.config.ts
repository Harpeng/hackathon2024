// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  alias: {
    "@": resolve(__dirname, ""),
  },

  css: ["~/assets/main.scss"],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/vars/_colors.scss" as *;
          @use "@/assets/vars/_screen.scss" as *;
          @use "@/assets/vars/_size.scss" as *;
          @use "@/assets/vars/_text.scss" as *;`,
          api: "modern-compiler",
        },
      },
    },
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/axios",
    ['@nuxtjs/recaptcha', {
      siteKey: String,
    }]
  ],
});
