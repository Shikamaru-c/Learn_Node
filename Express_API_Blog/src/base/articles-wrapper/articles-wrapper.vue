<template>
  <div class="articles-wrapper">
    <div class="years" v-for="years in articles" :key="years.id">
      <h3><span class="modifier">#</span> {{ years.year }}</h3>
      <div class="months" v-for="months in years.months" :key="months.id">
        <h4><span class="modifier">#</span> {{ monthsStr[months.month] }}</h4>
        <ul>
          <li class="article" v-for="article in months.articles" :key="article.id">
            <router-link :to="'/articles/article/' + article._id">
              <span class="time">{{ article.date }}</span>
              <span class="title">{{ article.title }}</span>
            </router-link>
            <span class="operation" v-show="role === 'admin'">
              <router-link class="modify" :to="'/admin/modify/' + article._id">修改</router-link>
              <a :data-id="article._id" @click="deleteHandle" class="delete">删除</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import getArticles from 'api/getArticles'
import {ERR_OK} from 'api/config.js'
import deleteArticle from 'api/deleteArticle'

export default {
  props: {
    role: {
      type: String
    }
  },
  data () {
    return {
      articles: [],
      monthsStr: ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ]
    }
  },
  created () {
    getArticles().then(res => {
      if (res.ERR_NUM === ERR_OK) {
        this.articles = res.data
      }
    })
  },
  methods: {
    deleteHandle (e) {
      let id = e.target.dataset.id
      deleteArticle(id).then(res => {
        if (res.ERR_NUM === ERR_OK) {
          getArticles().then(res => {
            if (res.ERR_NUM === ERR_OK) {
              this.articles = res.data
            }
          })
        } else {
          this.$bus.emit('errorNotification', res.errorMessage)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .articles-wrapper {
    margin-top: 30px;
    padding: 20px;
    .years {
      margin-top: 24px;
      &:first-child {
        margin-top: 0;
      }
      h3 {
        font-size: 20px;
        font-weight: 600;
        .modifier {
          color: #4fc08d;
        }
      }
      .months {
        margin-top: 16px;
        margin-left: 16px;
        h4 {
          font-size: 18px;
          font-weight: 500;
          .modifier {
            color: #4fc08d;
          }
        }
        .article {
          margin-top: 12px;
          margin-left: 12px;
          a {
            &:hover {
              color: #4fc08d;
              text-decoration: underline;
            }
            .time {
              font-size: 16px;
            }
          }
          .operation {
            margin-left: 30px;
            a {
              display: inline-block;
              padding: 3px 5px;
              border: 1px solid #ccc;
              transition: all 0.7s;
              &.modify:hover {
                border-color: transparent;
                text-decoration: none;
                color: white;
                background: #4fc08d;
              }
              &.delete:hover {
                border-color: transparent;
                text-decoration: none;
                color: white;
                background: red;
              }
            }
          }
        }
      }
    }
  }
</style>
