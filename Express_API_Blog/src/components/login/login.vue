<template>
  <div class="login">
    <v-title main="后台" sub="登录"></v-title>
    <error-message :errorMessage="errorMessage"></error-message>
    <label for="account">
      <input v-model="account" type="text" id="account" placeholder="帐号">
    </label>
    <label for="password">
      <input v-model="password" type="password" id="password" placeholder="密码">
    </label>
    <button @click="loginHandle">登录</button>
  </div>
</template>

<script>
import Title from 'base/title/title'
import login from 'api/login'
import {ERR_OK} from 'api/config'
import ErrorMessage from 'base/error-message/error-message'

export default {
  data () {
    return {
      account: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    loginHandle () {
      let user = {}
      if (!this.account || !this.password) return
      user.account = this.account
      user.password = this.password
      login(user).then(res => {
        if (res.ERR_NUM === ERR_OK) {
          this.$bus.emit('userLogin', res.user) // vue-bus 传给 header 数据
          this.$router.push({path: '/'})
        } else {
          this.errorMessage = res.errorMessage
        }
      })
    }
  },
  components: {
    VTitle: Title,
    ErrorMessage
  }
}
</script>

<style lang="scss" scoped>
  .login {
    text-align: center;
    label {
      display: block;
      margin: 20px;
      input {
        height: 24px;
        width: 240px;
        padding: 5px;
        border: none;
        border-bottom: 1px solid #ccc;
        font-size: 18px;
        transition: all 0.7s;
        &:focus {
          width: 300px;
          text-align: center;
          border-color: #4fc08d;
        }
      }
    }
    button {
      margin: 20px;
      padding: 5px 20px;
      border: 1px solid #ccc;
      font-size: 16px;
      letter-spacing: 2px;
      text-indent: 2px;
      font-weight: 400;
      background: none;
      cursor: pointer;
      transition: all 0.7s;
      &:hover {
        border-color: transparent;
        background: #4fc08d;
        color: #fff;
      }
    }
  }
</style>
