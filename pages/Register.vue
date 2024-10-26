<template>
  <div class="register">
    <div class="register__container">
      <AuthTitleBlock title="Добро пожаловать" span="Регистрация" />
      <Input label="ФИО" hasIcon>
        <i class="register__icon"></i>
      </Input>
    </div>
  </div>
</template>
<script>
import AuthTitleBlock from "@/components/auth/TitleBlock.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";

export default {
  components: { AuthTitleBlock, Button, Input },
};
</script>
<style lang="scss">
.register {
  padding: 231px 15px;

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
    background-image: url('/assets/images/eye.svg');
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
