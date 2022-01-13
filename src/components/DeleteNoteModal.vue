<template>
  <div>
    <b-modal id="modal-delete-note" hide-footer hide-header>
      <div class="d-block text-center">
        <h3>Delete Note?</h3>
      </div>
      <b-button
        class="mt-3 w-100"
        variant="outline-primary"
        block
        @click="$bvModal.hide('modal-delete-note')"
        >Cancel</b-button
      >
      <b-button
        class="mt-2 w-100"
        variant="outline-danger"
        block
        @click="deleteNote"
        >Delete</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "deleteNoteModal",
  methods: {
    deleteNote() {
      this.$emit("deleteNote");
    },
  },
};
</script>
