// Set Express and router
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

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
router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body
  const errors = []
  if (!username || !email || !password || !confirmPassword) {
    errors.push('請輸入所有欄位。')
  }
  if (password !== confirmPassword) {
    errors.push('您輸入的密碼與確認密碼不一致。')
  }
  if (errors.length) {
    return res.render('register', {
      errors,
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
})

module.exports = router
