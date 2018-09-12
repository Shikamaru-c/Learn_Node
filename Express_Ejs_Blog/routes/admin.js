const express = require('express')
const router = express.Router()

const Post = require('../models/mongo.js').Post
const User = require('../models/mongo.js').User

// 引入中间件
const checkUserLevel = require('../middlewares/checkUserLevel.js')

// 管理文章页
router.get('/', checkUserLevel, function (req, res, next) {
  Post.find({}).sort({_id: -1}).exec(function (err, data) {
    if (err) return next(err)
    res.render('admin/admin', { articles: data})
  })
})

// 删除文章
router.get('/remove/:postId', checkUserLevel, function (req, res, next) {
  const postId = req.params.postId
  Post.remove({_id: postId}, function (err) {
    if (err) return next(err)
    return res.redirect('/admin')
  })
})

// 更新文章页
router.get('/update/:postId', checkUserLevel, function (req, res, next) {
  const postId = req.params.postId
  Post.findById({_id: postId}, function (err, data) {
    if (err) return next(err)
    return res.render('admin/update', {article: data})
  })
})

// 更新文章
router.post('/update/:postId', checkUserLevel, function (req, res, next) {
  const postId = req.params.postId
  const title = req.fields.title
  const tags = getTags(req.fields.tags)
  const content = req.fields.content
  Post.update({_id: postId}, {$set: {title: title, tags: tags, content: content}}, function (err) {
    if (err) return next(err)
    return res.redirect('/admin')
  })
})

// 发表文章页
router.get('/write', checkUserLevel, function (req, res, next) {
  res.render('admin/write')
})

// 发表文章
router.post('/write', checkUserLevel, function (req, res, next) {
  const title = req.fields.title
  const tags = getTags(req.fields.tags)
  const content = req.fields.content
  const post = new Post({
    title: title,
    tags: tags,
    content: content
  })
  post.save(function (err, data) {
    if (err) return next(err)
    return res.redirect('/admin')
  })
})

// 用户管理页
router.get('/user', checkUserLevel, function (req, res, next) {
  User.find({}).sort({ _id: -1 }).exec(function (err, data) {
    if (err) return next(err)
    res.render('admin/user', {users: data})
  })
})

// 更改权限
router.post('/user/level', checkUserLevel, function (req, res, next) {
  const id = req.fields.id
  const level = parseInt(req.fields.level)
  User.update({'id': id}, {'$set': {'level': level}}, function (err) {
    if (err) return next(err)
    res.redirect('back')
  })
})

module.exports = router

function getTags (tags) {
  return tags = tags.split(',').map(function (tag) {
    return tag.trim()
  })
}