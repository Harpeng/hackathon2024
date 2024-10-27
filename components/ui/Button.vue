<template>
  <component
    :is="tag"
    :disabled="disabled"
    :class="[
      'ui-button',
      `ui-button--${variant}`,
      { 'ui-button--opacity': modalBtn === true },
    ]"
    :style="{ color: textColor }"
    v-bind="$attrs"
    @click="click"
  >
    <div v-if="hasIcon">
      <slot></slot>
    </div>
    {{ title }}
  </component>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "button",
    },
    variant: {
      type: String,
      default: "purple",
      validator(variant) {
        return ["full-purple", "empty-purple", "link", "icon"].includes(
          variant
        );
      },
    },
    modalBtn: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: "button",
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    textColor: {
      type: String,
      default: "",
    },
  },

  methods: {
    click(event) {
      this.$emit("click", event);
    },
  },
};
</script>
<style lang="scss">
.ui-button {
  box-sizing: border-box;
  cursor: pointer;

  &--opacity {
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }

  &--full-purple {
    background-color: $purple-light;
    color: $white;
    border-radius: 14px;
    height: 46px;
    padding: 12px 24px;
    border: none;
    outline: none;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  &--empty-purple {
    background-color: transparent;
    color: $purple-light;
    border-radius: 14px;
    height: 46px;
    padding: 12px 24px;
    border: 1px solid $purple-light;
    outline: none;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  &--link {
    background-color: transparent;
    border: none;

    &:disabled {
      opacity: 0.5;
    }
  }

  &--icon {
    background-color: transparent;
    border: none;
  }
}
</style>
