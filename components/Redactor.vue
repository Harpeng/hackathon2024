<template>
  <div class="redactor">
    <div class="redactor__title-editor--wrapper">
      <div class="redatcor__editor_area" ref="editorTitle" />
    </div>
    <div class="redactor__editor-wrapper">
      <div class="redatcor__editor_area" ref="editor" />
    </div>
    <div class="redactor__author-block">
      <span class="paragraph paragraph_main">Исполнитель</span>
      <Input class="redactor__author" placeholder="Введите ФИО исполнителя" />
    </div>
  </div>
</template>
<script>
import Input from "@/components/ui/Input.vue";
import Quill from "quill";
export default {
  components: { Input },
  data() {
    return {
      quillInstance: null,
      quillInstanceTitle: null,
      showToolbar: false,
      showToolbarTitle: false,
      editorContent: "",
      editorTitleContent: "",
    };
  },
  mounted() {
    this.quillInstance = new Quill(this.$refs.editor, {
      theme: "snow",
      placeholder: "Описание задачи",
      modules: {
        toolbar: [
          [{ header: [2, 3, false] }],
          ["bold", "italic", "underline"],
          ["link"],
        ],
      },
    });

    this.quillInstanceTitle = new Quill(this.$refs.editorTitle, {
      theme: "snow",
      placeholder: "Заголовок задачи",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
        ],
      },
    });

    this.quillInstance.on("text-change", () => {
      if (!this.showToolbar) {
        this.showToolbar = true;
        this.quillInstance.getModule("toolbar").container.style.display =
          "block";
      }
      this.editorContent = this.quillInstance.root.textContent;
      this.$emit("input", this.editorContent);
    });

    this.quillInstanceTitle.on("text-change", () => {
      if (!this.showToolbar) {
        this.showToolbarTitle = true;
        this.quillInstanceTitle.getModule("toolbar").container.style.display =
          "block";
      }
      this.editorTitleContent = this.quillInstanceTitle.root.textContent;
      console.log(this.editorTitleContent)
      this.$emit("inputTitle", this.editorTitleContent);
    });
  },
  beforeUnmount() {
    this.quillInstance = null;
  },
};
</script>
<style lang="scss">
@import "quill/dist/quill.snow.css";
.redactor {
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__text {
    border-radius: 14px;
    padding: 14.5px 20px;
    display: flex;
    outline: none;
    border: 1px solid $gray;
    color: $black;
    font-weight: 500;
    font-size: 18px;
    line-height: 21.78px;
    min-height: 126px;

    @media (max-width: 767px) {
      font-size: 16px;
      line-height: 19.36px;
    }

    &:focus {
      border-color: $purple-light;
    }

    &::placeholder {
      color: $gray;
    }
  }

  &__author-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__author {
    display: flex;
    align-self: center;

    .ui-field__input {
      width: 290px;
    }
  }

  &__editor {
    &-wrapper {
      display: flex;
      flex-direction: column-reverse;
      gap: 14px;

      .ql-container {
        max-width: 100%;
        border-radius: 14px;
        display: flex;
        flex-direction: column-reverse;
      }

      .ql-toolbar {
        max-width: 100%;
        padding: 0;
        border: none;
        display: none;
      }

      .ql-toolbar.ql-snow {
        padding: 0;
        border: none;
      }

      .ql-editor + .ql-blank::placeholder {
        font-family: "Inter";
        font-weight: 500;
        font-size: 18px;
        line-height: 21.78px;
      }

      .ql-container.ql-snow {
        border: none;
      }

      .ql-editor {
        border: 1px solid $gray;
        border-radius: 14px;
        height: fit-content;
      }

      .ql-editor:focus {
        border-color: $purple-light;
      }

      .ql-editor p {
        color: $black;
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 21.78px;
      }

      .ql-editor.ql-blank::before {
        color: $gray;
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 21.78px;
      }
    }
    &_area {
      min-height: 126px;
    }
  }

  &__title {
    &-editor--wrapper {
      display: flex;
      flex-direction: column-reverse;
      .ql-container {
        max-width: 100%;
        border-radius: 14px;
      }

      .ql-toolbar {
        max-width: 100%;
        padding: 0;
        border: none;
        display: none;
      }

      .ql-toolbar.ql-snow {
        padding: 0;
        border: none;
      }

      .ql-editor + .ql-blank::placeholder {
        font-family: "Inter";
        font-weight: 500;
        font-size: 18px;
        line-height: 21.78px;
      }

      .ql-container.ql-snow {
        border: none;
      }

      .ql-editor {
        border: 1px solid $gray;
        border-radius: 14px;
        height: fit-content;
      }

      .ql-editor:focus {
        border-color: $purple-light;
      }

      .ql-editor p {
        color: $black;
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 21.78px;
      }

      .ql-editor.ql-blank::before {
        color: $gray;
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 21.78px;
      }
    }
  }
}
</style>
