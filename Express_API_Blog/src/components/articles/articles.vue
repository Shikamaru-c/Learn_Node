<template>
  <div class="articles">
    <v-title main="岑超超" sub="Web 前端"></v-title>
    <articles-wrapper></articles-wrapper>
  </div>
</template>

<script>
import Title from 'base/title/title'
import ArticlesWrapper from 'base/articles-wrapper/articles-wrapper'

export default {
  components: {
    VTitle: Title,
    ArticlesWrapper
  }
}
</script>

<style lang="scss">
  .articles {
    width: 600px;
    margin: 0 auto;
  }
</style>
