<template>
  <div>
    <div v-if="notes.length">
      <div class="row">
        <div
          v-for="note in notes"
          :key="note.id"
          class="notes__item col-sm-6 col-md-4"
        >
          <b-card :title="note.name" tag="article" class="mb-2">
            <b-card-text class="notes__content">
              {{ note.content }}
            </b-card-text>
            <b-button variant="primary" size="sm" @click="getNote(note.id)">
              More info
            </b-button>
          </b-card>
        </div>
      </div>
    </div>
    <div v-else class="text-center">No Notes available</div>
  </div>
</template>

<script>
export default {
  name: "notes",
  props: {
    notes: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getNote(id) {
      this.$router.push(`/note/${id}`);
    },
  },
};
</script>
