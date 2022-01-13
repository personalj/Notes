<template>
  <div class="notes">
    <loader v-if="isLoading" />
    <div v-else class="container">
      <h1 v-if="notes.length" class="mb-4">All notes</h1>
      <notes-list :notes="notes" />
    </div>
  </div>
</template>

<script>
import NotesList from "@/components/NotesList.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "Home",
  components: {
    NotesList,
    Loader,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    serviceActive() {
      return this.$store.getters.service;
    },
    notes() {
      return this.$store.getters[`${this.serviceActive}/notes`];
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch(`${this.serviceActive}/getNotes`);
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss">
.notes {
  &__content {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
}
</style>
