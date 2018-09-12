<template>
  <div class="signup">
    <v-title main="后台" sub="注册"></v-title>
    <error-message :errorMessage="errorMessage"></error-message>
    <label for="account">
      <input v-model="account" type="text" id="account"
        placeholder="帐号"
        @focus="inputAccountHandle"
        @blur="blurHandle"
      >
    </label>
    <label for="password">
      <input v-model="password" type="password" id="password"
        placeholder="密码"
        @focus="inputPasswordHandle"
        @blur="blurHandle"
      >
    </label>
    <label for="repassword">
      <input v-model="repassword" type="password" id="repassword"
        placeholder="重复上一次输入的密码"
      >
    </label>
    <button @click="signupHandle">注册</button>
  </div>
</template>

<script>
import Title from 'base/title/title'
import signup from 'api/signup'
import {ERR_OK} from 'api/config'
import ErrorMessage from 'base/error-message/error-message'
import checkAandP from 'utils/checkAandP'

export default {
  data () {
    return {
      account: '',
      password: '',
      repassword: '',
      errorMessage: ''
    }
  },
  methods: {
    signupHandle () {
      let user = {}
      let message
      message = checkAandP(this.account, this.password, this.repassword)
      if (message) {
        this.errorMessage = message
        return
      }
      user.account = this.account
      user.password = this.password
      signup(user).then(res => {
        if (res.ERR_NUM === ERR_OK) {
          this.$bus.emit('userLogin', res.user)
          this.$router.push({path: '/'})
        } else {
          this.errorMessage = res.errorMessage
        }
      })
    },

    inputAccountHandle () {
      this.errorMessage = '帐号 (6-12位英文字母/数字/_/-)'
    },

    inputPasswordHandle () {
      this.errorMessage = '密码 (6-12位英文字母/数字/_/-且至少2种类型)'
    },

    blurHandle () {
      this.errorMessage = ''
    }
  },
  components: {
    VTitle: Title,
    ErrorMessage
  }
}
</script>

<style lang="scss">
  .signup {
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
