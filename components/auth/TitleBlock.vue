<template>
    <div class="title-block">
        <span class="title-block__span paragraph paragraph_strong" v-html="span" />
        <h1 class="title-block__title title title_h1" v-html="title"></h1>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        span: {
            type: String,
            required: true,
        }
    }
}
</script>
<style lang="scss">
.title-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    &__span {
        color: $purple-light;
    }
}
</style>