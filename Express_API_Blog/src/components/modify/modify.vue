<template>
  <div class="modify">
    <v-title main="后台" sub="修改"></v-title>
    <error-message :errorMessage="errorMessage"></error-message>
    <writing-wrapper :modify="true"></writing-wrapper>
  </div>
</template>

<script>
import Title from 'base/title/title'
import WritingWrapper from 'base/writing-wrapper/writing-wrapper'
import ErrorMessage from 'base/error-message/error-message'

export default {
  data () {
    return {
      errorMessage: ''
    }
  },
  created () {
    this.$bus.on('errorNotification', message => {
      this.errorMessage = message
    })
  },
  components: {
    VTitle: Title,
    WritingWrapper,
    ErrorMessage
  }
}
</script>

<style lang="scss">
  .modify {
    text-align: center;
  }
</style>
