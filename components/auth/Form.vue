<template>
  <form
    ref="form"
    class="form"
    type="submit"
    @submit.prevent="sendForm"
    @keydown="handleKeyDown"
  >
    <fieldset class="form__container">
      <Input
        required
        id="full_name"
        v-model="v$.full_name.$model"
        label="ФИО"
        :errors="v$.full_name.$errors"
        :errorMessages="v$.full_name.errors"
        @blur="makeFieldDirty('full_name')"
      />
      <Input
        required
        id="login"
        v-model="v$.login.$model"
        label="Логин"
        :errors="v$.login.$errors"
        :errorMessages="v$.login.errors"
        @blur="makeFieldDirty('login')"
      />
      <Input
        required
        id="password"
        v-model="v$.password.$model"
        label="Пароль"
        :type="isTypePassword"
        hasIcon
        :errors="v$.password.$errors"
        :errorMessages="v$.password.errors"
        @blur="makeFieldDirty('password')"
      >
        <i
          v-if="isTypePassword === 'password'"
          class="form__icon form__icon_eye"
          @click="togglePasswordVisibility"
        />
        <i
          v-else
          class="form__icon form__icon_hint"
          @click="togglePasswordVisibility"
        />
      </Input>
      <Input
        required
        id="confirmed_password"
        v-model="v$.confirmed_password.$model"
        label="Повторите пароль"
        :type="isTypeConfirm"
        hasIcon
        :errors="v$.confirmed_password.$errors"
        :errorMessages="v$.confirmed_password.errors"
        @blur="makeFieldDirty('confirmed_password')"
      >
        <i
          v-if="isTypeConfirm === 'password'"
          class="form__icon form__icon_eye"
          @click="toggleConfirmPasswordVisibility"
        />
        <i
          v-else
          class="form__icon form__icon_hint"
          @click="toggleConfirmPasswordVisibility"
        />
      </Input>
    </fieldset>
    <AuthSubmitBlock
      link="Войти"
      text="в существующий аккаунт"
      nav="/login"
      :disabled="isDisabled"
    />
  </form>
</template>
<script>
import Input from "@/components/ui/Input.vue";
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { maxLength, minLength, required, helpers } from "@vuelidate/validators";

export default {
  components: { Input },
  setup() {
    const state = reactive({
      full_name: "",
      login: "",
      password: "",
      confirmed_password: "",
    });

    const validateParam = {
      requiredField: helpers.withMessage("Заполните поле", required),
      minLengthField: helpers.withMessage("Минимум 3 символа", minLength(3)),
      maxLengthField: helpers.withMessage(
        "Максимум 20 символов",
        maxLength(20)
      ),
      maxNameLength: helpers.withMessage("Максимум 50 символов", maxLength(50)),
    };

    const rules = {
      full_name: {
        required: validateParam.requiredField,
        minLength: validateParam.minLengthField,
        maxLength: validateParam.maxNameLength,
        alpha: helpers.withMessage(
          "На кириллице",
          helpers.regex(/^[а-яА-Я ']*$/)
        ),
      },
      login: {
        required: validateParam.requiredField,
        minLength: validateParam.minLengthField,
        maxLength: validateParam.maxLengthField,
        alpha: helpers.withMessage(
          "Недопустимый символ",
          helpers.regex(/^[а-яА-Яa-zA-Z0-9 '-]*$/)
        ),
      },
      password: {
        required: validateParam.requiredField,
        minLength: validateParam.minLengthField,
        maxLength: validateParam.maxLengthField,
        alpha: helpers.withMessage(
          "Недопустимый символ",
          helpers.regex(/^[а-яА-Яa-zA-Z0-9 '-]*$/)
        ),
      },
      confirmed_password: {
        required: validateParam.requiredField,
        minLength: validateParam.minLengthField,
        maxLength: validateParam.maxLengthField,
        alpha: helpers.withMessage(
          "Недопустимый символ",
          helpers.regex(/^[а-яА-Яa-zA-Z0-9 '-]*$/)
        ),
      },
    };

    const v$ = useVuelidate(rules, state);

    return { ...toRefs(state), v$ };
  },
  data() {
    return {
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  computed: {
    isDisabled() {
      return this.v$.$invalid || this.v$.password.$model !== this.v$.confirmed_password.$model;
    },
    isTypePassword() {
      return this.showPassword === true ? "text" : "password";
    },
    isTypeConfirm() {
      return this.showConfirmPassword === true ? "text" : "password";
    },
  },
  methods: {
    showToast() {
      this.$toast.open({
        message: "Успешная регистрация",
        position: "top-right",
        type: "success",
      });
    },
    showToastError(error) {
      this.$toast.open({
        message: error,
        position: "top-right",
        type: "error",
      });
    },
    handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    },
    makeFieldDirty(field) {
      this.v$[field].$touch();
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    async sendForm() {
      const formData = {
        full_name: this.v$.full_name.$model,
        login: this.v$.login.$model,
        password: this.v$.password.$model,
        confirmed_password: this.v$.confirmed_password.$model,
      };

      try {
        if (this.isDisabled) {
          this.v$.$invalid();
          return;
        }

        this.loading = true;

        const response = await axios.post(
          `https://coco-jamboo.ru/api/register`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { status, data } = response.data;
        if (status === "success") {
          const token = data.token;
          localStorage.setItem("user", JSON.stringify(token));
        }

        Object.keys(formData).forEach((key) => {
          this[key] = null;
          this.v$[key].$dirty = false;
        });
        this.showToast();
        setTimeout(() => {
          this.$router.push({
            path: "/login",
          });
        }, 3000);
      } catch (err) {
        if (err) {
          const errors = err.response?.data?.message;
          this.showToastError(errors);
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss">
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 0;
    border: none;
    margin: 0;
  }

  &__icon {
    position: relative;
    top: 20%;
    display: block;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    &_eye {
      background-image: url("/assets/images/eye.svg");
    }
    &_hint {
      background-image: url("/assets/images/hide.svg");
    }
  }
}
</style>
