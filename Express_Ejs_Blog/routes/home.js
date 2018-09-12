const express = require('express')
const router = express.Router()

const sha1 = require('sha1')

const Post = require('../models/mongo.js').Post
const User = require('../models/mongo.js').User

router.get('/', function (req, res, next) {
  Post.find({}).sort({_id: -1}).exec(function (err, data) {
    if (err) return next(err)
    res.render('index', {articles: data})
  })
})

router.post('/signin', function (req, res, next) {
  const id = req.fields.id
  let password = req.fields.password
  const repassword = req.fields.repassword

  const idReg = /^[a-zA-Z\-\_0-9]{6,12}$/
  const pw1 = /[a-zA-Z\-\_]/
  const pw2 = /\d/
  const pw3 = /^.{6,12}$/

  if (!idReg.test(id)) {
    req.session.message = {data: '帐号不符合规则', count: 0}
    return res.redirect('back')
  } else if (!pw1.test(password) || !pw2.test(password) || !pw3.test(password)) {
    req.session.message = {data: '密码不符合规则', count: 0}
    return res.redirect('back')
  } else if (password !== repassword) {
    req.session.message = { data: '两次密码不相同', count: 0 }
    return res.redirect('back')
  } else {
    password = sha1(password)
    const user = new User({
      id: id,
      password: password
    })
    user.save(function (err) {
      if (err) {
        req.session.message = { data: '帐号已存在', count: 0 } // 一次性提示
        return res.redirect('back')
      } else {
        req.session.user = user
        return res.redirect('back')
      }
    })
  }
})

router.post('/login', function (req, res, next) {
  const id = req.fields.id
  const password = req.fields.password
  User.findOne({'id': id}, function (err, data) {
    if (err) return next(err)

    if (data) {
      if (sha1(password) === data.password) {
        req.session.user = data
        return res.redirect('back')
      } else {
        req.session.message = {data: '账号或者密码错误', count: 0} // 一次性提示
        return res.redirect('back')
      }
    } else {
      req.session.message = { data: '账号或者密码错误', count: 0} // 一次性提示
      return res.redirect('back')
    }
  })
})

router.get('/logout', function (req, res, next) {
  req.session.user = undefined
  return res.redirect('back')
})

module.exports = router