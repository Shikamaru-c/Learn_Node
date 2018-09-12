<template>
  <div class="manage">
    <v-title main="后台" sub="管理"></v-title>
    <error-message :errorMessage="errorMessage"></error-message>
    <articles-wrapper role="admin"></articles-wrapper>
  </div>
</template>

<script>
import Title from 'base/title/title'
import ArticlesWrapper from 'base/articles-wrapper/articles-wrapper'
import ErrorMessage from 'base/error-message/error-message'

export default {
  data () {
    return {
      errorMessage: ''
    }
  },
  created () {
    this.$bus.on('errorNotification', (errorMessage) => {
      this.errorMessage = errorMessage
    })
  },
  components: {
    VTitle: Title,
    ArticlesWrapper,
    ErrorMessage
  }
}
</script>

<style lang="scss">
  .manage {
    width: 600px;
    margin: 0 auto;
  }
</style>
