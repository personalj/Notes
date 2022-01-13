<template>
  <div>
    <div class="mb-5">
      <div class="info">
        <div class="info__label mb-2">Add comment:</div>
        <b-form class="info__form w-100 p-4" @submit.prevent="onSubmit">
          <b-form-group label="Author name*" label-for="author">
            <b-form-input
              id="author"
              v-model="author"
              type="text"
              placeholder="Enter author name"
              class="info__input mb-2"
              :class="{
                invalid:
                  ($v.author.$dirty && !$v.author.required) || isErrorShown,
              }"
              @input="inputHandler"
            />
            <small
              v-if="$v.author.$dirty && !$v.author.required"
              class="invalid-message d-flex mb-3"
            >
              Required filed
            </small>
            <small v-else-if="isErrorShown" class="invalid-message d-flex mb-3">
              Field require minumum 2 words and should be capitalized
            </small>
          </b-form-group>
          <b-form-group label="Comment*" label-for="content">
            <b-form-textarea
              id="content"
              v-model="content"
              type="textarea"
              placeholder="Enter comment"
              class="info__input mb-2"
              :class="{
                invalid: $v.content.$dirty && !$v.content.required,
              }"
            />
            <small
              v-if="$v.content.$dirty && !$v.content.required"
              class="invalid-message d-flex mb-3"
            >
              Required filed
            </small>
          </b-form-group>
          <b-button type="submit" variant="primary"> Submit </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "createNote",
  data() {
    return {
      author: "",
      content: "",
      isAuthorNameValid: false,
      isErrorShown: false,
    };
  },
  computed: {
    serviceActive() {
      return this.$store.getters.service;
    },
  },
  methods: {
    checkAuthrName(value) {
      return value.trim().indexOf(" ") != -1;
    },
    checkUpperCase(char) {
      return !!/[A-Z]/.exec(char[0]);
    },
    checkCapital(value) {
      let err = false;
      const arr = value.split(" ");
      arr.forEach((item) => {
        if (item[0] && !this.checkUpperCase(item[0])) {
          err = true;
        }
      });
      return err;
    },
    inputHandler() {
      this.isErrorShown = false;
      if (this.author.length) {
        if (!this.checkAuthrName(this.author)) {
          this.isErrorShown = true;
          this.isAuthorNameValid = false;
          return;
        }
        if (this.checkCapital(this.author)) {
          this.isErrorShown = true;
          this.isAuthorNameValid = false;
          return;
        }
        this.isEmailValid = false;
        this.isEmailErrorShown = true;
        this.isAuthorNameValid = true;
      }
    },
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.isAuthorNameValid) {
        const formData = {
          id: new Date().getTime(),
          author: this.author,
          content: this.content,
          created_at: new Date(),
        };
        this.$emit("addComment", formData);
      }
    },
  },
  validations: {
    author: {
      required,
    },
    content: {
      required,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/info.scss";
.info {
  &__form {
    background: $secondaryGray;
  }
}
</style>
