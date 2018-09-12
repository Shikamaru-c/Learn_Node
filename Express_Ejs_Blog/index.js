const path = require('path')
const express = require('express')

const app = express()

// 引入配置文件
const config = require('config-lite')(__dirname)

// session会话相关
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

// 引入模型
const Post = require('./models/mongo.js').Post
const filtrateTag = require('./utils/filtrateTag.js')

// 引入路由
const Router = require('./routes')

// 设置模板路径和模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')))

// session会话
app.use(session({
  secret: 'c_blog',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 2592000000
  }, // 设置 cookie 保存时间
  store: new MongoStore({
    url: config.mongodb
  }) // 设置 session 保存到 mongodb 持久化会话
}))

// 处理表单
app.use(require('express-formidable')())

// 模板全局常量
app.locals.blog = {
  title: '岑超超的博客 CENCHAOCHAO'
}


// 模板全局变量
app.use(function (req, res, next) {
  // 全局tags
  filtrateTag(function (tags) {
    res.locals.tags = tags
    next()
  })
})
app.use(function (req, res, next) {
  // 全局recent-posts
  Post.find({}, { 'tags': 0, 'date': 0, 'content': 0, 'hits': 0 })
      .sort({ _id: -1 })
      .limit(7) // 最近文章显示数量
      .exec(function (err, data) {
        res.locals.recentPosts = data
        next()
      })
})
app.use(function (req, res, next) {
  // 如果有 session 就是登录状态
  if (req.session.user) {
    res.locals.user = req.session.user
  } else {
    res.locals.user = undefined
  }
  next()
})
app.use(function (req, res, next) {
  if (req.session.message) {
    if (req.session.message.count === 0) {
      res.locals.message = req.session.message
      req.session.message.count = 1
    } else {
      req.session.message = null
      res.locals.message = undefined
    }
  } else {
    res.locals.message = undefined
  }
  next()
})

Router(app)

// 错误处理
app.use(function (err, req, res, next) {
  console.log(err.stack)
})

app.listen(8777, function () {
  console.log('you are listen on port 8777')
})