<template>
  <div class="settings">
    <div class="container">
      <h1 class="settings__heading mb-3">Choose service</h1>
      <b-form-group v-slot="{ ariaDescribedby }">
        <b-form-radio
          v-for="option in options"
          :key="option.id"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          :value="option.value"
          class="mb-1"
          @change="changeService(option.value)"
        >
          {{ option.name }}
        </b-form-radio>
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      selected: "",
      options: [
        { id: 0, name: "Firebase", value: "firebase" },
        { id: 1, name: "Localstorage", value: "localStorage" },
      ],
    };
  },
  computed: {
    serviceActive() {
      return this.$store.getters.service;
    },
  },
  methods: {
    changeService(service) {
      this.$store.commit("setService", service);
    },
  },
  mounted() {
    this.selected = this.serviceActive;
  },
};
</script>

<style lang="scss">
.settings {
  &__heading {
    font-size: 1.5rem;
  }
  .custom-control-label {
    margin-left: 0.5rem;
  }
}
</style>
