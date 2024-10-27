<template>
  <section class="main-modal" @click="closeModal">
    <div class="main-modal__back" />
    <div
      class="main-modal__container"
      :class="{ isActive: isModal === true }"
      @click.stop.prevent
    >
      <div class="main-modal__wrapper">
        <div class="main-modal__header">
          <Button variant="icon" hasIcon @click="closeModal">
            <i class="main-modal__close" />
          </Button>
          <span class="main-modal__title paragraph paragraph_main">{{
            title
          }}</span>
        </div>
        <slot></slot>
      </div>
      <div class="main-modal__footer">
        <Button
          :variant="variantLeftBtn"
          :textColor="textColorLeftBtn"
          :title="textLeftBtn"
        />
        <Button
          :variant="variantRightBtn"
          :textColor="textColorRightBtn"
          :title="textRightBtn"
          modalBtn
        />
      </div>
    </div>
  </section>
</template>
<script>
import Button from "@/components/ui/Button.vue";
export default {
  components: { Button },
  props: {
    modalOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    variantLeftBtn: {
      type: String,
      required: true,
    },
    variantRightBtn: {
      type: String,
      required: true,
    },
    textColorLeftBtn: {
      type: String,
      required: true,
    },
    textColorRightBtn: {
      type: String,
      required: true,
    },
    textLeftBtn: {
      type: String,
      required: true,
    },
    textRightBtn: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isModal: this.modalOpen,
    };
  },
  methods: {
    closeModal() {
      this.isModal = false;
      this.$emit("isCloseModal", this.isModal);
    },
  },
};
</script>
<style lang="scss">
.main-modal {
  cursor: default;
  height: 0;
  padding: 0 !important;
  &__back {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: $black !important;
    padding: 0;
    opacity: 0.2;
    z-index: 1;
  }

  &__container {
    background-color: $white !important;
    max-width: 613px;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 30px 30px 40px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    transform: translateX(100%);
    transition: transform 1s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 768px) {
      max-width: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  &__container.isActive {
    transform: translateX(0);
    transition: transform 1s ease;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__close {
    display: block;
    background-image: url("/assets/images/close.svg");
    background-repeat: no-repeat;
    background-position: center;
    width: 24px;
    height: 24px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
