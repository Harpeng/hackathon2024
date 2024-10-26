// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";

export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, ""),
  },

  css: ["~/assets/main.scss"],

  postcss: {
    plugins: {
      tailwindcss: {},
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
    "@nuxt/image",
    '@nuxt/icon',
    ["@nuxtjs/google-fonts", {
      families: {
        Inter: [500, 700],
        display: 'swap',
      }
    }],
    "@nuxt/ui"
  ],
  ui: {
    global: true,
    disableGlobalStyles: false,
  },

  compatibilityDate: "2024-10-25"
});