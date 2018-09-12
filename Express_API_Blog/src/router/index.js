import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/home/home'
import Articles from 'components/articles/articles'
import Article from 'components/article/article'
import Admin from 'components/admin/admin'
import Login from 'components/login/login'
import Signup from 'components/signup/signup'
import Manage from 'components/manage/manage'
import Writing from 'components/writing/writing'
import Modify from 'components/modify/modify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/articles',
      component: Articles
    },
    {
      path: '/articles/article/:id',
      component: Article
    },
    {
      path: '/admin',
      component: Admin,
      redirect: '/admin/login',
      children: [
        {
          path: 'login',
          component: Login
        },
        {
          path: 'signup',
          component: Signup
        },
        {
          path: 'manage',
          component: Manage
        },
        {
          path: 'writing',
          component: Writing
        },
        {
          path: 'modify/:id',
          component: Modify
        }
      ]
    }
  ]
})
