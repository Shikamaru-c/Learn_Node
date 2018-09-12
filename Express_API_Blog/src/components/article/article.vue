<template>
  <div class="article">
    <div class="title">
      <h1>{{ article.title }}</h1>
      <h4>{{ article.date }}</h4>
    </div>
    <div class="content">
      <div class="markdown-body" v-html="article.content">
      </div>
    </div>
  </div>
</template>

<script>
import getArticle from 'api/getArticle'
import {ERR_OK} from 'api/config'
import marked from 'marked'

export default {
  data () {
    return {
      article: {}
    }
  },
  created () {
    let id = this.$route.params.id
    getArticle(id).then(res => {
      if (res.ERR_NUM === ERR_OK) {
        res.data.content = marked(res.data.content)
        this.article = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .article {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    .title {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      h1 {
        padding-left: 12px;
        font-size: 36px;
        font-weight: 500;
      }
      h4 {
        padding-top: 20px;
        padding-left: 20px;
        font-size: 14px;
        font-weight: 300;
      }
    }
    .content {
      margin: 30px 20px 100px;
    }
  }
</style>
