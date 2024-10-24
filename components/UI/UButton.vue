<template>
  <component class="ui-button" :tag="tag" :disabled="disabled" @click="click">
    {{ label }}
    <slot>
      <div v-if="icon" class="ui-button__icon">
        <inline-svg :src="icon" />
      </div>
    </slot>
  </component>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      default: "button",
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    icon: {
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
  cursor: pointer;
}

</style>
