<template>
  <div class="contact">
    <div class="guide">
      <div class="avatar">
        <img width="215" height="215" src="../../assets/images/avatar.png" alt="avatar">
      </div>
      <div class="introduce">
        <div class="title">
          <h1>岑超超</h1>
        </div>
        <div class="contact-link">
          <router-link to="/articles">文章</router-link>
          <a href="https://github.com/cenchaochao">
            <i class="iconfont icon-github"></i>GITHUB
          </a>
        </div>
      </div>
    </div>
    <div class="contact-address">
      <i class="iconfont icon-microsoftoutlook"></i><span class="email">cenchaochao@outlook.com</span>
      <i class="iconfont icon-wechat"></i><span class="wechat">cen824379487</span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .contact {
    .guide {
      display: flex;
      justify-content: center;
      .avatar {
        width: 215px;
        height: 215px;
        background: #ccc;
        margin-right: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .introduce {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          h1 {
            font-size: 50px;
            font-weight: 300;
          }
        }
        .contact-link {
          a {
            display: inline-block;
            height: 40px;
            width: 120px;
            margin-right: 20px;
            line-height: 40px;
            text-align: center;
            letter-spacing: 2px;
            border-radius: 20px;
            background: #4fc08d;
            color: #fff;
            font-weight: 500;
          }
        }
      }
    }
    .contact-address {
      margin: 50px 0 70px;
      text-align: center;
      font-size: 20px;
      color: #727f80;
      span:not(:last-child) {
        margin-right: 10px;
      }
      i {
        margin-right: 5px;
        color: #4fc08d;
      }
    }
  }
</style>
