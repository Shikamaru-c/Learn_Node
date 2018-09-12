const Post = require('../models/mongo.js').Post

module.exports = function (req, res, next) {
  const tag = req.params.tagName
  Post.find({tags: tag}).sort({_id: -1}).exec(function (err, data) {
    if (err) return err
    res.render('index', { articles: data })
  })
}