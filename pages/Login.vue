<template>
    <div class="login">
      <div class="login__container">
        <AuthTitleBlock title="Рады видеть вас снова" span="Авторизация" />
        <AuthLoginForm />
      </div>
    </div>
  </template>
  <script>
  import AuthTitleBlock from "@/components/auth/TitleBlock.vue";
  import AuthLoginForm from "@/components/auth/LoginForm.vue";
  
  export default {
    components: { AuthTitleBlock, AuthLoginForm },
  };
  </script>
  <style lang="scss">
  .login {
    height: 100vh;
    padding: 100px 15px;
  
    @include media-xs-min {
      padding: 12vw 15px;
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
  