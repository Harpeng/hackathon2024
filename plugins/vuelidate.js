import { useVuelidate } from '@vuelidate/core'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      vuelidate: useVuelidate
    }
  }
})