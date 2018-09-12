<template>
  <div class="writing-wrapper">
    <label for="title">
      <input v-model="title" type="text" id="title">
    </label>
    <textarea @input="inputHandle" v-model="content" class="writing-area"></textarea>
    <div class="preview-area markdown-body" ref="previewArea"></div>
    <div class="btn-group">
      <button class="preview" @click="previewHandle">预览</button>
      <button class="auto-preview"
        @click="autoPreview = !autoPreview"
        :class="{ opening: autoPreview }"
      >
        {{ autoPreview ? "取消实时预览" : "开启实时预览" }}
      </button>
      <button v-if="!modify" class="submit" @click="publishHandle">发表</button>
      <button v-else class="submit" @click="modifyHandle">提交修改</button>
    </div>
  </div>
</template>

<script>
import getArticle from 'api/getArticle'
import {ERR_OK} from 'api/config'
import publishArticle from 'api/publishArticle'
import modifyArticle from 'api/modifyArticle'
import marked from 'marked'

export default {
  props: {
    modify: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: '',
      content: '',
      autoPreview: false
    }
  },
  created () {
    if (this.modify) {
      this.id = this.$route.params.id
      getArticle(this.id).then(res => {
        if (res.ERR_NUM === ERR_OK) {
          let article = res.data
          this.title = article.title
          this.content = article.content
        }
      })
    }
  },
  methods: {
    publishHandle () {
      let article = {}
      if (!this.title || !this.content) return
      article.title = this.title
      article.content = this.content
      publishArticle(article).then(res => {
        if (res.ERR_NUM === ERR_OK) {
          this.$router.push('/admin/manage')
        } else {
          this.$bus.emit('errorNotification', res.errorMessage)
        }
      })
    },

    modifyHandle () {
      let article = {}
      if (!this.title || !this.content) return
      article.title = this.title
      article.content = this.content
      modifyArticle(article, this.id).then(res => {
        if (res.ERR_NUM === ERR_OK) {
          this.$router.push('/admin/manage')
        } else {
          this.$bus.emit('errorNotification', res.errorMessage)
        }
      })
    },

    previewHandle () {
      this.$refs.previewArea.innerHTML = marked(this.content)
    },

    inputHandle () {
      if (this.autoPreview) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.previewArea.innerHTML = marked(this.content)
        }, 300)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .writing-wrapper {
    label {
      display: block;
      margin-bottom: 20px;
      #title {
        width: 300px;
        height: 24px;
        padding: 5px 15px;
        border: 1px solid #ccc;
        font-size: 20px;
        transition: all 0.7s;
        &:focus {
          width: 480px;
          border-color: #4fc08d;
        }
      }
    }
    .writing-area {
      width: 560px;
      height: 700px;
      padding: 20px;
      border: 1px solid #ccc;
      font-size: 18px;
      resize: none;
      &:focus {
        border-color: #4fc08d;
      }
    }
    .preview-area {
      display: inline-block;
      width: 560px;
      height: 700px;
      padding: 20px;
      border: 1px solid #ccc;
      text-align: left;
      overflow: auto;
    }
    .btn-group {
      margin-top: 20px;
      button {
        padding: 5px 20px;
        letter-spacing: 2px;
        text-indent: 2px;
        border: 1px solid #ccc;
        background: transparent;
        transition: all 0.7s;
        &.opening {
          color: #fff;
          background: red;
        }
        &:hover {
          border-color: transparent;
          color: #fff;
          background: #4fc08d;
        }
      }
    }
  }
</style>
