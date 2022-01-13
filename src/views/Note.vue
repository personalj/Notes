<template>
  <div>
    <loader v-if="isLoading" />
    <div>
      <div v-if="note" class="note">
        <div class="container">
          <b-button to="/" class="mb-4" variant="outline-primary" size="sm"
            >Back</b-button
          >
          <div class="note__title mb-2">
            {{ note.name }}
          </div>
          <div class="note__descr mb-2">
            {{ note.content }}
          </div>
          <div class="mb-1 d-flex justify-content-end">
            <div>
              <b-button
                variant="outline-primary"
                size="sm"
                class="m-1"
                @click="editNote(note.id)"
              >
                Edit
              </b-button>
              <b-button
                variant="outline-danger"
                size="sm"
                class="m-1"
                @click="$bvModal.show('modal-delete-note'), (noteId = note.id)"
              >
                Delete
              </b-button>
            </div>
          </div>
          <hr />
          <div class="m-1">
            <b-button
              variant="secondary"
              size="sm"
              class="mb-3"
              @click="isCommentFormShown = !isCommentFormShown"
            >
              {{
                isCommentFormShown ? "Hide Comment Form" : "Show Comment Form"
              }}
            </b-button>
            <div v-if="isCommentFormShown">
              <add-comment @addComment="addComment" />
            </div>
          </div>
          <div class="note__comments mb-2">
            <div class="note__comments-label mb-2">Comments:</div>
            <comments :comments="note.comments" />
          </div>
        </div>
        <delete-note-modal @deleteNote="deleteNote" />
      </div>
      <div v-else class="text-center">No note</div>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/Comments.vue";
import AddComment from "@/components/AddComment.vue";
import DeleteNoteModal from "@/components/DeleteNoteModal.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "note",
  components: {
    Comments,
    AddComment,
    DeleteNoteModal,
    Loader,
  },
  data() {
    return {
      isCommentFormShown: false,
      noteId: null,
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
    async addComment(comment) {
      try {
        await this.$store.dispatch(`${this.serviceActive}/addComment`, {
          noteId: this.note.id,
          comment: comment,
        });
      } catch (e) {
        console.log(e);
      }
    },
    editNote(id) {
      this.$router.push(`/edit-note/${id}`);
    },
    delete(id) {
      this.noteId = id;
    },
    async deleteNote() {
      try {
        await this.$store.dispatch(
          `${this.serviceActive}/deleteNote`,
          this.noteId
        );
        this.$router.push("/").catch(() => {});
      } catch (e) {
        console.log(e);
      }
    },
  },
  async created() {
    try {
      if (!this.note) {
        await this.$store.dispatch(`${this.serviceActive}/getNotes`);
      }
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss" scoped>
.note {
  &__title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  &__comments-label {
    font-size: 0.875rem;
    font-weight: bold;
  }
}
</style>
