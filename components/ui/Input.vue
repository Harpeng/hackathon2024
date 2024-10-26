<template>
  <div :class="['ui-field', `ui-field--${variant}`]">
    <label
      :for="id"
      :class="[
        'ui-field__label',
        `ui-field__label--${variant}`,
        'paragraph',
        'paragraph_utility',
      ]"
    >
      {{ label }}
    </label>
    <div
      :class="[
        'ui-field__input-container',
        `ui-field__input-container--${variant}`,
      ]"
    >
      <input
        :id="id"
        ref="input"
        :value="modelValue"
        :placeholder="placeholder"
        :type="type"
        :class="[
          'ui-field__input',
          `ui-field__input--${variant}`,
          { 'ui-field__input--error': errors.length },
        ]"
        @focus="focus"
        @blur="blur"
        @input="updateInput"
      />
      <span
        v-if="hasIcon"
        :class="['ui-field__icon', `ui-field__icon--${variant}`]"
      >
        <slot></slot>
      </span>
    </div>
    <p
      v-if="description"
      :class="['ui-field__desciption', `ui-field__description--${variant}`]"
    >
      {{ description }}
    </p>
    <div
      v-if="errors"
      :class="['ui-field__errors', `ui-field__errors--${variant}`, 'paragraph', 'paragraph_utility']"
    >
      <div v-for="elem of errors" :key="elem.$uid">
        <span>{{ elem.$message }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "auth",
      validator(type) {
        return ["auth", "search"].includes(type);
      },
    },
    type: {
      type: String,
      default: "text",
    },
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["input", "clear", "focus", "update:modelValue", "blur"],
  data() {
    return {
      isFocused: false,
      inputValue: this.modelValue,
    };
  },
  watch: {
    inputValue(newVal) {
      this.inputValue = newVal;
      this.$emit("input", newVal);
    },
  },
  methods: {
    focus(e) {
      this.isFocused = true;
      this.$emit("focus", e);
    },
    updateInput(event) {
      this.inputValue = event.target.value;
      this.$emit("update:modelValue", event.target.value);
    },
    blur(e) {
      this.isFocused = false;
      this.$emit("blur", e);
    },
  },
};
</script>
<style lang="scss">
.ui-field {
  position: relative;

  &__label--auth {
    width: fit-content;
    background-color: $white;
    color: $gray;
    position: absolute;
    top: -7px;
    left: 10px;
    z-index: 1;
  }

  &__input-container {
    position: relative;
  }

  &__input {
    height: 48px;
    border-radius: 14px;
    outline: none;
    border: 1px solid $gray;
    padding: 14.5px 20px;
    color: $black;
    font-weight: 500;
    font-size: 18px;
    line-height: 21.78px;

    &:focus {
      border-color: $purple-light;
    }

    &::placeholder {
      color: $gray;
    }

    &--error {
      border-color: $red;
      color: $red;
    }
  }

  &__icon {
    position: absolute;
    width: 24px;
    height: 90%;
    background-color: $white;
    top: 3px;
    right: 5%;
  }

  &__errors {
    margin-top: 2px;
    height: 15px;
    overflow-y: hidden;
    color: $red;
  }
}
</style>
