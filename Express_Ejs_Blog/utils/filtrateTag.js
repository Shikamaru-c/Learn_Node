const Post = require('../models/mongo.js').Post

function filtrateTag (callback) {

  Post.find({}).sort({ _id: -1 }).exec(function (err, data) {
    if (err) return err
    articles = data.reverse()
    let tags = filt(articles)
    callback(tags)
  })

  function filt (articles) {
    let allTags = [],
        resultTags

    articles.forEach(function (article) {
      article.tags.forEach(function (tag) {
        allTags.push(tag)
      })
    })

    resultTags = allTags.filter(function (tag, index) {
      return allTags.indexOf(tag) === index
    })

    return resultTags.map(function (tag) {
      let count = 0
      
      allTags.forEach(function (rawTag) {
        if (rawTag === tag) count++
      })

      return {
        tag: tag,
        count: count
      }
    })
  }
}

module.exports = filtrateTag