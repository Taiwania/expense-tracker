module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '本站需要登入才能使用。')
    res.redirect('/users/login')
  },
}
