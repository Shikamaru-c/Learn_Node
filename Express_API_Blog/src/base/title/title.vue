<template>
  <div class="title">
    <span class="main">{{ main }}</span>
    <span class="sub">{{ sub }}</span>
  </div>
</template>

<script>
export default {
  props: {
    main: {
      type: String
    },
    sub: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    margin-bottom: 24px;
    .main {
      font-size: 36px;
      margin-right: 12px;
      font-weight: 300;
    }
    .sub {
      font-size: 24px;
    }
  }
</style>
