<template>
  <div :class="{ 'ui-input': true, 'ui-input--disabled': disabled }">
    <label v-if="label" :for="id" class="ui-input__label">
      {{ label }}
      <sup v-if="required" class="ut-input__mark">*</sup>
    </label>
    <input
      :id="id"
      ref="input"
      :value="modelValue"
      :type="type"
      class="ui-input__input"
      disabled
      @focus="focus"
      @blur="blur"
      @input="updateInput"
    />
    <p v-if="description" class="ui-input__description">
      {{ description }}
    </p>
    <div class="ui-input__error">
      <div v-for="elem of errors" :key="elem.$uid">
        <span>{{ elem.$message }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
    errorSize: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: "",
    },
    name: {
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
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "tel", "email", "password"].includes(value);
      },
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
.ui-input {
  display: flex;
  flex-direction: column;

  &__label {
    display: flex;
    gap: 2px;
  }

  &__mark {
  top: 0;
}

&__input {
  box-sizing: border-box;
  margin-top: 10px;
  width: 100%;
  height: 45px;
  padding: 7px 15px 8px;
  border-radius: 5px;
  z-index: 0;
}

&__error {
  margin-top: 2px;
  height: 15px;
  overflow-y: hidden;
}

&__description {
  padding-top: 4px;
}


}
</style>
