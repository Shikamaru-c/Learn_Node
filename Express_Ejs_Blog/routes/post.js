const Post = require('../models/mongo.js').Post
const Comment = require('../models/mongo.js').Comment

const marked = require('marked')

module.exports = function (req, res, next) {
  const postId = req.params.postId
  Post.findById({ _id: postId }, function (err, data) {
    if (err) return next(err)
    let article = data
    article.content = marked(article.content)
    Post.update({ _id: postId }, { '$inc': { 'hits': 1 } }, function (err) {
      if (err) return next(err)
      Comment.find({ 'postId': postId }, function (err, data) {
        if (err) return next(err)
        res.render('detail', { article: article, comments: data})
      })
    })
  })
}
