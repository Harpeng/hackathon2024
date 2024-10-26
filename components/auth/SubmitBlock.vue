<template>
  <div class="submit-block" :class="{ 'submit-block_login': isLogin === true }">
    <Button
      :disabled="disabled"
      type="submit"
      class="submit-block__button"
      :class="{ 'submit-block__button_login': isLogin === true }"
      :title="titleButton"
      variant="full-purple"
    />
    <p
      class="submit-block__text paragraph paragraph_main"
      :class="{ 'submit-block__text_reverse': isLogin === true }"
    >
      <NuxtLink class="submit-block__link" :to="nav">{{ link }}</NuxtLink>
      {{ text }}
    </p>
  </div>
</template>
<script>
import Button from "@/components/ui/Button.vue";
export default {
  components: { Button },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
    nav: {
      type: String,
      required: true,
    },
  },
  computed: {
    titleButton() {
      return this.isLogin === true ? "Войти" : "Зарегистрироваться";
    },
  },
};
</script>
<style lang="scss">
.submit-block {
  max-width: 292px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  &_login {
    max-width: 314px;
  }

  &__button {
    max-width: 235px;

    &_login {
      width: 280px;
    }
  }

  &__text {
    color: $gray;
    display: flex;
    gap: 5px;

    &_reverse {
      flex-direction: row-reverse;
    }
  }

  &__link {
    cursor: pointer;
    color: $purple-light;
  }
}
</style>
