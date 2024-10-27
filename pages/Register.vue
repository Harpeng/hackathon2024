<template>
  <div class="register">
    <div class="register__container">
      <AuthTitleBlock title="Добро пожаловать" span="Регистрация" />
      <AuthForm />
    </div>
  </div>
</template>
<script>
import AuthTitleBlock from "@/components/auth/TitleBlock.vue";
import AuthForm from "@/components/auth/Form.vue";

export default {
  components: { AuthTitleBlock, AuthForm },
};
</script>
<style lang="scss">
.register {
  height: 100vh;
  padding: 50px 15px;

  @include media-xs-min {
    padding: 5vw 15px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
    max-width: 680px;
    margin: 0 auto;
  }

  &__icon {
    position: relative;
    top: 20%;
    left: 10%;
    display: block;
    background-image: url("/assets/images/eye.svg");
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
