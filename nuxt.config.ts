// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";

export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, ""),
  },

  components: true,

  css: ["~/assets/main.scss"],

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
    ["@nuxtjs/google-fonts", {
      families: {
        Inter: [500, 700],
      }
    }],
  ],
  ui: {
    global: true,
    disableGlobalStyles: false,
  },

  compatibilityDate: "2024-10-25"
});
