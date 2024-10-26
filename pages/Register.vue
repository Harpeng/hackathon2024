<template>
    <div class="register">
        <div class="register__container">
            <AuthTitleBlock title="Добро пожаловать" span="Регистрация" />
        </div>
    </div>
</template>
<script>
import AuthTitleBlock from '@/components/auth/TitleBlock.vue';
import Button from '@/components/ui/Button.vue';

export default {
    components: { AuthTitleBlock, Button },
}

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
    }
</style>