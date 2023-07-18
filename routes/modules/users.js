// Set Express and router
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const { check, validationResult } = require('express-validator')

// Show login page
router.get('/login', (req, res) => {
  res.render('login')
})

// Show register page
router.get('/register', (req, res) => {
  res.render('register')
})

// Login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
  })
)

// Logout
router.get('/logout', function (req, res, next) {
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    req.flash('success_msg', '您已經成功登出。')
    res.redirect('/users/login')
  })
})

// Register
router.post(
  '/register',
  check('username').notEmpty().withMessage('請輸入名稱'),
  check('email').isEmail().withMessage('請輸入有效的電子郵件帳號'),
  check('password').notEmpty().withMessage('請輸入密碼'),
  check('confirmPassword', '請輸入確認密碼')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('您輸入的密碼與確認密碼不一致'),
  (req, res) => {
    const { username, email, password, confirmPassword } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((e) => e.msg)
      req.flash('warning_msg', errorMessages)
      return res.render('register', {
        errors: errors.array(),
        username,
        email,
        password,
        confirmPassword,
      })
    }

    User.findOne({ email }).then((user) => {
      if (user) {
        errors.push('您輸入的電子郵件帳號已經被註冊。')
        return res.render('register', {
          errors,
          username,
          email,
          password,
          confirmPassword,
        })
      } else {
        return bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) => {
            return User.create({
              username,
              email,
              password: hash,
            })
          })
          .then(() => res.redirect('/'))
          .catch((error) => console.log(error))
      }
    })
  }
)

module.exports = router
