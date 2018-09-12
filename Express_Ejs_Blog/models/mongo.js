const mongoose = require('mongoose')

// 引入配置文件
const config = require('config-lite')(__dirname)

mongoose.connect(config.mongodb)

// 引入工具函数 time
const time = require('../utils/time.js')

const Post = new mongoose.Schema({
  title: String,
  tags: Array,
  date: {type: String, default: time()},
  content: String,
  hits: {type: Number, default: 0}
})

exports.Post = mongoose.model('Post', Post)

const Comment = new mongoose.Schema({
  postId: String,
  userId: String,
  content: String,
  date: {type: String, default: time()},
  subComments: Array
})

exports.Comment = mongoose.model('Comment', Comment)

const User = new mongoose.Schema({
  id: {type: String, unique: true},
  password: String,
  date: {type: String, default: time()},
  level: {type: Number, default: 0}
  // 权限: [0 普通用户] [1-6 暂时不用] [7 管理员]
})

exports.User = mongoose.model('User', User)