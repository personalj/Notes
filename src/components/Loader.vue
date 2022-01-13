<template>
  <div class="spinner w-100 h-100">
    <b-spinner class="spinner__inner"></b-spinner>
  </div>
</template>

<script>
export default {
  name: "loader",
};
</script>

<style lang="scss" scoped>
@import "@/assets/vars.scss";
.spinner {
  background: $mainWhite;
  position: fixed;
  top: 0;
  &__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1rem;
    margin-left: -1rem;
  }
}
</style>
