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
          :class="{'main-modal_invisible': headerModal === true}"
          v-if="variantLeftBtn !== ''"
          :variant="variantLeftBtn"
          :textColor="textColorLeftBtn"
          :title="textLeftBtn"
          @click="sendData"
        />
        <Button
          v-if="variantRightBtn !== ''"
          :variant="variantRightBtn"
          :textColor="textColorRightBtn"
          :title="textRightBtn"
          modalBtn
          @click="closeModal"
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
    headerModal: {
        type: Boolean,
        default: false,
    },
    title: {
      type: String,
    },
    variantLeftBtn: {
      type: String,
    },
    variantRightBtn: {
      type: String,
    },
    textColorLeftBtn: {
      type: String,
    },
    textColorRightBtn: {
      type: String,
    },
    textLeftBtn: {
      type: String,
    },
    textRightBtn: {
      type: String,
    },
    titleContent: {
      type: String,
      default: "",
    },
    textContent: {
      type: String,
      default: "",
    },
    status: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: "",
      validator(val) {
        return ["register"].includes(val);
      },
    },
    id: {
      type: Number,
      default: null,
    },
    userId: {
      type: Number,
      default: null,
    },
    apiMethod: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isModal: this.modalOpen,
      data: null,
    };
  },
  methods: {
    closeModal() {
      this.isModal = false;
      this.$emit("isCloseModal", this.isModal);
    },
    getToken() {
      return localStorage.getItem("user").replace(/"/g, "");
    },
    async sendData() {
      try {
        switch (true) {
          case this.type === "register":
            this.data = {
              title: this.titleContent,
              body: this.textContent,
              task_status_id: this.id,
            };
          default:
            break;
        }
        const { res } = await $fetch(
          `https://coco-jamboo.ru/api/tasks/${this.id}`,
          {
            method: this.apiMethod,
            headers: {
              authorization: "Bearer " + this.getToken(),
              contentType: "application/json",
            },
            body: {
              title: this.titleContent,
              body: this.textContent,
              task_status_id: this.status,
              performer_id: this.userId,
            },
          }
        );
        this.closeModal();
      } catch (err) {
        const errors = err.response?.data?.message;
      }
    },
  },
};
</script>
<style lang="scss">
.main-modal {
  cursor: default;
  height: 0;
  padding: 0 !important;

  &_invisible {
    display: none;
  }
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
