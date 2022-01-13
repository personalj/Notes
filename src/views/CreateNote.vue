<template>
  <div>
    <div class="container mt-2">
      <div class="info d-flex justify-content-center align-items-center">
        <b-form class="info__form w-100 mx-auto" @submit.prevent="onSubmit">
          <h1 class="mb-2">Create Note</h1>
          <b-form-group label="Note title*" label-for="name">
            <b-form-input
              id="name"
              v-model="name"
              type="text"
              placeholder="Enter note title"
              class="info__input mb-2"
              :class="{
                invalid: $v.name.$dirty && !$v.name.required,
              }"
            />
            <small
              v-if="$v.name.$dirty && !$v.name.required"
              class="invalid-message d-flex mb-3"
            >
              Required filed
            </small>
          </b-form-group>
          <b-form-group label="Note content*" label-for="content">
            <b-form-textarea
              id="content"
              v-model="content"
              type="textarea"
              placeholder="Enter note content"
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
      name: "",
      content: "",
    };
  },
  computed: {
    serviceActive() {
      return this.$store.getters.service;
    },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        id: new Date().getTime().toString(),
        name: this.name,
        content: this.content,
        comments: [],
      };
      try {
        await this.$store.dispatch(
          `${this.serviceActive}/createNote`,
          formData
        );
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
  validations: {
    name: {
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
  height: calc(100vh - 10rem);
}
</style>
