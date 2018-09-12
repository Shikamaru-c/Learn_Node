const express = require('express')
const router = express.Router()

const Comment = require('../models/mongo.js').Comment

// 引入工具函数 time
const time = require('../utils/time.js')

router.post('/main/:postId', function (req, res, next) {
  const postId = req.params.postId
  const userId = req.session.user.id
  const content = req.fields.content
  const comment = new Comment({
    postId: postId,
    userId: userId,
    content: content,
    subComments: {}
  })
  comment.save(function (err) {
    if (err) next(err)
    return res.redirect('back')
  })
})

router.post('/sub/:commentId', function (req, res, next) {
  const commentId = req.params.commentId
  const userId = req.session.user.id
  let content = req.fields.content
  const to = req.fields.to
  if (to) {
    content = `回复 @${to} : ${content}`
  }
  const subComment = {
    userId: userId,
    content: content,
    date: time()
  }
  Comment.update({ _id: commentId }, { '$addToSet': { 'subComments': subComment } }, function (err) {
    if (err) return next(err)
    return res.redirect('back')
  })
})

module.exports = router