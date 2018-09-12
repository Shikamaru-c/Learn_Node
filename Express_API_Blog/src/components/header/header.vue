<template>
  <div class="header">
    <div class="title">
      <router-link to="/">CENCHAOCHAO</router-link>
    </div>
    <ul class="nav-bar">
      <li><router-link to="/">主页</router-link></li>
      <li><router-link to="/articles">文章</router-link><li>
      <li class="admin-list"
        @mouseover="isShowList = true"
        @mouseout="isShowList = false"
      >
        <a>后台</a>
        <ul v-show="isShowList">
          <template v-if="Object.keys(user).length === 0">
          <li><router-link to="/admin/login">登录</router-link></li>
          <li><router-link to="/admin/signup">注册</router-link></li>
          </template>
          <template v-else-if="user.role >= 7">
          <li><router-link to="/admin/manage">管理</router-link></li>
          <li><router-link to="/admin/writing">写作</router-link></li>
          </template>
          <li v-if="Object.keys(user).length !== 0">
            <a @click="logoutHandle">登出</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import logout from 'api/logout'
import sessionLogin from 'api/sessionLogin'
import {ERR_OK} from 'api/config'

export default {
  data () {
    return {
      isShowList: false,
      user: {}
    }
  },
  created () {
    // 接收 login 组件传递来的登录事件
    this.$bus.on('userLogin', (user) => {
      this.user = user
    })
    // 每次生命周期开始时候 请求网站使用 session 登录
    sessionLogin().then(res => {
      if (res.ERR_NUM === ERR_OK) {
        this.user = res.user
      }
    })
  },
  methods: {
    logoutHandle () {
      logout().then(res => {
        this.user = res.user
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin-bottom: 40px;
    .title {
      flex: 0;
      margin-left: 30px;
      font-size: 24px;
    }
    .nav-bar {
      margin-right: 20px;
      li {
        display: inline-block;
        a {
          display: inline-block;
          margin: 0 5px;
          padding: 12px;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          &.router-link-exact-active {
            color: #4fc08d;
          }
          &:hover:not(.router-link-exact-active) {
            border-color: #4fc08d;
          }
        }
        &.admin-list {
          position: relative;
          ul {
            position: absolute;
            background: #f6f6f6;
          }
        }
      }
    }
  }
</style>
