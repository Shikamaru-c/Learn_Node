module.exports = function (req, res, next) {
  if (!req.session.user || req.session.user.level < 7) {
    return res.redirect('/')
  } else {
    next()
  }
}