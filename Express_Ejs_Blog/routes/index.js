// 引入路由子组件
const home = require('./home')
const post = require('./post')
const posts = require('./posts')
const admin = require('./admin')
const comments = require('./comments')

module.exports = function (app) {
  app.use('/', home)
  app.get('/post/:postId', post)
  app.get('/posts/:tagName', posts)
  app.use('/comments', comments)
  app.use('/admin', admin)
}