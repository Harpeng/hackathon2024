<template>
    <component
      :is="tag"
      :disabled="disabled"
      :class="[{ 'ui-button--large': large }, variant]"
      v-bind="$attrs"
      class="ui-button"
      @click="click"
    >
      {{ title }}
    </component>
  </template>
  
  <script>
    export default {
      props: {
        title: {
          type: String,
          default: '',
        },
        large: {
          type: Boolean,
          default: false,
        },
        type: {
          type: String,
          default: 'button',
        },
        variant: {
          type: String,
          default: 'dark-primary',
        },
        disabled: {
          type: Boolean,
          default: false,
        },
        tag: {
          type: String,
          default: 'button',
        },
        hasIcon: {
          type: Boolean,
          default: false,
        },
        src: {
            type: String,
            default: '',
        },
      },
  
      methods: {
        click(event) {
          this.$emit('click', event);
        },
      },
    };
  </script>
  <style lang="scss"></style>
  