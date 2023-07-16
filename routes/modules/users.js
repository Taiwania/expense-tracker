// Set Express and router
const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
  })
)

router.get('/logout', function (req, res, next) {
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    res.redirect('/users/login')
  })
})

module.exports = router
