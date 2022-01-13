<template>
  <div class="comments" v-if="comments && comments.length">
    <div v-for="comment in comments" :key="comment.id" class="comment mb-3 p-2">
      <div class="d-flex align-items-center mb-1">
        <div class="comment__author mr-2">{{ comment.author }}</div>
        <small class="comment__date">
          {{ new Date(comment.created_at).toLocaleDateString() }} /
          {{ new Date(comment.created_at).toLocaleTimeString() }}
        </small>
      </div>
      <div class="comment__content mb-3">
        {{ comment.content }}
      </div>
    </div>
  </div>
  <div v-else>
    <div class="mb-2">No comments</div>
  </div>
</template>

<script>
export default {
  name: "comments",
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/vars.scss";
.comment {
  border: 1px solid $lightGray;
  &__date {
    font-size: 0.75rem;
    margin-left: 0.75rem;
  }
  &__author {
    font-weight: bold;
    color: $mainBlue;
    font-size: 0.9375rem;
  }
}
</style>
