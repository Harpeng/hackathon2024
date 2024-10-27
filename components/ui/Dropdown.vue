<template>
  <div class="dropdown-container">
    <p :class="{ 'dropdown-text-invisible': isRedactor === true }">
      Ответственный:
    </p>
    <div :class="['dropdown', activeDropDown ? 'active' : '']">
      <div class="dropdown-title" @click="checkDropDown">
        <span>{{ getUser }}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10L11.3753 13.5002C11.7405 13.7924 12.2595 13.7924 12.6247 13.5002L17 10"
            stroke="#9E9E9E"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <ul class="dropdown-list">
        <li class="dropdown-item" :id="0" @click="select">Все юзеры</li>
        <li
          class="dropdown-item"
          v-for="item in list"
          :key="item.id"
          :id="item.id"
          @click="select"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isRedactor: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectId: 0,
      currentUser: "",
      list: [],
      activeDropDown: false,
    };
  },
  computed: {
    getUser() {
      return this.currentUser !== "" ? this.currentUser : "Все юзеры";
    },
  },
  methods: {
    getToken() {
      return localStorage.getItem("user").replace(/"/g, "");
    },
    async setList() {
      const { data } = await $fetch("https://coco-jamboo.ru/api/account", {
        headers: {
          authorization: "Bearer " + this.getToken(),
        },
      });
      this.list = data;
      this.selectId = this.list[0].id;
      this.$emit("responsible", this.selectId);
    },
    checkDropDown(event) {
      event.currentTarget.parentNode.classList.toggle("active");
    },
    select(event) {
      this.selectId = +event.currentTarget.id;

      const titleElement = document.querySelector(".dropdown-title span");
      this.currentUser = event.currentTarget.innerHTML;
      document.querySelector(".dropdown").classList.remove("active");
      this.$emit("responsible", this.selectId);
    },
  },

  async mounted() {
    await this.setList();
  },
};
</script>
<style lang="scss">
.dropdown-container {
  display: flex;
  align-items: center;
  gap: 20px;
  p {
    font-size: 1rem;
  }
}
.dropdown {
  position: relative;
  font-weight: 500;
  font-size: 1rem;
  width: 213px;
  cursor: pointer;
  &.active &-list {
    display: block;
  }

  &-text-invisible {
    display: none;
  }
  &-title {
    border: 1px solid $gray-light;
    border-radius: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  &-title,
  &-item {
    padding: 16px 20px;
  }
  &-list {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 120px;
    overflow-y: scroll;
    border: 1px solid $gray-light;
    border-radius: 14px;
  }
  &-item:hover {
    background: rgb(166, 74, 237, 0.3);
  }
}
</style>
