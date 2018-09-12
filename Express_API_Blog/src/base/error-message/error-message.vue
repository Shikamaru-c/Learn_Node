<template>
  <div class="error-message">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .error-message {
    height: 20px;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    font-size: 20px;
    color: #4fc08d;
  }
</style>
