<template>
  <div>
    <loader v-if="isLoading" />
    <div v-else class="container mt-2">
      <b-button to="/" class="mb-4" variant="outline-primary" size="sm"
        >Back</b-button
      >
      <div class="info d-flex justify-content-center align-items-center">
        <b-form class="info__form w-100 mx-auto" @submit.prevent="onSubmit">
          <h1 class="mb-2">Edit Note</h1>
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
import Loader from "@/components/Loader.vue";

export default {
  name: "editNote",
  components: {
    Loader,
  },
  data() {
    return {
      name: "",
      content: "",
      isLoading: true,
    };
  },
  computed: {
    serviceActive() {
      return this.$store.getters.service;
    },
    note() {
      return this.$store.getters[`${this.serviceActive}/notes`].find(
        (item) => item.id == this.$route.params.id
      );
    },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        id: this.note.id,
        name: this.name,
        content: this.content,
        comments: this.note.comments,
      };
      try {
        await this.$store.dispatch(
          `${this.serviceActive}/updateNote`,
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
  async mounted() {
    try {
      if (!this.note) {
        await this.$store.dispatch(`${this.serviceActive}/getNotes`);
      }
      this.name = this.note.name;
      this.content = this.note.content;
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/info.scss";
.info {
  height: calc(100vh - 10rem);
}
</style>
